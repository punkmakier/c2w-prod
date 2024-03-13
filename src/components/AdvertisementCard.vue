<template>
  <div class="advCard">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{
        delay: 2000,
      }">
      <swiper-slide v-for="(value, index) in ads" :key="index">
        <img :src="`/src/assets/advertisement/${value}`" alt="" />
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { Autoplay } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup(props, { emit }) {
    const ads = ["ad1.png", "ad2.png", "ad3.png"];

    return {
      modules: [Autoplay],
      ads,
    };
  },
};
</script>

<style>
.advCard {
  width: 380px;
  height: 400px;
  border-radius: 15px;
}
.advCard img {
  border-radius: 15px;
}
</style>
