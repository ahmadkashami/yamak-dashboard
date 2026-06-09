<template>
    <VAutocomplete
      v-model="modelValue"
      v-model:search="search"
      v-bind="$attrs"
      :label="label"
      :items="list"
      item-title="name"
      item-value="_id"
      outlined
      density="compact"
      hide-details="auto"
      :chips="multiple"
      :multiple="multiple"
      :rules="rules"
      hide-no-data
      :disabled="disabled"
      :loading="loading"
    />
</template>

<script setup>
import { store } from '@/store'
import { computed, ref, watch,onMounted } from 'vue'
import { getTranslations } from '@/libs/i18n/utils'
import { useLocale } from 'vuetify'
const emit=defineEmits(['update:modelValue'])
 const props =defineProps({
   modelValue: {
     required: true,
   },
   service: {
     required: true,
   },
   label: {
     required: true,
   },
   multiple: {
     required: true,
   },
   queryParams: {
     required: false,
   },
   rules: {
     required: false,
   },
   disabled: {
     required: false,
   },
 })
    const search = ref('')
    const list = ref([])
    const  loading=ref(false)

const modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
const { current } = useLocale()
const fetchItems = () => {
      loading.value=true
      store.dispatch(props.service, {
        query: search.value,
        ...props.queryParams,
      })
        .then(response => {
          list.value = (response.data.data.list || []).map(item => ({
            ...item,
            name: getTranslations(item?.name, current.value),
          }))
          loading.value=false
        }).catch(error => {
          console.error(error)
        })
    }

    watch([search],()=>{
      fetchItems()
    })

    watch(
      () => props.queryParams,
      (newVal, oldVal) => {
        if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
          fetchItems()
        }
      }
    )
onMounted(()=>{
  fetchItems()
})
</script>

<style scoped>

</style>
