import { defineStore } from "pinia";
import { reactive } from "vue";
export const useSabong = defineStore("sabong", () => {
  const sabongData = reactive({
    gameCredit: null,
    totalBetMeron: null,
    totalBetWala: null,
    bettingStatus: "Close",
    fightNumber: 0,
    meronBet: 0,
    walaBet: 0,
    drawBet: 0,
    meronOdds: null,
    walaOdds: null,
    gameID: null,
  });

  return { sabongData };
});
