import axios from '@/plugins/axios'

export default {
  fetchDashboardData({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`dashboard`, { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
