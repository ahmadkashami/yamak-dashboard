<template>
  <div>
    <VDialog
      v-model="
{/* eslint-disable-next-line vue/no-mutating-props */}isOpenUpdateDialog"
      max-width="900"
      persistent
    >
      <VCard height="100%">
        <div class="drawer-header d-flex align-center mb-4">
          <span class="font-weight-semibold text-base text--primary">{{ $t('Update') }}</span>
          <VSpacer />
          <VBtn
            icon
            small
            @click="$emit('update:is-open-update-dialog',false)"
          >
            <VIcon size="22">
              {{ icons.mdiClose }}
            </VIcon>
          </VBtn>
        </div>
        <VDivider />
        <VCardText class="mt-5">
          <VForm
            ref="form"
            v-model="valid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="name"
                  outlined
                  dense
                  :label="$t('Name')"
                  :placeholder="$t('Name')"
                  :rules="[validation.required]"
                />
              </VCol>
            </VRow>
            <VBtn
              color="primary"
              class="me-3"
              type="submit"
              :loading="loading"
              :disabled="loading"
            >
              {{ $t('Save') }}
            </VBtn>
            <VBtn
              color="secondary"
              outlined
              type="reset"
              @click="resetData"
            >
              {{ $t('Cancel') }}
            </VBtn>
          </VForm>
        </VCardText>
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

<script>
import { mdiClose, mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js'
import { store } from '@/store'
import useUsers from './useUsers'
import { required } from '../../utils/validation'
import { onMounted, ref, watch } from 'vue'

export default {
  model: {
    prop: 'isOpenUpdateDialog',
    event: 'update:is-open-update-dialog',
  },
  props: {
    isOpenUpdateDialog: {
      type: Boolean,
      required: true,
    },
    itemData: {
      required: true,
    },
  },
  setup(props, { emit }) {
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
            // eslint-disable-next-line vue/custom-event-name-casing
            emit('update-date')
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
      () => {name.value = props.itemData?.name},
    )

    return {
      form,
      valid,
      isOutlinedSnackbarVisible,
      msgSnackbarVisible,
      isOutlinedSnackbarColor,
      onSubmit,
      resetData,
      validate,
      loading,
      icons: {
        mdiClose,
        mdiEyeOffOutline,
        mdiEyeOutline,
      },
      resetForm,
      name,
      validation: {
        required,
      },
    }
  },
}
</script>
