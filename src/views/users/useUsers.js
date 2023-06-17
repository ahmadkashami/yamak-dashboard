import { useUtils } from '@/libs/i18n'
import { ref } from 'vue'
import { store } from '@/store'
import { required } from '@/utils/validation'

export default function useUsers() {
  const { t } = useUtils()

  const tableColumns = [
    { title: t('Full Name'), key: 'name' },
    { title: t('Email'), key: 'email' },
    { title: t('Role'), key: 'role' },
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

  const fullName = ref(null)
  const email = ref(null)
  const password = ref(null)
  const role = ref(null)



  const fetchDataList = () => {
    store.dispatch('fetchUsers', {
      page: currentPage.value ?? 1,
      limit: itemsPerPage.value,
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

  const editItem = item => {
    itemData.value = item
    isOpenUpdateDialog.value = true
  }
  const emailRules= [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ]

  const requiredRules= [v => !!v || 'Item is required']
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
    email,
    password,
    role,
    fullName,
    isOpenCreateDialog,
    resetForm,
    itemData,
    editItem,
    isOpenUpdateDialog,
    t,
    emailRules,
    requiredRules
  }
}
