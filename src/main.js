/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { store } from '@/store'
import { i18n } from '@/plugins/i18n'
import ability from '@/plugins/acl/ability'
import { abilitiesPlugin } from '@casl/vue'
import 'flag-icons/css/flag-icons.min.css';
import 'v-phone-input/dist/v-phone-input.css';
import { createVPhoneInput } from 'v-phone-input';



loadFonts()


// Create vue app
const app = createApp(App)

const vPhoneInput = createVPhoneInput({
  countryIconMode: 'svg',
  includeCountries:['KW','AE']
});

app.use(vPhoneInput);

// Use plugins
app.use(i18n)
app.use(store)
app.use(vuetify)
app.use(createPinia())
app.use(router)

app.use(abilitiesPlugin, ability, {
  useGlobalProperties: true,
})

// Mount vue app
app.mount('#app')
