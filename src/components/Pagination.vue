<template>
    <v-row class="border-t mt-2">
      <v-col  cols="12" md="3">
        <v-select
          :items="[1,5,10,15,20,30,40,50,100]"
          v-model="itemsPerPage"
          :label="$t('Rows per page')"
          hide-details
          @update:model-value="$emit('update-items-per-page',itemsPerPage)"
          class="ma-2 item-per-page"
          density="compact"
        ></v-select>
      </v-col>
      <v-col  cols="12" md="2" ></v-col>
      <v-col  cols="12"  md="7" class="d-flex justify-end">
        <v-pagination
          v-model="currentPageLocal"
          :length="pageInfo.totalPages"
          @update:model-value="updateCurrentPage"
        ></v-pagination>
      </v-col>
    </v-row>
</template>

<script setup>
import { ref, watch } from 'vue'

const props=defineProps({
  currentPage: {required: true},
  pageInfo: {required: true},
})
  const emit=defineEmits(['update-current-page','update-items-per-page'])
    const itemsPerPage = ref(10)
    const currentPageLocal = ref(10)
    currentPageLocal.value = props.currentPage
    const updateCurrentPage = () => {
      emit('update-current-page', currentPageLocal)
    }
    watch(
      ()=> props.currentPage,
      ()=>{
        currentPageLocal.value=  props.currentPage
      }
    )

</script>

<style>
.item-per-page {
  max-width: 130px;
}
</style>
