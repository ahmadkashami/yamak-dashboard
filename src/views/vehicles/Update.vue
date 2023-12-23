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
                    v-model="modelObject.drivers"
                    :label="$t('Drivers')"
                    service="fetchFreeDriversByBranch"
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
import useVehicle from './useVehicle'
import { computed, onMounted, ref, watch } from 'vue'
import { store } from '@/store'
import CustomAutoSelect from '@/components/form-inputs/CustomAutoSelect.vue'

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
  route
} = useVehicle()



const resetData = () => {
  resetForm()
  emit('update:is-open-update-dialog', false)
  loading.value = false
}

const loading = ref(false)

const uploadedPhoto=url=>{
  modelObject.value.photo=url

}
const onSubmit = () => {
  if (valid.value) {
    loading.value = true
    store.dispatch('updateVehicle', {
      id: props.itemData.id,
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
