<template>
  <VRow>
    <VCol cols="12">
      <VMenu
        v-model="modal"
        :close-on-content-click="false"
        min-width="auto"
      >
        <template v-slot:activator="{ props }">
          <VTextField
            v-model="computedDateFormatted"
            readonly="true"
            v-bind="props"
            :label="label"
            :append-icon="icons.mdiCalendar"
            :disabled="readonly"
            outlined
            @click:append='modal=!modal'
            hide-details="auto"
            :rules="rules?rules:[]"
            :error-messages="errorMessages"
            clearable="true"
            density="compact"
          />
        </template>
        <VDatePicker
          ref="picker"
          v-model="initData"
          scrollable
          color="primary"
          :allowed-dates="allowedDates"
          :readonly="readonly"
          :disabled="readonly"
          @input='updateDate'
          :min="min"
          :max="max"
        />
      </VMenu>
    </VCol>
    <VSpacer />
  </VRow>
</template>

<script>
import { mdiCalendar } from '@mdi/js'
import formatDate from '../../plugins/custom-date'
import { ref, watch } from 'vue'
import {VDatePicker} from 'vuetify/labs/components'

export default {
  props: {
    date: {
      required: true,
    },
    label: {
      type: String,
      required: true,
      default: 'Date',
    },
    rules: {
      type: Array,
      default: null,
    },
    allowedDates: {
      required: false,
    },
    readonly: {
      required: false,
    },
    min: {
      required: false,
    },
    max: {
      required: false,
    },
    errorMessages: {
      required: false,
    },
  },
  setup(props, context) {
    const picker = ref(null)
    const modal = ref(false)
    const initData = ref(props.date)

    const updateDate = () => {
      computedDateFormatted.value = initData.value
      modal.value = false
      context.emit('updateDate', initData.value)
    }

    watch(() => props.date,
      () => {
        initData.value = props.date
      })

    const computedDateFormatted = computed({
      // getter
      get() {
        return formatDate(props.date)
      },

      // setter
      set(newValue) {
        context.emit('updateDate', newValue)
      },
    })

    return {
      updateDate,
      formatDate,
      picker,
      modal,
      initData,

      // icons
      icons: {
        mdiCalendar,
      },
      computedDateFormatted,
    }
  },
}
</script>
