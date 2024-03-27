<template lang="">
  <div class="logReg" style="display: none; width: 100%" v-if="!isLogin">
    <div
      class="wd logShow"
      style="width: 40%; margin: 0 auto !important; margin-right: 170px">
      <a
        href="javascript:void(0)"
        class="dw"
        :class="{ 'dw-active': isDeposit }"
        @click="loginModal2 = true"
        >{{ $t("homepage.login") }}</a
      >
      <a
        href="javascript:void(0)"
        class="dw"
        :class="{ 'dw-active': !isDeposit }"
        @click="registerModal = true"
        >{{ $t("homepage.register") }}</a
      >
    </div>
    <Dropdown
      v-if="!showLang"
      v-model="selectedLanguage"
      :options="languages"
      optionLabel="name"
      class="w-full md:w-14rem"
      style="
        background-color: #292929;
        border: 1px solid #1e1a1a;
        position: absolute;
        right: -12%;
        top: 0;
      "
      @change="handleLanguageChange">
      <template #value="slotProps">
        <div
          v-if="slotProps.value"
          class="flex align-items-center"
          style="display: flex; gap: 10px">
          <img
            :alt="slotProps.value.label"
            :src="`/src/assets/language_flags/${slotProps.value.icon}`"
            :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
            style="width: 25px" />
        </div>
      </template>
      <template #option="slotProps">
        <div class="flex align-items-center" style="display: flex; gap: 10px">
          <img
            :alt="slotProps.option.label"
            :src="`/src/assets/language_flags/${slotProps.option.icon}`"
            :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
            style="width: 25px" />
        </div>
      </template>
    </Dropdown>
  </div>
  <div class="header">
    <div class="logo-menu">
      <!-- <router-link to="/" class="menu-links"
        ><img src="@/assets/images/logo.png" style="width: 100px" alt=""
      /></router-link> -->
    </div>
    <div class="wd">
      <!-- <a
        href="javascript:void(0)"
        class="dw"
        :class="{ 'dw-active': isDeposit }"
        @click="handleAction('deposit')"
        >{{ $t("deposit") }}</a
      >
      <a
        href="javascript:void(0)"
        class="dw"
        :class="{ 'dw-active': !isDeposit }"
        @click="handleAction('withdraw')"
        >{{ $t("withdraw") }}</a
      > -->
      <a
        href="javascript:void(0)"
        class="dw depos"
        @click="handleAction('deposit')"
        >{{ $t("deposit") }}</a
      >
      <a
        href="javascript:void(0)"
        class="dw withd"
        @click="handleAction('withdraw')"
        >{{ $t("withdraw") }}</a
      >
    </div>
    <Dropdown
      v-if="!showLang"
      v-model="selectedLanguage"
      :options="languages"
      optionLabel="name"
      class="w-full md:w-14rem"
      style="background-color: #292929; border: 1px solid #1e1a1a"
      @change="handleLanguageChange">
      <template #value="slotProps">
        <div
          v-if="slotProps.value"
          class="flex align-items-center"
          style="display: flex; gap: 10px">
          <img
            :alt="slotProps.value.label"
            :src="`/src/assets/language_flags/${slotProps.value.icon}`"
            :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
            style="width: 25px" />
          <div style="color: #fff !important">{{ slotProps.value.name }}</div>
        </div>
        <span v-else style="color: #fff !important">
          {{ slotProps.placeholder }}
        </span>
      </template>
      <template #option="slotProps">
        <div
          class="flex align-items-center"
          style="display: flex; gap: 10px; align-items: center">
          <img
            :alt="slotProps.option.label"
            :src="`/src/assets/language_flags/${slotProps.option.icon}`"
            :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
            style="width: 25px; height: 15px" />
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
    </Dropdown>
    <TheWalletMoney style="width: 210px !important" v-else />

    <Dialog
      :draggable="false"
      v-model:visible="deposit"
      modal
      :header="$t('deposit')"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <WithdrawDeposit
        type="Deposit"
        @submitDeposit="depositSubmit"
        :isLoading="isLoadingButton" />
    </Dialog>
    <Dialog
      :draggable="false"
      v-model:visible="withdraw"
      modal
      :header="$t('withdraw')"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <WithdrawDeposit
        type="Withdraw"
        @submitWithdraw="withdrawSubmit"
        :isLoading="isLoadingButton"
        :severity="severity"
        :responseMessage="responseMessage" />
    </Dialog>

    <Dialog
      :draggable="false"
      v-model:visible="loginModal"
      modal
      header=" "
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <TheLoginForm
        @submit="submitLogin"
        :errorMessage="errorMessage"
        :loading="isLoadingButton" />
    </Dialog>
    <Dialog
      :draggable="false"
      v-model:visible="loginModal2"
      modal
      header=" "
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <TheLoginForm
        @submit="submitLogin"
        :errorMessage="errorMessage2"
        :loading="isLoadingButton" />
    </Dialog>
    <Dialog
      :draggable="false"
      v-model:visible="registerModal"
      modal
      header=" "
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <TheRegisterForm @submit="submitRegister" />
    </Dialog>
  </div>
