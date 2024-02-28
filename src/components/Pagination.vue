<template>
  <VRow class="border-t mt-2">
    <VCol
      cols="12"
      md="3"
    >
      <VSelect
        v-model="itemsPerPage"
        :items="[1,5,10,15,20,30,40,50,100]"
        :label="$t('Rows per page')"
        hide-details
        class="ma-2 item-per-page"
        density="compact"
        @update:model-value="$emit('updateItemsPerPage',itemsPerPage)"
      />
    </VCol>
    <VCol
      cols="12"
      md="2"
    />
    <VCol
      cols="12"
      md="7"
      class="d-flex justify-end"
    >
      <VPagination
        class="my-4"
        v-model="currentPageLocal"
        :length="pageInfo.totalPages"
        rounded="circle"
        @update:model-value="updateCurrentPage"
      />
    </VCol>
  </VRow>
</template>

<script setup>
import { ref, watch } from 'vue'

const props=defineProps({
  // eslint-disable-next-line vue/require-prop-types
  currentPage: { required: true },
  // eslint-disable-next-line vue/require-prop-types
  pageInfo: { required: true },
})

const emit=defineEmits(['updateCurrentPage', 'updateItemsPerPage'])
const itemsPerPage = ref(10)
const currentPageLocal = ref(10)

// eslint-disable-next-line vue/no-setup-props-destructure
currentPageLocal.value = props.currentPage

const updateCurrentPage = () => {
  emit('updateCurrentPage', currentPageLocal.value)
}

watch(
  ()=> props.currentPage,
  ()=>{
    currentPageLocal.value=  props.currentPage
  },
)
</script>

<style>
.item-per-page {
  max-width: 130px;
}
</style>
