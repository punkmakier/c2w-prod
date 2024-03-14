<template>
  <div class="providers">
    <div
      class="providers-info"
      :class="{ active: selectedProviders == '' || selectedProviders == 'All' }"
      @click="selectedProvider('')">
      <span>All </span>
    </div>
    <div class="swipe-right">
      {{ $t("justSwipe") }}
      <i class="pi pi-arrow-right" style="font-size: 0.5rem"></i>
    </div>
    <swiper
      :space-between="10"
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
      }">
      <swiper-slide v-for="(value, index) in providers" :key="value.id">
        <div
          class="providers-info"
          :class="{ active: value.name === selectedProviders }"
          @click="selectedProvider(value.name)">
          <img
            :src="`./src/assets/providers_logo/${value.logo}`"
            :alt="value.name"
            class="providerLogo" />
        </div>
      </swiper-slide>
    </swiper>

    <!-- <Dropdown
      v-model="selectedCity"
      :options="cities"
      optionLabel="name"
      placeholder="Providers"
      @change="$emit('selectProvider', selectedCity.holder)"
      class="w-full md:w-14rem customDropdown" /> -->
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { C2WAPIService as axios } from "@/plugins/APIServices.js";

export default {
  components: { Swiper, SwiperSlide },
  setup(props, { emit }) {
    // const selectedCity = ref();
    // const cities = ref([
    //   { name: "All Providers", holder: "" },
    //   { name: "Jili", holder: "Jili" },
    //   { name: "Creative Gaming", holder: "Creative Gaming" },
    //   { name: "Fa Chai", holder: "Fa Chai" },
    //   { name: "BIGPOT Gaming", holder: "BIGPOT Gaming" },
    //   { name: "Pocket Game Soft", holder: "Pocket Game Soft" },
    //   { name: "Playstar", holder: "Playstar" },
    //   { name: "Funta Gaming", holder: "Funta Gaming" },
    //   { name: "Fast Spin", holder: "Fast Spin" },
    //   { name: "Funky Games", holder: "Funky Games" },
    //   { name: "JDB", holder: "JDB" },
    //   { name: "CQ9 Gaming", holder: "CQ9 Gaming" },
    // ]);

    const providers = ref();

    onMounted(async () => {
      const response = await axios.getProviders();
      providers.value = response;
    });

    const selectedProviders = ref("");

    const gameTypeClasses = computed(() => {
      const classes = {};
      providers.forEach((type) => {
        selectedProviders.value = type;
        classes[type] = type === providers.value.name;
      });
      return classes;
    });
    const selectedProvider = (value) => {
      selectedProviders.value = value;
      console.log(selectedProviders.value);
      emit("selectProvider", value);
    };

    return {
      providers,
      gameTypeClasses,
      selectedProviders,
      selectedProvider,
    };
  },
};
</script>
<style>
.providers {
  display: flex;
  gap: 10px;
  position: relative;
}
.providerLogo {
  width: 80px;
}

.providers-info {
  background-color: rgb(134, 134, 134, 10%);
  border: 1px solid rgb(134, 134, 134, 30%);
  width: auto;
  padding: 6px 20px;
  border-radius: 7px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
}
.providers-info:hover {
  background-color: rgb(134, 134, 134, 40%);
}
.customDropdown {
  background-color: rgb(134, 134, 134, 10%);
  border: 1px solid rgb(134, 134, 134, 30%);
}
.customDropdown > span {
  color: #fefefe;
}
.customDropdown .p-inputtext {
  background-color: rgb(134, 134, 134, 0%);
}
.customDropdown .p-icon {
  color: #fefefe;
}
.p-dropdown-items-wrapper {
  background-color: #1a1d1e;
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item {
  color: #fefefe;
}
.p-dropdown-panel
  .p-dropdown-items
  .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover,
.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
  background-color: rgb(134, 134, 134, 10%);
}

.providers .active {
  position: relative;
  border: 1px solid var(--primary-color);
}

.providers .active::after {
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
</style>
