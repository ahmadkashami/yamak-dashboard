import axios from '@/plugins/axios'

/**
 * Flat Vuex actions for versioned onboarding management.
 *
 * Every request is relative to the axios instance `baseURL`
 * (`.../api/dashboard/v1/`), so paths stay as `onboardings...`.
 * The backend owns the response envelope: `{ success, message, data, errors }`.
 * Consumers therefore read `response.data.data` and `response.data.message`.
 */
export default {
  fetchOnboardings({ state }, queryParams) {

    return new Promise((resolve, reject) => {
      axios.get('onboardings', { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  fetchOnboarding({ state }, { id }) {

    return new Promise((resolve, reject) => {
      axios.get(`onboardings/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  createOnboarding({ state }, { queryParams }) {

    return new Promise((resolve, reject) => {
      axios.post('onboardings', queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  updateOnboarding({ state }, { id, queryParams }) {

    return new Promise((resolve, reject) => {
      axios.patch(`onboardings/${id}`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  publishOnboarding({ state }, { id }) {

    return new Promise((resolve, reject) => {
      axios.post(`onboardings/${id}/publish`)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  activateOnboarding({ state }, { id }) {

    return new Promise((resolve, reject) => {
      axios.post(`onboardings/${id}/activate`)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  disableOnboarding({ state }, { id }) {

    return new Promise((resolve, reject) => {
      axios.post(`onboardings/${id}/disable`)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  deleteOnboarding({ state }, { id }) {

    return new Promise((resolve, reject) => {
      axios.delete(`onboardings/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
