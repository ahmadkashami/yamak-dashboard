import { useUtils } from '@/libs/i18n'
import { ref } from 'vue'
import { store } from '@/store'

export default function useBranches() {
  const { t } = useUtils()

  const tableColumns = [
    { title: t('Name'), key: 'name' },
    { title: t('Phone'), key: 'phone' },
    { title: t('Status'), key: 'status' },
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
      name:null,
      phone:null,
      companyId:null,
      logo:null,
      address:{
        block:"2",
        state:"Mubarak al kabeer",
        city:"AlQossor",
        street:"18",
        zipCode:"27004"
      },
      status:'active',
      services:[],
      geoLocation: {
        latitude: 0,
        longitude: 0
      }
    }
  )


  const fetchDataList = () => {
    store.dispatch('fetchBranches', {
      limit: itemsPerPage.value,
      page: currentPage.value ? currentPage.value : 1,
      sort: options.value.sortDesc? "DESC" : "ASC"
    })
      .then(response => {

        dataList.value = response.data.data.list
        pageInfo.value = {
          totalPages: response.data.data.metadata.lastPage,
        }
        loading.value = false
      }).catch(error => {
        isOutlinedSnackbarVisible.value = true
        msgSnackbarVisible.value = error.response.data.message
        isOutlinedSnackbarColor.value = 'error'
      })
  }

  const itemData = ref(null)
  const updateItemsPerPage = (value) => {
    itemsPerPage.value = value;
    options.value.itemsPerPage = itemsPerPage.value;
    fetchDataList();
  }
  const updateCurrentPage = (value) => {
    currentPage.value = value.value;
    fetchDataList();
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
    updateCurrentPage
  }
}
