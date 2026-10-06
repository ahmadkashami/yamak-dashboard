<template>
  <VChip
    small
    class="status-chip"
    :color="color?color:statusColor[status]"
    variant="tonal"
  >
    <template v-if="typeof status=='boolean'">
      <span v-if="status===true">   {{ $t('Done') }}</span>
      <span v-else> {{ $t('Not yet') }}</span>
    </template>
    <template v-else>
      <span>{{ status }}</span>
    </template>
  </VChip>
</template>

<script>
export default {
  name: "StatusChip",
  props: {
    status: {
      required: true,
    },
    color: {
      required: false,
    },
  },
  setup() {
    const statusColor = {
      pending: 'primary',
      accepted: 'success',
      true: 'success',
      rejected: 'warning',
      active: 'success',
      cancelled: 'error',
      false: 'error',
      inactive: 'info',
      yes: 'success',
      no: 'error',
    }

    return {
      statusColor,
    }
  },
}
</script>

<style lang="scss" scoped>
.status-chip {
  border-radius: 999px;
  font-size: var(--yamak-font-size-xs);
  font-weight: var(--yamak-font-weight-semibold);
  letter-spacing: normal;
  padding-inline: 9px;
}
</style>
