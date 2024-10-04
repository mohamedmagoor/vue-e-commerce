<template>
  <div class="why-shop py-16">
    <div class="title mb-5">
      <h2 class="text-center"><span>Why shop</span> with us ?</h2>
    </div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" class="px-1">
          <v-card
            elevation="0"
            class="text-center text-white"
            color="transparent"
          >
            <img src="../../assets/images/free-shipping.png" alt="" />
            <v-card-title
              style="white-space: pre-wrap; line-height: 1.2; font-weight: 700"
            >
              Free Shipping On First Order
            </v-card-title>
            <v-card-text class="pb-0" style="font-size: 15px">
              Lorem ipsum dolor sit amet.
            </v-card-text>
            <a style="color: white; font-weight: 700" href="#">Learn more</a>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" class="px-1">
          <v-card
            elevation="0"
            class="text-center text-white"
            color="transparent"
          >
            <img src="../../assets/images/weekly-flash-sales.png" alt="" />
            <v-card-title
              style="white-space: pre-wrap; line-height: 1.2; font-weight: 700"
            >
              Weekly Flash Sale
            </v-card-title>
            <v-card-text class="pb-0" style="font-size: 15px">
              Lorem ipsum dolor sit amet.
            </v-card-text>
            <a style="color: white; font-weight: 700" href="#">Learn more</a>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card
            elevation="0"
            class="text-center text-white"
            color="transparent"
          >
            <img src="../../assets/images/discount.png" alt="" />
            <v-card-title
              style="white-space: pre-wrap; line-height: 1.2; font-weight: 700"
            >
              Anual Payment Discount
            </v-card-title>
            <v-card-text class="pb-0" style="font-size: 15px">
              Lorem ipsum dolor sit amet.
            </v-card-text>
            <a style="color: white; font-weight: 700" href="#">Learn more</a>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" class="px-1">
          <v-card
            elevation="0"
            class="text-center text-white"
            color="transparent"
          >
            <img src="../../assets/images/cash-back.png" alt="" />
            <v-card-title
              style="white-space: pre-wrap; line-height: 1.2; font-weight: 700"
            >
              Cashback Reward Program
            </v-card-title>
            <v-card-text class="pb-0" style="font-size: 15px">
              Lorem ipsum dolor sit amet.
            </v-card-text>
            <a style="color: white; font-weight: 700" href="#">Learn more</a>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style lang="scss">
.why-shop {
  background-image: url("../../assets/images/why-shop-with-us-banner.webp");
  background-size: cover;
  background-repeat: repeat-x;
  h2 {
    font-weight: 900;
    color: white;
    font-size: 35px;
    span {
      color: rgb(45, 251, 223);
    }
  }
}
</style>
