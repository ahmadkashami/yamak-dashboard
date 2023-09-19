<template>
  <div>
    <VCard id="$$example-list">
      <VCardText class="d-flex align-center flex-wrap pb-0">
        <div class="d-flex align-center  pb-5">
          <h2>{{ $t('Users') }}</h2>
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
            @click="editItem(item.raw)"
          >
            mdi-pencil
          </VIcon>
        </template>
        <template #item.type="{ item }">
          <VChip>{{ item.raw.type }}</VChip>
        </template>
        <template #item.role="{ item }">
          <VChip>{{ item.raw.role }}</VChip>
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
import useUsers from './useUsers'
import Update from '@/views/users/Update.vue'
import Create from '@/views/users/Create.vue'
import { onMounted } from 'vue'
import { VDataTable } from 'vuetify/labs/components'
import Pagination from '@/components/Pagination.vue'
import StatusChip from '@/components/StatusChip.vue'

const {
  tableColumns,
  loading,
  options,
  pageInfo,
  currentPage,
  itemsPerPage,
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
} = useUsers()

onMounted(() => {
  fetchDataList()
})
</script>

