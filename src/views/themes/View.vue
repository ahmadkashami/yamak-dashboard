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
            @click="isOpenUpdateDialog=!isOpenUpdateDialog"
          >
            <VIcon
              size="18"
              class="me-1"
            >
              mdi-plus
            </VIcon>
            <span>{{ $t('Update') }}</span>
          </VBtn>
        </div>
      </VCardText>
      <VCardText>Theme</VCardText>
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
    <Update
      v-model:isOpenUpdateDialog="isOpenUpdateDialog"
      :item-data="itemData"
      @update-data="getDataItem"
    />
  </div>
</template>

<script setup>
import useTheme from './useTheme'
import { onMounted } from 'vue'
import Update from '@/views/features/Update.vue'
import { getTranslations } from '@/libs/i18n/utils'

const {
  isOutlinedSnackbarVisible,
  msgSnackbarVisible,
  isOutlinedSnackbarColor,
  getDataItem,
  isOpenUpdateDialog,
  itemData,
  lang
} = useTheme()

onMounted(() => {
  getDataItem()
})
</script>

