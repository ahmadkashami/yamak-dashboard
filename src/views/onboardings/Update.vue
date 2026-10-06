<template>
  <div>
    <VDialog
      :key="dialogKey"
      v-model="isOpenUpdateDialog"
      persistent
      width="1024"
    >
      <VCard>
        <div class="drawer-header d-flex align-center ma-4">
          <h2>{{ $t('Edit Onboarding') }}</h2>
          <VSpacer />
          <VBtn
            icon="mdi-close"
            size="small"
            @click="closeDialog"
          />
        </div>
        <VDivider />
        <VForm
          ref="form"
          v-model="valid"
          @submit.prevent="onSubmit"
        >
          <VCardText class="onboarding-dialog-body">
            <VAlert
              v-if="isReadOnly"
              type="warning"
              variant="tonal"
              class="mb-4"
            >
              {{ $t('Only draft onboarding can be edited') }}
            </VAlert>

            <VProgressLinear
              v-if="isDetailLoading"
              indeterminate
              class="mb-4"
            />

            <VContainer v-if="!isReadOnly && !isDetailLoading">
              <VRow>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSwitch
                    v-model="modelObject.is_skippable"
                    hide-details
                    :label="$t('Skippable')"
                  />
                </VCol>
              </VRow>

              <div
                v-for="(slide, index) in modelObject.slides"
                :key="slide.id ?? index"
                class="mb-4"
              >
                <VCard variant="outlined">
                  <VCardText>
                    <div class="d-flex align-center mb-3">
                      <h6 class="text-medium-emphasis">
                        {{ $t('Slide') }} {{ index + 1 }}
                      </h6>
                      <VSpacer />
                      <VBtn
                        icon="mdi-arrow-up"
                        size="small"
                        variant="text"
                        :disabled="!canMoveUp(index)"
                        @click="() => moveSlide(index, -1)"
                      >
                        <VTooltip
                          activator="parent"
                          location="top"
                        >
                          {{ $t('Move Up') }}
                        </VTooltip>
                      </VBtn>
                      <VBtn
                        icon="mdi-arrow-down"
                        size="small"
                        variant="text"
                        :disabled="!canMoveDown(index)"
                        @click="() => moveSlide(index, 1)"
                      >
                        <VTooltip
                          activator="parent"
                          location="top"
                        >
                          {{ $t('Move Down') }}
                        </VTooltip>
                      </VBtn>
                      <VBtn
                        icon="mdi-delete-empty-outline"
                        size="small"
                        variant="text"
                        color="error"
                        :disabled="!canRemoveSlide"
                        @click="() => removeSlide(index)"
                      >
                        <VTooltip
                          activator="parent"
                          location="top"
                        >
                          {{ $t('Remove Slide') }}
                        </VTooltip>
                      </VBtn>
                    </div>

                    <VRow>
                      <VCol
                        cols="12"
                        md="3"
                      >
                        <VTextField
                          v-model="slide.sort_order"
                          type="number"
                          min="1"
                          outlined
                          density="compact"
                          :label="$t('Order')"
                          :rules="positiveOrderRules"
                        />
                      </VCol>
                      <VCol
                        cols="12"
                        md="9"
                      >
                        <VTextField
                          v-model="slide.title_en"
                          outlined
                          density="compact"
                          :label="$t('Title (EN)')"
                          :placeholder="$t('Title (EN)')"
                          :rules="requiredTitleRules"
                        />
                      </VCol>
                      <VCol
                        cols="12"
                        md="6"
                      >
                        <VTextField
                          v-model="slide.title_ar"
                          outlined
                          density="compact"
                          :label="$t('Title (AR)')"
                          :placeholder="$t('Title (AR)')"
                        />
                      </VCol>
                      <VCol
                        cols="12"
                        md="6"
                      >
                        <VTextarea
                          v-model="slide.description_en"
                          outlined
                          density="compact"
                          :label="$t('Description (EN)')"
                          :placeholder="$t('Description (EN)')"
                        />
                      </VCol>
                      <VCol
                        cols="12"
                        md="6"
                      >
                        <VTextarea
                          v-model="slide.description_ar"
                          outlined
                          density="compact"
                          :label="$t('Description (AR)')"
                          :placeholder="$t('Description (AR)')"
                        />
                      </VCol>
                      <VCol cols="12">
                        <!--
                          FileUpload cannot be pre-filled, so the stored image is shown as a
                          thumbnail beside it. Leaving the uploader untouched omits `image`
                          from the payload, which preserves the current image server-side.
                        -->
                        <div
                          v-if="slide.image_url"
                          class="d-flex align-center flex-wrap mb-2"
                        >
                          <VImg
                            :src="slide.image_url"
                            height="90"
                            class="me-4"
                          />
                          <span class="text-caption text-medium-emphasis">
                            {{ $t('Change Image') }}
                          </span>
                        </div>
                        <FileUpload
                          :key="`slide-image-${slide.id ?? index}`"
                          :max-size="1"
                          accept="png,jpg,jpeg"
                          :label="$t('Image')"
                          @file-uploaded="slideImageHandlers[index]"
                        />
                      </VCol>
                    </VRow>
                  </VCardText>
                </VCard>
              </div>

              <VBtn
                color="primary"
                variant="outlined"
                prepend-icon="mdi-plus"
                @click="addSlide"
              >
                {{ $t('Add Slide') }}
              </VBtn>
            </VContainer>
          </VCardText>
          <VDivider />
          <VCardActions>
            <VSpacer />
            <VBtn
              v-if="!isReadOnly && !isDetailLoading"
              color="primary"
              class="me-3"
              type="submit"
              :loading="loading"
              :disabled="loading"
              variant="outlined"
            >
              {{ $t('Update') }}
            </VBtn>
            <VBtn
              color="secondary"
              variant="outlined"
              type="reset"
              @click="closeDialog"
            >
              {{ $t('Cancel') }}
            </VBtn>
          </VCardActions>
        </VForm>
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
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { store } from '@/store'

