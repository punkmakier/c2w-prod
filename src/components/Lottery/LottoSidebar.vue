<template>
  <div style="padding: 15px">
    <div class="img-desc mt-2">
      <div class="imageHolder">
        <span>{{ firstLetter }}</span>
      </div>
      <span class="name" style="color: #fff">{{
        capitalizeFirstLetter(uname)
      }}</span>
    </div>
    <!-- <div class="walletSidebar" style="display: none">
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
    </div> -->
    <div class="menus-parent mt-3">
      <div class="menu-text">
        <i
          class="pi pi-bookmark me-1"
          style="font-size: 0.8rem; color: var(--surface-400)"></i
        ><span style="font-size: 0.7rem; color: var(--surface-400)">Menu</span>
      </div>
      <router-link class="menu-link-d" to="/">
        <i class="pi pi-home" style="font-size: 1rem"></i>
        Home
      </router-link>
      <router-link
        class="menu-link-d"
        v-for="(data, index) in menuLinks"
        :key="index"
        :to="{ name: 'lottery', params: { type: data.info } }">
        <i :class="`pi pi-${data.icon}`" style="font-size: 1rem"></i>
        {{ data.name }}
        <small class="comingsoon" v-if="data.badge">{{ data.badge }}</small>
      </router-link>

      <div class="mt-3 w-100">
        <Button
          label="Logout"
          outlined
          class="w-100"
          icon="pi pi-sign-out"
          iconPos="right"
          @click="logout" />
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/user.js";
import TheWalletMoney from "@/components/TheWalletMoney.vue";
import WithdrawDeposit from "@/components/WithdrawDeposit.vue";
export default {
  components: {
    TheWalletMoney,
    WithdrawDeposit,
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
    const firstLetter = ref("");
    const uname = ref("");
    const logout = () => {
      localStorage.removeItem("auth.user");
      store.resetUser();
    };
    onMounted(() => {
      const username = store.user[0].username;
      uname.value = store.user[0].username;
      firstLetter.value = username[0].toUpperCase();
    });
    function capitalizeFirstLetter(str) {
      return str.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    uname.value = capitalizeFirstLetter(store.user[0].username);

    const menuLinks = ref([
      { icon: "user-edit", name: "2D Lotto", badge: "", info: "ez2" },
      { icon: "bolt", name: "3D Lotto", badge: "", info: "3dlotto" },

      { icon: "bolt", name: "STL", badge: "", info: "stl" },
      {
        icon: "money-bill",
        name: "Lucky Pick 3",
        badge: "",
        info: "pick3",
      },
    ]);

    return {
      menuLinks,
      firstLetter,
      uname,
      logout,
      capitalizeFirstLetter,
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
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 10px #ff1354;
  margin-bottom: 15px;
  font-size: 3.5rem;
  font-weight: 600;
  color: #fff;
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
