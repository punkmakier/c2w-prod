<template>
  <div class="frame-parent" v-if="showSelectedGame">
    <div class="inner-frame">
      <div class="frame-header" :class="{ zero: zero }">
        <div class="goback" @click="exitGame">
          <i class="pi pi-arrow-left" style="font-size: 1.5rem"></i
          ><span class="ms-2" style="text-shadow: 0 0 5px #000">GO BACK</span>
        </div>

        <span class="goshow" style="margin-right: 90px" @click="toggleClass">
          <i class="pi" :class="zero ? 'pi-angle-up' : 'pi-angle-down'"></i>
        </span>
        <span></span>
      </div>
      <div class="frame-body">
        <iframe :src="url" frameborder="0" v-if="url"></iframe>
        <iframe
          :srcdoc="htmlType"
          frameborder="0"
          v-else-if="htmlType"></iframe>

        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 30px;
          "
          v-else>
          <img
            src="/src/assets/images/maintenance_game.svg"
            style="width: 450px" />
          <h1>Sorry, this game is under maintenance</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRef, watchEffect, ref } from "vue";
import { useActivityCheck } from "@/stores/activity_check";
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    showGame: {
      type: Boolean,
      default: false,
    },
    htmlType: {
      type: String,
      default: "",
    },
  },

  setup(props, { emit }) {
    const { activityState } = useActivityCheck();
    const showSelectedGame = toRef(props, "showGame");
    const exitGame = () => {
      activityState.url = "";
      emit("exitGame");
    };
    const zero = ref(false);

    watchEffect(() => {
      if (showSelectedGame.value) {
        zero.value = false;
        // Check here if landscape or portrait
      } else {
        zero.value = true;
      }
    });

    const toggleClass = () => {
      zero.value = !zero.value;
    };
    return {
      exitGame,
      showSelectedGame,
      zero,
      toggleClass,
    };
  },
};
</script>

<style>
.zero {
  top: 0% !important;
}
.frame-header {
  width: 100%;
  height: 70px;
  background-color: #1e1a1a;
  position: absolute;
  top: -8.4%;
  z-index: 9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  transition: 0.3s ease-in-out;
}
.frame-header .goback {
  cursor: pointer;
}

.frame-header .goshow {
  background-color: #1e1a1a;
  width: 80px;
  height: 40px;
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  animation: 2s downAnim infinite linear;
  cursor: pointer;
}

@keyframes downAnim {
  0% {
    padding-top: 10px;
  }
  50% {
    padding-top: 20px;
  }
  75% {
    padding-top: 20px;
  }
  100% {
    padding-top: 10px;
  }
}

.frame-header .goshow span {
  font-size: 0.6rem;
}
.frame-parent {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inner-frame {
  width: 100%;
  height: 100vh;
  position: fixed;
  background-color: #1e1a1a;
  border-radius: 10px;
}

iframe {
  width: 100%;
  height: 100%;
}
.frame-body {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>
