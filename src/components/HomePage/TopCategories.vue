<template>
  <div class="top-cat mt-10">
    <div class="cyper-banner">
      <img class="w-100" src="../../assets/images/cyber-banner.webp" alt="" />
    </div>
    <div class="categories pt-13">
      <div class="title d-flex align-center justify-center px-5 mb-3">
        <h2 style="font-weight: 900" class="text-center flex-grow-1">
          Top Categories
        </h2>
      </div>
      <v-container fluid>
        <v-row>
          <v-col
            cols="6"
            sm="4"
            md="3"
            lg="2"
            v-for="cat in categories"
            :key="cat.title"
            v-bind="props"
          >
            <v-card elevation="0" class="text-center">
              <v-hover v-slot="{ isHovering, props }">
                <div
                  class="img-parent w-100"
                  style="overflow: hidden"
                  height="200px"
                >
                  <img
                    v-bind="props"
                    :style="`cursor:pointer;transition:0.3s all ease-in-out;scale:${
                      isHovering ? 1.05 : 1
                    }`"
                    :src="cat.img"
                    alt=""
                    height="100%"
                  />
                </div>
              </v-hover>
              <v-card-text>{{ cat.title }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    categories: [
      {
        title: "Mobile Phones",
        img: "https://new-ella-demo.myshopify.com/cdn/shop/files/mobile-phones.png?v=10616357514144629263",
      },
      {
        title: "Labtops",
        img: "https://new-ella-demo.myshopify.com/cdn/shop/files/laptops-tablets.png?v=17546078654541140209",
      },
      {
        title: "TVS",
        img: "https://new-ella-demo.myshopify.com/cdn/shop/files/televisions.png?v=792225267698738137",
      },
      {
        title: "PCs",
        img: " https://new-ella-demo.myshopify.com/cdn/shop/files/pcs-accessories.png?v=7913320403362682840",
      },
      {
        title: "Audio & Video",
        img: "https://new-ella-demo.myshopify.com/cdn/shop/files/audio-video.png?v=17118273463527967791",
      },
      {
        title: "Gaming",
        img: "https://new-ella-demo.myshopify.com/cdn/shop/files/gaming-accessories.png?v=5365032838061682635",
      },
      {
        title: "Home Appliances",
        img: "https://new-ella-demo.myshopify.com/cdn/shop/files/home-appliances.png?v=4122646624966862882",
      },
      {
        title: "Kitchen",
        img: "https://new-ella-demo.myshopify.com/cdn/shop/files/kitchen-appliances.png?v=912885117927234410",
      },
      {
        title: "Cameras",
        img: "https://new-ella-demo.myshopify.com/cdn/shop/files/cameras.png?v=10468174360605840515",
      },
      {
        title: "Consumables",
        img: "https://new-ella-demo.myshopify.com/cdn/shop/files/consumables.png?v=1604898607781595964",
      },
      {
        title: "Smart Homes",
        img: "https://new-ella-demo.myshopify.com/cdn/shop/files/smart-homes.png?v=11511407578445752828",
      },
      {
        title: "Accessories",
        img: "https://new-ella-demo.myshopify.com/cdn/shop/files/accessories.png?v=16090558546215869367",
      },
    ],
  }),
};
</script>
