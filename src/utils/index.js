
// Thanks: https://medium.com/better-programming/reactive-vue-routes-with-the-composition-api-18c1abd878d1
import { getCurrentInstance, reactive, toRefs, watch } from 'vue'

export const useRouter = () => {
  const vm = getCurrentInstance().proxy

  const state = reactive({
    route: vm.$route,
  })

  watch(
    () => vm.$route,
    r => {
      state.route = r
    },
  )

  return { ...toRefs(state), router: vm.$router }
}

export const _ = null

export const isEmpty = value => {
  if (value === null || value === undefined || value === '') {
    return true
  }
}
