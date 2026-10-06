<template>
  <main class="login-page">
    <VCard
      class="login-shell"
      elevation="0"
    >
      <section
        class="brand-panel"
        aria-label="Welcome to Yamak"
      >
        <div class="brand-top">
          <div class="brand-logo">
            <VImg
              :src="logo"
              alt="Yamak"
              width="132"
              height="100"
            />
          </div>
        </div>

        <div class="brand-copy">
          <p class="brand-eyebrow">
            Simple <span aria-hidden="true">•</span> Trusted <span aria-hidden="true">•</span> Direct
          </p>
          <h2>Welcome back<br>to Yamak.</h2>
          <p class="brand-description">
            Sign in to continue managing your Yamak experience through a cleaner, faster and more focused interface.
          </p>
        </div>

        <div
          class="trust-list"
          aria-label="Yamak benefits"
        >
          <span>100% Free Facilitator</span>
          <span>No Commission</span>
          <span>Pay Driver Directly</span>
        </div>
      </section>

      <section
        class="login-panel"
        aria-labelledby="login-heading"
      >
        <div class="login-wrap">
          <div class="mobile-brand-logo">
            <VImg
              :src="logo"
              alt="Yamak"
              width="120"
              height="92"
            />
          </div>

          <p class="welcome-kicker">
            Welcome back
          </p>
          <h1
            id="login-heading"
            class="login-heading"
          >
            Sign in to Yamak
          </h1>
          <p class="login-subtitle">
            Enter your account details to continue.
          </p>

          <VForm
            ref="loginForm"
            class="login-form"
            @submit.prevent="handleFormSubmit"
          >
            <VTextField
              v-model="email"
              label="Email address"
              type="email"
              autocomplete="username"
              prepend-inner-icon="mdi-email-outline"
              :rules="emailRules"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
            />

            <VTextField
              v-model="password"
              label="Password"
              autocomplete="current-password"
              :type="isPasswordVisible ? 'text' : 'password'"
              :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              :rules="requiredRules"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
              @click:append-inner="togglePasswordVisibility"
            />

            <VAlert
              v-model="isOutlinedSnackbarVisible"
              color="error"
              variant="tonal"
              density="compact"
              class="login-error"
            >
              Oops, your email or password is incorrect.
            </VAlert>

            <VBtn
              block
              type="submit"
              color="primary"
              class="login-button"
            >
              Login
            </VBtn>
          </VForm>

          <div class="security-note">
            <span
              class="security-dot"
              aria-hidden="true"
            />
            Secure sign-in experience
          </div>
        </div>
      </section>
    </VCard>
  </main>
</template>

<script setup>
import logo from '@images/logo.png'
import { getCurrentInstance, ref } from 'vue'
import permissions from '@/plugins/acl/permissions'
import router from '@/router'
import axios from '@/plugins/axios'
import useValidation from '@/utils/validation'

const isPasswordVisible = ref(false)
const vm = getCurrentInstance().proxy
const email = ref(null)
const password = ref(null)
const loginForm = ref(null)
const errorMessages = ref([])
const isOutlinedSnackbarVisible = ref(false)

const {
  requiredRules,
  emailRules,
} = useValidation()

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const handleFormSubmit = async () => {
  const { valid } = await loginForm.value.validate()

  if (!valid) return

  try {
    const response = await axios.post('auth/login', { email: email.value, password: password.value })

    localStorage.setItem('accessToken', response.data.data.accessToken)
    localStorage.setItem('userData', JSON.stringify(response.data.data))

    const userAbility = permissions

    vm.$ability.update(userAbility)
    localStorage.setItem('userAbility', JSON.stringify(userAbility))

    const profileResponse = await axios.get('sys-users/profile')

    localStorage.setItem('userData', JSON.stringify(profileResponse.data.data))
    vm.$ability.update(userAbility)
    localStorage.setItem('userAbility', JSON.stringify(userAbility))
    router.push('/dashboard')
  } catch (error) {
    isOutlinedSnackbarVisible.value = true
    errorMessages.value = error.response.data.error
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  min-block-size: 100vh;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 3vw, 32px);
  background:
    radial-gradient(circle at 10% 10%, rgba(var(--v-theme-primary), 0.12), transparent 24%),
    radial-gradient(circle at 88% 82%, rgba(var(--v-theme-primary), 0.09), transparent 22%),
    rgb(var(--v-theme-background));
}

