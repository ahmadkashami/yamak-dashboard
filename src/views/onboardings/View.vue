<template>
  <div>
    <BreadcrumbsComponent
      :items="itemsBreadcrumbs"
      :title="$t('View Onboarding')"
    />

    <VProgressLinear
      v-if="isDetailLoading"
      indeterminate
    />

    <VAlert
      v-if="isDraftDetail"
      type="warning"
      variant="tonal"
      class="mb-4"
    >
      {{ $t('Draft') }}
    </VAlert>

    <VCard
      v-if="detail"
      class="mb-4"
    >
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            md="2"
          >
            <div class="text-caption text-medium-emphasis">
              {{ $t('Version') }}
            </div>
            <div class="text-body-1 font-weight-medium">
              {{ detail.version }}
            </div>
          </VCol>
          <VCol
            cols="12"
            md="2"
          >
            <div class="text-caption text-medium-emphasis">
              {{ $t('Status') }}
            </div>
            <StatusChip
              :status="detail.status === 'published' ? $t('Published') : $t('Draft')"
              :color="detail.status === 'published' ? 'success' : 'warning'"
            />
          </VCol>
          <VCol
            cols="12"
            md="2"
          >
            <div class="text-caption text-medium-emphasis">
              {{ $t('Active') }}
            </div>
            <StatusChip
              :status="detail.isActive ? $t('Active') : $t('Inactive')"
              :color="detail.isActive ? 'success' : 'info'"
            />
          </VCol>
          <VCol
            cols="12"
            md="2"
          >
            <div class="text-caption text-medium-emphasis">
              {{ $t('Skippable') }}
            </div>
            <StatusChip
              :status="detail.isSkippable ? $t('Skippable') : $t('Non-Skippable')"
              :color="detail.isSkippable ? 'success' : 'info'"
            />
          </VCol>
          <VCol
            cols="12"
            md="3"
          >
            <div class="text-caption text-medium-emphasis">
              {{ $t('Created') }}
            </div>
            <div class="text-body-2">
              {{ detail.createdAt }}
            </div>
          </VCol>
          <VCol
            cols="12"
            md="1"
          >
            <div class="text-caption text-medium-emphasis">
              {{ $t('Updated') }}
            </div>
            <div class="text-body-2">
              {{ detail.updatedAt }}
            </div>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VCard v-if="detail">
      <VCardText>
        <h5 class="mb-4">
          {{ $t('Slides') }}
        </h5>

        <VCard
          v-for="slide in detail.slides"
          :key="slide.id"
          variant="outlined"
          class="mb-4"
        >
          <VCardText>
            <VRow>
              <VCol
                cols="12"
                md="3"
              >
                <VImg
                  v-if="slide.imageUrl"
                  :src="slide.imageUrl"
                  height="110"
                />
                <div
                  v-else
                  class="text-caption text-medium-emphasis"
                >
                  {{ $t('Image') }}: —
                </div>
              </VCol>
              <VCol
                cols="12"
                md="9"
              >
                <VRow>
                  <VCol
                    cols="12"
                    md="2"
                  >
                    <div class="text-caption text-medium-emphasis">
                      {{ $t('Order') }}
                    </div>
                    <div class="text-body-1 font-weight-medium">
                      {{ slide.order }}
                    </div>
                  </VCol>
                  <VCol
                    cols="12"
                    md="5"
                  >
                    <div class="text-caption text-medium-emphasis">
                      {{ $t('Title (EN)') }}
                    </div>
                    <div class="text-body-2">
                      {{ slide.titleEn }}
                    </div>
                  </VCol>
                  <VCol
                    cols="12"
                    md="5"
                  >
                    <div class="text-caption text-medium-emphasis">
                      {{ $t('Title (AR)') }}
                    </div>
                    <div class="text-body-2">
                      {{ slide.titleAr }}
                    </div>
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <div class="text-caption text-medium-emphasis">
                      {{ $t('Description (EN)') }}
                    </div>
                    <div class="text-body-2">
                      {{ slide.descriptionEn }}
                    </div>
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <div class="text-caption text-medium-emphasis">
                      {{ $t('Description (AR)') }}
                    </div>
                    <div class="text-body-2">
                      {{ slide.descriptionAr }}
                    </div>
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
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
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import useOnboardings from './useOnboardings'
import BreadcrumbsComponent from '@/components/BreadcrumbsComponent.vue'
import StatusChip from '@/components/StatusChip.vue'

const route = useRoute()

const {
  detail,
  isDetailLoading,
  isDraftDetail,
  fetchDetail,
  resetDetail,
  isOutlinedSnackbarVisible,
  msgSnackbarVisible,
  isOutlinedSnackbarColor,
} = useOnboardings()

const itemsBreadcrumbs = [
  {
    text: 'Dashboard',
    disabled: false,
    href: '/',
  },
  {
    text: 'Onboarding',
    disabled: false,
    href: '/onboardings',
  },
  {
    text: 'View',
    disabled: true,
    href: '/onboardings',
  },
]

onMounted(() => {
  resetDetail()
  fetchDetail(route.params.id)
})
</script>
