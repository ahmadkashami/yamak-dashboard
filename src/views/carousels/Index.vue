<template>
  <div>
    <VCard id="$$example-list">
      <VCardText class="d-flex align-center flex-wrap pb-0">
        <div class="d-flex align-center  ">
        </div>
        <VSpacer />
        <div class="d-flex align-center ">
          <VBtn
            color="primary"
            class="me-3"
            @click="isOpenCreateDialog=!isOpenCreateDialog"
          >
            <VIcon
              size="18"
              class="me-1"
            >
              mdi-plus
            </VIcon>
            <span>{{ $t('Create') }}</span>
          </VBtn>
        </div>
      </VCardText>
      <!-- table -->
      <VDataTable
        v-model:options="options"
        :headers="tableColumns"
        :items="dataList"
        :loading="loading"
        class="text-no-wrap"
        hide-default-footer
      >


        <template #item.imageUrl="{ item }">
          <v-img :src="item.imageUrl" height="75" class="pa-2"></v-img>
        </template>

        <template #item.actions="{ item }">
          <VBtn
            variant="text"
            icon
            color="error"
            @click="deleteItem(item)"
          >
            <VIcon size="small">
              mdi-delete-empty-outline
            </VIcon>
            <VTooltip
              activator="parent"
              location="top"
            >
              Delete
            </VTooltip>
          </VBtn>
        </template>

        <template #bottom>
          <Pagination
            :page-info="pageInfo"
            :current-page="currentPage"
            @update-current-page="updateCurrentPage"
            @update-items-per-page="updateItemsPerPage"
          />
        </template>
      </VDataTable>
    </VCard>
    <VSnackbar
      v-model="isOutlinedSnackbarVisible"
      value
      :color="isOutlinedSnackbarColor"
      bottom
      rounded="pill"
      top
    >
      {{ msgSnackbarVisible }}
    </VSnackbar>
    <Create
      v-model:isOpenCreateDialog="isOpenCreateDialog"
      @update-data="fetchDataList"
    />
    <DeleteComponent
      v-model:isOpenDeleteDialog="isOpenDeleteDialog"
      service="deleteWebsiteCarousel"
      :query-params="{id:itemData._id}"
      @update-data="fetchDataList"
    ></DeleteComponent>
  </div>
</template>

<script setup>
import useCarousel from './useCarousel'
import { onMounted } from 'vue'

import Pagination from '@/components/Pagination.vue'
import Create from '@/views/carousels/Create.vue'
import DeleteComponent from '@/components/DeleteComponent.vue'

const {
  tableColumns,
  loading,
  options,
  pageInfo,
  currentPage,
  isOutlinedSnackbarVisible,
  msgSnackbarVisible,
  isOutlinedSnackbarColor,
  fetchDataList,
  dataList,
  isOpenCreateDialog,
  isOpenUpdateDialog,
  editItem,
  itemData,
  updateItemsPerPage,
  updateCurrentPage,
  lang,
  isOpenDeleteDialog,
  deleteItem
} = useCarousel()

onMounted(() => {
  fetchDataList()
})
</script>