import useOnboardings from './useOnboardings'
import FileUpload from '@/components/FileUpload.vue'

const props = defineProps({
  isOpenUpdateDialog: {
    type: Boolean,
  },
  // eslint-disable-next-line vue/require-prop-types
  itemData: {
    required: true,
  },
})

const emit = defineEmits(['update-data', 'update:is-open-update-dialog'])

const isOpenUpdateDialog = computed({
  get() {
    return props.isOpenUpdateDialog
  },
  set(value) {
    emit('update:is-open-update-dialog', value)
  },
})

const {
  isOutlinedSnackbarVisible,
  msgSnackbarVisible,
  isOutlinedSnackbarColor,
  valid,
  form,
  validate,
  modelObject,
  resetFormModel,
  detail,
  isDetailLoading,
  fetchDetail,
  resetDetail,
  fillFormFromDetail,
  buildPayload,
  addSlide,
  removeSlide,
  moveSlide,
  canMoveUp,
  canMoveDown,
  canRemoveSlide,
  slideImageHandlers,
  positiveOrderRules,
  requiredTitleRules,
  showMessage,
  showError,
  showSuccess,
  validateSlides,
  messages,
} = useOnboardings()

const loading = ref(false)

// Remounts the dialog subtree on every open so FileUpload drops its internal
// preview state before the draft detail is loaded into the form.
const dialogKey = ref(0)

const closeDialog = () => {
  loading.value = false
  isOpenUpdateDialog.value = false
}

// Published versions are immutable, so the dialog renders read-only instead of a form.
const isReadOnly = computed(() => detail.value !== null && detail.value.status !== 'draft')

watch(
  () => props.isOpenUpdateDialog,
  value => {
    if (!value) {
      resetDetail()
      resetFormModel()

      return
    }

    dialogKey.value += 1
    resetDetail()
    resetFormModel()
    valid.value = false
    loading.value = false

    fetchDetail(props.itemData?.id)
  },
)

watch(detail, value => {
  if (value) {
    fillFormFromDetail(value)
  }
})

const onSubmit = () => {
  if (!valid.value) {
    validate()

    return
  }

  const slidesError = validateSlides()

  if (slidesError) {
    showMessage(slidesError, 'error')

    return
  }

  loading.value = true

  store.dispatch('updateOnboarding', {
    id: props.itemData?.id,
    queryParams: buildPayload(),
  })
    .then(response => {
      emit('update-data')
      showSuccess(response.data.message || messages.updatedSuccessfully)
      resetDetail()
      closeDialog()
    }).catch(error => {
      loading.value = false
      showError(error)
    })
}
</script>

<style scoped>
/* Caps the scrollable slide area so the header and action bar stay reachable
   with many slides inside a 1024px dialog. */
.onboarding-dialog-body {
  max-height: 70vh;
  overflow-y: auto;
}
</style>
