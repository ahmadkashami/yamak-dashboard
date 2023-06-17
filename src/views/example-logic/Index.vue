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
          <VRow class="border-t mt-2">
            <VCol
              lg="2"
              cols="3"
            >
              <VSelect
                v-model="itemsPerPage"
                :items="[5,10,15,20]"
                :label="$t('Rows per page')"
                hide-details
                @update:model-value="updateItemsPerPage"
                class="ma-2"
                density="compact"
              />
            </VCol>
            <VCol
              lg="10"
              cols="9"
              class="d-flex justify-end"
            >
              <VPagination
                v-model="currentPage"
                :length="pageInfo.totalPages"
                @update:model-value="fetchDataList"
              />
            </VCol>
          </VRow>
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
import useUsers from './useUsers'
import Update from '@/views/users/Update.vue'
import Create from '@/views/users/Create.vue'
import { onMounted } from 'vue'
import { VDataTable } from 'vuetify/labs/components'

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
} = useUsers()

onMounted(() => {
  fetchDataList()
})

const updateItemsPerPage = event => {
  currentPage.value = 1
  itemsPerPage.value = parseInt(event)
  options.value.itemsPerPage = itemsPerPage.value
  fetchDataList()
}
</script>

