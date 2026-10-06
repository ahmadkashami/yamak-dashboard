<template>
  <div>
    <VDialog
      :key="dialogKey"
      v-model="isOpenCreateDialog"
      persistent
      width="1024"
    >
      <VCard>
        <div class="drawer-header d-flex align-center ma-4">
          <h2>{{ $t('Create Onboarding') }}</h2>
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
            <VContainer>
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
                :key="index"
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
                        <FileUpload
                          :key="`slide-image-${index}`"
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
              color="primary"
              class="me-3"
              type="submit"
              :loading="loading"
              :disabled="loading"
              variant="outlined"
            >
              {{ $t('Save Draft') }}
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
  isOpenCreateDialog: {
    type: Boolean,
  },
})

const emit = defineEmits(['update:is-open-create-dialog', 'update-data'])

const {
  isOutlinedSnackbarVisible,
  msgSnackbarVisible,
  isOutlinedSnackbarColor,
  valid,
  form,
  validate,
  modelObject,
  resetFormModel,
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

const isOpenCreateDialog = computed({
  get() {
    return props.isOpenCreateDialog
  },
  set(value) {
    emit('update:is-open-create-dialog', value)
  },
})

const loading = ref(false)

// Remounts the dialog subtree on every open so FileUpload drops its internal
// preview state; otherwise a previously uploaded image would still be shown
// next to an empty form.
const dialogKey = ref(0)

const closeDialog = () => {
  loading.value = false
  isOpenCreateDialog.value = false
}

// A fresh form per open, so a previous draft never leaks into the next one.
watch(
  () => props.isOpenCreateDialog,
  value => {
    if (value) {
      dialogKey.value += 1
      resetFormModel()
      valid.value = false
      loading.value = false
    }
  },
)

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

  store.dispatch('createOnboarding', { queryParams: buildPayload() })
    .then(response => {
      emit('update-data')
      showSuccess(response.data.message || messages.createdSuccessfully)
      resetFormModel()
      closeDialog()
    }).catch(error => {
      // The submit button must never stay stuck when the backend rejects the payload.
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
