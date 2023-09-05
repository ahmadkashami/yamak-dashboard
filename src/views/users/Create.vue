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
                      v-model="fullName"
                      outlined
                      density="compact"
                      :label="$t('Full Name')"
                      :placeholder="$t('Full Name')"
                      :rules="requiredRules"
                    />
                  </v-col>
                  <v-col cols="12">
                    <VTextField
                      v-model="email"
                      :label="$t('Email')"
                      type="email"
                      :rules='emailRules'
                      density="compact"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="password"
                      :label="$t('Password')"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                      :rules='requiredRules'
                      density="compact"
                    />
                  </v-col>
                  <v-col  cols="12"  md="6">
                    <v-select
                       v-model="role"
                       :label="$t('Role')"
                       :items="roleList"
                       item-title="label"
                       item-value="value"
                       variant="outlined"
                       :rules="requiredRules"
                       density="compact"
                    ></v-select>
                  </v-col>
                  <v-col cols="12"  md="6">
                    <CustomAutoSelect
                      :label="$t('Company')"
                      v-model='companyId'
                      service='fetchCompanies'
                      :multiple='false'
                    ></CustomAutoSelect>
                  </v-col>
                  <v-col  cols="12"  md="6">
                    <v-select
                      v-model="type"
                      :label="$t('Type')"
                      :items="userType"
                      item-title="label"
                      item-value="value"
                      variant="outlined"
                      :rules="requiredRules"
                      density="compact"
                    ></v-select>
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
import useUsers from './useUsers'
import { computed, ref } from 'vue'
import { store } from '@/store'
import constSystem from '@/utils/constSystem'
import CustomAutoSelect from '@/components/form-inputs/CustomAutoSelect.vue'
import useValidation from '@/utils/validation'


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
    console.log(value)
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
  fullName,
  resetForm,
  email,
  password,
  role,
  companyId,
  type,
} = useUsers()

const {
  requiredRules,
  phoneRules,
  emailRules
}=useValidation()

const{roleList,userType}=constSystem()

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
    store.dispatch('createUser', {
      queryParams: {
        fullName: fullName.value,
        email:email.value,
        password:password.value,
        role:role.value,
        companyId:companyId.value,
        type:type.value,
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
