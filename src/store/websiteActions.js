import axios from '@/plugins/axios'

export default {
  fetchWebsites({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`websites`, { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  createWebsite({ state }, { queryParams }) {
    return new Promise((resolve, reject) => {
      axios.post(`websites`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  updateWebsite({ state }, { id, queryParams }) {
    return new Promise((resolve, reject) => {
      axios.put(`websites/${id}`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  //*********************************************************************
  fetchWebsitesFeatures({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`website-features`, { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  createWebsiteFeature({ state }, { queryParams }) {
    return new Promise((resolve, reject) => {
      axios.post(`website-features`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  updateWebsiteFeature({ state }, { id, queryParams }) {
    return new Promise((resolve, reject) => {
      axios.put(`website-features/${id}`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  //*********************************************************************
  fetchWebsiteSliders({ state }, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`website-sliders`, { params: queryParams })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  createWebsiteSlider({ state }, { queryParams }) {
    return new Promise((resolve, reject) => {
      axios.post(`website-sliders`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  updateWebsiteSlider({ state }, { id, queryParams }) {
    return new Promise((resolve, reject) => {
      axios.put(`website-sliders/${id}`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