.login-shell {
  display: grid;
  inline-size: min(1010px, 100%);
  min-block-size: min(615px, calc(100vh - 64px));
  grid-template-columns: 1.05fr 0.95fr;
  overflow: hidden;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  border-radius: 28px;
  background: rgb(var(--v-theme-surface));
  box-shadow: 0 28px 80px rgba(var(--v-theme-on-surface), 0.12);
}

.brand-panel {
  position: relative;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(32px, 5vw, 58px);
  background: linear-gradient(145deg, #ffbe42 0%, #f6a90d 56%, #ee9800 100%);
  color: #17120a;
}

.brand-panel::before,
.brand-panel::after {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 50%;
  content: "";
  pointer-events: none;
}

.brand-panel::before {
  inline-size: 300px;
  block-size: 300px;
  inset-block-start: -135px;
  inset-inline-end: -115px;
}

.brand-panel::after {
  inline-size: 230px;
  block-size: 230px;
  inset-block-end: -130px;
  inset-inline-start: -115px;
}

.brand-top,
.brand-copy,
.trust-list {
  position: relative;
  z-index: 1;
}

.brand-logo,
.mobile-brand-logo {
  display: grid;
  inline-size: 156px;
  min-block-size: 132px;
  place-items: center;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 12px 30px rgba(90, 53, 0, 0.12);
}

.brand-copy {
  max-inline-size: 470px;
  margin-block: 34px;
}

.brand-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-block: 0 18px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.58);
  color: #4c2f00;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.brand-copy h2 {
  margin: 0 0 16px;
  font-size: clamp(38px, 4vw, 52px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.04;
}

.brand-description {
  max-inline-size: 430px;
  margin: 0;
  color: #553400;
  font-size: 16px;
  line-height: 1.65;
}

.trust-list {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  color: #4c2f00;
  font-size: 11px;
  font-weight: 800;
}

.trust-list span {
  padding: 9px 11px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.48);
}

.login-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(36px, 6vw, 72px);
  background: rgb(var(--v-theme-surface));
}

.login-wrap {
  inline-size: min(420px, 100%);
}

.mobile-brand-logo {
  display: none;
}

.welcome-kicker {
  margin: 0 0 10px;
  color: #9a5f00;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.login-heading {
  margin: 0 0 8px;
  color: rgb(var(--v-theme-on-surface));
  font-size: clamp(30px, 3vw, 36px);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.login-subtitle {
  margin: 0 0 30px;
  color: rgba(var(--v-theme-on-surface), 0.62);
  font-size: 14px;
  line-height: 1.6;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.login-form :deep(.v-field) {
  border-radius: 12px;
}

.login-error {
  margin-block-start: -4px;
}

.login-button {
  min-block-size: 50px;
  border-radius: 12px;
  font-weight: 800;
  letter-spacing: 0.01em;
}

.security-note {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-block-start: 24px;
  padding-block-start: 18px;
  border-block-start: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  color: rgba(var(--v-theme-on-surface), 0.62);
  font-size: 12px;
}

.security-dot {
  inline-size: 8px;
  block-size: 8px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #177245;
  box-shadow: 0 0 0 4px rgba(23, 114, 69, 0.1);
}

@media (max-width: 900px) {
  .login-page {
    padding: 18px;
  }

  .login-shell {
    inline-size: min(560px, 100%);
    min-block-size: auto;
    grid-template-columns: 1fr;
  }

  .brand-panel {
    display: none;
  }

  .login-panel {
    padding: 42px 30px;
  }

  .mobile-brand-logo {
    display: grid;
    inline-size: 144px;
    min-block-size: 112px;
    margin: 0 auto 32px;
  }
}

@media (max-width: 420px) {
  .login-page {
    padding: 12px;
  }

  .login-panel {
    padding: 32px 22px;
  }
}
</style>
