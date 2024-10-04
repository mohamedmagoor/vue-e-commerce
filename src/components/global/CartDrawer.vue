<template>
  <div class="drawer">
    <v-navigation-drawer
      :width="windoWidth <= 767 ? windoWidth / 2 : 420"
      temporary
      v-model="drawer"
      location="right"
      class="px-5 py-5"
    >
      <v-card elevation="0">
        <v-card-title
          class="d-flex align-center justify-space-between"
          style="font-weight: bold; padding: 0px"
          >Shopping Cart
          <v-icon @click="drawer = false" style="cursor: pointer"
            >mdi-close</v-icon
          ></v-card-title
        >
        <v-card-text style="color: grey; font-size: 16px; padding: 0px"
          >{{ cartItems.length }} Items</v-card-text
        >
        <v-card-text
          v-if="!cartItems.length"
          class="py-0"
          style="color: grey; font-size: 16px; padding: 0px"
          >Free shipping for all orders over $10000.00!</v-card-text
        >
        <v-card-text
          v-if="!cartItems.length"
          class="text-center"
          style="color: grey; font-size: 16px"
          >Your cart is empty</v-card-text
        >
        <v-card-actions v-if="!cartItems.length">
          <v-btn
            density="compact"
            variant="outlined"
            style="
              text-transform: none;
              border-radius: 30px;
              font-size: 18px;
              color: black;
              border-color: grey;
            "
            class="w-100"
            height="50"
            @click="drawer = false"
            >Continue Shopping</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-card elevation="0">
        <div
          class="bar-parent pt-4 mr-2 position-relative"
          v-if="cartItems.length"
        >
          <svg
            class="icon-shipping-truck"
            viewBox="0 0 40.55 24"
            width="30"
            :fill="
              parseInt((calcTotalPrice / 10000) * 100) < 50
                ? 'red'
                : parseInt((calcTotalPrice / 10000) * 100) < 100
                ? 'orange'
                : 'green'
            "
            :style="`
              position: absolute;
              bottom: 15%;
              z-index: 1;
              left: calc(${
                parseInt((calcTotalPrice / 10000) * 100) <= 100
                  ? (calcTotalPrice / 10000) * 100
                  : 100
              }% - 30px);
              transition: 0.15s all ease-in-out;`"
          >
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <path
                  class="truck-body"
                  d="M40.43,11a3.86,3.86,0,0,0-3.68-2.65H28a1.25,1.25,0,0,1-1.43-1.43c0-2.18,0-4.35,0-6.53,0-.31-.08-.36-.37-.36H5.11a1.18,1.18,0,0,0-1.3,1.32c0,.74,0,1.48,0,2.22,0,.21-.06.27-.26.26-.36,0-.71,0-1.07,0a1.19,1.19,0,1,0,0,2.37H7.19c.43,0,.85,0,1.27,0a1,1,0,0,1,1.07,1A1.19,1.19,0,0,1,8.24,8.48H1.35a1.83,1.83,0,0,0-.47,0A1.19,1.19,0,0,0,0,9.85a1.18,1.18,0,0,0,1.19,1h9.66c.34,0,.68,0,1,0A1.19,1.19,0,0,1,13,12.47a1.26,1.26,0,0,1-1.26.76H1.24a1.19,1.19,0,1,0,0,2.38c.76,0,1.51,0,2.26,0,.26,0,.33.07.32.32,0,1,0,2.09,0,3.13A1.18,1.18,0,0,0,5.1,20.36c.63,0,1.26,0,1.9,0,.27,0,.39.06.47.36a4.55,4.55,0,0,0,8.78-.11.29.29,0,0,1,.32-.25H28.09a.3.3,0,0,1,.34.27,4.55,4.55,0,0,0,8.8,0,.31.31,0,0,1,.35-.26c.49,0,1,0,1.47,0a1.37,1.37,0,0,0,1.5-.87V11.41C40.41,11.29,40.47,11.12,40.43,11ZM32.84,21.62A2.18,2.18,0,1,1,35,19.45,2.21,2.21,0,0,1,32.84,21.62Zm-21,0A2.18,2.18,0,1,1,14,19.45,2.2,2.2,0,0,1,11.86,21.62Z"
                ></path>
                <path
                  class="truck-body"
                  d="M29.27,6h5.85c.1,0,.2,0,.29,0C33.64,2.72,32,.91,28.91.26V.57c0,1.68,0,3.35,0,5C28.9,5.9,29,6,29.27,6Z"
                ></path>
                <path
                  class="wheel"
                  fill="white"
                  d="M11.87,17.27A2.18,2.18,0,1,0,14,19.45,2.2,2.2,0,0,0,11.87,17.27Z"
                ></path>
                <path
                  class="wheel"
                  fill="white"
                  d="M32.85,17.27A2.18,2.18,0,1,0,35,19.45,2.22,2.22,0,0,0,32.85,17.27Z"
                ></path>
              </g>
            </g>
          </svg>
          <v-progress-linear
            :model-value="
              parseInt((calcTotalPrice / 10000) * 100) <= 100
                ? (calcTotalPrice / 10000) * 100
                : 100
            "
            :color="
              parseInt((calcTotalPrice / 10000) * 100) < 50
                ? 'red'
                : parseInt((calcTotalPrice / 10000) * 100) < 100
                ? 'orange'
                : 'green'
            "
            height="10"
            striped
          ></v-progress-linear>
        </div>
        <v-card-text
          v-if="cartItems.length && 10000 - calcTotalPrice > 0"
          style="color: grey; font-size: 16px"
          class="pa-0 pt-4"
          >Only {{ 10000 - calcTotalPrice }} away from Free
          Shipping</v-card-text
        >
        <v-card-text
          v-if="cartItems.length && 10000 - calcTotalPrice <= 0"
          style="color: grey; font-size: 16px"
          class="pa-0 pt-4"
          >Your order now is included Free Shipping</v-card-text
        >
        <v-container>
          <v-row
            v-for="item in cartItems"
            :key="item.id"
            class="align-center mb-5"
          >
            <v-col cols="12" sm="5" class="px-0">
              <img class="w-100" :src="item.thumbnail" alt="" />
            </v-col>
            <v-col cols="12" sm="7">
              <v-card-title
                class="px-0"
                style="white-space: pre-wrap; font-size: 14px; color: grey"
                >{{ item.title }} Sample - {{ item.category }}</v-card-title
              >
              <v-card-title
                class="px-0 py-0"
                style="white-space: pre-wrap; font-size: 14px; color: grey"
                >Category:{{ item.category }}</v-card-title
              >
              <v-card-text class="pt-0 pl-0">
                <v-card-text
                  class="pl-0"
                  style="font-weight: bold; font-size: 18px"
                >
                  Price: ${{
                    Math.ceil(
                      item.price - item.price * (item.discountPercentage / 100)
                    ) * item.quantity
                  }}
                </v-card-text>
                <div
                  class="item-footer d-flex align-center justify-space-between"
                >
                  <div
                    class="counter px-1 mt-2"
                    style="
                      border-radius: 30px;
                      border: 1px solid grey;
                      width: fit-content;
                    "
                  >
                    <v-icon @click="item.quantity > 1 ? item.quantity-- : false"
                      >mdi-minus</v-icon
                    >
                    <input
                      style="
                        border: none;
                        outline: none;
                        width: 50px;
                        font-size: 16px;
                      "
                      class="py-3 text-center"
                      type="number"
                      min="1"
                      v-model="item.quantity"
                    />
                    <v-icon @click="item.quantity++">mdi-plus</v-icon>
                  </div>
                  <v-icon
                    @click="deleteItem(item.id)"
                    style="cursor: pointer"
                    size="25"
                    >mdi-close</v-icon
                  >
                </div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions v-if="cartItems.length">
          <v-btn
            style="
              text-transform: none;
              border-radius: 30px;
              font-size: 18px;
              border-color: grey;
            "
            variant="elevated"
            density="compact"
            height="45"
            class="w-100"
            color="blue"
            elevation="0"
            @click="toCheckOut"
            >Check Out</v-btn
          >
        </v-card-actions>
        <v-card-actions v-if="cartItems.length">
          <v-btn
            style="
              text-transform: none;
              border-radius: 30px;
              font-size: 18px;
              border-color: grey;
            "
            variant="outlined"
            density="compact"
            height="45"
            class="w-100"
            color="black"
            @click="$router.push({ name: 'cart-page' })"
            >View Cart</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>
<script>
import Emitter from "../../main";
import { cartStore } from "@/stores/cart";
import { mapActions, mapState } from "pinia";

export default {
  //inject: ["Emitter"],
  props: {
    windoWidth: {
      type: Number,
    },
  },
  methods: {
    ...mapActions(cartStore, [
      "getCartItems",
      "deleteItem",
      "setToLocalStorage",
    ]),
    toCheckOut() {
      this.setToLocalStorage();
      this.$router.push({ name: "check-out" });
    },
  },
  computed: {
    ...mapState(cartStore, ["cartItems"]),
    calcTotalPrice() {
      let total = 0;
      this.cartItems.forEach((product) => {
        total +=
          Math.ceil(
            product.price - product.price * (product.discountPercentage / 100)
          ) * product.quantity;
      });
      return total;
    },
  },
  data: () => ({
    drawer: false,
  }),
  mounted() {
    Emitter.on("openCart", () => {
      this.drawer = true;
    });
    this.getCartItems();
  },
};
</script>
<style lang="scss" scoped>
//media queries...
@media (max-width: 580px) {
  .drawer {
    .v-card-text {
      font-size: 13px;
    }
    button {
      height: 30px !important;
      font-size: 12px !important;
    }
  }
}
</style>
