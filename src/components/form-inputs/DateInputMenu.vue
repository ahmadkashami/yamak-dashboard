<template>
  <VRow>
    <VCol cols="12">
      <VMenu
        v-model="modal"
        v-model:return-value="initData"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <VTextField
            v-model="computedDateFormatted"
            readonly
            v-bind="attrs"
            :label="label"
            :append-icon="icons.mdiCalendar"
            :disabled="readonly"
            outlined
            @click:append='modal=!modal'
            hide-details="auto"
            v-on='on'
            :rules="rules?rules:[]"
            :error-messages="errorMessages"
            clearable
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
