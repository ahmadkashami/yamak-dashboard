<script setup>
import VerticalNavSectionTitle from '@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
<div>
  <VerticalNavLink
    :item="{
          title: 'Account Settings',
          icon: 'mdi-account-cog-outline',
          to: '/account-settings',
        }"
  />

  <!-- 👉 Pages -->
  <VerticalNavSectionTitle
    :item="{
          heading: 'Pages',
        }"
  />
  <VerticalNavLink
    :item="{
          title: 'Login',
          icon: 'mdi-login',
          to: '/login',
        }"
  />
  <VerticalNavLink
    :item="{
          title: 'Register',
          icon: 'mdi-account-plus-outline',
          to: '/register',
        }"
  />
  <VerticalNavLink
    :item="{
          title: 'Error',
          icon: 'mdi-information-outline',
          to: '/no-existence',
        }"
  />

  <!-- 👉 User Interface -->
  <VerticalNavSectionTitle
    :item="{
          heading: 'User Interface',
        }"
  />
  <VerticalNavLink
    :item="{
          title: 'Typography',
          icon: 'mdi-alpha-t-box-outline',
          to: '/typography',
        }"
  />
  <VerticalNavLink
    :item="{
          title: 'Icons',
          icon: 'mdi-eye-outline',
          to: '/icons',
        }"
  />
  <VerticalNavLink
    :item="{
          title: 'Cards',
          icon: 'mdi-credit-card-outline',
          to: '/cards',
        }"
  />
  <VerticalNavLink
    :item="{
          title: 'Tables',
          icon: 'mdi-table',
          to: '/tables',
        }"
  />
  <VerticalNavLink
    :item="{
          title: 'Form Layouts',
          icon: 'mdi-form-select',
          to: '/form-layouts',
        }"
  />
</div>
</template>

<style scoped lang="scss">

</style>
