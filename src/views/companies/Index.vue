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
          <span>{{getTranslations(item.raw.name,lang)}}</span>
        </template>
        <template v-slot:item.status="{ item }">
         <StatusChip :status="item.raw.status"/>
        </template>


        <template v-slot:item.actions="{ item }">
          <v-btn
            @click="$router.push({name:'company-view',params:{id:item.raw._id}})"
            variant="text"
            icon
          >
            <v-icon size="small">mdi-eye</v-icon>
            <v-tooltip
              activator="parent"
              location="top"
            >View</v-tooltip>
          </v-btn>
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
import useCompanies from './useCompanies'
import { onMounted } from 'vue'
import { VDataTable } from 'vuetify/labs/components'
import Pagination from '@/components/Pagination.vue'
import Update from '@/views/companies/Update.vue'
import Create from '@/views/companies/Create.vue'
import { getTranslations } from '@/libs/i18n/utils'
import StatusChip from '@/components/StatusChip.vue'
import { useLocale } from 'vuetify'
const { current } = useLocale()
const lang=current.value
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
} = useCompanies()
onMounted(() => {
  fetchDataList()
})


</script>

