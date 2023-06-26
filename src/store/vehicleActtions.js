import axios from '@/plugins/axios'

export default {
  fetchVehicles({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`vehicles`, { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  createVehicle({ state }, { queryParams }) {
    return new Promise((resolve, reject) => {
      axios.post(`vehicles`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  updateVehicle({ state }, { id, queryParams }) {
    return new Promise((resolve, reject) => {
      axios.put(`vehicles/${id}`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  fetchVehiclesByCompany({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`companies/${queryParams.companyId}/vehicles`)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
