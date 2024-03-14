<template>
  <div>
    <VCard id="$$example-list">
      <VCardText class="d-flex align-center flex-wrap pb-0">
        <div class="d-flex align-center  pb-5">
          <h2>{{ $t('Branches') }}</h2>
        </div>
        <VSpacer />
        <div class="d-flex align-center pb-5">
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
        <template #item.status="{ item }">
          <StatusChip :status="item.status" />
        </template>
        <template #item.actions="{ item }">
          <VBtn
            variant="text"
            icon
            @click="editItem(item)"
            color="secondary"
          >
            <VIcon size="small">
              mdi-pencil
            </VIcon>
            <VTooltip
              activator="parent"
              location="top"
            >
              Edit
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
    <Update
      v-model:isOpenUpdateDialog="isOpenUpdateDialog"
      :item-data="itemData"
      @update-data="fetchDataList"
    />
  </div>
</template>

<script setup>
import useBranches from './useBranches'
import { onMounted } from 'vue'

import Pagination from '@/components/Pagination.vue'
import StatusChip from '@/components/StatusChip.vue'
import Update from '@/views/branches/Update.vue'
import Create from '@/views/branches/Create.vue'

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
} = useBranches()

onMounted(() => {
  fetchDataList()
})
</script>

