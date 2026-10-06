import { useUtils } from '@/libs/i18n'
import { computed, ref } from 'vue'
import { store } from '@/store'

/**
 * @typedef {Object} OnboardingSlide
 * @property {number|null} id        Existing slide id, null for a newly added slide.
 * @property {number} sort_order      1-based position inside the onboarding.
 * @property {string} title_en        Required English title.
 * @property {string} title_ar        Optional Arabic title.
 * @property {string} description_en  Optional English description.
 * @property {string} description_ar  Optional Arabic description.
 * @property {string|null} image      Newly uploaded secure_url, only sent when replaced.
 * @property {string|null} image_url  Currently stored image, display only.
 *
 * @typedef {Object} OnboardingForm
 * @property {boolean} is_skippable
 * @property {OnboardingSlide[]} slides
 *
 * @typedef {Object} OnboardingRow
 * @property {number} id
 * @property {number} version
 * @property {'draft'|'published'} status
 * @property {boolean} isActive
 * @property {boolean} isSkippable
 * @property {number} slideCount
 * @property {string|null} createdAt
 * @property {string|null} updatedAt
 */

export default function useOnboardings() {
  const { t } = useUtils()

  /**
   * `useUtils().t` resolves through the active setup instance, so it is only safe while
   * `setup()` runs. Every message needed later - by a validation rule, a click handler or
   * a request callback - is translated here once instead. The dashboard locale is static,
   * so the resolved strings stay correct.
   */
  const messages = {
    atLeastOneSlide: t('At least one slide is required'),
    createdSuccessfully: t('Created Successfully'),
    duplicateOrder: t('Order values must be unique'),
    invalidImageUrl: t('URL is invalid'),
    loadFailed: t('Failed to load onboarding'),
    orderPositive: t('Order must be a positive integer'),
    titleRequired: t('This field is required'),
    updatedSuccessfully: t('Updated Successfully'),
  }

  const tableColumns = [
    { title: t('Version'), key: 'version' },
    { title: t('Status'), key: 'status' },
    { title: t('Active'), key: 'isActive' },
    { title: t('Skippable'), key: 'isSkippable' },
    { title: t('Slides'), key: 'slideCount', align: 'center' },
    { title: t('Created'), key: 'createdAt' },
    { title: t('Updated'), key: 'updatedAt' },
    { title: t('Actions'), key: 'actions', align: 'center', sortable: false },
  ]

  const dataList = ref([])
  const loading = ref(false)
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const pageInfo = ref({})

  const options = ref({
    sortBy: ['id'],
    sortDesc: [true],
    itemsPerPage: parseInt(itemsPerPage.value),
  })

  const isOpenCreateDialog = ref(false)
  const isOpenUpdateDialog = ref(false)
  const isOpenDeleteDialog = ref(false)
  const isOpenConfirmDialog = ref(false)

  const isOutlinedSnackbarVisible = ref(false)
  const msgSnackbarVisible = ref('')
  const isOutlinedSnackbarColor = ref('')

  const itemData = ref(null)
  const isDetailLoading = ref(false)
  const detail = ref(null)

  /** Translation keys of the pending confirmation dialog, resolved by the caller with $t. */
  const confirmTitleKey = ref('')
  const confirmMessageKey = ref('')

  /** One of publish | activate | disable. */
  const confirmAction = ref('')
  const isConfirming = ref(false)

  const valid = ref(false)
  const form = ref(null)

  const validate = () => {
    form.value.validate()
  }

  const createEmptySlide = (sortOrder = 1) => ({
    id: null,
    sort_order: sortOrder,
    title_en: '',
    title_ar: '',
    description_en: '',
    description_ar: '',
    image: null,
    image_url: null,
  })

  const createFormModel = () => ({
    is_skippable: true,
    slides: [createEmptySlide(1)],
  })

  const modelObject = ref(createFormModel())

  /**
   * Renumbers sort_order to a contiguous 1..N sequence following the array order.
   * Runs after every structural change, so the payload only carries gaps or ties when the
   * operator typed an order manually.
   */
  const normalizeSlideOrders = slides => {
    slides.forEach((slide, index) => {
      slide.sort_order = index + 1
    })
  }

  const showMessage = (message, color) => {
    msgSnackbarVisible.value = message
    isOutlinedSnackbarColor.value = color
    isOutlinedSnackbarVisible.value = true
  }

  /** Prefers the backend message and never leaks a stack trace or exception object. */
  const showError = error => {
    showMessage(error?.response?.data?.message || messages.loadFailed, 'error')
  }

  const showSuccess = message => {
    showMessage(message, 'success')
  }

  const addSlide = () => {
    modelObject.value.slides.push(createEmptySlide(modelObject.value.slides.length + 1))
  }

  const removeSlide = index => {
    // The backend requires at least one slide, so the last one cannot be removed.
    if (modelObject.value.slides.length <= 1) {
      showMessage(messages.atLeastOneSlide, 'error')

      return
    }

    modelObject.value.slides.splice(index, 1)
    normalizeSlideOrders(modelObject.value.slides)
  }

  /** Moves a slide one position up (-1) or down (+1), then renumbers. */
  const moveSlide = (index, direction) => {
    const target = index + direction

    if (target < 0 || target >= modelObject.value.slides.length) {
      return
    }

    const slides = modelObject.value.slides
    const moved = slides[index]

    slides[index] = slides[target]
    slides[target] = moved
    normalizeSlideOrders(slides)
  }

  const canMoveUp = index => index > 0
  const canMoveDown = index => index < modelObject.value.slides.length - 1
  const canRemoveSlide = computed(() => modelObject.value.slides.length > 1)

  const uploadedSlideImage = (index, url) => {
    modelObject.value.slides[index].image = url
  }

  /**
   * Per-index upload handlers, rebuilt whenever the slide list changes, so the template can
   * hand FileUpload a bare handler reference instead of an inline call expression.
   */
  const slideImageHandlers = computed(() => modelObject.value.slides.map((slide, index) => url => uploadedSlideImage(index, url)))

  const positiveOrderRules = [
    value => !!value || messages.orderPositive,
    value => {
      if (!value) {
        return true
      }

      return Number(value) > 0 || messages.orderPositive
    },
  ]

  const requiredTitleRules = [value => !!value || messages.titleRequired]

  const ordersAreUnique = () => {
    const orders = modelObject.value.slides.map(slide => Number(slide.sort_order))

    return new Set(orders).size === orders.length
  }

  /**
   * Cross-slide guard run before submitting. Duplicate order values and non-http image
   * URLs have no single field to attach a rule to, so they are reported through the
   * snackbar. The backend stays the final validator.
   *
   * @returns {string|null} The message to show, or null when the form is acceptable.
   */
  const validateSlides = () => {
    if (!ordersAreUnique()) {
      return messages.duplicateOrder
    }

    const hasInvalidImage = modelObject.value.slides.some(slide => slide.image && !/^https?:\/\//i.test(slide.image))

    if (hasInvalidImage) {
      return messages.invalidImageUrl
    }

    return null
  }

  /**
   * Builds the snake_case payload the backend expects. `image` is included only when a
   * replacement was actually uploaded: the backend reads an explicit null as "delete
   * image", so an unchanged slide must omit the key entirely.
   *
   * @returns {Object}
   */
  const buildPayload = () => ({
    is_skippable: Boolean(modelObject.value.is_skippable),
    slides: modelObject.value.slides.map(slide => {
      const payload = {
        sort_order: Number(slide.sort_order),
        title_en: slide.title_en,
        title_ar: slide.title_ar || null,
        description_en: slide.description_en || null,
        description_ar: slide.description_ar || null,
      }

      if (slide.id) {
        payload.id = slide.id
      }

      if (slide.image) {
        payload.image = slide.image
      }

      return payload
    }),
  })

  const fetchDataList = () => {
    loading.value = true

    store.dispatch('fetchOnboardings', {
      limit: itemsPerPage.value,
      page: currentPage.value ? currentPage.value : 1,
    })
      .then(response => {
        dataList.value = response.data.data.list
        pageInfo.value = {
          totalPages: response.data.data.metaData?.lastPage,
        }
        loading.value = false
      }).catch(error => {
        loading.value = false
        showError(error)
      })
  }

  const updateItemsPerPage = value => {
    itemsPerPage.value = value
    options.value.itemsPerPage = itemsPerPage.value
    currentPage.value = 1
    fetchDataList()
  }

  const updateCurrentPage = value => {
    currentPage.value = value
    fetchDataList()
  }

  const editItem = item => {
    itemData.value = item
    isOpenUpdateDialog.value = true
  }

  const deleteItem = item => {
    itemData.value = item
    isOpenDeleteDialog.value = true
  }

  const isDraft = row => row?.status === 'draft'
  const isPublishedActive = row => row?.status === 'published' && row?.isActive === true
  const isPublishedInactive = row => row?.status === 'published' && row?.isActive !== true

  const openConfirmDialog = (action, item, titleKey, messageKey) => {
    itemData.value = item
    confirmAction.value = action
    confirmTitleKey.value = titleKey
    confirmMessageKey.value = messageKey
    isOpenConfirmDialog.value = true
  }

  const closeConfirmDialog = () => {
    isOpenConfirmDialog.value = false
    isConfirming.value = false
  }

  const confirmPendingAction = () => {
    const serviceByAction = {
      publish: 'publishOnboarding',
      activate: 'activateOnboarding',
      disable: 'disableOnboarding',
    }

    const service = serviceByAction[confirmAction.value]

    if (!service || !itemData.value) {
      closeConfirmDialog()

      return
    }

    isConfirming.value = true

    store.dispatch(service, { id: itemData.value.id })
      .then(response => {
        isConfirming.value = false
        isOpenConfirmDialog.value = false
        showSuccess(response.data.message)
        fetchDataList()
      }).catch(error => {
        isConfirming.value = false
        isOpenConfirmDialog.value = false
        showError(error)
      })
  }

  const isDraftDetail = computed(() => detail.value?.status === 'draft')

  /** Loads the full onboarding for the edit dialog and the read-only view. */
  const fetchDetail = id => {
    isDetailLoading.value = true
    detail.value = null

    store.dispatch('fetchOnboarding', { id })
      .then(response => {
        detail.value = response.data.data
        isDetailLoading.value = false
      }).catch(error => {
        isDetailLoading.value = false
        showError(error)
      })
  }

  const resetDetail = () => {
    detail.value = null
    isDetailLoading.value = false
  }

  /** Maps the backend detail into the snake_case form model. */
  const fillFormFromDetail = onboardingDetail => {
    modelObject.value = {
      is_skippable: Boolean(onboardingDetail.isSkippable),
      slides: (onboardingDetail.slides || []).map(slide => ({
        id: slide.id,
        sort_order: slide.order,
        title_en: slide.titleEn || '',
        title_ar: slide.titleAr || '',
        description_en: slide.descriptionEn || '',
        description_ar: slide.descriptionAr || '',
        image: null,
        image_url: slide.imageUrl || null,
      })),
    }

    if (modelObject.value.slides.length === 0) {
      modelObject.value.slides = [createEmptySlide(1)]
    }

    normalizeSlideOrders(modelObject.value.slides)
  }

  const resetFormModel = () => {
    modelObject.value = createFormModel()
  }

  return {
    // list state
    tableColumns,
    dataList,
    loading,
    currentPage,
    itemsPerPage,
    pageInfo,
    options,

    // dialogs
    isOpenCreateDialog,
    isOpenUpdateDialog,
    isOpenDeleteDialog,
    isOpenConfirmDialog,

    // confirmation
    confirmTitleKey,
    confirmMessageKey,
    confirmAction,
    isConfirming,
    confirmPendingAction,
    closeConfirmDialog,
    openConfirmDialog,

    // snackbar
    isOutlinedSnackbarVisible,
    msgSnackbarVisible,
    isOutlinedSnackbarColor,
    showMessage,
    showError,
    showSuccess,

    // selection / detail
    itemData,
    detail,
    isDetailLoading,
    isDraftDetail,
    fetchDetail,
    resetDetail,
    fillFormFromDetail,
    editItem,
    deleteItem,

    // form
    valid,
    form,
    validate,
    modelObject,
    resetFormModel,
    buildPayload,
    validateSlides,
    addSlide,
    removeSlide,
    moveSlide,
    canMoveUp,
    canMoveDown,
    canRemoveSlide,
    slideImageHandlers,

    // validation rule sets
    positiveOrderRules,
    requiredTitleRules,

    // row state helpers
    isDraft,
    isPublishedActive,
    isPublishedInactive,

    // list fetch
    fetchDataList,
    updateItemsPerPage,
    updateCurrentPage,

    // pre-translated runtime messages
    messages,
  }
}