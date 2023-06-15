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
        <template #[`item.id`]="{item}">
          #{{ item.id }}
        </template>
        <template #[`item.actions`]="{item}">
          <VTooltip
            color="secondary"
            bottom
            text="Tooltip"
          >
            <template       v-slot:activator="{ props }" >
              <VBtn
                v-bind="props"
                icon
                small
                color="primary"
                class="m-19"
                @click.stop.prevent="editItem(item)"
              >
                <VIcon color="red" size="21">
                  mdi-pencil
                </VIcon>
              </VBtn>
            </template>
            <span>{{ $t('Edit') }}</span>
          </VTooltip>
        </template>
      </VDataTable>
      <VDivider />
      <VCardText class="pt-2">
        <VRow>
          <VCol
            lg="2"
            cols="3"
          >
            <VSelect
              v-model="itemsPerPage"
              :items="[5,10,15,20]"
              :label="$t('Rows per page')"
              hide-details
              @change="updateItemsPerPage"
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
              @input="fetchDataList"
            />
          </VCol>
        </VRow>
      </VCardText>
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
      @update-date="fetchDataList"
      v-model:isOpenCreateDialog="isOpenCreateDialog"/>
    <Update
      :item-data="itemData"
      @update-date="fetchDataList"
      v-model="isOpenUpdateDialog"/>
  </div>
</template>

<script setup>
import useUsers from './useUsers'
import Update from '@/views/users/Update.vue'
import Create from '@/views/users/Create.vue'
import { onMounted } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

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

