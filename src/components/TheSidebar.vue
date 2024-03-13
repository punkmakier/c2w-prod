<template>
  <div class="sidebar">
    <SidebarSucessLoginDup v-if="sidebarViewSuccess" />

    <SidebarContent v-else />
  </div>
</template>
<script>
import SidebarContent from "@/components/SidebarContent.vue";
import SidebarSucessLoginDup from "@/components/SidebarSucessLoginDup.vue";
import { useAuthStore } from "@/stores/user.js";
import { ref, watch, onMounted } from "vue";

export default {
  components: { SidebarContent, SidebarSucessLoginDup },
  data() {
    return {
      showLoginModal: false,
      showRegisterModal: false,
    };
  },
  setup() {
    const store = useAuthStore();
    const sidebarViewSuccess = ref(false);

    // Watch for changes in store.user
    watch(
      () => store.user,
      (newVal) => {
        sidebarViewSuccess.value = Boolean(newVal);
      }
    );

    // Execute the initial check on component mount
    onMounted(() => {
      sidebarViewSuccess.value = Boolean(store.user);
    });

    return {
      sidebarViewSuccess,
    };
  },
};
</script>
<style>
.sidebar {
  width: 100%;
  background: rgba(26, 28, 30, 0.3);
  box-shadow: 0 8px 32px 0 rgba(26, 28, 30, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  color: #fff;
  height: 100%;
  padding: 20px;
  text-align: center;
}

.logo-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.come2winlogo {
  width: 250px;
}
.sidebar-icon {
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
