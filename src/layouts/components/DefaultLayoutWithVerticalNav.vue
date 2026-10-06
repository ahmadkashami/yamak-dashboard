<script setup>
import upgradeBannerDark from '@images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@images/pro/upgrade-banner-light.png'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import { useTheme } from 'vuetify'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import { canViewVerticalNavMenuLink } from '@/libs/acl/utils'

const vuetifyTheme = useTheme()

const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
})
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="mdi-menu" />
        </IconBtn>



        <VSpacer />



        <IconBtn class="me-2">
          <VIcon icon="mdi-bell-outline" />
        </IconBtn>

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink
        v-if="canViewVerticalNavMenuLink({action:'read',subject:'Dashboard'})"
        :item="{
          title: 'Dashboard',
          icon: 'mdi-home-outline',
          to: '/dashboard',
        }"
      />
      <VerticalNavLink
        v-if="canViewVerticalNavMenuLink({action:'read',subject:'Users'})"
        :item="{
          title: 'Users',
          icon: 'mdi-account-group',
          to: '/users',
        }"
      />
      <VerticalNavLink
        v-if="canViewVerticalNavMenuLink({action:'read',subject:'Companies'})"
        :item="{
          title: 'Companies',
          icon: 'mdi-office-building',
          to: '/companies',
        }"
      />
      <VerticalNavLink
        v-if="canViewVerticalNavMenuLink({action:'read',subject:'Services'})"
        :item="{
          title: 'Services',
          icon: 'mdi-toolbox-outline',
          to: '/services',
        }"
      />
      <VerticalNavLink
        v-if="canViewVerticalNavMenuLink({action:'read',subject:'AppUsers'})"
        :item="{
          title: 'App Users',
          icon: 'mdi-account-multiple-check-outline',
          to: '/app-users',
        }"
      />
      <VerticalNavLink
        v-if="canViewVerticalNavMenuLink({action:'read',subject:'AppRequests'})"
        :item="{
          title: 'App Requests',
          icon: 'mdi-account-multiple-check-outline',
          to: '/app-requests',
        }"
      />
      <VerticalNavLink
        v-if="canViewVerticalNavMenuLink({action:'read',subject:'Ads'})"
        :item="{
          title: 'Ads',
          icon: 'mdi-google-ads',
          to: '/ads',
        }"
      />
      <VerticalNavLink
        v-if="canViewVerticalNavMenuLink({action:'read',subject:'Onboarding'})"
        :item="{
          title: 'Onboarding',
          icon: 'mdi-rocket-launch-outline',
          to: '/onboardings',
        }"
      />
      <VerticalNavLink
        v-if="canViewVerticalNavMenuLink({action:'read',subject:'AppSetting'})"
        :item="{
          title: 'App Setting',
          icon: 'mdi-cog',
          to: '/app-setting',
        }"
      />
      <VerticalNavLink
        v-if="canViewVerticalNavMenuLink({action:'read',subject:'Websites'})"
        :item="{
          title: 'Websites',
          icon: 'mdi-web',
          to: '/websites',
        }"
      />
      <VerticalNavLink
        v-if="canViewVerticalNavMenuLink({action:'read',subject:'Notifications'})"
        :item="{
          title: 'Notifications',
          icon: 'mdi-bell-cog-outline',
          to: '/notifications',
        }"
      />
    </template>
    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
