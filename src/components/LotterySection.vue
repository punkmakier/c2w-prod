<template>
  <div class="lottery-parent">
    <div class="header-lottery-section">
      <div class="lottery-content">
        <h1>Lottery</h1>
        <p>
          Our lottery results are sourced directly from the
          <b style="color: yellow"
            >Philippine Charity Sweepstakes Office (PCSO)</b
          >, guaranteeing a fair and unbiased gaming experience. Trust in our
          commitment to integrity as we bring you transparent and impartial
          lottery draws.
        </p>
        <div class="lotto-logo">
          <img src="@/assets/lotto_logos/ez2.png" style="width: 50px" alt="" />
          <img
            src="@/assets/lotto_logos/pick3.png"
            style="width: 50px"
            alt="" />
          <img src="@/assets/lotto_logos/3d.png" style="width: 50px" alt="" />
        </div>
      </div>
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{
          delay: 3000,
        }"
        class="pm">
        <swiper-slide v-for="(value, index) in photosLottery" :key="index">
          <div class="prizes-mechanics">
            <img :src="`/src/assets/lotto_logos/${value}`" alt="" />
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="lottery-inner">
      <div class="lottery-card" v-for="(data, index) in lottoc2w" :key="index">
        <div class="lotter-header">
          <img
            :src="`/src/assets/lotto_logos/${data.lottoTypeImg}`"
            style="width: 70px"
            alt="" />
          <img
            :src="`/src/assets/images/${data.lottoImg}`"
            style="width: 70px"
            alt="" />
        </div>
        <div class="lottery-body">
          <p>
            Next Draw<br /><span>{{ data.nextDraw }}</span>
          </p>
        </div>
        <div class="winner-mechanics-parent">
          <span class="luckyw"
            >Latest Result
            <small style="color: var(--surface-300)">{{
              data.lottoLatestResult
            }}</small></span
          >
          <div class="winner-mechanics">
            <div class="lotto-result">
              <div
                class="lotto-ball"
                v-for="value in data.latestDrawResult"
                :key="value.id">
                <span>{{ value }}</span>
              </div>
            </div>
            <div
              class="view-mechanics"
              @click="openMechanics(data.mechanicsType)">
              <span>View Mechanics</span>
            </div>
          </div>
        </div>
        <router-link
          class="lottery-footer"
          :to="{ name: 'lottery', params: { type: data.type } }"
          >Play Now</router-link
        >
      </div>
      <Dialog
        v-model:visible="mechanicsTypeModal"
        modal
        :header="`${modalContentMechanics} Mechanics`"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div v-if="modalContentMechanics == 'EZ-2'">EZ - 2</div>
        <div v-if="modalContentMechanics == 'Lucky Pick 3'">Lucky Pick 3</div>
        <div v-if="modalContentMechanics == '3D Lotto'">3D Lotto</div>
      </Dialog>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { Autoplay } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const photosLottery = [
      "ez2_banner.png",
      "luckypick3_banner.png",
      "char3.png",
    ];

    const lottoc2w = [
      {
        lottoTypeImg: "ez2.png",
        lottoImg: "logo.webp",
        nextDraw: "05:03:02",
        lottoLatestResult: "2023-01-09 / 09:00:00",
        latestDrawResult: ["3", "12"],
        mechanicsType: "EZ-2",
        type: "ez2",
      },
      {
        lottoTypeImg: "pick3.png",
        lottoImg: "logo.webp",
        nextDraw: "08:23:42",
        lottoLatestResult: "2023-01-09 / 05:00:00",
        latestDrawResult: ["8", "34", "43"],
        mechanicsType: "Lucky Pick 3",
        type: "pick3",
      },
      {
        lottoTypeImg: "3d.png",
        lottoImg: "logo.webp",
        nextDraw: "02:23:42",
        lottoLatestResult: "2023-01-09 / 07:00:00",
        latestDrawResult: ["15", "53", "33"],
        mechanicsType: "3D Lotto",
        type: "3dLotto",
      },
    ];

    const mechanicsTypeModal = ref(false);
    const modalContentMechanics = ref("");

    const openMechanics = (type) => {
      mechanicsTypeModal.value = true;
      modalContentMechanics.value = type;
    };

    return {
      modules: [Autoplay],
      photosLottery,
      mechanicsTypeModal,
      lottoc2w,
      openMechanics,
      modalContentMechanics,
    };
  },
};
</script>
<style>
.lotto-logo {
  display: flex;
  gap: 20px;
}
.header-lottery-section {
  display: flex;
  gap: 20px;
  margin-top: 100px;
  margin-bottom: 70px;
}
.lottery-inner {
  display: flex;
  gap: 40px;
}
.lottery-content {
  width: 40%;
}

.pm {
  width: 60%;
  border-radius: 17px;
}
.prizes-mechanics {
  background-color: #8c8484;
  height: 270px;
  border-radius: 10px;
}
.prizes-mechanics img {
  border-radius: 10px;
}
.lottery-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #8e2f2f;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;
  text-decoration: none;
  color: #fefefe;
  font-size: 1.2rem;
}
.lottery-footer:hover {
  background-color: #8e2f2fc6;
}
.lottery-footer span {
  font-size: 1.1rem;
}
.view-mechanics {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  background-color: rgba(215, 55, 55, 37%);
  cursor: pointer;
  transition: 0.3s ease;
}
.view-mechanics:hover {
  background-color: rgba(151, 23, 23, 0.392);
}
.view-mechanics span {
  font-size: 0.9rem;
}
.lotto-result {
  width: 60%;
  background-color: rgb(217, 217, 217, 13%);
  padding: 10px;
  align-items: center;
  display: flex;
  gap: 7px;
}
.lotto-result .lotto-ball {
  width: 40px;
  border-radius: 50%;
  height: 40px;
  background-color: rgb(39, 202, 112);
  box-shadow: 0 2px 10px rgb(39, 202, 112);
  display: flex;
  align-items: center;
  justify-content: center;
}
.lottery-card {
  width: clamp(250px, 30%, 450px);
  border-radius: 10px;
  background-color: #d14e4e;
  flex-grow: 1;
}
.lottery-body {
  display: flex;
  justify-content: center;
  align-items: center;
}
.winner-mechanics-parent .luckyw {
  font-size: 0.9rem;
  margin: 10px;
}
.winner-mechanics {
  width: 100%;
  position: relative;
  display: flex;
}
.lottery-body p {
  text-align: center;
  font-size: 0.9rem;
}
.lottery-body p span {
  font-size: 3rem;
  font-weight: 600;
}
.lottery-card .lotter-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 0px 10px;
}
.lottery-parent {
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
</style>
