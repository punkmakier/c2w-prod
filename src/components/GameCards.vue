<template>
  <div class="">
    <div class="game-info">
      <div class="game-badge" v-if="badgeText">
        <span>{{ badgeText }}</span>
      </div>
      <div class="game-content-card">
        <div class="game-logo-handler">
          <img :src="`${bgimage}`" :alt="title" class="games-logo" />
          <!-- <img
            :src="`/src/assets/games_logo/fortune_game.avif`"
            :alt="title"
            class="games-logo" /> -->
          <!-- <img :src="bgimage" :alt="title" class="games-logo" /> -->
        </div>

        <!-- <div class="game-details">
          <span
            class="game-title"
            :style="`font-size: ${fontAdjustment(title)}`"
            >{{ title }}</span
          >
        </div> -->
      </div>

      <div class="ghost-view">
        <span class="mark-favorite" v-if="!favorite && showFavIcon"
          ><i
            class="pi pi-heart heart-outlined"
            style="font-size: 1.4rem"
            v-tooltip.bottom="'Add this game to my favorite list'"
            @click="$emit('addRemoveFavoriteList', id)"></i
        ></span>
        <span class="mark-favorite" v-if="favorite"
          ><i
            class="pi pi-heart-fill heart-outlined primary-text"
            style="font-size: 1.4rem"
            v-tooltip.bottom="'Remove this game to my favorite list'"
            @click="$emit('addRemoveFavoriteList', id)"></i
        ></span>

        <span
          class="play-game-button"
          v-tooltip.bottom="'Play'"
          @click="$emit('playGame', { gameID: id, gcode: gameType })"
          ><i class="pi pi-play" style="font-size: 1.2rem; margin-left: 5px"></i
        ></span>
      </div>
    </div>
    <div class="gameNames" :title="title" v-tooltip.bottom="`${title}`">
      {{ truncatedTitle(title) }}
    </div>
  </div>
</template>
<script>
import { useAuthStore } from "@/stores/user.js";
import { ref, watch } from "vue";
export default {
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: "Default Title",
    },
    gameType: {
      type: String,
      required: false,
    },
    bgimage: {
      type: String,
      required: false,
      default: "golden_empire.jpg",
    },
    provider: {
      type: String,
      required: false,
      default: "",
    },
    providerLogo: {
      type: String,
      required: false,
      default: "cg.png",
    },
    badgeText: {
      type: String,
      required: false,
      default: "",
    },
    favorite: {
      type: Boolean,
      required: false,
      default: false,
    },
    url: {
      type: String,
      required: false,
      default: "come2win.ph",
    },
  },
  setup() {
    const store = useAuthStore();
    const showFavIcon = ref(false);
    if (store.user) {
      showFavIcon.value = true;
    }
    watch(
      () => store.user,
      (newVal) => {
        showFavIcon.value = Boolean(newVal);
      }
    );
    const truncatedTitle = (title) => {
      let maxLength = 17;

      if (window.screen.width <= 360) {
        maxLength = 8;
      }
      if (window.screen.width >= 361 && window.screen.width <= 430) {
        maxLength = 12;
      }

      if (window.screen.width >= 431 && window.screen.width <= 470) {
        maxLength = 15;
      }
      if (title.length > maxLength) {
        return title.substring(0, maxLength) + "...";
      } else {
        return title;
      }
    };

    return {
      showFavIcon,
      truncatedTitle,
    };
  },
  methods: {
    fontAdjustment(words) {
      let defaultSize = "1rem";
      if (words.length >= 12) {
        defaultSize = "0.8rem";
      }
      return defaultSize;
    },
  },
};
</script>
<style>
.game-content-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.game-details {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 42px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background: rgb(30, 26, 26);
  background: -moz-linear-gradient(
    90deg,
    rgba(30, 26, 26, 0.7315301120448179) 0%,
    rgba(253, 29, 29, 1) 50%,
    rgba(30, 26, 26, 0.7203256302521008) 100%
  );
  background: -webkit-linear-gradient(
    90deg,
    rgba(30, 26, 26, 0.7315301120448179) 0%,
    rgba(253, 29, 29, 1) 50%,
    rgba(30, 26, 26, 0.7203256302521008) 100%
  );
  background: linear-gradient(
    90deg,
    rgba(30, 26, 26, 0.7315301120448179) 0%,
    rgba(253, 29, 29, 1) 50%,
    rgba(30, 26, 26, 0.7203256302521008) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#1e1a1a",endColorstr="#1e1a1a",GradientType=1);
}
.game-logo-handler {
  overflow: hidden;
}
.games-logo {
  width: 180px;
  display: block;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
  margin: 0 auto;
}
.ghost-view {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: rgba(19, 21, 33, 0.6);
  display: none;
}

.game-info {
  width: 180px;
  height: 180px;
  cursor: pointer;
  background-color: rgb(134, 134, 134, 10%);
  border: 1px solid rgb(134, 134, 134, 30%);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.game-info:hover .ghost-view {
  display: flex;
}

.game-info:hover .games-logo {
  transform: scale(1.1);
}

.play-game-button {
  background-color: #ff1354;
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in-out;
  animation: bounce 0.2s ease-in;
  margin: auto auto;
}
.mark-favorite {
  position: absolute !important;
  top: 4%;
  right: 4%;
  cursor: pointer;
}
.mark-favorite span {
  font-size: 0.7rem;
}

.play-game-button:hover {
  background-color: blue;
  width: 70px;
  height: 70px;
}

.heart-outlined:hover {
  color: #ff1354 !important;
}

.game-badge {
  position: absolute;
  top: 4%;
  right: 5%;
  padding: 0 8px 2px 8px;
  background-color: #ff1354;
  border-radius: 4px;
  box-shadow: 0 5px 20px rgb(0, 0, 0);
}
.game-badge span {
  font-size: 0.7rem;
  font-weight: 600;
}

.game-details .game-provider-logo {
  width: 50px;
}
.gameNames {
  background-color: rgb(134, 134, 134, 10%);
  border: 1px solid rgb(134, 134, 134, 30%);
  border-radius: 5px;
  padding: 6px;
  margin-top: -6px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 13px;
  width: auto;
}
</style>
