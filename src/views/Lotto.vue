<template>
  <div class="lotto-top">
    <div class="lottery-content-upper">
      <h1>{{ $t("lottery") }}</h1>
      <p>
        {{ $t("lotteryText") }}
      </p>
      <div class="lotto-logo-1">
        <img src="@/assets/lotto_logos/ez2.png" style="width: 50px" alt="" />
        <img src="@/assets/lotto_logos/pick3.png" style="width: 50px" alt="" />
        <img src="@/assets/lotto_logos/3d.png" style="width: 50px" alt="" />
      </div>
    </div>
    <div class="prizes-mech">
      <swiper :modules="modules" :slides-per-view="1" :loop="true">
        <swiper-slide v-for="(value, index) in ez2prizes" :key="index">
          <div class="sd">
            <img
              :src="`/src/assets/lotto_logos/${value}`"
              @click="showBigImage(index, value)"
              style="cursor: pointer" />
          </div>
        </swiper-slide>
        <Button label="BET EZ-2" icon="pi pi-star-fill" class="w-100 mt-2" />
      </swiper>
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{
          delay: 3000,
        }">
        <swiper-slide v-for="(value, index) in d3prizes" :key="index">
          <div class="sd">
            <img
              :src="`/src/assets/lotto_logos/${value}`"
              @click="showBigImage(index, value)"
              style="cursor: pointer" />
          </div>
        </swiper-slide>
        <Button
          label="BET 3D Lotto"
          icon="pi pi-star-fill"
          class="w-100 mt-2" />
      </swiper>
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{
          delay: 5000,
        }">
        <swiper-slide v-for="(value, index) in pick3prizes" :key="index">
          <div class="sd">
            <img
              :src="`/src/assets/lotto_logos/${value}`"
              @click="showBigImage(index, value)"
              style="cursor: pointer" />
          </div>
        </swiper-slide>
        <Button
          label="BET Lucky Pick 3"
          icon="pi pi-star-fill"
          class="w-100 mt-2" />
      </swiper>
    </div>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";

import "swiper/css";
export default {
  components: { Swiper, SwiperSlide },
  setup() {
    const ez2prizes = ["ez2prizes.png"];
    const d3prizes = ["3dprizes.png"];
    const pick3prizes = [
      "pick3prizes.png",
      "pick3prizes2.png",
      "pick3prizes3.png",
    ];

    const showBigImage = (index, value) => {
      const bigImg = document.createElement("img");
      bigImg.style.width = "100%";
      bigImg.style.height = "80vh";
      bigImg.style.display = "inline";

      bigImg.src = `/src/assets/lotto_logos/${value}`;

      const over = document.createElement("div");
      document.body.style.overflow = "hidden";
      over.style.height = "100vh";
      over.style.width = "100%";
      bigImg.style.margin = "60px auto";
      over.style.background = "rgba(0,0,0,.82)";
      over.style.position = "fixed";
      over.style.top = "0";
      over.style.left = "0";
      over.style.opacity = "0.0";
      over.style.cursor = "pointer";
      over.style.zIndex = "9999";
      over.style.textAlign = "center";

      over.appendChild(bigImg);

      over.addEventListener("click", () => {
        document.body.style.overflow = "";
        over.style.opacity = "0";
        setTimeout(() => {
          document.body.removeChild(over);
        }, 300);
      });

      document.body.appendChild(over);

      setTimeout(() => {
        over.style.opacity = "1";
      }, 0);
    };
    return {
      modules: [Autoplay],
      pick3prizes,
      ez2prizes,
      d3prizes,
      showBigImage,
    };
  },
};
</script>
<style>
.lotto-top {
  background: rgb(26, 28, 30);

  background: -moz-linear-gradient(
    75deg,
    rgba(26, 28, 30, 1) 0%,
    rgba(26, 28, 30, 1) 33%,
    rgba(253, 45, 94, 0.38139005602240894) 100%
  );
  background: -webkit-linear-gradient(
    75deg,
    rgba(26, 28, 30, 1) 0%,
    rgba(26, 28, 30, 1) 33%,
    rgba(253, 45, 94, 0.38139005602240894) 100%
  );
  background: linear-gradient(
    75deg,
    rgba(26, 28, 30, 1) 0%,
    rgba(26, 28, 30, 1) 33%,
    rgba(253, 45, 94, 0.38139005602240894) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#1a1c1e",endColorstr="#fd2d5e",GradientType=1);
  padding: 30px;
  display: flex;
  justify-content: space-between;
  margin-top: -42px;
  flex-direction: column;
  padding-bottom: 200px;
}
.lottery-content-upper {
  width: 40%;
  text-align: center;
  margin: 0 auto;
  margin-top: 130px;
}

.lotto-logo-1 {
  display: flex;
  gap: 20px;
  justify-content: center;
}
.prizes-mech {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 4rem;
  position: relative;
}
.sd {
  width: auto;
  height: auto;
  border-radius: 10px;
}
.sd img {
  border-radius: 10px;
  display: block;
  height: 600px;
}

.prizes-mech .swiper {
  width: 465px;
}
</style>
