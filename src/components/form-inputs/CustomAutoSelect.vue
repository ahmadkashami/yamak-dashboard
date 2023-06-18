<template>
  <div>
    <VAutocomplete
      :value="modelValue"
      :label="label"
      :items="list"
      item-text="name"
      v-model:search-input="search"
      item-value="id"
      outlined
      dense
      hide-details="auto"
      :chips="multiple"
      :multiple="multiple"
      :rules="rules"
      clearable
      :auto-select-first="multiple"
      :deletable-chips="multiple"
      :cache-items="multiple"
      :disabled="disabled"
      @input="$emit('update:model-value',$event)"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
import _ from "lodash"
import { store } from '@/store'
import { ref } from 'vue'

export default {
  name: "CustomAutoSelect",
  model: {
    prop: 'modelValue',
    event: 'update:model-value',
  },
  props: {
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
  },
  setup(props, { emit }) {
    const search = ref('')
    const list = ref([])

    const fetchItems = () => {
      store.dispatch(props.service, {
        search: search.value,
        ...props.queryParams,
      })
        .then(response => {
          list.value = response.data.data.data
        }).catch(error => {
          console.error(error)
        })
    }

    watch([search], _.debounce(function () {
      fetchItems()
    }, 500))

    watch(
      () => props.queryParams,
      () => {
        fetchItems()
      },
    )
    watch(
      () => props.modelValue,
      () => {
        emit('update-item')
      },
    )

    return {
      search,
      list,
      fetchItems,
    }
  },
}
</script>

<style scoped>

</style>
