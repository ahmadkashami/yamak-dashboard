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
        <template #item.title="{ item }">
          {{ getTranslations(item.raw.title, lang) }}
        </template>
        <template #item.subTitle="{ item }">
          {{ getTranslations(item.raw.subTitle, lang) }}
        </template>
        <template #item.status="{ item }">
          <StatusChip :status="item.raw.status" />
        </template>
        <template #item.branch="{ item }">
          <span>{{ getTranslations(item.raw.branch.name, lang) }}</span>
        </template>

        <template #item.actions="{ item }">
          <VIcon
            size="small"
            class="me-2"
            @click="editItem(item.raw)"
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
import useSlider from './useSlider'
import { onMounted } from 'vue'
import { VDataTable } from 'vuetify/labs/components'
import Pagination from '@/components/Pagination.vue'
import StatusChip from '@/components/StatusChip.vue'
import Update from '@/views/sliders/Update.vue'
import Create from '@/views/sliders/Create.vue'
import { getTranslations } from '@/libs/i18n/utils'

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
} = useSlider()

onMounted(() => {
  fetchDataList()
})
</script>

