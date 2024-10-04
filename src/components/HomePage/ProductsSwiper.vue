<template>
  <div class="products-swiper pb-10 pt-16 px-6">
    <div class="title d-flex justify-space-between align-center mb-5">
      <h2
        :class="[`text-${color} mb-9`]"
        style="font-weight: 900; font-size: 32px"
      >
        {{ title }}
      </h2>
      <a class="text-black" href="#">Shop All</a>
    </div>
    <v-container v-if="!products.length" fluid>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="3" v-for="num in 4" :key="num">
              <v-skeleton-loader
                type="image, article, button"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <Swiper
      :modules="modules"
      :pagination="{ el: '.swiper-pagination', clickable: true }"
      :slides-per-view="4"
      :space-between="35"
      class="pb-16"
      :navigation="{ pervIcon: '.swiper-prev', nextIcon: '.swiper-next' }"
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
            <!-- ( {{ item.title }})
            {{
              item.description.split(" ").length < 0
                ? item.description
                : item.description.split(" ").slice(0, 8).join(" ") + "..."
            }} -->
            {{
              `(${item.title}) ${item.description}`.length <= 57
                ? `(${item.title}) ${item.description}`
                : `(${item.title}) ${item.description}`.substring(0, 65) + "..."
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
    <!-- <v-container fluid>
      <v-row>
        <v-col cols="3" v-for="item in products" :key="item.id">
          <v-card elevation="0">
            <img
              class="w-100"
              :src="
                showenItems[item.title]
                  ? showenItems[item.title]
                  : item.thumbnail
              "
              alt=""
              height="320px"
            />
            <v-card-text class="pl-0 pb-1">
              ( {{ item.title }})
              {{
                item.description.split(" ").length < 0
                  ? item.description
                  : item.description.split(" ").slice(0, 8).join(" ") + "..."
              }}
            </v-card-text>
            <v-rating
              v-model="item.rating"
              half-increments
              readonly
              color="orange"
              size="small"
              density="compact"
            ></v-rating>
            <v-card-text class="pl-0 pt-0">
              <del style="font-size: 18px">${{ item.price }}</del> From
              <span style="font-size: 20px" class="text-red font-weight-bold">
                ${{
                  Math.ceil(
                    item.price - item.price * (item.discountPercentage / 100)
                  )
                }}
              </span>
            </v-card-text>
            <v-btn-toggle v-model="showenItems[item.title]">
              <v-btn
                siz="x-small"
                :value="pic"
                v-for="(pic, idx) in item.images"
                :key="idx"
              >
                <img
                  :src="pic"
                  alt=""
                  width="40"
                  height="40"
                  style="border-radius: 50%; border: 1px solid grey"
              /></v-btn>
            </v-btn-toggle>
            <div class="mt-5">
              <v-btn
                style="text-transform: none; border-radius: 30px"
                class="py-3 px-12"
                variant="outlined"
                >Choose Options</v-btn
              >
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container> -->
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation, Autoplay } from "swiper";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import Emitter from "../../main";
export default {
  methods: {
    openQuickView(product) {
      Emitter.emit("openQuickView", product);
    },
  },
  props: {
    products: {
      type: Array,
    },
    title: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
    VSkeletonLoader,
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
      767: {
        slidesPerView: 3,
      },
      990: {
        slidesPerView: 4,
      },
    },
  }),
};
</script>
<style lang="scss">
.products-swiper {
  .swiper-button-next,
  .swiper-button-prev {
    width: 35px;
    height: 35px;
    background-color: white;
    border-radius: 50%;
    border: 2px solid black;
    &::after {
      font-size: 13px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      color: rgb(53, 53, 53);
    }
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
  }
  .parent-img:hover {
    .quick-view-btn {
      opacity: 1 !important;
    }
  }
}

//Media Querirs...
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
</style>
