<template>
  <div>
    <div class="img-desc mt-2">
      <div class="imageHolder">
        <span>{{ firstLetter }}</span>
      </div>
      <span class="name">{{ capitalizeFirstLetter(uname) }}</span>
    </div>
    <div class="walletSidebar" style="display: none">
      <TheWalletMoney />
      <div class="wd mt-2">
        <a
          href="javascript:void(0)"
          class="dw"
          :class="{ 'dw-active': isDeposit }"
          @click="handleAction('deposit')"
          >Deposit</a
        >
        <a
          href="javascript:void(0)"
          class="dw"
          :class="{ 'dw-active': !isDeposit }"
          @click="handleAction('withdraw')"
          >Withdraw</a
        >
      </div>
    </div>
    <div class="menus-parent mt-3">
      <div class="menu-text">
        <i
          class="pi pi-bookmark me-1"
          style="font-size: 0.8rem; color: var(--surface-400)"></i
        ><span style="font-size: 0.7rem; color: var(--surface-400)">
          {{ $t("sideMenus.menuTitle") }}</span
        >
      </div>
      <router-link
        class="menu-link-d"
        v-for="(data, index) in menuLinks"
        :key="index"
        :to="data.to">
        <i :class="`pi pi-${data.icon}`" style="font-size: 1rem"></i>
        {{ data.name }}
        <small class="comingsoon" v-if="data.badge">{{ data.badge }}</small>
      </router-link>
      <div class="menu-link-d" @click="toAgentDashboard">
        <i class="pi pi-briefcase" style="font-size: 1rem"></i>
        <span>Agent Dashboard</span>
      </div>

      <div class="menu-text mt-3">
        <i
          class="pi pi-bookmark me-1"
          style="font-size: 0.8rem; color: var(--surface-400)"></i
        ><span style="font-size: 0.7rem; color: var(--surface-400)">{{
          $t("sideMenus.otherInfo")
        }}</span>
      </div>
      <router-link
        class="menu-link-d"
        v-for="(data, index) in infoLinks"
        :key="index"
        :to="{ name: 'infopage', params: { info: data.info } }">
        <i :class="`pi pi-${data.icon}`" style="font-size: 1rem"></i>
        {{ data.name }}
      </router-link>
      <div class="mt-3 w-100">
        <Button
          :label="$t('sideMenus.menu.logout')"
          outlined
          class="w-100"
          icon="pi pi-sign-out"
          iconPos="right"
          :loading="isLogoutLoading"
          @click="logout" />
      </div>

      <Divider />
      <Dropdown
        v-model="selectedLanguage"
        :options="languages"
        optionLabel="name"
        placeholder="Select a Country"
        class="w-full md:w-14rem"
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
            <div>{{ slotProps.value.name }}</div>
          </div>
          <span v-else>
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
      <!-- <div class="mt-5" style="width: 100%">
        <AdvertisementCard />
      </div> -->

      <!-- <div class="mt-5 w-100">
        <Button label="Logout" outlined class="w-100" @click="logout" />
      </div> -->
    </div>
    <Dialog
      v-model:visible="deposit"
      modal
      header="Deposit"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <WithdrawDeposit
        type="Deposit"
        @submitDeposit="depositSubmit"
        :isLoading="isLoadingButton" />
    </Dialog>
    <Dialog
      v-model:visible="withdraw"
      modal
      header="Withdraw"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <WithdrawDeposit type="Withdraw" />
    </Dialog>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/user.js";
