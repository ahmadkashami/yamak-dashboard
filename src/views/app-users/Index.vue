<template>
  <div>
    <BreadcrumbsComponent
      v-if="!hiddenBreadcrumbs"
      :items="itemsBreadcrumbs"
      :title="$t('App Users')"
    />

    <VCard id="$$example-list">
      <VCardText class="d-flex align-center flex-wrap pb-0">
        <div class="d-flex align-center  pb-5">
          <h2>{{ $t('App Users') }}</h2>
        </div>
        <VSpacer />
        <div class="d-flex align-center pb-5" />
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
          <StatusChip :status="item.raw.status" />
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
import useAppUsers from './useAppUsers'
import { onMounted } from 'vue'
import { VDataTable } from 'vuetify/labs/components'
import Pagination from '@/components/Pagination.vue'
import StatusChip from '@/components/StatusChip.vue'
import BreadcrumbsComponent from '@/components/BreadcrumbsComponent.vue'

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
    text: 'App Users',
    disabled: true,
    href: '/app-users',
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
} = useAppUsers()

onMounted(() => {
  fetchDataList()
})
</script>

