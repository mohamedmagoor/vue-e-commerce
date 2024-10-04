import { defineStore } from "pinia";
import axios from "axios";

export const productsModule = defineStore("productsModule", {
  state: () => ({
    flashDeals: [],
    newProducts: [],
    otherProducts: [],
    featuredProducts: [],
    categoryProducts: "",
    singleProduct: [],
    categories: [
      {
        title: "Smart phones",
        route: "smartphones",
      },
      {
        title: "Tablets",
        route: "tablets",
      },
      {
        title: "Motorcycle",
        route: "motorcycle",
      },
      {
        title: "Skin Care",
        route: "skin-care",
      },
      {
        title: "Sports Accessories",
        route: "sports-accessories",
      },
      {
        title: "Sunglasses",
        route: "sunglasses",
      },
    ],
  }),
  actions: {
    async getProducts() {
      await axios
        .get("https://dummyjson.com/products")
        .then((res) => {
          this.otherProducts = res.data.products.slice(10, 18);
          this.flashDeals = res.data.products.slice(1, 9);
          this.newProducts = res.data.products.slice(20, 28);
          this.featuredProducts = res.data.products.slice(22, 30);
        })
        .catch((err) => console.log(err));
    },
    async getProductsByCategory(category) {
      await axios
        .get(`https://dummyjson.com/products/category/${category}`)
        .then((res) => (this.categoryProducts = res.data.products));
    },
    async getSingleProduct(productId) {
      await axios
        .get(`https://dummyjson.com/products/${productId}`)
        .then((res) => (this.singleProduct = res.data));
    },
  },
});
