import { useUtils } from '@/libs/i18n'
import { ref } from 'vue'
import { store } from '@/store'
import { useLocale } from 'vuetify'

export default function useDashboard() {
  const { t } = useUtils()
  const { current } = useLocale()
  const lang=current.value
 
  const dataList = ref([])
  const loading = ref(false)
  const isOutlinedSnackbarVisible = ref(false)
  const msgSnackbarVisible = ref('')
  const isOutlinedSnackbarColor = ref('')

  const widgetsData=ref(null)
 
 
 
 


  const fetchDataList = () => {
    store.dispatch('fetchDashboardData')
      .then(response => {
        dataList.value = response.data.data
        widgetsData.value=[
          {
            title: "Companies",
            icon: "mdi-office-building",
            count: dataList.value.companyCount,
          },
          {
            title: "Websites",
            icon: "mdi-web",
            count: dataList.value.websiteCount,
          },
          {
            title: "Drivers",
            icon: "mdi-account-tie",
            count: dataList.value.driverCount,
          },
          {
            title: "Services",
            icon: "mdi-toolbox-outline",
            count: dataList.value.serviceCount,
          },
          {
            title: "App Users",
            icon: "mdi-account-multiple-check-outline",
            count: dataList.value.appUserCount,
          },
          {
            title: "Vehicles",
            icon: "mdi-rv-truck",
            count: dataList.value.vehicleCount,
          },
          {
            title: "Branches",
            icon: "mdi-source-branch",
            count: dataList.value.branchCount,
          },
        ]

        loading.value = false
      }).catch(error => {
        isOutlinedSnackbarVisible.value = true
        msgSnackbarVisible.value = error.response.data.message
        isOutlinedSnackbarColor.value = 'error'
      })
  }

   

  return {
    loading,
    isOutlinedSnackbarVisible,
    msgSnackbarVisible,
    fetchDataList,
    dataList,
    isOutlinedSnackbarColor,
    t,
    lang,
    widgetsData,
  }
}
