<script setup>
import WidgetsComponent from '@/views/dashboard-components/WidgetsComponent.vue'
import { onMounted } from 'vue'
import useDashboard from '@/views/dashboard/useDashboard'

const { fetchDataList, widgetsData }=useDashboard()

onMounted(() => {
  fetchDataList()
})
</script>

<template>
  <VRow
    v-if="widgetsData"
    class="match-height"
  >
    <VCol
      v-for="widget in widgetsData"
      cols="12"
      md="3"
      sm="6"
    >
      <WidgetsComponent
        :count="widget.count"
        :title="widget.title"
        :icon="widget.icon"
      />
    </VCol>
  </VRow>
</template>
