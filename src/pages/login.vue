<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          Materio
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Welcome to Materio! 👋🏻
        </h5>
        <p class="mb-0">
          Please sign-in to your account and start the adventure
        </p>
      </VCardText>

      <VCardText>
        <VForm
          ref="loginForm"
          @submit.prevent="handleFormSubmit"
        >
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="email"
                label="Email"
                type="email"
                :rules='emailRules'
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="password"
                label="Password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                :rules='requiredRules'
              />

              <VAlert
                v-model='isOutlinedSnackbarVisible'
                right
                top
                outlined
                color='error'
                class='mt-2'
              >
                Oops,Your password or email is incorrect!
              </VAlert>
              <!-- login button -->
              <VBtn
                block
                type="submit"
                class="mt-5"
              >
                Login
              </VBtn>
            </VCol>

            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />


  </div>
</template>

<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import logo from '@images/logo.svg?raw'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import { getCurrentInstance, ref } from 'vue'
import permissions from '@/plugins/acl/permissions'
import router from '@/router'
import axios from '@/plugins/axios'

const isPasswordVisible = ref(false)
const vm = getCurrentInstance().proxy
const email = ref('test@mail.com')
const password = ref('123456')
const loginForm = ref(null)
const errorMessages = ref([])
const isOutlinedSnackbarVisible = ref(false)

const emailRules= [
  v => !!v || 'E-mail is required',
  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]

const requiredRules= [v => !!v || 'Item is required']

const handleFormSubmit = () => {
  const isFormValid = loginForm.value.validate()

  if (!isFormValid) return
  axios.post('auth/login', { email: email.value, password: password.value })
    .then(response => {
      localStorage.setItem('accessToken', response.data.data.accessToken)

      return response
    })
    .then(() => {
      axios.get('sys-users/profile').then(response => {
        localStorage.setItem('userData', JSON.stringify(response.data.data))

        const userAbility = permissions

        vm.$ability.update(userAbility)
        localStorage.setItem('userAbility', JSON.stringify(userAbility))

        router.push('/dashboard')
      })
    })
    .catch(error => {
      isOutlinedSnackbarVisible.value = true
      errorMessages.value = error.response.data.error
    })
}
</script>
<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>
