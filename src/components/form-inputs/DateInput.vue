<template>
  <v-row>
    <v-col cols="12">
      <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="initData"
          persistent
          width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="computedDateFormatted"
              :label="label"
              :append-icon="icons.mdiCalendar"
              @click:append="modal=!modal"
              readonly
              :disabled="readonly"
              v-bind="attrs"
              outlined
              hide-details="auto"
              dense
              v-on="on"
              :rules="rules?rules:[]"
              :errorMessages="errorMessages"
              clearable
          ></v-text-field>
        </template>
        <v-date-picker
            v-model="initData"
            scrollable
            color="primary"
            ref="picker"
            :allowed-dates="allowedDates"
            :readonly="readonly"
            :disabled="readonly"
            :min="min"
            :max="max"
            :type="type"

        >
          <v-btn
              text
              color="primary"
              @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
              text
              color="primary"
              @click="updateDate"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import {ref, computed, watch} from '@vue/composition-api'
import {mdiCalendar} from '@mdi/js'
import moment from 'moment'
import formatDate from '../../plugins/custom-date'


export default {
  props: {
    date: {
      required: true,
    },
    label: {
      type: String,
      required: true,
      default: "Date"
    },
    rules: {
      type: Array,
      default: null
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
    } ,
    type: {
      required: false,
      type: String,
    }
  },
  setup(props, context) {
    const picker = ref(null)
    const modal = ref(false)
    const initData = ref(props.date)
    const updateDate = () => {
      context.refs.dialog.save(initData.value);
      context.emit("update-date", initData.value)
    }


    const computedDateFormatted = computed({
      // getter
      get() {
        return props.type=='month'?(props.date):( props.dateFormat ? (props.date ? moment(props.date).format('dddd, MMMM Do YYYY') : null) : formatDate(props.date))
      },
      // setter
      set(newValue) {
        context.refs.dialog.save(newValue);
        context.emit("update-date", newValue)
      }
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
