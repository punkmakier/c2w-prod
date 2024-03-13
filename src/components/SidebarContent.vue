<template>
  <img
    src="@/assets/images/logo.webp"
    class="come2winlogo"
    alt="come2win logo" />
  <h3>{{ $t("homepage.winRealMoney") }}</h3>
  <p>{{ $t("homepage.createAccount") }}</p>
  <div class="mt-5">
    <Button
      :label="$t('homepage.login')"
      class="w-100"
      outlined
      @click="loginModal = true" />
    <Button
      :label="$t('homepage.register')"
      class="w-100 mt-1"
      @click="registerModal = true" />
  </div>

  <Dialog
    v-model:visible="loginModal"
    modal
    :draggable="false"
    header=" "
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <TheLoginForm
      @submit="submitLogin"
      :errorMessage="errorMessage"
      :loading="showLoading" />
  </Dialog>
  <Dialog
    :draggable="false"
    v-model:visible="registerModal"
    modal
    header=" "
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <TheRegisterForm
      @submit="submitRegister"
      :loading="showLoading"
      :errorMessage="errorMessageReg"
      :successMessage="successMessage" />
  </Dialog>
</template>
<script>
import { ref, onMounted } from "vue";
import TheLoginForm from "./TheLoginForm.vue";
import TheRegisterForm from "./TheRegisterForm.vue";
import AdvertisementCard from "./AdvertisementCard.vue";
import { C2WAPIService as axios } from "@/plugins/APIServices.js";
import { useAuthStore } from "@/stores/user.js";
import { useRoute } from "vue-router";
export default {
  components: { TheLoginForm, TheRegisterForm, AdvertisementCard },
  props: {
    showLoginModal: {
      type: Boolean,
      default: false,
    },
    showRegisterModal: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const showLoading = ref(false);
    const loginModal = ref(props.showLoginModal);
    const registerModal = ref(props.showRegisterModal);
    const errorMessage = ref("");
    const errorMessageReg = ref("");
    const successMessage = ref("");
    const store = useAuthStore();

    onMounted(() => {
      const route = useRoute();
      const refValue = ref(route.query.ref || "");
      if (refValue.value != "") {
        registerModal.value = true;
      }
    });

    const submitLogin = async (creds) => {
      errorMessage.value = "";
      showLoading.value = true;
      const res = await store.login(creds);
      if (res === "Success") {
        showLoading.value = false;
        isLoading.value = false;
      } else {
        errorMessage.value = res;
        showLoading.value = false;
      }
    };

    const submitRegister = async (data) => {
      showLoading.value = true;
      successMessage.value = "";
      errorMessageReg.value = "";
      const getResult = await axios.postRegister(data);
      if (getResult.resStatus === 1) {
        if (getResult.resMsg.username) {
          errorMessageReg.value = getResult.resMsg.username;
          showLoading.value = false;
          return;
        }
        if (getResult.resMsg.password) {
          errorMessageReg.value = getResult.resMsg.password;
          showLoading.value = false;
          return;
        } else {
          errorMessageReg.value = "Something went wrong. Please try again.";
          showLoading.value = false;
          return;
        }
      } else if (getResult.resStatus === 0) {
        showLoading.value = false;
        let count = 3;
        successMessage.value = `Registration successful! Please wait; the system will reload in ${count} seconds.`;

        const countdownInterval = setInterval(() => {
          count--;
          if (count > 0) {
            successMessage.value = `Registration successful! Please wait; the system will reload in ${count} seconds.`;
          } else {
            clearInterval(countdownInterval);

            // Remove the query parameter before reloading
            window.location.href =
              window.location.origin + window.location.pathname;
          }
        }, 1000);
      } else {
        errorMessageReg.value = "Something went wrong. Please try again.";
        showLoading.value = false;
      }
    };

    return {
      loginModal,
      registerModal,
      errorMessage,
      showLoading,
      errorMessageReg,
      successMessage,
      submitLogin,
      submitRegister,
    };
  },
};
</script>
<style></style>
