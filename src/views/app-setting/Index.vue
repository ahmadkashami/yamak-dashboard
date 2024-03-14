<template>
  <div>
    <BreadcrumbsComponent :items="itemsBreadcrumbs" :title="$t('Services')"></BreadcrumbsComponent>
    <VCard id="$$example-list">
      <VCardText class="d-flex align-center flex-wrap pb-0">
        <div class="d-flex align-center  pb-5">
          <h2>{{ $t('App Setting') }}</h2>
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

        <template #item.actions="{ item }">
          <VIcon
            size="small"
            class="me-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </VIcon>
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
import useAppSetting from './useAppSetting'
import { onMounted } from 'vue'

import Pagination from '@/components/Pagination.vue'
import Update from '@/views/app-setting/Update.vue'
import Create from '@/views/app-setting/Create.vue'
import BreadcrumbsComponent from '@/components/BreadcrumbsComponent.vue'
const itemsBreadcrumbs = [
  {
    text: 'Dashboard',
    disabled:false,
    href: '/',
  },
  {
    text: 'App Setting',
    disabled: true,
    href: '/app-setting',
  }
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
  lang
} = useAppSetting()

onMounted(() => {
  fetchDataList()
})

</script>

