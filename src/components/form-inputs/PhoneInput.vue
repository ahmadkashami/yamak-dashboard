<template>
  <v-row>
    <v-col cols="12" md="8">
      <VuePhoneNumberInput
        v-model="data.number"
        size="lg"
        :required=true
        :default-country-code="country.code"
        color="#ef5a33"
        show-code-on-list
        @update="updatePhone"
        :dark="!!$vuetify.theme.dark"
        :dark-color="$vuetify.theme.dark?'#312d4b':'red'"
      />
    </v-col>
    <v-col cols="12" md="4">
      <v-checkbox
        v-model="data.whatsapp"
        dense
        hide-details
        label="Enabled whatsapp"
      ></v-checkbox>
    </v-col>
  </v-row>

</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import countries from "@/plugins/countries";
import { onMounted, ref } from 'vue'

export default {
  name: "PhoneInput",
  components: {VuePhoneNumberInput},
  props: {
    data: {
      required: true
    }
  },
  setup(props) {
    onMounted(() => {
      if (props.data.code) {
        country.value = countries.find(c => c.mobileCode == props.data.code)
      }
    })

    const country = ref({code: "KW"})
    const updatePhone = (e) => {
      props.data.code = e.countryCallingCode
      props.data.whatsapp = !!props.data.whatsapp
    }
    return {
      updatePhone,
      country
    }
  }
}
</script>

<style scoped>

</style>
