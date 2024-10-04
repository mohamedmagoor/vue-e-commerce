<template>
  <div class="product-details mt-16">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="7">
          <img
            class="w-100"
            :src="tab ? tab : singleProduct.thumbnail"
            alt=""
            height="500"
            v-if="!loading"
          />
          <v-skeleton-loader
            v-if="loading"
            type="image,image"
          ></v-skeleton-loader>
          <v-tabs center-active height="200" v-model="tab" class="mt-10">
            <v-tab
              class="mx-10"
              v-for="(img, i) in singleProduct.images"
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
              style="font-weight: bold; font-size: 22px"
              >({{ singleProduct.title }}) Sample -
              {{ singleProduct.category }} For Sale</v-card-title
            >
            <div class="rating d-flex align-center" style="gap: 10px">
              <v-rating
                v-model="singleProduct.rating"
                half-increments
                readonly
                color="orange"
                size="small"
                density="compact"
              ></v-rating>
              <span class="mt-1">Stock: {{ singleProduct.stock }}</span>
            </div>
            <v-card-text class="px-0">{{
              singleProduct.description
            }}</v-card-text>
            <v-card-text class="px-0 pt-0"
              >Brand: {{ singleProduct.brand }}</v-card-text
            >
            <v-card-text class="px-0 pt-0"
              >Availability:
              {{
                singleProduct.stock > 0 ? `In Stock` : `Out Of The Stock`
              }}</v-card-text
            >
            <v-card-text class="pl-0 pt-0">
              <del style="font-size: 18px">${{ singleProduct.price }}</del> From
              <span style="font-size: 20px" class="font-weight-bold">
                ${{
                  Math.ceil(
                    singleProduct.price -
                      singleProduct.price *
                        (singleProduct.discountPercentage / 100)
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
              <v-card-text class="pl-0 pt-5">
                Subtotal: ${{
                  Math.ceil(
                    singleProduct.price -
                      singleProduct.price *
                        (singleProduct.discountPercentage / 100)
                  ) * quantity
                }}
              </v-card-text>
            </v-card-text>
            <v-card-actions class="mt-7 w-100 px-0">
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
                @click="addToCart(singleProduct)"
                :loading="btnLoading"
                >Add To Cart</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { productsModule } from "@/stores/products";
import { mapActions, mapState } from "pinia";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import { cartStore } from "@/stores/cart";
import Emitter from "../main";

export default {
  components: {
    VSkeletonLoader,
  },
  methods: {
    ...mapActions(productsModule, ["getSingleProduct"]),
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
  computed: {
    ...mapState(productsModule, ["singleProduct"]),
  },
  async beforeMount() {
    this.loading = true;
    await this.getSingleProduct(this.$route.params.productId);
    this.loading = false;
  },
  data: () => ({
    loading: false,
    tab: "",
    quantity: 1,
    btnLoading: false,
    // product: {
    //   id: 2,
    //   title: "Eyeshadow Palette with Mirror",
    //   description:
    //     "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    //   category: "beauty",
    //   price: 19.99,
    //   discountPercentage: 5.5,
    //   rating: 3.28,
    //   stock: 44,
    //   tags: ["beauty", "eyeshadow"],
    //   brand: "Glamour Beauty",
    //   sku: "MVCFH27F",
    //   weight: 3,
    //   dimensions: {
    //     width: 12.42,
    //     height: 8.63,
    //     depth: 29.13,
    //   },
    //   warrantyInformation: "1 year warranty",
    //   shippingInformation: "Ships in 2 weeks",
    //   availabilityStatus: "In Stock",
    //   reviews: [
    //     {
    //       rating: 4,
    //       comment: "Very satisfied!",
    //       date: "2024-05-23T08:56:21.618Z",
    //       reviewerName: "Liam Garcia",
    //       reviewerEmail: "liam.garcia@x.dummyjson.com",
    //     },
    //     {
    //       rating: 1,
    //       comment: "Very disappointed!",
    //       date: "2024-05-23T08:56:21.618Z",
    //       reviewerName: "Nora Russell",
    //       reviewerEmail: "nora.russell@x.dummyjson.com",
    //     },
    //     {
    //       rating: 5,
    //       comment: "Highly impressed!",
    //       date: "2024-05-23T08:56:21.618Z",
    //       reviewerName: "Elena Baker",
    //       reviewerEmail: "elena.baker@x.dummyjson.com",
    //     },
    //   ],
    //   returnPolicy: "30 days return policy",
    //   minimumOrderQuantity: 32,
    //   meta: {
    //     createdAt: "2024-05-23T08:56:21.618Z",
    //     updatedAt: "2024-05-23T08:56:21.618Z",
    //     barcode: "2817839095220",
    //     qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    //   },
    //   images: [
    //     "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png",
    //   ],
    //   thumbnail:
    //     "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
    // },
  }),
};
</script>
