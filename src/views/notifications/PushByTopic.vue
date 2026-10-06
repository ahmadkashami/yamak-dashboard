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
          <h2>{{ $t('Push notifications By topic') }}</h2>
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
                  md="12"
                >
                  <VTextField
                    v-model="modelObject.notification.title"
                    outlined
                    :label="$t('Title')"
                    :placeholder="$t('Title')"
                    :rules="requiredRules"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="12"
                >
                  <VTextarea
                    v-model="modelObject.notification.body"
                    outlined
                    :label="$t('Body')"
                    :placeholder="$t('body')"
                    :rules="requiredRules"
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
import useNotification from './useNotification'
import { computed, ref } from 'vue'
import { store } from '@/store'
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
  route,
} = useNotification()

const {
  requiredRules,
  phoneRules,
  emailRules,
}=useValidation()



const resetData = () => {
  resetForm()
  emit('update:is-open-create-dialog', false)
  loading.value = false
}

const loading = ref(false)
const isPasswordVisible = ref(false)

const onSubmit = () => {
  if (valid.value) {
    loading.value = true
    store.dispatch('pushNotificationsTopic', {
      queryParams: {
        message: modelObject.value.notification,
        topic: modelObject.value.topic,
      },
    }).then(response => {
      if (response) {
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
