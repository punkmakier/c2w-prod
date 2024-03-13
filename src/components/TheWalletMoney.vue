<template>
  <div class="wallet-header">
    <div class="balance-header w-100" v-if="showWalletBalance">
      <div class="balance-amount-header w-100">
        <span v-html="formatCurrency(currentBalance)"></span>
      </div>
      <div class="wallet-inner"><i class="pi pi-wallet"></i></div>
    </div>
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
  </div>
</template>
<script>
import { useAuthStore } from "@/stores/user.js";
import { C2WAPIService as axios } from "@/plugins/APIServices.js";
import { ref, watch, watchEffect, onMounted } from "vue";
import SessionExpired from "@/components/SessionExpired.vue";
import { useAccountBalance } from "@/stores/user_balance";
export default {
  components: { SessionExpired },
  setup() {
    const store = useAuthStore();
    const showWalletBalance = ref(false);
    const currentBalance = ref(0);
    const showSessionExpired = ref(false);
    const { balance } = useAccountBalance();

    // Watch for changes in store.user
    watch(
      () => store.user,
      (newVal) => {
        showWalletBalance.value = Boolean(newVal);
      }
    );
    const checkBalance = async () => {
      if (store.user) {
        const uname = store.user[0].username;
        const token = store.user[0].token;
        const getResult = await axios.postBalance({
          username: uname,
          token: token,
        });
        console.log(getResult);
        if (getResult.resStatus == 0) {
          showWalletBalance.value = Boolean(store.user);
          balance.current_balance = getResult.balance;
        } else {
          showSessionExpired.value = true;
          localStorage.removeItem("auth.user");
          store.resetUser();
        }
      } else {
        localStorage.removeItem("auth.user");
        store.resetUser();
      }
    };
    const formatCurrency = (value) => {
      const res = parseFloat(value).toLocaleString("en-US", {
        style: "currency",
        currency: "PHP",
      });
      return res.replace("₱", "₱ ");
    };

    // Use onMounted for initial setup
    onMounted(() => {
      checkBalance();
    });

    // Use watchEffect to watch for changes in showWalletBalance
    watchEffect(() => {
      if (showWalletBalance.value) {
        currentBalance.value = balance.current_balance;
      }
    });
    const reloadPage = () => {
      window.location.reload();
    };

    // Execute the initial check on component mount

    return {
      reloadPage,
      formatCurrency,
      showWalletBalance,
      currentBalance,
      showSessionExpired,
      balance,
    };
  },
};
</script>
<style>
.wallet-header {
  display: flex;
  align-items: center;
  gap: 40px;
}
.balance-header {
  display: flex;
  background-color: #1a1c1e;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.balance-amount-header {
  padding: 10px 15px;
  color: yellow;
  display: flex;
  align-items: center;
  gap: 20px;
}
.wallet-inner {
  background-color: #363636;
  padding: 10px 15px;
  transition: 0.3s ease-in-out;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  caret-color: transparent; /* Standard property */
  caret-shape: none; /* For Firefox */
}
</style>
