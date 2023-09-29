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
      <!-- features -->
      <VWindowItem value="features">
        <Features />
      </VWindowItem>

      <!-- sliders -->
      <VWindowItem value="sliders">
        <Sliders/>
      </VWindowItem>

      <!-- Theme -->
      <VWindowItem value="theme">
        <Theme/>
      </VWindowItem>


    </VWindow>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import Features from '@/views/features/Index.vue'
import Sliders from '@/views/sliders/Index.vue'
import Theme from '@/views/themes/View.vue'


const route = useRoute()
const activeTab = ref(route.params.tab)

import BreadcrumbsComponent from '@/components/BreadcrumbsComponent.vue'

const itemsBreadcrumbs = [
  {
    text: 'Dashboard',
    disabled: false,
    href: '/',
  },
  {
    text: 'Websites',
    disabled: false,
    href: '/websites',
  },
  {
    text: 'View',
    disabled: true,
    href: '/',
  },
]
// tabs
const tabs = [
  {
    title: 'Features',
    icon: 'mdi-star-circle-outline',
    tab: 'features',
  },
  {
    title: 'Sliders',
    icon: 'mdi-view-carousel-outline',
    tab: 'sliders',
  },
  {
    title: 'Theme',
    icon: 'mdi-view-carousel-outline',
    tab: 'theme',
  },
]
</script>
