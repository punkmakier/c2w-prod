<template>
  <div class="payment-gateway">
    <div
      class="mt-3"
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 240px;
      ">
      <span
        ><h2 style="text-align: center; letter-spacing: 0.2rem">
          {{ $t("poweredBy") }}
        </h2></span
      >
      <img src="@/assets/images/c2w.png" alt="logo" style="width: 450px" />
    </div>
    <h1 style="text-align: center">{{ $t("ourPaymentGateway") }}</h1>
    <br /><br /><br /><br />
    <div style="width: 90%; margin: 0 auto">
      <Swiper
        :modules="modules"
        :loop="true"
        :breakpoints="{
          '@0.00': {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          '@0.75': {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          '@1.50': {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          '@1.75': {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }"
        :autoplay="{
          delay: 2000,
        }"
        class="mySwiper">
        <SwiperSlide v-for="(value, index) in photos" :key="index">
          <img
            :src="`/src/assets/payment_gateway_logo/${value}`"
            class="pg-img" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const photos = [
      "gcash.png",
      "paymaya.png",
      "bdo.png",
      "bpi.png",
      "chinabank.png",
      "ew.png",
      "komo.png",
      "lb.png",
      "mb.png",
      "pnb.png",
      "scb.png",
      "tonik.png",
      "ub.png",
      "ucpb.png",
    ];
    return {
      modules: [Autoplay, Navigation, Pagination, Scrollbar, A11y],
      photos,
    };
  },
};
</script>
<style>
.payment-gateway {
  height: auto;
  padding-bottom: 250px;
  margin-top: 130px;
}
.pg-img {
  width: 200px;
}
</style>
