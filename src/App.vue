<template>
  <VApp>
    <Component :is="resolveLayout">
      <RouterView />
    </Component>
  </VApp>
</template>

<script setup>
import { useRouter } from '@/utils'
import { computed, defineAsyncComponent } from 'vue'

const { route } = useRouter()
const resolveLayout = computed(() => {

  // Handles initial route
  if (route.value.name === null) return null
  if (route.value.meta.layout === 'blank') return defineAsyncComponent(() => import('@/layouts/blank.vue'))
  
  return defineAsyncComponent(() => import('@/layouts/default.vue'))
})
</script>
