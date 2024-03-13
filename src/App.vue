<script>
import { RouterView } from "vue-router";
import { useAuthStore } from "@/stores/user.js";
import { useActivityCheck } from "@/stores/activity_check.js";
import SessionExpired from "@/components/SessionExpired.vue";
import { C2WAPIService as axios } from "@/plugins/APIServices";
export default {
  components: { SessionExpired },
  data() {
    return {
      showSessionExpired: false,
    };
  },
  mounted() {
    if (localStorage.getItem("language") == null) {
      localStorage.setItem("language", "EN");
    }
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();

      const deferredPrompt = e;

      const installButton = document.createElement("button");
      installButton.textContent = "Install App";
      installButton.style.position = "fixed";
      installButton.style.top = "10px";
      installButton.style.left = "50%";
      installButton.style.transform = "translateX(-50%)";
      installButton.style.zIndex = "9999";
      installButton.style.padding = "10px 20px";
      installButton.classList.add("btn-grad");
      installButton.style.color = "white";
      installButton.style.border = "none";
      installButton.style.borderRadius = "5px";
      installButton.style.cursor = "pointer";

      installButton.addEventListener("click", () => {
        // Prompt user to install the app
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("App installed");
          } else {
            console.log("App installation declined");
          }

          // Hide the install button
          installButton.style.display = "none";
        });
      });

      document.body.appendChild(installButton);
    });
    setInterval(this.checkUserInactivity.bind(this), 60000);
    document.addEventListener("mousemove", this.handleUserActivity.bind(this));
    document.addEventListener("keydown", this.handleUserActivity.bind(this));
    this.updateOnlineStatus(1);

    let isIdle = false;
    let idleTimer;

    document.addEventListener("visibilitychange", () => {
      console.log("asd");
      if (document.hidden) {
        this.updateOnlineStatus(0);
        const storage = JSON.parse(localStorage.getItem("auth.user"));

        if (storage) {
          isIdle = true;
          const dataPass = {
            username: storage[0].username,
            token: storage[0].token,
            isOnline: 0,
          };

          let headers = {
            type: "application/json",
          };
          let blob = new Blob([JSON.stringify(dataPass)], headers);
          navigator.sendBeacon("https://macwin.live/api/forceLogout", blob);
        }

        idleTimer = setTimeout(() => {
          if (isIdle) {
            this.updateOnlineStatus(2);
          }
        }, 2000);
      } else {
        // Browser tab is active
        this.updateOnlineStatus(1);
        isIdle = false;
        // Clear the idle timer
        clearTimeout(idleTimer);
      }
    });

    window.addEventListener("beforeunload", (event) => {
      // Synchronously update online status before the browser is closed
      console.log("Asdasd");
      this.updateOnlineStatus(0);
    });
  },

  methods: {
    async updateOnlineStatus(status) {
      try {
        const storage = JSON.parse(localStorage.getItem("auth.user"));

        if (storage) {
          const dataPass = {
            username: storage[0].username,
            token: storage[0].token,
            isOnline: status,
          };

          let headers = {
            type: "application/json",
          };
          let blob = new Blob([JSON.stringify(dataPass)], headers);
          navigator.sendBeacon("https://macwin.live/api/forceLogout", blob);

          // const response = await fetch("https://macwin.live/api/forceLogout", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify(dataPass),
          // });
        }
      } catch (error) {
        alert("Something went wrong... Error: " + error.response.status);
      }
    },
    handleUserActivity() {
      const store = useAuthStore();
      if (store.user) {
        localStorage.setItem("lastActivity", Date.now().toString());
      }
    },
    reloadPage() {
      localStorage.removeItem("lastActivity");
    },
    async checkUserInactivity() {
      const store = useAuthStore();
      const lastActivity = parseInt(localStorage.getItem("lastActivity")) || 0;
      const currentTime = Date.now();
      const idleTime = currentTime - lastActivity;

      // Set your desired idle timeout to 5 minutes (500,000 milliseconds)
      const idleTimeout = 500000;

      if (idleTime >= idleTimeout) {
        const isGuestChat = localStorage.getItem("chat_guest");
        // if (isGuestChat) {
        //   localStorage.removeItem("chat_guest");
        // }
        const { activityState } = useActivityCheck();
        if (store.user && activityState.url === "") {
          const storage = JSON.parse(localStorage.getItem("auth.user"));
          const dataPass = {
            username: storage[0].username,
            token: storage[0].token,
            isOnline: 0,
          };
          const res = await axios.forceLogout(dataPass);
          console.log(res);
          localStorage.removeItem("auth.user");
          store.resetUser();
          this.showSessionExpired = true;
        }
      }
    },
  },
};
</script>

<template>
  <!-- SERVER MAINTENANCE DISPLAY -->
  <!-- <div
    style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: #eaeaea;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      z-index: 999999;
      color: rgb(33, 33, 33);
      text-align: center;
    ">
    <div
      style="
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
      ">
      <img src="@/assets/images/server_maintenance.svg" style="width: 450px" />
      <h1 class="mt-5">
        We apologize for the inconvenience. Our page is undergoing maintenance
        and will be back online in 2 hours.
      </h1>
    </div>
  </div> -->
  <Dialog
    v-model:visible="showSessionExpired"
    modal
    :pt="{
      root: 'border-none',
      mask: {
        style: 'backdrop-filter: blur(2px)',
      },
    }">
    <template #container="{ closeCallback }">
      <SessionExpired
        @closeCallback="
          closeCallback();
          reloadPage();
        "
    /></template>
  </Dialog>
  <router-view />
</template>

<style scoped></style>
