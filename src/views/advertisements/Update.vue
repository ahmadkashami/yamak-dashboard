<template>
  <div>
    <VDialog
      v-model="isOpenUpdateDialog"
      persistent
      width="1024"
    >
      <VCard height="100%">
        <div class="drawer-header d-flex align-center ma-4">
          <h2>{{ $t('Update') }}</h2>
          <VSpacer />
          <VBtn
            icon="mdi-close"
            size="small"
            @click="$emit('update:is-open-update-dialog',false)"
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
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="modelObject.title"
                    outlined
                    :label="$t('Title')"
                    :placeholder="$t('Title')"
                    :rules="requiredRules"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="modelObject.link"
                    outlined
                    :label="$t('Link')"
                    :placeholder="$t('Link')"
                  />
                </v-col>
                <VCol cols="12" md="6">
                  <h6>{{ $t('Started At') }}</h6>
                  <VueDatePicker v-model="modelObject.startedAt" :formats="{ input: format }" :week-start="1"></VueDatePicker>
                </VCol>
                <VCol cols="12" md="6">
                  <h6>{{ $t('Expired At') }}</h6>
                  <VueDatePicker v-model="modelObject.expiredAt" :formats="{ input: format }" :week-start="1"></VueDatePicker>
                </VCol>
                <VCol cols="12" md="6">
                  <VSwitch
                    v-model="modelObject.status"
                    hide-details
                    true-value="active"
                    false-value="inactive"
                    :label="`${$t('Status')}: ${$t(modelObject.status)}`"
                  />
                </VCol>
                <VCol cols="12">
                  <FileUpload
                    :max-size="1"
                    accept="png"
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
              {{ $t('Update') }}
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
import useAds from './useAds'
import { computed, onMounted, ref, watch } from 'vue'
import { store } from '@/store'
import FileUpload from '@/components/FileUpload.vue'
import useValidation from '@/utils/validation'


const props = defineProps({
  isOpenUpdateDialog: {
    type: Boolean,
  },
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
  name,
  resetForm,
  modelObject,
} = useAds()


const resetData = () => {
  resetForm()
  emit('update:is-open-update-dialog', false)
  loading.value = false
}

const loading = ref(false)

const {
  requiredRules,
  urlValidator
} = useValidation()



const uploadedPhoto = url => {
    modelObject.value.photo = url
}

const format = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${year}-${month}-${day}`
}
const onSubmit = () => {
  if (valid.value) {
    loading.value = true
    store.dispatch('updateAds', {
      id: props.itemData._id,
      queryParams: {
        ...modelObject.value,
      },
    }).then(response => {
      if (response) {
        emit('update-data')
        loading.value = false
        msgSnackbarVisible.value = 'Updated Successfully'
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

watch(
  () => (props.isOpenUpdateDialog),
  () => {
    modelObject.value= JSON.parse(JSON.stringify(props.itemData))
  },
)
</script>
