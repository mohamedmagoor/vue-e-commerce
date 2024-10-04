<template>
  <div class="banner">
    <div class="parentt">
      <img src="@/assets/images/banner-bg.jpg" alt="" />
      <div class="cont">
        <h3><span>Huge Saving</span> on UHD Televisions</h3>
        <p class="hint py-3">Sale up to 70% off on selected items*</p>
        <v-btn
          variant="outlined"
          style="border-radius: 30px; text-transform: none"
          class="py-3 px-10"
          density="combact"
        >
          Shop Now
        </v-btn>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.banner {
  .parentt {
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    height: 390px;
    .cont {
      color: white;
      padding: 40px 0 0 100px;
      position: absolute;
      left: 40px;
      top: 20px;
      width: 600px;
      h3 {
        font-weight: 900;
        font-size: 45px;
        span {
          color: rgb(45, 251, 223);
        }
      }
      .hint {
        margin: 20px 0 13px;
      }
    }
  }
}
//Media Quries.....
@media (max-width: 990px) {
  .banner {
    .parentt {
      .cont {
        h3 {
          font-size: 35px;
        }
        width: 400px;
        left: 0;
      }
    }
  }
}
@media (max-width: 767px) {
  .banner {
    .parentt {
      height: 320px;
      .cont {
        padding-left: 20px;
        h3 {
          font-size: 30px;
        }
        width: 400px;
        left: 0;
      }
      .hint {
        font-size: 14px;
      }
    }
  }
}
@media (max-width: 580px) {
  .banner {
    .parentt {
      height: 250px;
      .cont {
        padding-left: 20px;
        padding-top: 20px;
        h3 {
          font-size: 24px;
        }
        width: 80%;
        left: 0;
      }
      .hint {
        font-size: 12px;
        padding: 0px !important;
      }
      .v-btn__content {
        height: 0;
      }
      button {
        height: 30px !important;
        width: 130px !important;
      }
    }
  }
}
</style>
