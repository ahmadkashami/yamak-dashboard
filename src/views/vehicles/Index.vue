<template>
  <div>
    <VCard id="$$example-list">
      <VCardText class="d-flex align-center flex-wrap pb-0">
        <div class="d-flex align-center  pb-5">
          <h2>{{ $t('Companies') }}</h2>
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
        <template v-slot:item.name="{ item }">
          <span>{{getTranslations(item.raw.name)}}</span>
        </template>
        <template v-slot:item.status="{ item }">
         <StatusChip :status="item.raw.status"/>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon
            size="small"
            class="me-2"
            @click="editItem(item.raw)"
          >
            mdi-pencil
          </v-icon>
        </template>

        <template v-slot:bottom>
          <pagination
            :page-info="pageInfo"
            :current-page="currentPage"
            @update-current-page="updateCurrentPage"
            @update-items-per-page="updateItemsPerPage"
          ></pagination>
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
      @update-data="fetchDataList"
      v-model:isOpenCreateDialog="isOpenCreateDialog"/>
    <Update
      :itemData="itemData"
      @update-data="fetchDataList"
      v-model:isOpenUpdateDialog="isOpenUpdateDialog"/>
  </div>
</template>

<script setup>
import useServices from './useServices'
import { onMounted } from 'vue'
import { VDataTable } from 'vuetify/labs/components'
import Pagination from '@/components/Pagination.vue'
import { getTranslations } from '@/libs/i18n/utils'
import StatusChip from '@/components/StatusChip.vue'
import Update from '@/views/services/Update.vue'
import Create from '@/views/services/Create.vue'

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
  updateCurrentPage
} = useServices()

onMounted(() => {
  fetchDataList()
})


</script>

