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
                  md="12"
                >
                  <VTextField
                    v-model="modelObject.title.ar"
                    outlined
                    :label="$t('Title Arabic')"
                    :placeholder="$t('Title Arabic')"
                    :rules="requiredRules"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="12"
                >
                  <VTextField
                    v-model="modelObject.title.en"
                    outlined
                    :label="$t('Title English')"
                    :placeholder="$t('Title English')"
                    :rules="requiredRules"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="12"
                >
                  <VTextField
                    v-model="modelObject.subTitle.ar"
                    outlined
                    :label="$t('Sub Title Arabic')"
                    :placeholder="$t('Sub Title Arabic')"
                    :rules="requiredRules"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="12"
                >
                  <VTextField
                    v-model="modelObject.subTitle.en"
                    outlined
                    :label="$t('Sub Title English')"
                    :placeholder="$t('Sub Title English')"
                    :rules="requiredRules"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
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
                    accept="png,jpeg"
                    label="Image"
                    @file-uploaded="uploadedPhoto"
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
import useSlider from './useSlider'
import { computed, ref, watch } from 'vue'
import { store } from '@/store'
import FileUpload from '@/components/FileUpload.vue'
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
  modelObject,
} = useSlider()

const {
  requiredRules,
  phoneRules,
  emailRules,
}=useValidation()



const resetData = () => {
  resetForm()
  emit('update:is-open-update-dialog', false)
  loading.value = false
}

const loading = ref(false)

const uploadedPhoto=url=>{
  modelObject.value.imageUrl=url
}

const onSubmit = () => {
  if (valid.value) {
    loading.value = true
    store.dispatch('updateWebsiteSlider', {
      id: props.itemData._id,
      queryParams: {
        ...modelObject.value,
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
    console.log(props.itemData)
    modelObject.value= props.itemData
  },
)
</script>
