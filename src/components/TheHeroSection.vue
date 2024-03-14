<script>
import TheHeader from "@/components/TheHeader.vue";
import RecentDisplay from "@/components/RecentDisplay.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useAuthStore } from "@/stores/user.js";
import { ref, onMounted, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import "swiper/css";
export default {
  components: {
    TheHeader,
    RecentDisplay,
    Swiper,
    SwiperSlide,
    TheSidebar,
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const toggleSideMenu = ref(false);
    const passedDataFunc = (event) => {
      emit("gameTypeFunc", event);
    };
    const isShaking = ref(true);

    const shakeInterval = () => {
      setInterval(() => {
        isShaking.value = true;
        setTimeout(() => {
          isShaking.value = false;
        }, 500); // 0.5s matches the duration of the animation
      }, 2000);
    };

    const store = useAuthStore();
    const showBurger = ref(false);

    onMounted(() => {
      shakeInterval();
      if (store.user) {
        showBurger.value = true;
      } else {
        showBurger.value = false;
        toggleSideMenu.value = false;
      }
    });

    // Use watchEffect to watch for changes in showWalletBalance
    watchEffect(() => {
      if (store.user) {
        showBurger.value = true;
      } else {
        showBurger.value = false;
        toggleSideMenu.value = false;
      }
    });
    const heroContent = ref([
      {
        bgimage: "main-bg.png",
        headerImage: "logo.webp",
        subtext: t("heroSection.slide_c2w.text"),
        button: t("heroSection.slide_c2w.btnText"),
        imageHolder: "char2.webp",
      },
      {
        bgimage: "bg-first-deposit.webp",
        headerImage: "first-deposit-bonus.png",
        subtext: t("heroSection.slide_first_depo.text"),
        button: t("heroSection.slide_first_depo.btnText"),
        imageHolder: "prom-1.png",
      },
      {
        bgimage: "sabong-bg.png",
        headerImage: "sabong-float.png",
        subtext: t("heroSection.slide_first_depo.text"),
        button: t("heroSection.slide_first_depo.btnText"),
        imageHolder: "dot.png",
      },
      {
        bgimage: "bingo-bg.png",
        headerImage: "pick3-float.png",
        subtext: t("heroSection.slide_first_depo.text"),
        button: t("heroSection.slide_first_depo.btnText"),
        imageHolder: "bingo-float.png",
      },
      {
        bgimage: "lottery-bg.png",
        headerImage: "ez2-float.png",
        subtext: t("heroSection.slide_first_depo.text"),
        button: t("heroSection.slide_first_depo.btnText"),
        imageHolder: "lottery-float.png",
      },
      {
        bgimage: "virtual-bg.png",
        headerImage: "virtual-header.png",
        subtext: t("heroSection.slide_first_depo.text"),
        button: t("heroSection.slide_first_depo.btnText"),
        imageHolder: "virtual-float.png",
      },
      {
        bgimage: "sports-bg.png",
        headerImage: "sport-betting-float.png",
        subtext: t("heroSection.slide_first_depo.text"),
        button: t("heroSection.slide_first_depo.btnText"),
        imageHolder: "sport-float.png",
      },
      // {
      //   bgimage: "bg-lottery.png",
      //   headerImage: "lotto-header.png",
      //   subtext: t("heroSection.slide_lottery.text"),
      //   button: t("heroSection.slide_casino.btnText"),
      //   imageHolder: "lottery-char.png",
      // },
      // {
      //   bgimage: "bg-casino.png",
      //   headerImage: "casino-header.png",
      //   subtext: t("heroSection.slide_casino.text"),
      //   button: t("heroSection.slide_casino.btnText"),
      //   imageHolder: "casino-char.png",
      // },
      // {
      //   bgimage: "bg-virtual-sports.png",
      //   headerImage: "virtual-header.png",
      //   subtext: t("heroSection.slide_virtual.text"),
      //   button: t("heroSection.slide_virtual.btnText"),
      //   imageHolder: "virtual-sports-char.png",
      // },
      // {
      //   bgimage: "bg-sports-betting.png",
      //   headerImage: "sports-header.png",
      //   subtext: t("heroSection.slide_sports.text"),
      //   button: t("heroSection.slide_sports.btnText"),
      //   imageHolder: "sports-betting-char.png",
      // },
    ]);
    return {
      modules: [Autoplay],
      heroContent,
      passedDataFunc,
      showBurger,
      isShaking,
      toggleSideMenu,
    };
  },
};
</script>
<template>
  <div class="hero-section">
    <div
      v-if="showBurger"
      @click="toggleSideMenu = true"
      class="burger"
      style="position: absolute; right: 3%; top: 3%; display: none; z-index: 2">
      <i class="pi pi-align-right" style="font-size: 2rem; cursor: pointer"></i>
    </div>
    <!-- The Header -->
    <TheHeader />
    <!-- Carousel -->
    <swiper
      class="carousel-parent"
      :modules="modules"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{
        delay: 3000,
      }">
      <swiper-slide v-for="(value, index) in heroContent" :key="index">
        <div class="hero-content-1">
          <img
            :src="`/src/assets/images/${value.bgimage}`"
            class="bg-image-carousel" />
          <div class="hrtext-1" style="font-weight: 800">
            <img
              :src="`/src/assets/images/${value.headerImage}`"
              class="logo-herosection logoUpdown" />

            <p
              style="
                color: #fff;
                font-weight: 300;
                text-shadow: 0 2px #000;
                background-color: #1e1a1a;
                padding: 10px;
                border-radius: 6px;
                border: 1px solid #ff1354;
              ">
              {{ value.subtext }}
            </p>
            <Button
              v-if="value.button"
              :label="value.button"
              icon="pi pi-play"
              class="mt-1"
              :class="{ buttonShake: isShaking }"
              rounded />
          </div>
          <img :src="`/src/assets/images/${value.imageHolder}`" class="chars" />
          <!-- <img :src="`/src/assets/images/char2.webp`" class="characters" /> -->
        </div>
      </swiper-slide>
    </swiper>
    <!-- Recent Winners -->
    <RecentDisplay @gameTypeSelection="passedDataFunc" />
    <Sidebar v-model:visible="toggleSideMenu" header=" " position="right">
      <TheSidebar />
    </Sidebar>
  </div>
</template>

<style>
.hero-content-1 {
  display: flex;
  padding: 10px 50px;
  align-items: center;
  justify-content: space-around;
}
.hrtext-1 {
  position: relative;
  width: 450px;
  z-index: 2;
}
.hrtext-1 img {
  width: 400px;
  margin-left: -40px;
}
.bg-image-carousel {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.carousel-parent {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.hero-section {
  min-height: 107vh;
  /* background: url("@/assets/images/bghero-1.avif"); */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.swiper-wrapper {
  height: auto !important;
}
.chars {
  z-index: 2;
  animation: showUp 0.8s ease-in;
}
@keyframes showUp {
  from {
    transform: translateY(100px);
  }
  to {
    transform: translateY(0px);
  }
}
</style>