import TheWalletMoney from "@/components/TheWalletMoney.vue";
import WithdrawDeposit from "@/components/WithdrawDeposit.vue";
import AdvertisementCard from "@/components/AdvertisementCard.vue";
import { C2WAPIService as axios } from "@/plugins/APIServices";
import { usePaymentProcess } from "@/stores/payment_process";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import { routerKey } from "vue-router";
export default {
  components: {
    TheWalletMoney,
    WithdrawDeposit,
    AdvertisementCard,
  },
  data() {
    return {
      deposit: false,
      withdraw: false,
      isDeposit: false,
      type: "",
      store: useAuthStore(),
    };
  },
  methods: {
    handleAction(action) {
      if (this.store.user) {
        if (action === "deposit") {
          this.deposit = true;
          this.isDeposit = true;
          this.withdraw = false;
        } else if (action === "withdraw") {
          this.isDeposit = false;
          this.deposit = false;
          this.withdraw = true;
        }
      }
    },
    async submitLogin(creds) {
      const res = await this.store.login(creds);
      if (res === "Failed") {
        this.errorMessage = "Invalid username or password. Please try again.";
      } else {
        this.loginModal = false;
      }
    },
  },
  setup() {
    const store = useAuthStore();
    const { state } = usePaymentProcess();
    const isLoadingButton = ref(false);
    const firstLetter = ref("");
    const uname = ref("");
    const isLogoutLoading = ref(false);
    const paymentURL = ref("");
    const qrCodeText = ref("");
    const toast = useToast();
    const amountDep = ref(0);
    const responseMessage = ref("");
    const severity = ref("");
    const deposit = ref(false);
    const { t } = useI18n();

    const logout = async () => {
      isLogoutLoading.value = true;
      const storage = JSON.parse(localStorage.getItem("auth.user"));
      const dataPass = {
        username: storage[0].username,
        token: storage[0].token,
        isOnline: 0,
      };
      const res = await axios.forceLogout(dataPass);
      localStorage.removeItem("auth.user");
      store.resetUser();
      isLogoutLoading.value = false;
    };

    function capitalizeFirstLetter(str) {
      return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    const toAgentDashboard = () => {
      const agentInfo =
        "username=" + store.user[0].username + "&token=" + store.user[0].token;
      window.open("http://localhost:5175/dashboard?" + agentInfo, "_blank");
      // window.open("http://agent.come2win.ph/dashboard", "_blank");
    };

    uname.value = capitalizeFirstLetter(store.user[0].username);

    const menuLinks = ref([
      { icon: "home", name: t("sideMenus.menu.home"), badge: "", to: "/" },
      {
        icon: "user-edit",
        name: t("sideMenus.menu.editProfile"),
        badge: "",
        to: "/profile",
      },

      {
        icon: "money-bill",
        name: t("sideMenus.menu.raffleDraw"),
        badge: t("sideMenus.comingSoon"),
        to: "/",
      },
      {
        icon: "bolt",
        name: t("sideMenus.menu.promotions"),
        badge: t("sideMenus.unavailable"),
        to: "/",
      },
    ]);
    const infoLinks = ref([
      {
        icon: "question-circle",
        name: t("sideMenus.otherinfo.about"),
        info: "about",
      },
      {
        icon: "question-circle",
        name: t("sideMenus.otherinfo.faq"),
        info: "faq",
      },
      {
        icon: "envelope",
        name: t("sideMenus.otherinfo.contacts"),
        info: "contact",
      },
    ]);
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

    onMounted(() => {
      const getLang = localStorage.getItem("language");
      const selectedLang = languages.value.filter(
        (item) => item.code === getLang
      );
      selectedLanguage.value = selectedLang[0];
      const username = store.user[0].username;
      uname.value = store.user[0].username;
      firstLetter.value = username[0].toUpperCase();
    });

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
    const withdrawSubmit = async (data) => {
      console.log(data);
      isLoadingButton.value = true;
      const uname = store.user[0].username;
      const token = store.user[0].token;
      const passData = { username: uname, token: token, ...data };
      const res = await axios.postWithdraw(passData);
      console.log(res);
      if (res.resStatus === 0) {
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

    const handleLanguageChange = () => {
      console.log(selectedLanguage.value);
      localStorage.setItem("language", selectedLanguage.value.code);
      window.location.reload();
    };

    return {
      isLoadingButton,
      deposit,
      menuLinks,
      infoLinks,
      selectedLanguage,
      languages,
      firstLetter,
      uname,
      isLogoutLoading,
      paymentURL,
      qrCodeText,
      toast,
      amountDep,
      responseMessage,
      severity,
      logout,
      capitalizeFirstLetter,
      withdrawSubmit,
      depositSubmit,
      handleLanguageChange,
      toAgentDashboard,
    };
  },
};
</script>
<style>
.comingsoon {
  background-color: rgb(242, 57, 57);
  font-size: 0.6rem;
  padding: 3px 2px;
  border-radius: 3px;
  color: #fff !important;
}
.walletSidebar {
  width: 67%;
  margin: 0 auto;
  margin-top: 30px;
}
.img-desc .name {
  font-size: 1.3rem;
  font-weight: 600;
}
.imageHolder {
  width: 120px;
  height: 120px;
  background-color: #ff1354;
  box-shadow: 0 0 10px #ff1354;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 15px;
  font-size: 3.5rem;
  font-weight: 600;
}

.menus-parent {
  display: flex;
  flex-direction: column;
  align-items: start;
}
.menus-parent .p-dropdown {
  background-color: transparent;
  border: 1px solid rgba(61, 61, 61, 0.411);
  color: #fefefe;
}
.menus-parent .p-dropdown-label {
  color: #fefefe;
}
.img-desc {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.menu-link-d {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.3s ease;
  text-decoration: none;
  color: #fefefec7;
}
.menu-link-d:hover {
  background-color: rgba(61, 61, 61, 0.411);
  color: #ff1354;
  font-weight: 600;
}
</style>
