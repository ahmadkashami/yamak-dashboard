<template>
      <div>
        <v-dialog
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
              >
              </VBtn>
            </div>
            <VDivider />
            <VForm
              ref="form"
              v-model="valid"
              @submit.prevent="onSubmit"
            >
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <VTextField
                      v-model="companyObject.name.en"
                      outlined
                      dense
                      :label="$t('English Name')"
                      :placeholder="$t('English Name')"
                      :rules="requiredRules"
                    />
                  </v-col>
                  <v-col cols="12">
                    <VTextField
                      v-model="companyObject.name.ar"
                      outlined
                      dense
                      :label="$t('Arabic Name')"
                      :placeholder="$t('Arabic Name')"
                      :rules="requiredRules"
                    />
                  </v-col>
                  <v-col cols="12">
                    <VTextField
                      v-model="companyObject.email"
                      label="Email"
                      type="email"
                      :rules='emailRules'
                    />
                  </v-col>
                  <v-col cols="12">
                    <VTextField
                      v-model="companyObject.phone"
                      outlined
                      dense
                      :label="$t('Phone')"
                      :placeholder="$t('Phone')"
                      :rules="requiredRules"
                    />
                  </v-col>
                  <v-col cols="12">
                    <FileUpload :maxSize="1" accept="png" @file-uploaded="uploadedLogo" />
                  </v-col>
                  <v-col cols="12">
                    <VTextField
                      v-model="companyObject.address"
                      outlined
                      dense
                      :label="$t('Address')"
                      :placeholder="$t('Address')"
                      :rules="requiredRules"
                    />
                  </v-col>
                  <v-col cols="12">
                    <VTextField
                      v-model="companyObject.description"
                      outlined
                      dense
                      :label="$t('Description')"
                      :placeholder="$t('Description')"
                      :rules="requiredRules"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
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
            </v-card-actions>
            </VForm>
          </VCard>
        </v-dialog>
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
import useCompanies from './useCompanies'
import { computed, ref } from 'vue'
import { store } from '@/store'
import FileUpload from '@/components/FileUpload.vue'
import uploadFilesService from '@/plugins/uploadFilesService'


const props=defineProps({
  isOpenCreateDialog: {
    type: Boolean,
  },
})

const emit = defineEmits(['update:is-open-create-dialog','update-data'])

const isOpenCreateDialog = computed({
  get() {
    return props.isOpenCreateDialog;
  },
  set(value) {
    emit('update:is-open-create-dialog', value);
  },
});

const {
  isOutlinedSnackbarVisible,
  msgSnackbarVisible,
  isOutlinedSnackbarColor,
  valid,
  form,
  validate,
  resetForm,
  companyObject,
  emailRules,
  requiredRules
} = useCompanies()

const {uploadFile}=uploadFilesService()
const uploadedLogo=(currentFile)=>{
  uploadFile(currentFile.file).then(response=>{
    companyObject.value.logo=response.data.data.url
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
const isPasswordVisible=ref(false)

const onSubmit = () => {
  if (valid.value) {
    loading.value = true
    store.dispatch('createCompany', {
      queryParams: {
        ...companyObject.value
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
