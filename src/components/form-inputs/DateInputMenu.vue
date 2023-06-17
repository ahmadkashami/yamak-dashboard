<template>
  <v-row>
    <v-col cols='12'>
      <v-menu
        v-model='modal'
        :close-on-content-click='false'
        :nudge-right='40'
        transition='scale-transition'
        offset-y
        min-width='auto'
        :return-value.sync='initData'
      >
        <template v-slot:activator='{ on, attrs }'>
          <v-text-field
            v-model='computedDateFormatted'
            readonly
            @click:append='modal=!modal'
            v-bind='attrs'
            v-on='on'
            :label='label'
            :append-icon='icons.mdiCalendar'
            readonly
            :disabled='readonly'
            outlined
            hide-details='auto'
            dense
            :rules='rules?rules:[]'
            :errorMessages='errorMessages'
            clearable
          ></v-text-field>
        </template>
        <v-date-picker
          v-model='initData'
          @input='updateDate'
          scrollable
          color='primary'
          ref='picker'
          :allowed-dates='allowedDates'
          :readonly='readonly'
          :disabled='readonly'
          :min='min'
          :max='max'
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>
<script>
import { mdiCalendar } from '@mdi/js'
import { computed, ref, watch } from '@vue/composition-api'
import formatDate from '../../plugins/custom-date'
import moment from 'moment/moment'

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
      context.emit('update-date', initData.value)
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
        context.emit('update-date', newValue)
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
