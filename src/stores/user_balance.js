import { defineStore } from "pinia";

export const useAccountBalance = defineStore("balance", () => {
  const balance = {
    current_balance: 0,
  };

  return { balance };
});
