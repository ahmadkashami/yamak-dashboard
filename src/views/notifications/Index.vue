<template>
  <div>
    <BreadcrumbsComponent
      :items="itemsBreadcrumbs"
      :title="$t('Notifications')"
    />
    <VCard id="$$example-list">
      <VCardText class="d-flex align-center justify-center flex-wrap">
          <VBtn
            color="primary"
            class="ma-3"
            @click="isOpenPushToUser=!isOpenPushToUser"
          >
            <VIcon
              size="18"
              class="me-1"
            >
              mdi-plus
            </VIcon>
            <span>{{ $t('Push To User') }}</span>
          </VBtn>
          <VBtn
            color="primary"
            class="ma-3"
            @click="isOpenPushByTopic=!isOpenPushByTopic"
          >
            <VIcon
              size="18"
              class="me-1"
            >
              mdi-plus
            </VIcon>
            <span>{{ $t('Push By Topic') }}</span>
          </VBtn>
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
    <PushToUser v-model:isOpenCreateDialog="isOpenPushToUser" />
    <PushByTopic v-model:isOpenCreateDialog="isOpenPushByTopic" />
  </div>
</template>

<script setup>
import useNotification from './useNotification'
import PushToUser from '@/views/notifications/PushToUser.vue'
import PushByTopic from '@/views/notifications/PushByTopic.vue'
import BreadcrumbsComponent from '@/components/BreadcrumbsComponent.vue'

const itemsBreadcrumbs = [
  {
    text: 'Dashboard',
    disabled: false,
    href: '/',
  },
  {
    text: 'Notifications',
    disabled: true,
    href: '/notifications',
  },
]

const {
  isOpenPushToUser,
  isOpenPushByTopic,
  isOutlinedSnackbarColor,
  isOutlinedSnackbarVisible,
  msgSnackbarVisible,
  lang,
} = useNotification()
</script>
