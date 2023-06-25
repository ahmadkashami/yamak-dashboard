<template>
  <div>
    <VDialog
      v-model="isOpenCreateDialog"
      persistent
      width="1024"
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
                  <VTextField
                    v-model="modelObject.name"
                    outlined
                    density="compact"
                    :label="$t('Name')"
                    :placeholder="$t('Name')"
                    :rules="requiredRules"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VPhoneInput
                    v-model="modelObject.phone"
                    :label="$t('Phone')"
                    :placeholder="$t('Phone')"
                    density="compact"
                    :rules="phoneRules"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <CustomAutoSelect
                    v-model="modelObject.services"
                    :label="$t('Services')"
                    service="fetchServices"
                    :multiple="true"
                    :rules="[(v) => v.length>0 || 'Item is required in select']"
                  />
                </VCol>
                <VCol cols="12">
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
                    @file-uploaded="uploadedLogo"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <CustomAutoSelect
                    v-model="modelObject.address.countryId"
                    :label="$t('Country')"
                    service="fetchCountries"
                    :multiple="false"
                    :rules="requiredRules"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  v-if="modelObject.address.countryId"
                >
                  <CustomAutoSelect
                    v-model="modelObject.address.stateId"
                    :label="$t('State')"
                    service="fetchStatesByCountry"
                    :query-params="{countryId:modelObject.address.countryId}"
                    :multiple="false"
                    :rules="requiredRules"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                  v-if="modelObject.address.stateId"
                >
                  <CustomAutoSelect
                    v-model="modelObject.address.cityId"
                    :label="$t('City')"
                    service="fetchCitiesByState"
                    :multiple="false"
                    :query-params="{stateId:modelObject.address.stateId}"
                    :rules="requiredRules"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="modelObject.address.block"
                    outlined
                    density="compact"
                    :label="$t('Block')"
                    :placeholder="$t('Block')"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="modelObject.address.street"
                    outlined
                    density="compact"
                    :label="$t('Street')"
                    :placeholder="$t('Street')"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="modelObject.address.zipCode"
                    outlined
                    density="compact"
                    :label="$t('Zip Code')"
                    :placeholder="$t('Zip Code')"
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
import useBranches from './useBranches'
import { computed, ref } from 'vue'
import { store } from '@/store'
import FileUpload from '@/components/FileUpload.vue'
import uploadFilesService from '@/plugins/uploadFilesService'
import CustomAutoSelect from '@/components/form-inputs/CustomAutoSelect.vue'
import { useRoute } from 'vue-router'
import { VPhoneInput } from 'v-phone-input'
import useValidation from '@/utils/validation'


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
} = useBranches()

const {
  requiredRules,
  phoneRules,
}=useValidation()

const { uploadFile }=uploadFilesService()

const uploadedLogo=currentFile=>{
  uploadFile(currentFile.file).then(response=>{
    modelObject.value.logo=response.data.data.url
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
const route = useRoute()

const onSubmit = () => {
  console.log('hmad',valid.value)
  if (valid.value) {
    loading.value = true
    store.dispatch('createBranch', {
      queryParams: {
        ...modelObject.value,
        companyId: route.params.id,
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
