<template>
  <VRow>
    <VCol cols="12">
      <VDialog
        ref="dialog"
        v-model="modal"
        v-model:return-value="initData"
        persistent
        width="290px"
      >
        <template #activator="{ on, attrs }">
          <VTextField
            v-model="computedDateFormatted"
            :label="label"
            :append-icon="icons.mdiCalendar"
            readonly
            :disabled="readonly"
            v-bind="attrs"
            outlined
            hide-details="auto"
            dense
            @click:append="modal=!modal"
            :rules="rules?rules:[]"
            :error-messages="errorMessages"
            clearable
            v-on="on"
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
          :min="min"
          :max="max"
          :type="type"
        >
          <VBtn
            text
            color="primary"
            @click="modal = false"
          >
            Cancel
          </VBtn>
          <VBtn
            text
            color="primary"
            @click="updateDate"
          >
            OK
          </VBtn>
        </VDatePicker>
      </VDialog>
    </VCol>
  </VRow>
</template>

<script>
import { mdiCalendar } from '@mdi/js'
import moment from 'moment'
import formatDate from '../../plugins/custom-date'
import { computed, ref, watch } from 'vue'


export default {
  props: {
    date: {
      required: true,
    },
    label: {
      type: String,
      required: true,
      default: "Date",
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
    dateFormat: {
      required: false,
      type: Boolean,
    },
    type: {
      required: false,
      type: String,
    },
  },
  setup(props, context) {
    const picker = ref(null)
    const modal = ref(false)
    const initData = ref(props.date)

    const updateDate = () => {
      context.refs.dialog.save(initData.value)
      context.emit("updateDate", initData.value)
    }


    const computedDateFormatted = computed({
      // getter
      get() {
        return props.type=='month'?(props.date):( props.dateFormat ? (props.date ? moment(props.date).format('dddd, MMMM Do YYYY') : null) : formatDate(props.date))
      },

      // setter
      set(newValue) {
        context.refs.dialog.save(newValue)
        context.emit("updateDate", newValue)
      },
    })

    watch(() => props.date,
      () => {
        initData.value = props.date
      })

    return {
      updateDate,
      formatDate,
      picker,
      modal,
      initData,
      computedDateFormatted,

      // icons
      icons: {
        mdiCalendar,
      },
    }
  },
}
</script>
