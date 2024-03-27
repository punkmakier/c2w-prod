import { ref, watch, onScopeDispose } from "vue";
import { defineStore } from "pinia";
import { C2WAPIService as axios } from "@/plugins/APIServices.js";

function handleStorageEvent(event) {
  if (typeof key !== "undefined" && event.key === key) {
    val.value = JSON.parse(newValue || "null");
  }
}

function useLocalStorage(key, defaultValue) {
  const val = ref(defaultValue);
  const storageVal = window.localStorage.getItem(key);

  if (storageVal) {
    val.value = JSON.parse(storageVal);
  }

  window.addEventListener("storage", handleStorageEvent);

  onScopeDispose(() =>
    window.removeEventListener("storage", handleStorageEvent)
  );

  watch(
    val,
    (newValue) => window.localStorage.setItem(key, JSON.stringify(newValue)),
    { deep: true }
  );

  return val; // Don't forget to return the ref value
}

export const useAuthStore = defineStore("auth", () => {
  const user = useLocalStorage("auth.user"); // Correct usage with parentheses

  async function login(creds) {
    const getResult = await axios.postLogin(creds);
    if (getResult.resStatus == 0) {
      const res = [
        {
          username: getResult.username,
          token: getResult.token,
          email: getResult.email,
          mobile: getResult.mobile,
          chatToken: getResult.chatToken,
          is_agent: getResult.is_agent,
          avatar: getResult.avatar,
        },
      ];
      user.value = res;
      return "Success";
    } else {
      return getResult.resMsg;
    }
  }

  function resetUser() {
    user.value = null;
  }

  return {
    user,
    login,
    resetUser,
  };
});
