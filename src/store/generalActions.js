import axios from '@/plugins/axios'

export default {
  fetchCountries({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`countries`, { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  fetchStatesByCountry({ state },queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`countries/${queryParams.countryId}/states`)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  fetchCitiesByState({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`states/${queryParams.stateId}/cities`)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

}
