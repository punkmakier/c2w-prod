<template>
  <div class="w-container">
    <div class="winners-list">
      <swiper
        ref="swSwiper"
        :modules="modules"
        :slides-per-view="8"
        :space-between="10"
        :loop="true"
        :allow-touch-move="false"
        :breakpoints="{
          '@0.00': {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          '@1.00': {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          '@1.50': {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          '@2.00': {
            slidesPerView: 8,
            spaceBetween: 10,
          },
        }"
        :autoplay="{ delay: 2000 }">
        <swiper-slide v-for="(data, index) in recentWithdrawn" :key="index">
          <TheSuccessWithdrawn
            :key="index"
            :imgsrc="data.imgsrc"
            :name="data.name"
            :money="data.money"
            :via="data.via" />
        </swiper-slide>
      </swiper>
    </div>

    <Divider style="margin-top: 0; margin-bottom: 0" />
    <div class="game-category">
      <span style="font-size: 0.9rem; font-weight: 500">Game Type</span>
      <!-- <div class="swipe-right2">
        Just swipe <i class="pi pi-arrow-right" style="font-size: 0.5rem"></i>
      </div> -->
      <!-- <div class="right-div2"></div> -->
      <swiper
        :breakpoints="{
          '@0.00': {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          '@1.00': {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          '@1.50': {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          '@2.00': {
            slidesPerView: 9,
            spaceBetween: 10,
          },
        }"
        class="mt-1">
        <swiper-slide v-for="(value, index) in gameType" :key="index">
          <div
            class="game-info-category"
            :class="{ active: value.type[0] === selectedGameType[0] }"
            @click="selectGameType(value.type)">
            <img
              :src="`/src/assets/gametype_logos/${value.img}`"
              style="object-fit: cover; border-radius: 10px"
              alt="" />
            <span
              :style="`color: #fff; font-weight: 800;margin-top: 10px; font-size: ${checkStringLength(
                value.name
              )}`"
              >{{ value.name }}</span
            >
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import TheSuccessWithdrawn from "@/components/TheSuccessWithdrawn.vue";
import { Autoplay } from "swiper/modules";
import { C2WAPIService as axios } from "@/plugins/APIServices.js";
import { useI18n } from "vue-i18n";

export default {
  components: {
    Swiper,
    SwiperSlide,
    TheSuccessWithdrawn,
  },

  setup(props, { emit }) {
    const { t } = useI18n();
    const gameType = [
      { name: t("gameTypes.all"), type: ["All"], img: "c2wall.png" },
      { name: t("gameTypes.slot"), type: ["Slot"], img: "g_slot.png" },
      { name: t("gameTypes.fishing"), type: ["Fishing"], img: "g_fishing.png" },
      { name: t("gameTypes.bingo"), type: ["Bingo"], img: "g_bingo.png" },

      {
        name: t("gameTypes.liveCasino"),
        type: ["Live Casino"],
        img: "g_live_casino.png",
      },
      {
        name: t("gameTypes.sabong"),
        type: ["Sabong"],
        img: "g_sabong.png",
      },
      { name: t("gameTypes.lotto"), type: ["Lotto"], img: "g_lotto.png" },
      {
        name: t("gameTypes.sports"),
        type: ["Sports"],
        img: "g_sports.png",
      },
      {
        name: t("gameTypes.arcade"),
        type: ["arcade", "fruit game"],
        img: "g_arcade_fruit.png",
      },
    ];

    const recentWithdrawn = ref([]);

    onMounted(async () => {
      try {
        const response = await axios.getWithdrawals();
        const returnValue = response.map((item) => {
          if (parseInt(item.via) === 0) {
            return { ...item, via: "Paymaya" };
          } else if (parseInt(item.via) === 7) {
            return { ...item, via: "GCASH" };
          } else {
            return item;
          }
        });
        const getRandomPic = returnValue.map((item) => {
          const picRandomizer = [
            "pic1.png",
            "pic2.png",
            "pic3.png",
            "pic4.png",
            "pic5.png",
            "pic6.png",
            "pic7.png",
            "pic8.png",
            "pic9.png",
            "pic10.png",
            "pic11.png",
            "pic12.png",
            "pic13.png",
            "pic14.png",
            "pic15.png",
            "pic16.png",
            "pic17.png",
            "pic18.png",
            "pic19.png",
            "pic20.png",
            "pic21.png",
            "pic22.png",
            "pic23.png",
          ];
          const imgsrc =
            picRandomizer[Math.floor(Math.random() * picRandomizer.length)];
          return { ...item, imgsrc };
        });

        const finalValue = getRandomPic.map((item) => {
          const moneyFormatted = item.money.toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
          });

          return {
            ...item,
            money: moneyFormatted,
          };
        });

        recentWithdrawn.value = finalValue;
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    });

    const selectedGameType = ref(["All"]); // Initialize selectedGameType with a default value

    const gameTypeClasses = computed(() => {
      const classes = {};
      gameType.forEach((type) => {
        classes[type] = type === selectedGameType.value;
      });
      return classes;
    });

    const selectGameType = (value) => {
      console.log(value);
      selectedGameType.value = value;
      emit("gameTypeSelection", value);
    };

    const checkStringLength = (words) => {
      const totalLength = words.length;
      let fontSize = "0.9rem;";
      if (totalLength > 15) {
        fontSize = "0.85rem";
        return fontSize;
      }
      if (totalLength < 10) {
        fontSize = "1rem";
        return fontSize;
      }
    };

    return {
      modules: [Autoplay],
      gameType,
      checkStringLength,
      recentWithdrawn,
      selectedGameType,
      gameTypeClasses,
      selectGameType,
    };
  },
};
</script>
<style>
.game-info-category.active {
  position: relative;
  border: 1px solid var(--primary-color);
}

.game-info-category.active::after {
  content: "";
  position: absolute;
  top: 0%;
  right: 0%;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-bottom: 15px solid var(--primary-color);
  border-right: 15px solid transparent;
  transform: rotate(180deg);
}
.w-container {
  width: 98%;
  height: auto;
  position: relative;
  left: 0;
  bottom: 1%;
  right: 0;
  margin: 0 auto;
  z-index: 2;
  background: rgba(25, 29, 29, 0.75);
  box-shadow: 0 8px 32px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.035);
}
.winners-list {
  display: flex;
  position: relative;
  padding-top: 10px;
  overflow: hidden;
  width: 100%;
}
.winner-info {
  border-radius: 5px;
  display: flex;
  max-width: 250px;
  max-height: 250px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 5px 0 10px;
  flex-basis: 10%;
}
/* .clickToPlay {
  text-decoration: none;
  color: #fff;
  background-color: var(--primary-color);
  padding: 7px 10px;
  border-radius: 3px;
  font-weight: 500;
  box-shadow: 0 2px 5px rgb(253, 45, 94, 69%);
  transition: 0.2s ease-in-out;
}
.clickToPlay:hover {
  background-color: rgb(253, 45, 94, 69%);
} */
.game-category {
  padding: 10px;
  padding-bottom: 20px;
  position: relative;
}
.game-info-category {
  height: 140px;
  /* background-color: rgb(134, 134, 134, 10%); */
  /* border: 1px solid rgb(134, 134, 134, 30%); */
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background: url("@/assets/gametype_logos/gametype_bg1.png"); */
}

.game-info-category:hover {
  background-color: rgb(134, 134, 134, 40%);
}
.p-divider.p-divider-horizontal:before {
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
}
</style>
