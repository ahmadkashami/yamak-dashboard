<script setup>
import logo from '@images/logo.png'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useDisplay } from 'vuetify'

const props = defineProps({
  tag: {
    type: [
      String,
      null,
    ],
    required: false,
    default: 'aside',
  },
  isOverlayNavActive: {
    type: Boolean,
    required: true,
  },
  toggleIsOverlayNavActive: {
    type: Function,
    required: true,
  },
})

const { mdAndDown } = useDisplay()
const refNav = ref()
const route = useRoute()

watch(() => route.path, () => {
  props.toggleIsOverlayNavActive(false)
})

const isVerticalNavScrolled = ref(false)
const updateIsVerticalNavScrolled = val => isVerticalNavScrolled.value = val

const handleNavScroll = evt => {
  isVerticalNavScrolled.value = evt.target.scrollTop > 0
}
</script>

<template>
  <Component
    :is="props.tag"
    ref="refNav"
    class="layout-vertical-nav"
    :class="[
      {
        'visible': isOverlayNavActive,
        'scrolled': isVerticalNavScrolled,
        'overlay-nav': mdAndDown,
      },
    ]"
  >
    <!-- 👉 Header -->
    <div class="nav-header">
      <slot name="nav-header">
        <RouterLink
          to="/"
          class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
        >
          <span class="nav-brand-mark">
            <VImg
              :src="logo"
              alt="Yamak"
              height="32"
              width="32"
            />
          </span>
          <h1 class="nav-brand-title font-weight-medium leading-normal text-xl text-uppercase">
            Yamak
          </h1>
        </RouterLink>
      </slot>
    </div>
    <slot name="before-nav-items">
      <div class="vertical-nav-items-shadow" />
    </slot>
    <slot
      name="nav-items"
      :update-is-vertical-nav-scrolled="updateIsVerticalNavScrolled"
    >
      <PerfectScrollbar
        tag="ul"
        class="nav-items"
        :options="{ wheelPropagation: false }"
        @ps-scroll-y="handleNavScroll"
      >
        <slot />
      </PerfectScrollbar>
    </slot>

    <slot name="after-nav-items" />
  </Component>
</template>

<style lang="scss">
@use "@configured-variables" as variables;
@use "@layouts/styles/mixins";

// 👉 Vertical Nav
.layout-vertical-nav {
  position: fixed;
  z-index: variables.$layout-vertical-nav-z-index;
  display: flex;
  flex-direction: column;
  block-size: 100%;
  inline-size: variables.$layout-vertical-nav-width;
  inset-block-start: 0;
  inset-inline-start: 0;
  transition: transform 0.25s ease-in-out, inline-size 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
  will-change: transform, inline-size;

  .nav-header {
    display: flex;
    align-items: center;

    .header-action {
      cursor: pointer;
    }
  }

  .app-title-wrapper {
    margin-inline-end: auto;
  }

  .nav-items {
    block-size: 100%;

    // ℹ️ We no loner needs this overflow styles as perfect scrollbar applies it
    // overflow-x: hidden;

    // // ℹ️ We used `overflow-y` instead of `overflow` to mitigate overflow x. Revert back if any issue found.
    // overflow-y: auto;
  }

  .nav-item-title {
    overflow: hidden;
    margin-inline-end: auto;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // 👉 Collapsed
  .layout-vertical-nav-collapsed & {
    &:not(.hovered) {
      inline-size: variables.$layout-vertical-nav-collapsed-width;
    }
  }

  // 👉 Overlay nav
  &.overlay-nav {
    &:not(.visible) {
      transform: translateX(-#{variables.$layout-vertical-nav-width});

      @include mixins.rtl {
        transform: translateX(variables.$layout-vertical-nav-width);
      }
    }
  }
}

.layout-nav-type-vertical .layout-vertical-nav {
  background: linear-gradient(180deg, var(--yamak-sidebar-start), var(--yamak-sidebar-end));
  color: var(--yamak-sidebar-text);

  .nav-header {
    min-block-size: auto;
    padding-block: 6px 24px;
    padding-inline: 12px;
  }

  .nav-brand-mark {
    display: grid;
    overflow: hidden;
    flex: 0 0 auto;
    border: 3px solid var(--yamak-primary);
    border-radius: 13px 13px 18px 18px;
    block-size: 38px;
    inline-size: 38px;
    place-items: center;
    transform: rotate(-5deg);
  }

  .nav-brand-title {
    color: var(--yamak-sidebar-text);
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: 0.6px;
  }

  .vertical-nav-items-shadow {
    background: linear-gradient(
      rgb(var(--v-theme-sidebar-start) / 96%) 5%,
      rgb(var(--v-theme-sidebar-end) / 82%) 45%,
      rgb(var(--v-theme-sidebar-end) / 24%) 80%,
      transparent
    );
  }

  .nav-items {
    display: flex;
    flex-direction: column;
    gap: 6px;
    list-style: none;
    margin-block: 0;
    padding-block: 0;
    padding-inline: 0;
  }

  .nav-link {
    margin-inline: 14px;

    > a {
      display: flex;
      align-items: center;
      border-radius: 13px;
      color: var(--yamak-sidebar-text-muted);
      margin-inline: 0;
      min-block-size: 42px;
      padding-block: 12px;
      padding-inline: 14px;
      transition: background-color 0.15s ease, color 0.15s ease;

      &::before {
        display: none;
      }

      &:hover:not(.router-link-exact-active) {
        background-color: rgb(255 255 255 / 6%);
        color: var(--yamak-sidebar-text);
      }

      .nav-item-icon {
        font-size: 21px;
        inline-size: 22px;
      }
    }

  }

  .nav-section-title {
    color: color-mix(in srgb, var(--yamak-sidebar-text-muted) 70%, transparent);
  }
}

.layout-nav-type-vertical.layout-vertical-nav-collapsed .layout-vertical-nav:not(.hovered) {
  .nav-header {
    justify-content: center;
    padding-inline: 13px;
  }

  .app-logo {
    margin-inline: 0;
    transform: none;
  }

  .nav-brand-title,
  .nav-item-title {
    display: none;
  }

  .nav-link {
    margin-inline: 8px;

    > a {
      justify-content: center;
      padding-inline: 0;

      .nav-item-icon {
        margin-inline-end: 0;
      }
    }
  }
}

.v-application .layout-nav-type-vertical .layout-vertical-nav .nav-link > .router-link-exact-active {
  background: linear-gradient(135deg, var(--yamak-primary), var(--yamak-primary-alt));
  box-shadow: var(--yamak-shadow-gold);
  color: #111827;
  font-weight: 700;
}
</style>
