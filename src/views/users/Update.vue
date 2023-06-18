<template>
  <div>
    <v-dialog
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
                    v-model="name"
                    outlined
                    density="compact"
                    :label="$t('Name')"
                    :placeholder="$t('Name')"
                    :rules="[v => !!v || 'Item is required']"
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
import { mdiClose, mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js'
import useUsers from './useUsers'
import { computed, onMounted, ref, watch } from 'vue'
import * as validation from '@/utils/validation'
import { store } from '@/store'

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
    return props.isOpenUpdateDialog;
  },
  set(value) {
    emit('update:is-open-update-dialog', value);
  },
});

const {
  isOutlinedSnackbarVisible,
  msgSnackbarVisible,
  isOutlinedSnackbarColor,
  valid,
  form,
  validate,
  name,
  resetForm,
} = useUsers()

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
    store.dispatch('update$Example', {
      id: props.itemData.id,
      queryParams: {
        name: name.value,
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
      msgSnackbarVisible.value = error.response.data.error
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
    name.value = props.itemData?.name
  },
)

</script>
