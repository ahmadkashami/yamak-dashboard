<template>
  <div>
    <h4 class="pl-1 text-uppercase font-weight-bold">{{ title }}</h4>
    <v-breadcrumbs class="mb-3 pl-1" :items="items">
      <template v-slot:title="{ item }">
        <v-breadcrumbs-item
          :href="item.href"
          :disabled="item.disabled"
          class="pl-0"
        >
          <span class="text-uppercase text-subtitle-2 font-weight-bold">  {{ item.text }}</span>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: "BreadcrumbsComponent",
  props: {
    title: {
      required: true
    },
    items: {
      required: true
    }
  }
}
</script>
