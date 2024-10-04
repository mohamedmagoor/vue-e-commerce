<template>
  <div class="product-details mt-16">
    <v-dialog v-model="dialog" max-width="900">
      <v-icon
        @click="dialog = false"
        style="position-absolute;padding:10px;cursor:pointer;right:-885px;top:15px;background-color:black;color:white"
        >mdi-close</v-icon
      >
      <v-card elevation="0">
        <v-container fluid class="bg-white pt-10 px-10">
          <v-row>
            <v-col cols="12" md="7">
              <img
                class="w-100"
                :src="tab ? tab : product.thumbnail"
                alt=""
                height="400"
                v-if="!loading"
              />
              <v-skeleton-loader
                v-if="loading"
                type="image,image"
              ></v-skeleton-loader>
              <v-tabs center-active height="200" v-model="tab" class="mt-10">
                <v-tab
                  class="mx-10"
                  v-for="(img, i) in product.images"
                  :key="i"
                  :value="img"
                >
                  <img :src="img" alt="" width="100" height="50" />
                </v-tab>
              </v-tabs>
            </v-col>
            <v-col cols="12" md="5" class="pt-0 pl-6">
              <v-skeleton-loader
                v-if="loading"
                type="article,,button"
              ></v-skeleton-loader>
              <v-card elevation="0" v-if="!loading">
                <v-card-title
                  class="px-0"
                  style="
                    font-weight: bold;
                    font-size: 22px;
                    white-space: pre-wrap;
                  "
                  >({{ product.title }}) Sample - {{ product.category }} For
                  Sale</v-card-title
                >
                <div class="rating d-flex align-center" style="gap: 10px">
                  <v-rating
                    v-model="product.rating"
                    half-increments
                    readonly
                    color="orange"
                    size="small"
                    density="compact"
                  ></v-rating>
                  <span class="mt-1">Stock: {{ product.stock }}</span>
                </div>
                <v-card-text class="px-0">{{
                  product.description
                }}</v-card-text>
                <v-card-text class="px-0 pt-0"
                  >Brand: {{ product.brand }}</v-card-text
                >
                <v-card-text class="px-0 pt-0"
                  >Availability:
                  {{
                    product.stock > 0 ? `In Stock` : `Out Of The Stock`
                  }}</v-card-text
                >
                <v-card-text class="pl-0 pt-0">
                  <del style="font-size: 18px">${{ product.price }}</del>
                  From
                  <span style="font-size: 20px" class="font-weight-bold">
                    ${{
                      Math.ceil(
                        product.price -
                          product.price * (product.discountPercentage / 100)
                      )
                    }}
                  </span>
                </v-card-text>
                <v-card-text class="pt-0 pl-0">
                  Quantity:
                  <div
                    class="counter px-1 mt-2"
                    style="
                      border-radius: 30px;
                      border: 1px solid grey;
                      width: fit-content;
                    "
                  >
                    <v-icon @click="quantity > 1 ? quantity-- : false"
                      >mdi-minus</v-icon
                    >
                    <input
                      style="
                        border: none;
                        outline: none;
                        width: 60px;
                        font-size: 16px;
                      "
                      class="py-3 text-center"
                      type="number"
                      min="1"
                      v-model="quantity"
                    />
                    <v-icon @click="quantity++">mdi-plus</v-icon>
                  </div>
                </v-card-text>
                <v-card-text class="pl-0 pt-0">
                  Subtotal: ${{
                    Math.ceil(
                      product.price -
                        product.price * (product.discountPercentage / 100)
                    ) * quantity
                  }}
                </v-card-text>
                <v-card-actions class="mt-1 w-100 px-0">
                  <v-btn
                    class="w-75"
                    variant="outlined"
                    density="combact"
                    height="50"
                    style="
                      text-transform: none;
                      border-radius: 30px;
                      background-color: rgb(20, 20, 20);
                      color: white;
                      font-weight: 700;
                      font-size: 17px;
                    "
                    @click="addToCart(product)"
                    :loading="btnLoading"
                    >Add To Cart</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import Emitter from "../../main";
import { cartStore } from "@/stores/cart";
import { mapActions } from "pinia";
export default {
  components: {
    VSkeletonLoader,
  },
  methods: {
    ...mapActions(cartStore, ["addItem"]),
    addToCart(item) {
      item.quantity = this.quantity;
      this.btnLoading = true;
      setTimeout(() => {
        this.btnLoading = false;
        this.addItem(item);
        Emitter.emit("openCart");
        Emitter.emit("showMsg", item.title);
        this.dialog = false;
      }, 1000);
    },
  },
  mounted() {
    Emitter.on("openQuickView", (data) => {
      this.loading = true;
      this.product = data;
      this.dialog = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  },
  //   async beforeMount() {
  //     this.loading = true;
  //     await this.getSingleProduct(5);
  //     this.loading = false;
  //   },
  data: () => ({
    loading: false,
    tab: "",
    quantity: 1,
    dialog: false,
    product: "",
    btnLoading: false,
  }),
};
</script>
