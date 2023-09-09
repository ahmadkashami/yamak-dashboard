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
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="modelObject.name"
                    outlined
                    density="compact"
                    :label="$t('Name')"
                    :placeholder="$t('Name')"
                    :rules="requiredRules"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="modelObject.email"
                    :label="$t('Email')"
                    type="email"
                    :rules='emailRules'
                    density="compact"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="modelObject.password"
                    :label="$t('Password')"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    :rules='requiredRules'
                    density="compact"
                  />
                </v-col>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VPhoneInput
                    v-model="modelObject.phoneNum"
                    :label="$t('Phone')"
                    :placeholder="$t('Phone')"
                    density="compact"
                    class="phone-input"
                    :rules="phoneRules"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <CustomAutoSelect
                    v-model="modelObject.branchId"
                    :label="$t('Branch')"
                    service="fetchBranchByCompany"
                    :multiple="false"
                    :query-params="{companyId:route.params.id}"
                    :rules="requiredRules"
                  />
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
                <VCol cols="12" md="6">
                  <h6>License Expired</h6>
                  <VueDatePicker v-model="modelObject.licenseExpiredAt" :format="format"></VueDatePicker>
                </VCol>
                <VCol cols="12">
                  <FileUpload
                    :max-size="1"
                    accept="png"
                    @file-uploaded="uploadedPhoto"
                    label="Photo"
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
              variant="outlined"
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
import useDriver from './useDriver'
import { computed, ref } from 'vue'
import { store } from '@/store'
import FileUpload from '@/components/FileUpload.vue'
import uploadFilesService from '@/plugins/uploadFilesService'
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
} = useDriver()

const {
  requiredRules,
  phoneRules,
  emailRules,
}=useValidation()

const { uploadFile }=uploadFilesService()

const uploadedPhoto=currentFile=>{
  uploadFile(currentFile.file).then(response=>{
    modelObject.value.photo=response.data.data.url
  }).catch(error=>{
    console.log(error)
  })
}


const resetData = () => {
  resetForm()
  emit('update:is-open-create-dialog', false)
  loading.value = false
}

const loading = ref(false)
const isPasswordVisible = ref(false)

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}
const onSubmit = () => {
  if (valid.value) {
    loading.value = true
    store.dispatch('createDriver', {
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
