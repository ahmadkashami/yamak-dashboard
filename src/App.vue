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

const DefaultLayout = defineAsyncComponent(
  () => import('@/layouts/default.vue'),
)

const BlankLayout = defineAsyncComponent(
  () => import('@/layouts/blank.vue'),
)

const resolveLayout = computed(() => {
  // Handles initial route
  if (route.value.name === null)
    return null

  return route.value.meta.layout === 'blank'
    ? BlankLayout
    : DefaultLayout
})
</script>
