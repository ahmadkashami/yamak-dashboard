<template>
  <div class="shared-page-heading">
    <h4 class="shared-page-title">
      {{ title }}
    </h4>
    <VBreadcrumbs
      class="shared-page-breadcrumbs"
      :items="items"
    >
      <template #title="{ item }">
        <VBreadcrumbsItem
          :href="item.href"
          :disabled="item.disabled"
          class="shared-page-breadcrumb-item"
        >
          <span>{{ item.text }}</span>
        </VBreadcrumbsItem>
      </template>
    </VBreadcrumbs>
  </div>
</template>

<script>
export default {
  name: "BreadcrumbsComponent",
  props: {
    title: {
      required: true,
    },
    items: {
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.shared-page-title {
  margin: 0;
  color: var(--yamak-text-primary);
  font-size: var(--yamak-font-size-lg);
  font-weight: var(--yamak-font-weight-bold);
  line-height: 1.3;
}

.shared-page-breadcrumbs {
  color: var(--yamak-text-secondary);
  min-block-size: auto;
  padding-block: var(--yamak-space-2) 0;
  padding-inline: 0;
}

.shared-page-breadcrumb-item {
  color: var(--yamak-text-secondary);
  font-size: var(--yamak-font-size-xs);
  font-weight: var(--yamak-font-weight-medium);
  opacity: 1;
  text-transform: uppercase;

  &:focus-visible {
    outline: 2px solid var(--yamak-primary-hover);
    outline-offset: 2px;
  }
}
</style>
