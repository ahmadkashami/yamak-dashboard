<template>
  <div>
    <VCard id="$$example-list">
      <VCardText class="d-flex align-center flex-wrap pb-0 mb-3">
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
      <v-divider></v-divider>
      <VCardText>
        <v-list v-if="itemData">
          <div class="d-flex mb-3">
            <div>{{ $t('Primary Color') }}:</div>
            <div class="color-view mx-2" :style="{ background: itemData.primaryColor}"></div>
          </div>
          <div class="d-flex my-3">
            <div>{{ $t('Secondary Color') }}:</div>
            <div class="color-view mx-2" :style="{ background: itemData.secondaryColor}"></div>
          </div>
          <div class="d-flex my-3">
            <div>{{ $t('Secondary Background Color') }}:</div>
            <div class="color-view mx-2" :style="{ background: itemData.secondaryBackgroundColor}"></div>
          </div>
          <div class="d-flex my-3">
            <div>{{ $t('Banner') }}:</div>
            <div class="mx-2 mt-2 img-view">
              <v-img :src="itemData.bannerImage" height="200" width="300" cover=""></v-img>
            </div>
          </div>
        </v-list>
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
    <Update
      v-if="itemData"
      v-model:isOpenUpdateDialog="isOpenUpdateDialog"
      :item-data="itemData"
      @update-data="getDataItem"
    />
  </div>
</template>

<script setup>
import useTheme from './useTheme'
import { onMounted, ref } from 'vue'
import Update from '@/views/themes/Update.vue'
import { getTranslations } from '@/libs/i18n/utils'

const {
  isOutlinedSnackbarVisible,
  msgSnackbarVisible,
  isOutlinedSnackbarColor,
  getDataItem,
  isOpenUpdateDialog,
  itemData,
  lang,
} = useTheme()

onMounted(() => {
  getDataItem()
})
</script>
<style>
.color-view {
  background-size: auto 20px;
  block-size: 20px;
  inline-size: 50px;
}

.img-view{
  border: 1px solid var(--yamak-border);
}
</style>
