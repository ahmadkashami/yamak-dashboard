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
                <VCol
                  cols="12"
                  md="6"
                >
                  <CustomAutoSelect
                    v-model="modelObject.companyId"
                    :label="$t('Company')"
                    service="fetchCompanies"
                    :multiple="false"
                    :rules="requiredRules"
                  />
                </VCol>
                <v-col cols="12" md="6">
                  <VTextField
                    v-model="modelObject.domainUrl"
                    outlined
                    density="compact"
                    :label="$t('Domain')"
                    :placeholder="$t('Domain')"
                    :rules="domainValidator"
                  />
                </v-col>
                <v-col cols="12" md="12">
                  <VTextarea
                    v-model="modelObject.aboutUs.ar"
                    :label="$t('About Us Arabic')"
                    type="email"
                    :rules="requiredRules"
                    density="compact"
                  />
                </v-col>
                <v-col cols="12" md="12">
                  <VTextarea
                    v-model="modelObject.aboutUs.en"
                    :label="$t('About Us English')"
                    type="email"
                    :rules="requiredRules"
                    density="compact"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <VTextField
                    v-model="modelObject.contactUs.email"
                    :label="$t('Email')"
                    type="email"
                    :rules="emailRules"
                    density="compact"
                  />
                </v-col>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VPhoneInput
                    v-model="modelObject.contactUs.phone"
                    :label="$t('Phone')"
                    :placeholder="$t('Phone')"
                    density="compact"
                    class="phone-input"
                    :rules="phoneRules"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="12"
                >
                  <VTextarea
                    v-model="modelObject.contactUs.address.ar"
                    :label="$t('Address Arabic')"
                    type="email"
                    :rules="requiredRules"
                    density="compact"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="12"
                >
                  <VTextarea
                    v-model="modelObject.contactUs.address.en"
                    :label="$t('Address English')"
                    type="email"
                    :rules="requiredRules"
                    density="compact"
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
import { mdiClose, mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js'
import useWebsite from './useWebsite'
import { computed, onMounted, ref, watch } from 'vue'
import * as validation from '@/utils/validation'
import { store } from '@/store'
import CustomAutoSelect from '@/components/form-inputs/CustomAutoSelect.vue'
import { VPhoneInput } from 'v-phone-input'
import useValidation from '@/utils/validation'

const props=defineProps({
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
  modelObject
} = useWebsite()

const {
  requiredRules,
  phoneRules,
  emailRules,
  domainValidator,
} = useValidation()
onMounted(() => {
})

const resetData = () => {
  resetForm()
  emit('update:is-open-update-dialog', false)
  loading.value = false
}

const loading = ref(false)

const onSubmit = () => {
  if (valid.value) {
    loading.value = true
    store.dispatch('updateWebsite', {
      id: props.itemData._id,
      queryParams: {
        ...modelObject.value
      },
    }).then(response => {
      if (response) {
        emit('update-data')
        loading.value = false
        msgSnackbarVisible.value = "Updated Successfully"
        isOutlinedSnackbarColor.value = "success"
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
