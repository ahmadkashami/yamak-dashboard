<template>
  <VRow class="pagination-footer border-t mt-2">
    <VCol
      cols="12"
      md="3"
    >
      <VSelect
        v-model="itemsPerPage"
        :items="[1,5,10,15,20,30,40,50,100]"
        :label="$t('Rows per page')"
        hide-details
        class="ma-2 item-per-page"
        density="compact"
        @update:model-value="$emit('updateItemsPerPage',itemsPerPage)"
      />
    </VCol>
    <VCol
      cols="12"
      md="2"
    />
    <VCol
      cols="12"
      md="7"
      class="d-flex justify-end"
    >
      <VPagination
        class="pagination-controls my-4"
        v-model="currentPageLocal"
        :length="pageInfo.totalPages"
        rounded="circle"
        @update:model-value="updateCurrentPage"
      />
    </VCol>
  </VRow>
</template>

<script setup>
import { ref, watch } from 'vue'

const props=defineProps({
  // eslint-disable-next-line vue/require-prop-types
  currentPage: { required: true },
  // eslint-disable-next-line vue/require-prop-types
  pageInfo: { required: true },
})

const emit=defineEmits(['updateCurrentPage', 'updateItemsPerPage'])
const itemsPerPage = ref(10)
const currentPageLocal = ref(10)

// eslint-disable-next-line vue/no-setup-props-reactivity-loss
currentPageLocal.value = props.currentPage

const updateCurrentPage = () => {
  emit('updateCurrentPage', currentPageLocal.value)
}

watch(
  ()=> props.currentPage,
  ()=>{
    currentPageLocal.value=  props.currentPage
  },
)
</script>

<style>
.item-per-page {
  max-inline-size: 130px;
}
</style>

<style lang="scss">
.pagination-footer {
  align-items: center;
  border-color: var(--yamak-border) !important;
  color: var(--yamak-text-secondary);
  padding-block-start: var(--yamak-space-2);

  .item-per-page {
    .v-field-label {
      color: var(--yamak-text-secondary);
      opacity: 1;
    }

    .v-field__input,
    .v-select__selection-text {
      color: var(--yamak-text-primary);
    }
  }
}

.pagination-controls {
  .v-pagination__item .v-btn {
    border-radius: var(--yamak-radius-sm);
    color: var(--yamak-text-secondary);
    font-weight: var(--yamak-font-weight-medium);
  }

  .v-pagination__prev .v-btn,
  .v-pagination__next .v-btn {
    color: var(--yamak-text-secondary);

    &.v-btn--disabled {
      color: color-mix(in srgb, var(--yamak-text-secondary) 65%, var(--yamak-surface));
      opacity: 1;
    }
  }

  .v-pagination__item--is-active .v-btn {
    background-color: color-mix(in srgb, var(--yamak-primary) 18%, var(--yamak-surface));
    color: var(--yamak-text-primary);
  }

  .v-pagination__item--is-active .v-btn.v-btn--disabled {
    opacity: 1;
  }
}
</style>
