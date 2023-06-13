<template>
  <div>
    <v-dialog
      v-model='isOpenCreateDialog'
      max-width='900'
      persistent
    >
      <v-card height='100%'>
        <div class='drawer-header d-flex align-center mb-4'>
          <span class='font-weight-semibold text-base text--primary'>{{$t('Create')}}</span>
          <v-spacer></v-spacer>
          <v-btn
            icon small
            @click="$emit('update:is-open-create-dialog',false)">
            <v-icon size='22'>
              {{ icons.mdiClose }}
            </v-icon>
          </v-btn>
        </div>
        <v-divider></v-divider>
        <v-card-text class='mt-5'>
          <v-form
            ref='form'
            v-model='valid'
            @submit.prevent='onSubmit'>
            <v-row>
              <v-col cols='12'>
                <v-text-field
                  v-model='name'
                  outlined
                  dense
                  :label="$t('Name')"
                  :placeholder="$t('Name')"
                  :rules='[validation.required]'
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn
              color='primary'
              class='me-3'
              type='submit'
              :loading='loading'
              :disabled='loading'>
              {{$t('Create')}}
            </v-btn>
            <v-btn
              color='secondary'
              outlined
              type='reset'
              @click='resetData'>
              {{$t('Cancel')}}
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model='isOutlinedSnackbarVisible'
      :value='true'
      :color='isOutlinedSnackbarColor'
      bottom
      rounded='pill'
      top
    >
      {{ msgSnackbarVisible }}
    </v-snackbar>
  </div>
</template>

<script>
import { mdiClose, mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js'
import store from '@/store'
import { onMounted, ref } from '@vue/composition-api'
import use$example from './use$example'
import { required } from '../../utils/validation'

export default {
  model: {
    prop: 'isOpenCreateDialog',
    event: 'update:is-open-create-dialog',
  },
  props: {
    isOpenCreateDialog: {
      type: Boolean,
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
    } = use$example()
    onMounted(() => {
    })
    const resetData = () => {
      resetForm()
      emit('update:is-open-create-dialog', false)
      loading.value = false
    }
    const loading = ref(false)
    const onSubmit = () => {
      if (valid.value) {
        loading.value = true
        store.dispatch('create$example', {
          queryParams: {
            name: name.value,
          },
        }).then((response) => {
          if (response) {
            emit('update-date')
            loading.value = false
            msgSnackbarVisible.value = 'Added Successfully'
            isOutlinedSnackbarColor.value = 'success'
            isOutlinedSnackbarVisible.value = true
            resetData()
          }
        }).catch((error) => {
          msgSnackbarVisible.value = error.response.data.error
          isOutlinedSnackbarVisible.value = true
          isOutlinedSnackbarColor.value = 'error'
          loading.value = false
        })
      } else {
        validate()
      }
    }
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
