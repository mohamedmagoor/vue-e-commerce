<template>
  <div class="products-category">
    <h1 class="text-center mt-10">{{ $route.params.title }}</h1>
    <v-container class="px-0">
      <v-row v-if="loading">
        <v-col cols="3" v-for="num in 4" :key="num">
          <v-skeleton-loader type="image, article, button"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-lazy v-if="!loading">
        <v-row class="px-0">
          <v-col
            class="px-10 px-sm-5 mt-4 mt-lg-0"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="item in categoryProducts"
            :key="item.id"
          >
            <v-card elevation="0" :loading="loading">
              <v-hover v-slot="{ isHovering, props }">
                <div
                  class="parent-img position-relative"
                  height="320px"
                  style="overflow: hidden"
                >
                  <img
                    class="w-100"
                    :src="
                      showenItems[item.title]
                        ? showenItems[item.title]
                        : item.thumbnail
                    "
                    alt=""
                    v-bind="props"
                    :style="`transition:0.3s all ease-in-out;scale:${
                      isHovering ? 1.05 : 1
                    };cursor:pointer`"
                  />
                  <v-btn
                    variant="outlined"
                    density="compact"
                    width="83"
                    height="30"
                    class="bg-white quick-view-btn"
                    style="
                      text-transform: none;
                      position: absolute;
                      left: 50%;
                      top: 50%;
                      font-size: 12px;
                      border-radius: 30px;
                      opacity: 0;
                      transform: translate(-50%, -50%);
                      transition: 0.2 all ease-in-out;
                    "
                    @click="openQuickView(item)"
                    >Quick View</v-btn
                  >
                </div>
              </v-hover>

              <v-card-text class="pl-0 pb-1 text-card">
                {{
                  `(${item.title}) ${item.description}`.length <= 57
                    ? `(${item.title}) ${item.description}`
                    : `(${item.title}) ${item.description}`.substring(0, 57) +
                      "..."
                }}
              </v-card-text>
              <v-rating
                v-model="item.rating"
                half-increments
                readonly
                color="orange"
                size="small"
                density="compact"
                class="rating"
              ></v-rating>
              <v-card-text class="pl-0 pt-0 text-price">
                <del style="font-size: 18px">${{ item.price }}</del> From
                <span style="font-size: 20px" class="text-red font-weight-bold">
                  ${{
                    Math.ceil(
                      item.price - item.price * (item.discountPercentage / 100)
                    )
                  }}
                </span>
              </v-card-text>
              <v-btn-toggle
                class="toggle-pics"
                v-model="showenItems[item.title]"
              >
                <v-btn
                  siz="x-small"
                  :value="pic"
                  v-for="(pic, idx) in item.images"
                  :key="idx"
                  :ripple="false"
                >
                  <img
                    :src="pic"
                    alt=""
                    width="40"
                    height="40"
                    style="border-radius: 50%; border: 1px solid grey"
                /></v-btn>
              </v-btn-toggle>
              <div class="mt-5 btn-center">
                <v-btn
                  style="text-transform: none; border-radius: 30px"
                  class="py-1 px-12"
                  variant="outlined"
                  @click="
                    $router.push({
                      name: 'product-details',
                      params: { productId: item.id },
                    })
                  "
                >
                  >Choose Options</v-btn
                >
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-lazy>
    </v-container>
  </div>
</template>
<script>
import { productsModule } from "@/stores/products";
import { mapActions, mapState } from "pinia";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import Emitter from "../main";

export default {
  methods: {
    ...mapActions(productsModule, ["getProductsByCategory"]),

    openQuickView(product) {
      Emitter.emit("openQuickView", product);
    },
  },
  computed: {
    ...mapState(productsModule, ["categoryProducts"]),
  },
  watch: {
    async $route() {
      document.documentElement.scrollTo(0, 0);
      this.loading = true;
      await this.getProductsByCategory(this.$route.params.category);
      this.loading = false;
    },
  },
  async mounted() {
    this.loading = true;
    await this.getProductsByCategory(this.$route.params.category);
    this.loading = false;
  },
  data: () => ({
    showenItems: {},
    loading: false,
  }),
  components: {
    VSkeletonLoader,
  },
};
</script>
<style lang="scss">
.parent-img:hover {
  .quick-view-btn {
    opacity: 1 !important;
  }
}
//mediaaaa.....
@media (max-width: 598px) {
  .text-card {
    text-align: center;
  }
  .rating {
    display: flex;
    justify-content: center;
  }
  .text-price {
    text-align: center;
  }
  .toggle-pics {
    display: flex;
    justify-content: center;
  }
  .btn-center {
    display: flex;
    justify-content: center;
  }
}
</style>
