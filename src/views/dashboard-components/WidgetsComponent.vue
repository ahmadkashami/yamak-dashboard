<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
  },
  count: {
    type: String,
  },
  icon: {
    type: String,
  },
})

const metricAccent = computed(() => ({
  Companies: 'companies',
  Websites: 'websites',
  Drivers: 'drivers',
  Services: 'services',
  'App Users': 'app-users',
  Vehicles: 'vehicles',
  Branches: 'branches',
}[props.title] || 'default'))
</script>

<template>
  <VCard
    class="dashboard-metric-card"
    :class="`dashboard-metric-card--${metricAccent}`"
  >
    <VCardText class="dashboard-metric-content">
      <div class="dashboard-metric-copy">
        <h2 class="dashboard-metric-title">
          {{ title }}
        </h2>
        <p class="dashboard-metric-value">
          {{ count }}
        </p>
      </div>

      <span class="dashboard-metric-icon">
        <VIcon
          :icon="icon"
          size="22"
        />
      </span>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.dashboard-metric-card {
  cursor: pointer;
  min-block-size: 140px;
  transition: border-color 0.16s ease, box-shadow 0.16s ease, transform 0.16s ease;

  &:hover {
    border-color: var(--yamak-primary);
    box-shadow: 0 12px 32px rgb(16 24 40 / 10%);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid var(--yamak-primary-hover);
    outline-offset: 2px;
  }
}

.dashboard-metric-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  gap: var(--yamak-space-3);
  min-block-size: 140px;
}

.dashboard-metric-copy {
  min-inline-size: 0;
}

.dashboard-metric-title {
  margin: 0 0 var(--yamak-space-2);
  color: var(--yamak-text-secondary);
  font-size: 14px;
  font-weight: var(--yamak-font-weight-bold);
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.dashboard-metric-value {
  margin: 0;
  color: var(--yamak-text-primary);
  font-size: 30px;
  font-weight: 800;
  line-height: 1.1;
}

.dashboard-metric-icon {
  display: grid;
  flex: 0 0 auto;
  border-radius: 12px;
  block-size: 40px;
  color: #101828;
  inline-size: 40px;
  place-items: center;
}

.dashboard-metric-card--companies .dashboard-metric-icon {
  background-color: #FFE39B;
}

.dashboard-metric-card--websites .dashboard-metric-icon {
  background-color: #CDE3FF;
}

.dashboard-metric-card--drivers .dashboard-metric-icon {
  background-color: #C9F2D5;
}

.dashboard-metric-card--services .dashboard-metric-icon {
  background-color: #E1D4FF;
}

.dashboard-metric-card--app-users .dashboard-metric-icon {
  background-color: #FFD5DC;
}

.dashboard-metric-card--vehicles .dashboard-metric-icon {
  background-color: #FFD8A6;
}

.dashboard-metric-card--branches .dashboard-metric-icon {
  background-color: #DDE3EB;
}

.dashboard-metric-card--default .dashboard-metric-icon {
  background-color: #FFE39B;
}

@media (prefers-reduced-motion: reduce) {
  .dashboard-metric-card {
    transition: none;

    &:hover {
      transform: none;
    }
  }
}
</style>
