<template>
  <div>
    <VCard id="$$example-list">
      <VCardText class="d-flex align-center flex-wrap pb-0">
        <div class="d-flex align-center pb-5">
          <h2>{{ $t('Onboarding') }}</h2>
        </div>
        <VSpacer />
        <div class="d-flex align-center pb-5">
          <VBtn
            color="primary"
            class="me-3"
            @click="onCreateClick"
          >
            <VIcon
              size="18"
              class="me-1"
            >
              mdi-plus
            </VIcon>
            <span>{{ $t('Create Onboarding') }}</span>
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
        <template #item.status="{ item }">
          <StatusChip
            :status="item.status === 'published' ? $t('Published') : $t('Draft')"
            :color="item.status === 'published' ? 'success' : 'warning'"
          />
        </template>

        <template #item.isActive="{ item }">
          <StatusChip
            :status="item.isActive ? $t('Active') : $t('Inactive')"
            :color="item.isActive ? 'success' : 'info'"
          />
        </template>

        <template #item.isSkippable="{ item }">
          <StatusChip
            :status="item.isSkippable ? $t('Skippable') : $t('Non-Skippable')"
            :color="item.isSkippable ? 'success' : 'info'"
          />
        </template>

        <template #item.actions="{ item }">
          <!-- Published versions are immutable: only lifecycle actions remain. -->
          <template v-if="isDraft(item)">
            <VBtn
              variant="text"
              icon
              color="secondary"
              @click="() => editItem(item)"
            >
              <VIcon size="small">
                mdi-pencil
              </VIcon>
              <VTooltip
                activator="parent"
                location="top"
              >
                {{ $t('Edit') }}
              </VTooltip>
            </VBtn>
            <VBtn
              variant="text"
              icon
              color="success"
              @click="() => askPublish(item)"
            >
              <VIcon size="small">
                mdi-publish
              </VIcon>
              <VTooltip
                activator="parent"
                location="top"
              >
                {{ $t('Publish') }}
              </VTooltip>
            </VBtn>
            <VBtn
              variant="text"
              icon
              color="error"
              @click="() => deleteItem(item)"
            >
              <VIcon size="small">
                mdi-delete-empty-outline
              </VIcon>
              <VTooltip
                activator="parent"
                location="top"
              >
                {{ $t('Delete') }}
              </VTooltip>
            </VBtn>
          </template>
          <template v-else>
            <VBtn
              variant="text"
              icon
              color="info"
              :to="`/onboardings/${item.id}`"
            >
              <VIcon size="small">
                mdi-eye-outline
              </VIcon>
              <VTooltip
                activator="parent"
                location="top"
              >
                {{ $t('View Onboarding') }}
              </VTooltip>
            </VBtn>
            <VBtn
              v-if="isPublishedInactive(item)"
              variant="text"
              icon
              color="success"
              @click="() => askActivate(item)"
            >
              <VIcon size="small">
                mdi-play-circle-outline
              </VIcon>
              <VTooltip
                activator="parent"
                location="top"
              >
                {{ $t('Activate') }}
              </VTooltip>
            </VBtn>
            <VBtn
              v-if="isPublishedActive(item)"
              variant="text"
              icon
              color="warning"
              @click="() => askDisable(item)"
            >
              <VIcon size="small">
                mdi-pause-circle-outline
              </VIcon>
              <VTooltip
                activator="parent"
                location="top"
              >
                {{ $t('Disable') }}
              </VTooltip>
            </VBtn>
          </template>
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

    <!-- shared lifecycle confirmation: publish / activate / disable -->
    <VDialog
      v-model="isOpenConfirmDialog"
      width="500"
      persistent
    >
      <VCard>
        <VCardTitle>{{ $t(confirmTitleKey) }}</VCardTitle>
        <VCardText>{{ $t(confirmMessageKey) }}</VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            color="secondary"
            outlined
            @click="closeConfirmDialog"
          >
            {{ $t('Cancel') }}
          </VBtn>
          <VBtn
            color="primary"
            :loading="isConfirming"
            :disabled="isConfirming"
            @click="confirmPendingAction"
          >
            OK
          </VBtn>
          <VSpacer />
        </VCardActions>
      </VCard>
    </VDialog>

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
      v-model:is-open-create-dialog="isOpenCreateDialog"
      @update-data="fetchDataList"
    />
    <Update
      v-model:is-open-update-dialog="isOpenUpdateDialog"
      :item-data="itemData"
      @update-data="fetchDataList"
    />
    <DeleteComponent
      v-model:is-open-delete-dialog="isOpenDeleteDialog"
      service="deleteOnboarding"
      :query-params="{ id: itemData?.id }"
      @update-data="fetchDataList"
    />
  </div>
</template>

<script setup>
import useOnboardings from './useOnboardings'
import { onMounted } from 'vue'

import DeleteComponent from '@/components/DeleteComponent.vue'
import Pagination from '@/components/Pagination.vue'
import StatusChip from '@/components/StatusChip.vue'
import Update from '@/views/onboardings/Update.vue'
import Create from '@/views/onboardings/Create.vue'

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
  isOpenDeleteDialog,
  itemData,
  isOpenConfirmDialog,
  confirmTitleKey,
  confirmMessageKey,
  isConfirming,
  confirmPendingAction,
  closeConfirmDialog,
  openConfirmDialog,
  editItem,
  deleteItem,
  isDraft,
  isPublishedActive,
  isPublishedInactive,
  updateItemsPerPage,
  updateCurrentPage,
} = useOnboardings()

const onCreateClick = () => {
  isOpenCreateDialog.value = !isOpenCreateDialog.value
}

const askPublish = item => {
  openConfirmDialog(
    'publish',
    item,
    'Publish',
    'After publishing, this version can no longer be edited. To change the content later, create a new version.',
  )
}

const askActivate = item => {
  openConfirmDialog(
    'activate',
    item,
    'Activate',
    'Activating this version will deactivate the currently active onboarding.',
  )
}

const askDisable = item => {
  openConfirmDialog(
    'disable',
    item,
    'Disable',
    'Users will stop seeing this onboarding. The published version will remain available for future reactivation.',
  )
}

onMounted(() => {
  fetchDataList()
})
</script>
