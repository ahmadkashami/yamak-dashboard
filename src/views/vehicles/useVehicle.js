import { useUtils } from '@/libs/i18n'
import { ref } from 'vue'
import { store } from '@/store'
import { useRoute } from 'vue-router'
import { useLocale } from 'vuetify'

export default function useVehicle() {
  const { t } = useUtils()
  const route = useRoute()

  const iconsMap=ref([
    { label: 'Yamak Wash', value: 'https://res.cloudinary.com/ds2bezann/image/upload/v1703351684/MiniVan_dq19rs.png' },
    { label: 'Yamak Cran', value: 'https://res.cloudinary.com/ds2bezann/image/upload/v1703351686/Tow_xpgu8n.png' },
    { label: 'Yamak VAN', value: 'https://res.cloudinary.com/ds2bezann/image/upload/v1703357278/MiniVan_ncvvlq.png' },
  ])

  const { current } = useLocale()
  const lang=current.value

  const tableColumns = [
    { title: t('Branch'), key: 'branch' },
    { title: t('Created At'), key: 'createdAt' },
    { title: t('Status'), key: 'status' },
    { title: t('Icon'), key: 'iconMap' , align: 'center'},
    // { title: t('Actions'), key: 'actions', align: 'center', sortable: false },
  ]

  const dataList = ref([])
  const loading = ref(false)
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const pageInfo = ref({})
  const isOpenCreateDialog = ref(false)
  const isOpenUpdateDialog = ref(false)
  const isOutlinedSnackbarVisible = ref(false)
  const msgSnackbarVisible = ref('')
  const isOutlinedSnackbarColor = ref('')

  const options = ref({
    sortBy: ['id'],
    sortDesc: [true],
    itemsPerPage: parseInt(itemsPerPage.value),
  })

  const valid = ref(false)
  const form = ref(null)

  const validate = () => {
    form.value.validate()
  }

  const resetForm = () => {
    form.value.reset()
  }

  const modelObject=ref(
    {
      drivers: [],
      services: [],
      branchId: null,
      iconMap: null,
      companyId: route.params.id,
      status: "active",
      currentDriver: null,
      workStatus: "online",
      geoLocation: {
        latitude: 29.380627,
        longitude: 47.992982,
      },
    },
  )


  const fetchDataList = () => {
    store.dispatch('fetchVehiclesByCompany', {
      limit: itemsPerPage.value,
      page: currentPage.value ? currentPage.value : 1,
      sort: options.value.sortDesc? "DESC" : "ASC",
      companyId: route.params.id,
    })
      .then(response => {

        dataList.value = response.data.data.list
        pageInfo.value = {
          totalPages: response.data.data.metadata?.lastPage,
        }
        loading.value = false
      }).catch(error => {
        isOutlinedSnackbarVisible.value = true
        msgSnackbarVisible.value = error.response.data.message
        isOutlinedSnackbarColor.value = 'error'
      })
  }

  const itemData = ref(null)

  const updateItemsPerPage = value => {
    itemsPerPage.value = value
    options.value.itemsPerPage = itemsPerPage.value
    fetchDataList()
  }

  const updateCurrentPage = value => {
    currentPage.value = value.value
    fetchDataList()
  }

  const editItem = item => {
    itemData.value = item
    isOpenUpdateDialog.value = true
  }

  return {
    tableColumns,
    loading,
    options,
    pageInfo,
    currentPage,
    itemsPerPage,
    isOutlinedSnackbarVisible,
    msgSnackbarVisible,
    fetchDataList,
    dataList,
    isOutlinedSnackbarColor,
    valid,
    form,
    validate,
    modelObject,
    isOpenCreateDialog,
    resetForm,
    itemData,
    editItem,
    isOpenUpdateDialog,
    t,
    updateItemsPerPage,
    updateCurrentPage,
    route,
    lang,
    iconsMap
  }
}
