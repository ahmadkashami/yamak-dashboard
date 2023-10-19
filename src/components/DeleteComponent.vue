<template>
  <div>
    <VDialog
      v-model="isOpenDeleteDialog"
      width="500"
      persistent
    >
      <VCard>
        <VCardTitle>
          Are you sure you want to delete this item?
        </VCardTitle>
        <VCardActions>
          <VSpacer />
          <VBtn
            color="error"
            outlined
            @click="$emit('update:is-open-delete-dialog',false)"
          >
            Cancel
          </VBtn>
          <VBtn
            color="success"
            @click="deleteItem"
          >
            OK
          </VBtn>
          <VSpacer />
        </VCardActions>
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
import { store } from '@/store'
import { computed, ref } from 'vue'

const props = defineProps({
  isOpenDeleteDialog: {
    type: Boolean,
  },
  service: {
    type: String,
  },
  queryParams: {
    required: false,
  },
})

const emit = defineEmits(['update:is-open-delete-dialog', 'update-data'])

const isOpenDeleteDialog = computed({
  get() {
    return props.isOpenDeleteDialog
  },
  set(value) {
    emit('update:is-open-delete-dialog', value)
  },
})

const isOutlinedSnackbarVisible = ref(false)
const msgSnackbarVisible = ref('')
const isOutlinedSnackbarColor = ref('')

const deleteItem = () => {
  store.dispatch(props.service, {
    ...props.queryParams,
  }).then(() => {
    emit('update-data')
    emit('update:is-open-delete-dialog', false)
    isOutlinedSnackbarVisible.value = true
    msgSnackbarVisible.value = 'Deleted Successfully'
    isOutlinedSnackbarColor.value = 'success'
  }).catch(error => {
      isOutlinedSnackbarVisible.value = true
      msgSnackbarVisible.value = error.response.data.message
      isOutlinedSnackbarColor.value = 'error'
      emit('update:is-open-delete-dialog', false)
    },
  )
}
</script>
