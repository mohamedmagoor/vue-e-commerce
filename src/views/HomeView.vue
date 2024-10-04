<template>
  <div class="home">
    <upper-banner></upper-banner>
    <the-features></the-features>
    <TopOffers />
    <ProductsComponent :products="flashDeals" title="FlashDeals" color="red" />
    <TopCat />
    <NewProducts :products="newProducts" />
    <QualityFeatures />
    <ProductsComponent :products="otherProducts" title="Other Products" />
    <v-container fluid>
      <v-row>
        <v-col cols="6"
          ><img
            src="../assets/images/band-left-cover.webp"
            class="w-100 pr-3"
            alt=""
        /></v-col>
        <v-col cols="6"
          ><img
            src="../assets/images/band-right-cover.webp"
            class="w-100 pl-3"
            alt=""
        /></v-col>
      </v-row>
    </v-container>
    <ProductsComponent :products="featuredProducts" title="Featured Products" />
    <!-- <img src="../assets/images/tv-banner.webp" alt="" class="w-100" /> -->
    <WhyShopWithUs />
  </div>
</template>
<script>
import UpperBanner from "@/components/HomePage/UpperBanner.vue";
import TheFeatures from "@/components/HomePage/TheFeatures.vue";
import TopOffers from "@/components/HomePage/TopOffers.vue";
import ProductsComponent from "@/components/HomePage/ProductsSwiper.vue";
import TopCat from "@/components/HomePage/TopCategories.vue";
import NewProducts from "@/components/HomePage/NewProducts.vue";
import QualityFeatures from "@/components/HomePage/QualityFeatures.vue";
import WhyShopWithUs from "@/components/HomePage/WhyshopWithus.vue";
import { productsModule } from "@/stores/products.js";
import { mapActions, mapState } from "pinia";
export default {
  name: "HomeView",
  components: {
    UpperBanner,
    TheFeatures,
    TopOffers,
    ProductsComponent,
    TopCat,
    NewProducts,
    QualityFeatures,
    WhyShopWithUs,
  },
  computed: {
    ...mapState(productsModule, [
      "flashDeals",
      "newProducts",
      "otherProducts",
      "featuredProducts",
    ]),
  },
  methods: {
    ...mapActions(productsModule, ["getProducts"]),
  },
  async mounted() {
    await this.getProducts();
  },
};
</script>
