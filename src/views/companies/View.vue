<template>
  <div>
    <BreadcrumbsComponent :items="itemsBreadcrumbs" :title="$t('Companies')"></BreadcrumbsComponent>
    <VTabs
      v-model="activeTab"
      show-arrows
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>
    <VDivider />

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
    >
      <!-- branches -->
      <VWindowItem value="branches">
        <Branches />
      </VWindowItem>

      <!-- drives -->
      <VWindowItem value="drives">
        <Drivers />
      </VWindowItem>

      <!-- vehicles -->
      <VWindowItem value="vehicles">
        <Vehicles/>
      </VWindowItem>

<!--      &lt;!&ndash; users &ndash;&gt;-->
<!--      <VWindowItem value="users">-->
<!--        <AccountSettingsNotification />-->
<!--      </VWindowItem>-->
    </VWindow>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import AccountSettingsNotification from '@/views/pages/account-settings/AccountSettingsNotification.vue'
import { ref } from 'vue'
import Branches  from '@/views/branches/Index.vue'
import Drivers from '@/views/drivers/Index.vue'
import Vehicles from '@/views/vehicles/Index.vue'



const route = useRoute()
const activeTab = ref(route.params.tab)

import BreadcrumbsComponent from '@/components/BreadcrumbsComponent.vue'
const itemsBreadcrumbs = [
  {
    text: 'Dashboard',
    disabled:false,
    href: '/',
  },
  {
    text: 'Companies',
    disabled: false,
    href: '/companies',
  } ,
  {
    text: 'View',
    disabled: true,
    href: '/',
  }
]
// tabs
const tabs = [
  {
    title: 'branches',
    icon: 'mdi-source-branch',
    tab: 'branches',
  },
  {
    title: 'Drives',
    icon: 'mdi-account-tie',
    tab: 'drives',
  },
  {
    title: 'Vehicles',
    icon: 'mdi-rv-truck',
    tab: 'vehicles',
  }
]
</script>