</template>
<script>
import TheWallet from "@/components/TheWallet.vue";
import WithdrawDeposit from "@/components/WithdrawDeposit.vue";
import TheLoginForm from "@/components/TheLoginForm.vue";
import TheRegisterForm from "@/components/TheRegisterForm.vue";
import TheWalletMoney from "@/components/TheWalletMoney.vue";
import { C2WAPIService as axios } from "@/plugins/APIServices.js";
import { ref, onMounted, watchEffect } from "vue";
import { useAuthStore } from "@/stores/user.js";
import { useI18n } from "vue-i18n";
import { useToast } from "primevue/usetoast";
import { usePaymentProcess } from "@/stores/payment_process";
import { socket } from "@/socket";
export default {
  components: {
    TheWallet,
    TheWalletMoney,
    WithdrawDeposit,
    TheLoginForm,
    TheRegisterForm,
  },
  setup() {
    const { t } = useI18n();
    const deposit = ref(false);
    const withdraw = ref(false);
    const isDeposit = ref(false);
    const loginModal = ref(false);
    const registerModal = ref(false);
    const loginModal2 = ref(false);
    const errorMessage = ref("");
    const isLogin = ref(false);
    const errorMessage2 = ref("");
    const type = ref("");
    const store = useAuthStore();
    const { state } = usePaymentProcess();
    const isLoadingButton = ref(false);
    const responseMessage = ref("");
    const severity = ref("");
    const paymentURL = ref("");
    const qrCodeText = ref("");
    const toast = useToast();
    const amountDep = ref(0);

    const showLang = ref(false);
    const selectedLanguage = ref({
      name: "English",
      code: "EN",
      icon: "us.png",
    });
    const languages = ref([
      { name: "English", code: "EN", icon: "us.png" },
      { name: "Cambodia", code: "KM", icon: "km.png" },
      { name: "Thai", code: "TH", icon: "th.png" },
      { name: "Hindi", code: "HI", icon: "hi.png" },
      { name: "China", code: "ZH", icon: "zh.png" },
      { name: "Japanese", code: "JA", icon: "ja.png" },
      { name: "Malaysia", code: "MS", icon: "ms.png" },
      { name: "Spanish", code: "ES", icon: "es.png" },
    ]);

    const handleLanguageChange = () => {
      console.log(selectedLanguage.value);
      localStorage.setItem("language", selectedLanguage.value.code);
      window.location.reload();
    };

    const handleAction = (action) => {
      if (store.user) {
        if (action === "deposit") {
          deposit.value = true;
          isDeposit.value = true;
          withdraw.value = false;
        } else if (action === "withdraw") {
          isDeposit.value = false;
          deposit.value = false;
          withdraw.value = true;
        }
      } else {
        loginModal.value = true;
        errorMessage.value = t("error_messages.loginFirstDepo");
      }
    };

    const submitLogin = async (creds) => {
      isLoadingButton.value = true;
      const res = await store.login(creds);
      if (res === "Success") {
        loginModal.value = false;
        loginModal2.value = false;
        isLogin.value = true;
        isLoadingButton.value = false;
      } else {
        errorMessage.value = res;
        errorMessage2.value = res;
        isLoadingButton.value = false;
      }
    };

    const submitRegister = async (data) => {
      try {
        const getResult = await axios.post("your-register-endpoint", data);
        console.log(getResult);
      } catch (error) {
        console.error("Error during registration:", error);
      }
    };

    const depositSubmit = async (data) => {
      isLoadingButton.value = true;
      const uname = store.user[0].username;
      const token = store.user[0].token;
      const passData = { username: uname, token: token, ...data };
      const res = await axios.postDeposit(passData);
      if (res.ErrorCode === 0) {
        state.url = res.Url;
        state.amount = data.amount;
        state.qr = res.QR;
        deposit.value = false;
        amountDep.value = data.amount;
        qrCodeText.value = res.QR;
        paymentURL.value = res.Url;
      } else {
        toast.add({
          severity: "error",
          summary: "Failed",
          detail: res.ErrorMessage,
          life: 5000,
        });
      }

      isLoadingButton.value = false;
    };
    const setupWebSocket = () => {
      if (socket) {
        socket.on("connect", () => {
          console.log("Connected to WebSocket server.");
          // Your open event handling logic
        });
      } else {
        console.error("Socket is not initialized properly.");
      }
    };
    const withdrawSubmit = async (data) => {
      isLoadingButton.value = true;
      const uname = store.user[0].username;
      const token = store.user[0].token;
      const passData = { username: uname, token: token, ...data };
      const res = await axios.postWithdraw(passData);
      if (res.resStatus === 0) {
        const dataRes = { type: "withdraw" };
        socket.emit("chat-message", JSON.stringify(dataRes));
        isLoadingButton.value = false;
        responseMessage.value =
          "Your withdrawal request has been processed. Your funds will be credited shortly.";
        severity.value = "success";
        return;
      }
      if (res.resStatus === 1) {
        isLoadingButton.value = false;
        responseMessage.value = res.resMsg;
        severity.value = "error";
        return;
      } else {
        responseMessage.value = "Something went wrong. Please try again.";

        isLoadingButton.value = false;
        severity.value = "error";
        return;
      }
    };
    onMounted(() => {
      setupWebSocket();
      if (store.user) {
        isLogin.value = true;
      } else {
        isLogin.value = false;
      }
      const getLang = localStorage.getItem("language");
      const selectedLang = languages.value.filter(
        (item) => item.code === getLang
      );
      selectedLanguage.value = selectedLang[0];
    });

    watchEffect(() => {
      if (store.user) {
        isLogin.value = true;
        showLang.value = true;
      } else {
        isLogin.value = false;
        showLang.value = false;
      }
    });

    return {
      selectedLanguage,
      languages,
      showLang,
      amountDep,
      paymentURL,
      responseMessage,
      severity,
      isLoadingButton,
      deposit,
      withdraw,
      isDeposit,
      loginModal,
      registerModal,
      loginModal2,
      errorMessage,
      isLogin,
      errorMessage2,
      type,
      store,
      qrCodeText,
      handleAction,
      submitLogin,
      submitRegister,
      depositSubmit,
      withdrawSubmit,
      handleLanguageChange,
    };
  },
};
</script>
<style>
.depos {
  background-color: #39ff14;
  color: #000 !important;
}
.withd {
  background-color: #ff1354;
}
.logReg {
  position: absolute;
  top: 4%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
}
.logShow {
  box-shadow: 0 0 10px #000;
}
.wd {
  display: flex;
  gap: 3px;
  background-color: rgb(28, 26, 26);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: 0.3s ease;
  margin-left: 140px;
}
.d:hover {
  background-color: rgba(59, 59, 59, 0.78);
}
.dw {
  cursor: pointer;
}
.wd .dw {
  color: #fff;
  text-decoration: none;
  padding: 10px 30px;
  border-radius: 30px;
  caret-color: transparent; /* Standard property */
  caret-shape: none; /* For Firefox */
}
.dw-active {
  background-color: #ff1354;
  transition: 0.3s ease;
}
.p-dropdown-items-wrapper {
  position: absolute;
  right: 10%;
}
.dw-active:hover {
  background-color: #c70c41;
}
.logo-menu {
  display: flex;
  align-items: center;
  gap: 30px;
}
.logo-menu a {
  color: #979797;
  text-decoration: none;
  transition: 0.3s ease;
  caret-color: transparent; /* Standard property */
  caret-shape: none; /* For Firefox */
}
.logo-menu a:hover {
  color: #fefefe;
  font-weight: 600;
}

.header {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  z-index: 3;
}
</style>
