import { useUtils } from '@/libs/i18n'
import { ref } from 'vue'
import { store } from '@/store'
import { useRoute } from 'vue-router'
import { useLocale } from 'vuetify'

export default function useTheme() {
  const { t } = useUtils()
  const { current } = useLocale()
  const lang = current.value
  const route = useRoute()

  const loading = ref(false)
  const isOpenCreateDialog = ref(false)
  const isOpenUpdateDialog = ref(false)
  const isOutlinedSnackbarVisible = ref(false)
  const msgSnackbarVisible = ref('')
  const isOutlinedSnackbarColor = ref('')

 

  const valid = ref(false)
  const form = ref(null)

  const validate = () => {
    form.value.validate()
  }

  const resetForm = () => {
    form.value.reset()
  }
  const modelObject = ref(
    {
      websiteId: route.params.websiteId,
      primaryColor:null,
      secondaryColor:null,
      bannerImage:null,
      secondaryBackgroundColor:null,
      companyId: route.params.companyId,
    },
  )


  const getDataItem = () => {
    store.dispatch('getWebsiteTheme', {
      websiteId: route.params.websiteId,
      companyId: route.params.companyId,
    })
      .then(response => {
        itemData.value = response.data.data
        loading.value = false
      }).catch(error => {
      isOutlinedSnackbarVisible.value = true
      msgSnackbarVisible.value = error.response.data.message
      isOutlinedSnackbarColor.value = 'error'
    })
  }

  const itemData = ref(null)


  return {
    loading,
    isOutlinedSnackbarVisible,
    msgSnackbarVisible,
    getDataItem,
    isOutlinedSnackbarColor,
    valid,
    form,
    validate,
    modelObject,
    isOpenCreateDialog,
    resetForm,
    itemData,
    isOpenUpdateDialog,
    t,
    route,
    lang,
  }
}
