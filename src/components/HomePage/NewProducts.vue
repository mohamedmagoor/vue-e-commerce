<template>
  <div class="new-products pt-15 px-5">
    <div class="title d-flex justify-space-between align-center mb-5">
      <h2 class="text-black mb-9" style="font-weight: 900; font-size: 32px">
        New Products
      </h2>
      <a class="text-black" href="#">Shop All</a>
    </div>
    <v-container fluid>
      <v-row>
        <v-col cols="7" v-if="!products.length" class="pt-16">
          <v-row>
            <v-col cols="4" v-for="num in 3" :key="num">
              <v-skeleton-loader
                type="image, article, button"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-col>

        <v-col v-else cols="12" md="7" class="pt-16 order-md-0 order-1">
          <Swiper
            :modules="modules"
            :pagination="{ el: '.swiper-pagination', clickable: true }"
            :slides-per-view="3"
            :space-between="20"
            class="pb-16"
            :Autoplay="{ delay: 300 }"
            :breakpoints="breakpoints"
          >
            <SwiperSlide v-for="item in products" :key="item.id">
              <v-card elevation="0">
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
                      width="60"
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

                <v-card-text class="pl-0 pb-1 small-card">
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
                <v-card-text class="pl-0 pt-0 price-text">
                  <del style="font-size: 18px">${{ item.price }}</del> From
                  <span
                    style="font-size: 20px"
                    class="text-red font-weight-bold"
                  >
                    ${{
                      Math.ceil(
                        item.price -
                          item.price * (item.discountPercentage / 100)
                      )
                    }}
                  </span>
                </v-card-text>
                <v-btn-toggle
                  class="toggle-pics"
                  v-model="showenItems[item.title]"
                  mandatory
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
                <div class="mt-5 choose-btn">
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
                    >Choose Options</v-btn
                  >
                </div>
              </v-card>
            </SwiperSlide>
            <div class="swiper-prev"></div>
            <div class="swiper-next"></div>
            <div class="swiper-pagination"></div>
          </Swiper>
        </v-col>
        <v-col cols="12" md="5">
          <img class="w-100" src="../../assets/images/vr-banner.webp" alt="" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation, Autoplay } from "swiper";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import Emitter from "../../main";
export default {
  props: {
    products: {
      type: Array,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
    VSkeletonLoader,
  },
  methods: {
    openQuickView(product) {
      Emitter.emit("openQuickView", product);
    },
  },
  setup() {
    return {
      modules: [Pagination, Navigation, Autoplay],
    };
  },
  data: () => ({
    showenItems: {},
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      580: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  }),
};
</script>
<style lang="scss">
.parent-img:hover {
  .quick-view-btn {
    opacity: 1 !important;
  }
}

//Media Quries...
@media (max-width: 580px) {
  .new-products {
    .img-parent {
      height: 300px !important;
    }
  }
  @media (max-width: 580px) {
    .small-card {
      text-align: center;
    }
    .rating {
      display: flex !important;
      justify-content: center !important;
    }
    .price-text {
      text-align: center !important;
    }
    .toggle-pics {
      display: flex !important;
      justify-content: center !important;
    }
    .choose-btn {
      display: flex !important;
      justify-content: center !important;
    }
  }
}
</style>
