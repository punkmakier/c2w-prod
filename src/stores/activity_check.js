import { defineStore } from "pinia";

export const useActivityCheck = defineStore("activity", () => {
  const activityState = {
    url: "",
  };

  return { activityState };
});
