<script setup>
import WidgetsComponent from '@/views/dashboard-components/WidgetsComponent.vue'
import { onMounted, ref } from 'vue'
import useDashboard from '@/views/dashboard/useDashboard'

import Companies from "@/views/companies/Index.vue"
import Websites  from "@/views/websites/Index.vue"
import Drivers from "@/views/drivers/Index.vue"
import Services from "@/views/services/Index.vue"
import AppUsers from "@/views/app-users/Index.vue"
import Vehicles from "@/views/vehicles/Index.vue"
import Branches from "@/views/branches/Index.vue"

const { fetchDataList, widgetsData }=useDashboard()

onMounted(() => {
  fetchDataList()
})

const clickedWidget=ref(null)

const clickWidget=item=>{
  clickedWidget.value=item
}

widgetsData.value=[
  {
    title: "Companies",
  },
  {
    title: "Websites",
  },
  {
    title: "Drivers",
  },
  {
    title: "Services",
  },
  {
    title: "App Users",
  },
  {
    title: "Vehicles",
  },
  {
    title: "Branches",
  },
]
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
        @click="clickWidget(widget.title)"
      />
    </VCol>
    <VCol cols="12">
      <Companies
        v-if="clickedWidget==='Companies'"
        hidden-breadcrumbs
      />
      <Websites v-if="clickedWidget==='Websites'" />
      <Drivers v-if="clickedWidget==='Drivers'" />
      <Services
        v-if="clickedWidget==='Services'"
        hidden-breadcrumbs
      />
      <AppUsers
        v-if="clickedWidget==='App Users'"
        hidden-breadcrumbs
      />
      <Vehicles v-if="clickedWidget==='Vehicles'" />
      <Branches v-if="clickedWidget==='Branches'" />
    </VCol>
  </VRow>
</template>
