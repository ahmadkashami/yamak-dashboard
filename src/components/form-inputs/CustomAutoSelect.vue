<template>
  <div>
    <v-autocomplete
        :value="modelValue"
        :label="label"
        :items="list"
        item-text="name"
        item-value="id"
        outlined
        dense
        hide-details="auto"
        :chips="multiple"
        @input="$emit('update:model-value',$event)"
        :multiple="multiple"
        :search-input.sync="search"
        :rules="rules"
        clearable
        :auto-select-first="multiple"
        :deletable-chips="multiple"
        :cache-items="multiple"
        :disabled="disabled"
        v-bind="$attrs"
    >
    </v-autocomplete>
  </div>
</template>

<script>
import store from "@/store";
import {ref, watch} from "@vue/composition-api";
import _ from "lodash";

export default {
  name: "customAutoSelect",
  model: {
    prop: 'modelValue',
    event: 'update:model-value',
  },
  props: {
    modelValue: {
      required: true
    },
    service: {
      required: true
    },
    label: {
      required: true
    },
    multiple: {
      required: true
    },
    queryParams: {
      required: false
    },
    rules: {
      required: false
    },
    disabled: {
      required: false
    }
  },
  setup(props, {emit}) {
    const search = ref('')
    const list = ref([])
    const fetchItems = () => {
      store.dispatch(props.service, {
        search: search.value,
        ...props.queryParams
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
        }
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
      fetchItems
    }
  }
}
</script>

<style scoped>

</style>
