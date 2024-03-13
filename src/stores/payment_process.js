import { defineStore } from "pinia";

export const usePaymentProcess = defineStore("payment", () => {
  const state = {
    url: "",
    qr: "",
    amount: "",
  };

  return { state };
});
