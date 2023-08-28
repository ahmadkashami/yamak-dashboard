import { useUtils } from '@/libs/i18n'
import { ref } from 'vue'
import { store } from '@/store'
import { useRoute } from 'vue-router'
import { useLocale } from 'vuetify'

export default function useWebsite() {
  const { t } = useUtils()
  const { current } = useLocale()
  const lang=current.value
  const route = useRoute()
  const tableColumns = [
    { title: t('Company'), key: 'company' },
    { title: t('Domain'), key: 'domainUrl' },
    { title: t('Status'), key: 'status' },
    { title: t('Created At'), key: 'createdAt' },
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
      domainUrl:null,
      status:"active",
      aboutUs:null,
      companyId:route.params.id,
      contactUs:{
        address:null,
        phone:null,
        email:null
      },
    }
  )


  const fetchDataList = () => {
    store.dispatch('fetchWebsites', {
      limit: itemsPerPage.value,
      page: currentPage.value ? currentPage.value : 1,
      sort: options.value.sortDesc? "DESC" : "ASC",
      companyId:route.params.id
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
    lang
  }
}
