import store from '@/store'
import {ref} from '@vue/composition-api'
import {useUtils} from "../../libs/i18n";

export default function useExample() {
  const {t} = useUtils()
  const tableColumns = [
    {text: t('AccountId'), value: 'id'},
    {text: t('Name'), value: 'name'},
    {text: t('Balance'), value: 'balance'},
    {text: t('Actions'), value: 'actions', align: 'center', sortable: false,},
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
  const name = ref(null)
  const fetchDataList = () => {
    store.dispatch('fetchDataList', {
      page: currentPage.value ?? 1,
      limit: itemsPerPage.value,
    })
      .then(response => {
        dataList.value = response.data.data.data
        pageInfo.value = {
          totalPages: Math.ceil(response.data.data.total / itemsPerPage.value),
        }
        loading.value = false
      }).catch(error => {
      isOutlinedSnackbarVisible.value = true
      msgSnackbarVisible.value = error.response.data.message
      isOutlinedSnackbarColor.value = 'error'
    })
  }
  const itemData = ref(null)
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
    name,
    isOpenCreateDialog,
    resetForm,
    itemData,
    editItem,
    isOpenUpdateDialog,
    t
  }
}
