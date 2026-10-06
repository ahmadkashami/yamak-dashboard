<template>
  <div>
    <BreadcrumbsComponent
      v-if="!hiddenBreadcrumbs"
      :items="itemsBreadcrumbs"
      :title="$t('App Requests')"
    />

    <VCard id="$$example-list">
      <VCardText
        v-if="hiddenBreadcrumbs"
        class="pb-0"
      >
        <h2>{{ $t('App Requests') }}</h2>
      </VCardText>
      <!-- table -->
      <VDataTable
        :items-per-page="options.itemsPerPage"
        :headers="tableColumns"
        :items="dataList"
        :loading="loading"
        class="text-no-wrap"
        hide-default-footer
      >
        <template #item.status="{ item }">
          <StatusChip :status="item.status" />
        </template>
        <template #item.lastLogin="{ item }">
          {{ formatDateTime(item.lastLogin) }}
        </template>
        <template #item.createdAt="{ item }">
          {{ formatDateTime(item.createdAt) }}
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
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import useAppRequest from './useAppRequest'

import BreadcrumbsComponent from '@/components/BreadcrumbsComponent.vue'
import Pagination from '@/components/Pagination.vue'
import StatusChip from '@/components/StatusChip.vue'
import { formatDateTime } from '@/utils/date-display'

const props=defineProps({
  hiddenBreadcrumbs: {
    type: Boolean,
  },
})

const itemsBreadcrumbs = [
  {
    text: 'Dashboard',
    disabled: false,
    href: '/',
  },
  {
    text: 'App Requests',
    disabled: true,
    href: '/app-requests',
  },
]

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
} = useAppRequest()

onMounted(() => {
  fetchDataList()
})
</script>
