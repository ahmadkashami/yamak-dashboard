<template>
  <v-chip
    small
    :color="color?color:statusColor[status]"
  >
    <template v-if="typeof status=='boolean'">
      <span  v-if="status===true">   {{$t('Done')}}</span>
      <span  v-else> {{$t('Not yet')}}</span>
    </template>
    <template v-else>
      <span >{{ status }}</span>
    </template>
  </v-chip>
</template>

<script>
export default {
  name: "StatusChip",
  props: {
    status: {
      required: true
    },
    color: {
      required: false
    }
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
  }
}
</script>

<style scoped>
.span-color {
  color: aliceblue;
}
</style>
