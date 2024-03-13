<template>
  <div class="providedLiveGamesModal" @click="$emit('closeLiveModal')">
    <Loaders v-if="showLoaders" />
    <div class="main-modal-body" style="overflow: auto !important">
      <div style="position: absolute; right: 1%; top: 3%">
        <span
          style="padding: 20px; cursor: pointer"
          @click="$emit('closeLiveModal')"
          >X</span
        >
      </div>
      <div class="live-parent-body">
        <div
          style="text-align: center; margin-bottom: 60px"
          v-if="liveGamelist">
          <img
            :src="`/src/assets/providers_logo/${liveGamelist[0].prov_logo}`"
            style="width: 200px; filter: invert(100%)" />
        </div>
        <div class="game-list" v-if="liveGamelist">
          <div style="width: 100%" v-if="liveGamelist.length == 0">
            <h1 style="text-align: center">No games were found.</h1>
          </div>
          <InputText
            v-model="searchTerm"
            @input="handleSearch"
            class="searchField"
            placeholder="Search game here..." />

          <LiveGameNewCard
            v-for="(data, index) in passedGameList"
            :key="data.id"
            :title="data.title"
            :bgimage="data.bgimg"
            :providerLogo="data.prologo"
            :provider="data.provider"
            :favorite="data.favorite"
            :id="data.id"
            :url="data.url"
            :badgeText="data.badgeText"
            :gameType="data.gameType"
            @playGame="playGame" />
        </div>
        <div class="" style="text-align: center; margin-top: 200px" v-else>
          <h1>No Games Found</h1>
        </div>

        <!-- <div class="live-card-parent">
          <div class="live-card">
            <div class="img-live-holder">
              <img
                src="@/assets/games_logo/golden_empire.webp"
                style="width: 250px;height: 160px;" />
            </ div>
            <div class="live-card-footer">
              <span>Lorem ipsum dolor sit</span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <TheGameFrame
      :showGame="showGameModal"
      @exitGame="exitGame"
      :url="gameUrl" />
  </div>
</template>
<script>
import LiveGameNewCard from "@/components/LiveGameNewCard.vue";
import { useAuthStore } from "@/stores/user.js";
import { C2WAPIService as axios } from "@/plugins/APIServices.js";
import { ref, toRefs, watch, watchEffect, nextTick } from "vue";
import TheGameFrame from "@/components/TheGameFrame.vue";
import { useAccountBalance } from "@/stores/user_balance";
import Loaders from "@/components/Loaders.vue";
import { useActivityCheck } from "@/stores/activity_check.js";
export default {
  components: { LiveGameNewCard, TheGameFrame, Loaders },
  props: {
    liveGamelist: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const { liveGamelist } = toRefs(props);
    const passedGameList = ref(liveGamelist.value);
    const showGameModal = ref(false);
    const showLoaders = ref(false);
    const gameUrl = ref("");
    const { balance } = useAccountBalance();
    const { activityState } = useActivityCheck();
    const store = useAuthStore();
    const searchTerm = ref("");
    watch(searchTerm, () => {
      const res = liveGamelist.value.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
      passedGameList.value = res;
      console.log(res);
    });

    const playGame = async (game) => {
      if (!store.user) {
        return;
      } else {
        showLoaders.value = true;
        const token = store.user[0].token;
        const user = store.user[0].username;
        const updatedObject = {
          ...game,
          username: user,
          token: token,
        };
        const res = await axios.gameLogin(updatedObject);
        showGameModal.value = true;

        if (res.resMsg === "Session expired please relogin.") {
          localStorage.removeItem("auth.user");
          store.resetUser();
          showLoaders.value = false;
        } else {
          showLoaders.value = false;
          gameUrl.value = res.resUrl;
          activityState.url = res.resUrl;
        }
      }
    };
    const exitGame = async () => {
      showGameModal.value = false;
      if (store.user) {
        const uname = store.user[0].username;
        const token = store.user[0].token;
        const getResult = await axios.postBalance({
          username: uname,
          token: token,
        });
        balance.current_balance = getResult.balance;
        console.log(balance.current_balance);
      }
    };

    return {
      playGame,
      exitGame,
      showGameModal,
      showLoaders,
      gameUrl,
      liveGamelist,
      searchTerm,
      passedGameList,
    };
  },
};
</script>
<style>
.providedLiveGamesModal {
  position: fixed;
  z-index: 8;
  width: 100%;
  height: 100vh;
  background-color: #12121276;
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-modal-body {
  padding: 50px;
  position: relative;
  width: 70%;
  height: 80%;
  background-color: #232323;
  animation: slideDownModal 0.3s ease-in-out;
  border-radius: 10px;
}
.live-parent-body {
  /* padding: 30px;
  gap: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column; */
}

@keyframes slideDownModal {
  from {
    transform: translateY(-30%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
