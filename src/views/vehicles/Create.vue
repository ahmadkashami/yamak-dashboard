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
                <VCol
                  cols="12"
                  md="6"
                  v-if="modelObject.branchId"
                >
                  <CustomAutoSelect
                    v-model="modelObject.services"
                    :label="$t('Services')"
                    service="fetchServicesByBranch"
                    :query-params="{branchId:modelObject.branchId}"
                    :multiple="true"
                    :rules="[(v) => v.length>0 || 'Item is required in select']"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  v-if="modelObject.branchId"
                >
                  <CustomAutoSelect
                    v-model="modelObject.services"
                    :label="$t('Drivers')"
                    service="fetchDriversByBranch"
                    :query-params="{branchId:modelObject.branchId}"
                    :multiple="true"
                    :rules="[(v) => v.length>0 || 'Item is required in select']"
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
                  <VSwitch
                    v-model="modelObject.workStatus"
                    hide-details
                    true-value="online"
                    false-value="offline"
                    :label="`${$t('Work Status')}: ${$t(modelObject.workStatus)}`"
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
import useVehicle from './useVehicle'
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
} = useVehicle()

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

const updatePockedDate = val => {
  modelObject.value.licenseExpiredAt = val
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
      msgSnackbarVisible.value = error.response.data.error
      isOutlinedSnackbarVisible.value = true
      isOutlinedSnackbarColor.value = 'error'
      loading.value = false
    })
  } else {
    validate()
  }
}
</script>
