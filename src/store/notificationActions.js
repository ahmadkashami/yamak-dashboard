import axios from '@/plugins/axios'

export default {

  pushNotificationsTopic({ state }, { queryParams }) {
    return new Promise((resolve, reject) => {
      axios.post(`notifications/topics`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  pushNotificationsUser({ state }, { queryParams }) {
    return new Promise((resolve, reject) => {
      axios.post(`notifications/users`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
