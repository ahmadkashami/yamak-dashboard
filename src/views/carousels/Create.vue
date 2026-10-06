<template>
  <div>
    <VDialog
      v-model="isOpenCreateDialog"
      persistent
      width="1024"
      height="auto"
    >
      <VCard height="100%">
        <div class="drawer-header d-flex align-center ma-4">
          <h2>{{ $t('Create') }}</h2>
          <VSpacer />
          <VBtn
            icon="mdi-close"
            size="small"
            @click="$emit('update:is-open-create-dialog',false)"
          />
        </div>
        <VDivider />
        <VForm
          ref="form"
          v-model="valid"
          @submit.prevent="onSubmit"
        >
          <VCardText>
            <VContainer>
              <VRow>
                <VCol cols="12">
                  <FileUpload
                    :max-size="1"
                    accept="png,jpeg"
                    @file-uploaded="uploadedPhoto"
                    label="Image"
                  />
                </VCol>
              </VRow>
            </VContainer>
          </VCardText>
          <VCardActions>
            <VSpacer />
            <VBtn
              color="primary"
              class="me-3"
              type="submit"
              :loading="loading"
              :disabled="loading"
            >
              {{ $t('Create') }}
            </VBtn>
            <VBtn
              color="secondary"
              variant="outlined"
              type="reset"
              @click="resetData"
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
import useCarousel from './useCarousel'
import { computed, ref } from 'vue'
import { store } from '@/store'
import FileUpload from '@/components/FileUpload.vue'
import useValidation from '@/utils/validation'
import { VPhoneInput } from 'v-phone-input'
import CustomAutoSelect from '@/components/form-inputs/CustomAutoSelect.vue'


const props=defineProps({
  isOpenCreateDialog: {
    type: Boolean,
  },
})

const emit = defineEmits(['update:is-open-create-dialog', 'update-data'])

const isOpenCreateDialog = computed({
  get() {
    return props.isOpenCreateDialog
  },
  set(value) {
    emit('update:is-open-create-dialog', value)
  },
})

const {
  isOutlinedSnackbarVisible,
  msgSnackbarVisible,
  isOutlinedSnackbarColor,
  valid,
  form,
  validate,
  resetForm,
  modelObject,
  route
} = useCarousel()

const {
  requiredRules,
  phoneRules,
  emailRules,
}=useValidation()


const uploadedPhoto=url=>{
  modelObject.value.imageUrl=url

}


const resetData = () => {
  resetForm()
  emit('update:is-open-create-dialog', false)
  loading.value = false
}

const loading = ref(false)
const isPasswordVisible = ref(false)
const onSubmit = () => {
  if (modelObject.value.imageUrl) {
    loading.value = true
    store.dispatch('createWebsiteCarousel', {
      queryParams: {
        ...modelObject.value,
      },
    }).then(response => {
      if (response) {
        emit('update-data')
        loading.value = false
        msgSnackbarVisible.value = 'Added Successfully'
        isOutlinedSnackbarColor.value = 'success'
        isOutlinedSnackbarVisible.value = true
        resetData()
      }
    }).catch(error => {
      msgSnackbarVisible.value = error.message
      isOutlinedSnackbarVisible.value = true
      isOutlinedSnackbarColor.value = 'error'
      loading.value = false
    })
  } else {
    validate()
  }
}
</script>
