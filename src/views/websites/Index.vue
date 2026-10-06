<template>
  <div>
    <BreadcrumbsComponent
      v-if="$route.name !== 'dashboard'"
      :items="itemsBreadcrumbs"
      :title="$t('Websites')"
    />
    <VCard id="$$example-list">
      <VCardText class="d-flex align-center flex-wrap pb-0">
        <div
          v-if="$route.name === 'dashboard'"
          class="d-flex align-center pb-5"
        >
          <h2>{{ $t('Websites') }}</h2>
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
        class="websites-table"
        hide-default-footer
      >
        <template #item.status="{ item }">
          <StatusChip :status="item.status" />
        </template>
        <template #item.company="{ item }">
          <span>{{getTranslations(item.company.name,lang)}}</span>
        </template>
        <template #item.createdAt="{ item }">
          {{ formatDateTime(item.createdAt) }}
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



          <VBtn
            variant="text"
            icon
            @click="$router.push({name:'website-view',params:{websiteId:item._id,companyId:item.companyId,}})"
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
import useWebsite from './useWebsite'
import { onMounted } from 'vue'
import Pagination from '@/components/Pagination.vue'
import StatusChip from '@/components/StatusChip.vue'
import Update from '@/views/websites/Update.vue'
import Create from '@/views/websites/Create.vue'
import { getTranslations } from '@/libs/i18n/utils'
import BreadcrumbsComponent from '@/components/BreadcrumbsComponent.vue'
import { formatDateTime } from '@/utils/date-display'

const itemsBreadcrumbs = [
  {
    text: 'Dashboard',
    disabled: false,
    href: '/',
  },
  {
    text: 'Websites',
    disabled: true,
    href: '/websites',
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
  lang
} = useWebsite()

onMounted(() => {
  fetchDataList()
})
</script>

<style lang="scss">
.websites-table {
  .v-table__wrapper {
    overflow-inline: auto;
  }

  table {
    inline-size: 100%;
    table-layout: fixed;
  }

  .v-data-table__th,
  .v-data-table__td {
    padding-inline: 8px;
  }

  .v-data-table__th:nth-child(1),
  .v-data-table__td:nth-child(1) {
    inline-size: 19%;
  }

  .v-data-table__th:nth-child(2),
  .v-data-table__td:nth-child(2) {
    inline-size: 27%;
  }

  .v-data-table__th:nth-child(3),
  .v-data-table__td:nth-child(3) {
    inline-size: 12%;
  }

  .v-data-table__th:nth-child(4),
  .v-data-table__td:nth-child(4) {
    inline-size: 29%;
  }

  .v-data-table__th:nth-child(5),
  .v-data-table__td:nth-child(5) {
    inline-size: 13%;
  }

  .v-data-table__td:nth-child(2),
  .v-data-table__td:nth-child(4) {
    overflow-wrap: anywhere;
  }

  .v-data-table__td:nth-child(5) {
    white-space: nowrap;
  }
}
</style>
