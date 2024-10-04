<template>
  <div class="layout">
    <v-layout class="position-relative">
      <CartDrawer :windoWidth="windoWidth" />
      <MenuDrawer :windoWidth="windoWidth" />
      <v-main
        :style="`padding-top: ${
          $route.name == 'check-out'
            ? '0px'
            : windoWidth <= 990
            ? '60px'
            : '150px'
        }`"
      >
        <slot></slot>
      </v-main>
      <AppNav v-if="$route.name != 'check-out' && windoWidth > 990" />
      <ResponsiveNav v-if="windoWidth <= 990 && $route.name != 'check-out'" />
      <FixedNav v-if="$route.name != 'check-out' && windoWidth > 990" />
      <AppFooter v-if="$route.name != 'check-out'" />
    </v-layout>
  </div>
</template>

<script>
import AppNav from "./AppNav.vue";
import CartDrawer from "./CartDrawer.vue";
import AppFooter from "./AppFooter.vue";
import FixedNav from "./FixedNav.vue";
import ResponsiveNav from "./ResponsiveNav.vue";
import MenuDrawer from "./MenuDrawer.vue";
export default {
  components: {
    AppNav,
    AppFooter,
    CartDrawer,
    FixedNav,
    ResponsiveNav,
    MenuDrawer,
  },
  data: () => ({
    drawer: false,
    windoWidth: 0,
  }),
  mounted() {
    this.windoWidth = window.innerWidth;
    window.onresize = () => {
      this.windoWidth = window.innerWidth;
      console.log(this.windoWidth);
    };
  },
};
</script>
