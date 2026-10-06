<template>
  <div>
    <BreadcrumbsComponent
      v-if="!hiddenBreadcrumbs"
      :items="itemsBreadcrumbs"
      :title="$t('Companies')"
    />
    <VCard id="$$example-list">
      <VCardText class="d-flex align-center flex-wrap pb-0">
        <div
          v-if="hiddenBreadcrumbs"
          class="d-flex align-center pb-5"
        >
          <h2>
            {{ $t('Companies') }}
          </h2>
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
        <template #item.name="{ item }">
          <span>{{ getTranslations(item.name,lang) }}</span>
        </template>
        <template #item.status="{ item }">
          <StatusChip :status="item.status" />
        </template>


        <template #item.actions="{ item }">
          <VBtn
            variant="text"
            icon
            @click="$router.push({name:'company-view',params:{id:item._id}})"
          >
            <VIcon size="small">
              mdi-eye
            </VIcon>
            <VTooltip
              activator="parent"
              location="top"
            >
              View
            </VTooltip>
          </VBtn>
          <VBtn
            variant="text"
            icon
            color="secondary"
            @click="editItem(item)"
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
import useCompanies from './useCompanies'
import { onMounted } from 'vue'

import Pagination from '@/components/Pagination.vue'
import Update from '@/views/companies/Update.vue'
import Create from '@/views/companies/Create.vue'
import { getTranslations } from '@/libs/i18n/utils'
import StatusChip from '@/components/StatusChip.vue'
import { useLocale } from 'vuetify'
import BreadcrumbsComponent from '@/components/BreadcrumbsComponent.vue'

const props=defineProps({
  hiddenBreadcrumbs: {
    type: Boolean,
  },
})

const { current } = useLocale()
const lang=current.value

const itemsBreadcrumbs = [
  {
    text: 'Dashboard',
    disabled: false,
    href: '/',
  },
  {
    text: 'companies',
    disabled: true,
    href: '/companies',
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
} = useCompanies()

onMounted(() => {
  fetchDataList()
})
</script>
