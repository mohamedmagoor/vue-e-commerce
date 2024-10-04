<template>
  <div class="menu-drawer">
    <v-navigation-drawer
      :width="windoWidth <= 767 ? windoWidth / 2 : 420"
      temporary
      v-model="drawer"
      class="px-5 py-5"
    >
      <v-card elevation="0">
        <v-card-title
          class="d-flex align-center justify-space-between"
          style="font-weight: bold; padding: 0px"
          >Menu
          <v-icon @click="drawer = false" style="cursor: pointer"
            >mdi-close</v-icon
          ></v-card-title
        >
        <v-list>
          <v-list-item
            @click="
              $router.push({
                name: 'products-category',
                params: { category: cat.route, title: cat.title },
              })
            "
            class="px-0"
            style="cursor: pointer"
            v-for="cat in categories"
            :key="cat.route"
            >{{ cat.title }}</v-list-item
          >
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>
<script>
import Emitter from "../../main";
import { productsModule } from "@/stores/products";
import { mapState } from "pinia";
export default {
  props: {
    windoWidth: {
      type: Number,
    },
  },
  computed: {
    ...mapState(productsModule, ["categories"]),
  },
  data: () => ({
    drawer: false,
  }),
  mounted() {
    Emitter.on("openMenu", () => {
      this.drawer = true;
    });
  },
};
</script>
