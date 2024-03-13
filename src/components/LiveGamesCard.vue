<template>
  <div
    class="game-info-live"
    @click="
      $emit('showLiveGameModal', {
        gameID: id,
        name: providerName,
        prov_logo: providerImage,
      })
    "
    v-tooltip.bottom="`Click to show all games of ${title}`">
    <div class="game-badge" v-if="badgeText">
      <span>{{ badgeText }}</span>
    </div>

    <div class="game-logo-handler">
      <img
        :src="`/src/assets/games_logo/${bgimage}`"
        alt=""
        class="games-logo"
        style="width: 100% !important" />
    </div>

    <!-- <div class="ghost-view">
      <span
        class="play-game-button"
        v-tooltip.bottom="'Play'"
        @click="$emit('playInHouseGame', { gameID: id })"
        ><i class="pi pi-play" style="font-size: 1.2rem; margin-left: 5px"></i
      ></span>
    </div> -->
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
    title: {
      type: String,
      required: true,
      default: "Default Title",
    },
    providerName: {
      type: String,
      required: false,
    },
    bgimage: {
      type: String,
      required: true,
      default: "golden_empire.jpg",
    },

    badgeText: {
      type: String,
      required: false,
      default: "",
    },

    url: {
      type: String,
      required: true,
      default: "come2win.ph",
    },
    providerImage: {
      type: String,
      required: true,
    },
  },
  methods: {
    fontAdjustment(words) {
      let defaultSize = "1rem";
      if (words.length >= 12) {
        defaultSize = "0.8rem";
      }
      return defaultSize;
    },
    openLink(link) {
      window.open(link, "_blank");
    },
  },
};
</script>
<style>
.game-logo-handler {
  overflow: hidden;
}
.games-logo {
  width: 200px;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
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

.game-info-live {
  width: 180px;
  height: 180px;
  cursor: pointer;
  background: rgb(30, 26, 26);
  background: radial-gradient(
    circle,
    rgba(30, 26, 26, 1) 0%,
    rgba(68, 19, 19, 0.8071603641456583) 52%,
    rgba(30, 26, 26, 1) 100%
  );
  border: 1px solid rgb(134, 134, 134, 30%);
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  position: relative;
}

.game-info-live:hover .ghost-view {
  display: flex;
}

.game-info-live:hover .games-logo {
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
.game-title {
  width: 70%;
}

.game-details .game-provider-logo {
  width: 50px;
}
</style>
