<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch, onMounted, computed } from "vue";
import { C2WAPIService as axios } from "@/plugins/APIServices.js";
import { socket } from "@/socket";
import { useToast } from "primevue/usetoast";
import CellSabongTable from "@/data/CellSabongTable.json";
const route = useRoute();
const toast = useToast();
const router = useRouter();
const routeInfo = ref(route.params.type || "");
import { useAuthStore } from "@/stores/user.js";
import { useSabong } from "@/stores/sabong_state.js";
const store = useAuthStore();
const { sabongData } = useSabong();
const betAmount = ref();
const isLoading = ref(false);
const arenaClosed = ref(false);

// Sample data from regladaData ref
const regladaData = ref([]);
const regladaDataStraight = ref([]);

// Number of rows and columns in the table
const numRows = 10;
const numCols = 30;

const currentBets = ref();
watch(
  () => route.params.type,
  (newInfo) => {
    routeInfo.value = newInfo;
    console.log(routeInfo.value);
  }
);

const handleIncomingMessage = async (data) => {
  console.log(data);
  if (data.type === "sabong") {
    if (data.openCloseBetting) {
      sabongData.bettingStatus = data.openCloseBetting;
      sabongData.totalBetMeron = data.meronBet;
      sabongData.totalBetWala = data.walaBet;
      sabongData.meronOdds = data.meronOdds;
      sabongData.walaOdds = data.walaOdds;

      return;
    }

    if (data.declared) {
      console.log("declared");
      const res = await axios.sabonggetGame({
        username: store.user[0].username,
        token: store.user[0].token,
        arenaType: route.params.type === "short" ? "Short Knife" : "Long Knife",
      });
      if (res.error === 0) {
        sabongData.gameCredit = res.game_credit;
        sabongData.meronBet = 0;
        sabongData.walaBet = 0;
        sabongData.drawBet = 0;
        sabongData.totalBetMeron = res.totalMeronBet;
        sabongData.totalBetWala = res.totalWalaBet;
        sabongData.meronOdds = res.meronOdds;
        sabongData.walaOdds = res.walaOdds;
        sabongData.gameID = res.gameID;
        sabongData.fightNumber = res.fightNumber;
        sabongData.bettingStatus = res.status === 1 ? "Open" : "Close";
        console.log(res);
      }
      return;
    }

    if (data.scoreboard) {
      //
      if (data.method === "remove") {
        const search = regladaData.value.filter(
          (item) => item.cellID !== data.scoreboard
        );
        regladaData.value = search;
        console.log(search);
      } else if (data.method === "removeStraight") {
        const search = regladaDataStraight.value.filter(
          (item) => item.cellID !== data.scoreboard
        );
        regladaDataStraight.value = search;
        console.log(search);
      } else if (data.regladaType === "reglada") {
        regladaData.value.push({ cellID: data.scoreboard, class: data.class });
        console.log(data);
        console.log(regladaData.value);
      } else if (data.regladaType === "regladaStraight") {
        regladaDataStraight.value.push({
          cellID: data.scoreboard,
          class: data.class,
        });
        console.log(data);
        console.log(regladaDataStraight.value);
      }
    }
    if (data.arenaClosed) {
      arenaClosed.value = true;
    }
    sabongData.totalBetMeron = data.totalMeronBet;
    sabongData.totalBetWala = data.totalWalaBet;
    sabongData.meronOdds = data.meronOdds;
    sabongData.walaOdds = data.walaOdds;
  }
};

const setupWebSocket = () => {
  if (socket) {
    socket.on("chat-message", (data) => {
      const getVal = JSON.parse(data);
      handleIncomingMessage(getVal);
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server.");
    });
  } else {
    console.error("Socket is not initialized properly.");
  }
};

onMounted(async () => {
  console.log(route.params.type);
  setupWebSocket();
  const res = await axios.sabonggetGame({
    username: store.user[0].username,
    token: store.user[0].token,
    arenaType: route.params.type === "short" ? "Short Knife" : "Long Knife",
  });
  console.log(res);
  if (res.error === 0) {
    sabongData.gameCredit = res.game_credit.toString();
    sabongData.bettingStatus = res.status == 1 ? "Open" : "Close";
    sabongData.fightNumber = res.fightNumber;
    sabongData.gameID = res.gameID;
    sabongData.totalBetMeron = res.meronBet;
    sabongData.totalBetWala = res.walaBet;
    sabongData.meronOdds = res.meronOdds;
    sabongData.walaOdds = res.walaOdds;
    currentBets.value = res.currentBets;

    const resFetch = await axios.postFetchReglada({
      username: store.user[0].username,
      token: store.user[0].token,
      arenaID: res.arenaID,
    });
    console.log(resFetch);
    if (resFetch.resStatus === 0) {
      const resReglaData = resFetch.data.filter(
        (item) => item.type === "reglada"
      );
      console.log(resReglaData);
      regladaData.value = resReglaData;
      const resReglaDataStraight = resFetch.data.filter(
        (item) => item.type === "regladaStraight"
      );
      console.log(resReglaDataStraight);
      regladaDataStraight.value = resReglaDataStraight;
    }
  } else {
    router.push("/");
  }
});

const capitalizedRouteInfo = computed(() => {
  return routeInfo.value.charAt(0).toUpperCase() + routeInfo.value.slice(1);
});

const bet = async (type) => {
  console.log(type);
  if (
    betAmount.value === "" ||
    betAmount.value === 0 ||
    betAmount.value == undefined
  ) {
    toast.add({
      severity: "error",
      summary: "Failed",
      detail: "Please enter a bet amount",
      life: 3000,
    });
    return;
  }
  isLoading.value = true;
  const dataPass = {
    gameID: sabongData.gameID,
    betType: type,
    betAmount: betAmount.value,
    username: store.user[0].username,
    token: store.user[0].token,
  };

  const res = await axios.sabongPlaceBet(dataPass);
  console.log(res);
  if (res.error === 0) {
    const floatNumBalance = parseFloat(res.newBalance.replace(/,/g, ""));
    const floatNumBetAmount = parseFloat(res.betAmount.replace(/,/g, ""));
    sabongData.gameCredit = floatNumBalance;
    sabongData.meronBet =
      res.betType === "Meron"
        ? sabongData.meronBet + floatNumBetAmount
        : sabongData.meronBet;
    sabongData.walaBet =
      res.betType === "Wala"
        ? sabongData.walaBet + floatNumBetAmount
        : sabongData.walaBet;
    sabongData.drawBet =
      res.betType === "Draw"
        ? sabongData.drawBet + floatNumBetAmount
        : sabongData.drawBet;

    const passData = {
      betAmount: res.betAmount,
      totalMeronBet: res.totalMeronBet,
      totalWalaBet: res.totalWalaBet,
      meronOdds: res.meronOdds,
      walaOdds: res.walaOdds,
      betType: res.betType,
      type: "sabong",
    };
    console.log(res);
    const dataP = JSON.stringify(passData);
    // console.log()
    socket.emit("chat-message", dataP);
    isLoading.value = false;
    betAmount.value = null;
  } else {
    toast.add({
      severity: "error",
      summary: "Failed",
      detail: res.description,
      life: 3000,
    });
    isLoading.value = false;
  }
};

const formatCurrency = (value) => {
  const res = parseFloat(value).toLocaleString("en-US", {
    style: "currency",
    currency: "PHP",
  });
  return res.replace("₱", "₱ ");
};
const placeAmount = (value) => {
  if (betAmount.value == undefined) {
    betAmount.value = value;
  } else {
    betAmount.value = betAmount.value + value;
  }
};
const clearBet = () => {
  betAmount.value = null;
};

// SCOREBOARD

// Create a 2D array to store cell IDs
const rows = ref(
  Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => ({ cellID: "", class: "" }))
  )
);

// Assign cell IDs from CellSabongTable to each cell in the rows
for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    rows.value[i][j].cellID = CellSabongTable[i * numCols + j];
  }
}

// Function to get the class name based on cell ID
const getClassName = (cellID) => {
  const cell = regladaData.value.find((item) => item.cellID === cellID);
  return cell ? cell.class : "";
};
const getClassNameStraight = (cellID) => {
  const cell = regladaDataStraight.value.find((item) => item.cellID === cellID);
  return cell ? cell.class : "";
};
// STRIAGHT
// Number of rows and columns in the table
const numRowsStraight = 10;
const numColsStraight = 30;

// Create a 2D array to store cell IDs
const rowsStraight = ref(
  Array.from({ length: numRowsStraight }, () =>
    Array.from({ length: numColsStraight }, () => ({ cellID: "", class: "" }))
  )
);

// Assign cell IDs from CellSabongTable to each cell in the rows
for (let i = 0; i < numRowsStraight; i++) {
  for (let j = 0; j < numColsStraight; j++) {
    rowsStraight.value[i][j].cellID = CellSabongTable[i * numColsStraight + j];
  }
}
</script>
<template>
  <div class="parent-sabong">
    <Toast position="top-center" />
    <div class="header-sabong">
      <router-link
        to="/"
        style="
          display: flex;
          gap: 5px;
          align-items: center;
          cursor: pointer;
          text-decoration: none;
          color: #fff;
        "
        ><span
          ><i class="pi pi-arrow-left" style="font-size: 1rem"></i> GO
          BACK</span
        ></router-link
      >

      <span class="sabong-title"
        >Sabong - {{ capitalizedRouteInfo }} Knife</span
      >
      <div class="ghostdiv"></div>
    </div>
    <Message severity="warn" :closable="false" v-if="arenaClosed"
      >The arena is closed. Please wait for the next fight.</Message
    >
    <div class="content-sabong">
      <iframe
        class="iframeSabong item-sabong"
        src="https://www.youtube.com/embed/yUQIXf7WV78?si=CHy6hXld3MDtLoBm"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>
      <div class="betting-content item-sabong">
        <div style="background-color: #000; padding: 10px; text-align: end">
          <marquee
            ><span
              >Fight Number: #{{
                sabongData.fightNumber.toLocaleString()
              }}</span
            ></marquee
          >
        </div>

        <table class="table-custom">
          <thead>
            <tr>
              <th>BETTING</th>
              <th>FIGHT #</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span
                  class="fadedBetting"
                  style="
                    background-color: green;
                    padding: 10px 25px;
                    border-radius: 3px;
                  "
                  v-if="sabongData.bettingStatus == 'Open'"
                  >OPEN</span
                >
                <span
                  class="fadedBetting"
                  style="
                    background-color: red;
                    padding: 10px 25px;
                    border-radius: 3px;
                  "
                  v-else
                  >CLOSE</span
                >
              </td>
              <td>{{ sabongData.fightNumber.toLocaleString() }}</td>
            </tr>
            <tr>
              <td style="font-size: 1rem; color: yellow">
                {{
                  sabongData.totalBetMeron
                    ? formatCurrency(sabongData.totalBetMeron)
                    : formatCurrency(0)
                }}
              </td>
              <td style="font-size: 1rem; color: yellow">
                {{
                  sabongData.totalBetWala
                    ? formatCurrency(sabongData.totalBetWala)
                    : formatCurrency(0)
                }}
              </td>
            </tr>
            <tr>
              <td style="background-color: red; font-size: 1.3rem">MERON</td>
              <td style="background-color: blue; font-size: 1.3rem">WALA</td>
            </tr>
            <tr>
              <td>
                <span style="font-size: 1.2rem">{{
                  sabongData.meronOdds ? sabongData.meronOdds : 0
                }}</span
                ><br /><small style="font-size: 0.9rem">{{
                  sabongData.meronBet ? formatCurrency(sabongData.meronBet) : 0
                }}</small>
              </td>
              <td>
                <span style="font-size: 1.2rem">{{
                  sabongData.walaOdds ? sabongData.walaOdds.toLocaleString() : 0
                }}</span
                ><br /><small style="font-size: 0.9rem">{{
                  sabongData.walaBet ? formatCurrency(sabongData.walaBet) : 0
                }}</small>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  class="betTypeBtn"
                  :class="{
                    isDisabled:
                      isLoading || sabongData.bettingStatus === 'Close',
                    isLoadingBtn:
                      isLoading || sabongData.bettingStatus === 'Close',
                  }"
                  @click="
                    !isLoading && sabongData.bettingStatus === 'Open'
                      ? bet('Meron')
                      : ''
                  ">
                  <i
                    class="pi pi-spin pi-spinner"
                    style="font-size: 1rem"
                    v-if="isLoading"></i>
                  BET MERON
                  <div class="" v-if="isLoading"></div>
                </div>
              </td>
              <td>
                <div
                  class="betTypeBtn"
                  :class="{
                    isDisabled:
                      isLoading || sabongData.bettingStatus === 'Close',
                    isLoadingBtn:
                      isLoading || sabongData.bettingStatus === 'Close',
                  }"
                  @click="
                    !isLoading && sabongData.bettingStatus === 'Open'
                      ? bet('Wala')
                      : ''
                  ">
                  <i
                    class="pi pi-spin pi-spinner"
                    style="font-size: 1rem"
                    v-if="isLoading"></i>
                  BET WALA
                  <div class="" v-if="isLoading"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="current-balance" style="text-align: end">
          <span
            >CURRENT POINTS:
            <span style="color: yellow; font-weight: 500">{{
              formatCurrency(sabongData.gameCredit)
            }}</span></span
          >
        </div>
        <div class="wrapper-input-bet">
          <input
            type="number"
            class="input-bet"
            placeholder="ENTER AMOUNT"
            v-model="betAmount" />
          <div class="clearBtn" @click="clearBet">
            <span>CLEAR</span>
          </div>
        </div>
        <div class="chips-amount">
          <div class="chip-item chip1" @click="placeAmount(20)">
            <span>20</span>
          </div>
          <div class="chip-item chip7" @click="placeAmount(50)">
            <span>50</span>
          </div>
          <div class="chip-item chip8" @click="placeAmount(100)">
            <span>100</span>
          </div>
          <div class="chip-item chip2" @click="placeAmount(200)">
            <span>200</span>
          </div>
          <div class="chip-item chip3" @click="placeAmount(500)">
            <span>500</span>
          </div>
          <div class="chip-item chip4" @click="placeAmount(1000)">
            <span>1000</span>
          </div>
          <div class="chip-item chip5" @click="placeAmount(2000)">
            <span>2000</span>
          </div>
          <div class="chip-item chip6" @click="placeAmount(5000)">
            <span>5000</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content2-sabong">
      <div
        class="content-left-sabong drawBetForMobile"
        style="width: 50%; display: none">
        <div class="par-bet-draw">
          <div
            class="betTypeBtn"
            style="width: 50%; text-align: center"
            :class="{
              isDisabled: isLoading || sabongData.bettingStatus === 'Close',
              isLoadingBtn: isLoading || sabongData.bettingStatus === 'Close',
            }"
            @click="
              !isLoading && sabongData.bettingStatus === 'Open'
                ? bet('Draw')
                : ''
            ">
            <i
              class="pi pi-spin pi-spinner"
              style="font-size: 1rem"
              v-if="isLoading"></i>
            <span
              ><i class="pi pi-plus-circle" style="font-size: 1rem"></i> BET
              DRAW</span
            >
            <div class="" v-if="isLoading"></div>
          </div>

          <div class="betnum">
            <span>{{ formatCurrency(sabongData.drawBet) }}</span>
          </div>
        </div>
        <span class="drawtext"
          >DRAW WINS x 8. Max. DRAW bet per player: 5000/fight</span
        >
        <div
          class="content-right-sabong regladaForMobile"
          style="width: 50%; display: none">
          <div class="reglada" style="height: 213px; overflow: auto">
            <table style="min-width: max-content">
              <tbody>
                <tr v-for="(row, indexRow) in rows" :key="indexRow">
                  <td
                    v-for="(cell, indexCol) in row"
                    :key="indexCol"
                    :class="getClassName(cell.cellID)"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="reglada mt-3" style="height: 213px; overflow: auto">
            <table style="min-width: max-content">
              <tbody>
                <tr v-for="(row, indexRow) in rowsStraight" :key="indexRow">
                  <td
                    v-for="(cell, indexCol) in row"
                    :key="indexCol"
                    :class="getClassNameStraight(cell.cellID)"
                    style="position: relative"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="draw-content">
          <div class="headdraw"><span>CURRENT BETS</span></div>
          <DataTable
            stripedRows
            paginator
            :rows="5"
            :value="currentBets"
            tableStyle="min-width: 50rem">
            <Column field="fightNumber" header="FIGHT #"></Column>
            <Column field="betAmount" header="AMOUNT"></Column>
            <Column field="betInfo" header="BET TYPE"></Column>
            <Column field="payout" header="PAYOUT"></Column>
          </DataTable>
        </div>
      </div>
      <div class="content-right-sabong regladaForDesktop" style="width: 50%">
        <div class="reglada" style="height: 213px; overflow: auto">
          <table style="min-width: max-content">
            <tbody>
              <tr v-for="(row, indexRow) in rows" :key="indexRow">
                <td
                  v-for="(cell, indexCol) in row"
                  :key="indexCol"
                  :class="getClassName(cell.cellID)"
                  @click="handleCellClick(sabongData.winner, cell.cellID)"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="reglada mt-3" style="height: 213px; overflow: auto">
          <table style="min-width: max-content">
            <tbody>
              <tr v-for="(row, indexRow) in rowsStraight" :key="indexRow">
                <td
                  v-for="(cell, indexCol) in row"
                  :key="indexCol"
                  :class="getClassNameStraight(cell.cellID)"
                  style="position: relative"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="content-left-sabong drawBetForDesktop" style="width: 50%">
        <div class="par-bet-draw">
          <div
            class="betTypeBtn"
            style="width: 50%; text-align: center"
            :class="{
              isDisabled: isLoading || sabongData.bettingStatus === 'Close',
              isLoadingBtn: isLoading || sabongData.bettingStatus === 'Close',
            }"
            @click="
              !isLoading && sabongData.bettingStatus === 'Open'
                ? bet('Draw')
                : ''
            ">
            <i
              class="pi pi-spin pi-spinner"
              style="font-size: 1rem"
              v-if="isLoading"></i>
            <span
              ><i class="pi pi-plus-circle" style="font-size: 1rem"></i> BET
              DRAW</span
            >
            <div class="" v-if="isLoading"></div>
          </div>

          <div class="betnum">
            <span>{{ formatCurrency(sabongData.drawBet) }}</span>
          </div>
        </div>
        <span class="drawtext"
          >DRAW WINS x 8. Max. DRAW bet per player: 5000/fight</span
        >
        <div class="draw-content">
          <!-- id: 24,
      userName: 'Makier',
      arenaID: 1,
      gameID: 1,
      fightNumber: 1,
      betInfo: 'Meron',
      betAmount: 20,
      winAmount: 0,
      betOdds: 0,
      betStatus: 0,
      date: '2024-03-16 -->
          <div class="headdraw"><span>CURRENT BETS</span></div>
          <DataTable
            stripedRows
            paginator
            :rows="5"
            :value="currentBets"
            tableStyle="min-width: 50rem">
            <Column field="fightNumber" header="FIGHT #"></Column>
            <Column field="betAmount" header="AMOUNT"></Column>
            <Column field="betInfo" header="BET TYPE"></Column>
            <Column field="payout" header="PAYOUT"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.reglada tr {
  margin-bottom: 5px;
}
.reglada tr td {
  height: 30px;
  width: 30px;
  margin-right: 2px;
}
.game-trend-cancel {
  padding: 0px;
  height: 28px;
  width: 28px;
  background-color: #fff;
  border-radius: 50%;
  /* display: inline-block; */
  text-align: center;
  color: #ffffff;
  font-family: arial, sans-serif;
  font-size: 12px;
  font-weight: bold;
  border: 8px solid #bebebe;
}
.game-trend-meron {
  padding: 0px;
  height: 28px;
  width: 28px;
  background-color: #fff;
  border-radius: 50%;
  /* display: inline-block; */
  text-align: center;
  color: #ffffff;
  font-family: arial, sans-serif;
  font-size: 12px;
  font-weight: bold;
  border: 8px solid #ee2929;
}
.game-trend-wala {
  padding: 0px;
  height: 28px;
  width: 28px;
  background-color: #fff;
  border-radius: 50%;
  /* display: inline-block; */
  text-align: center;
  color: #ffffff;
  font-family: arial, sans-serif;
  font-size: 12px;
  font-weight: bold;
  border: 8px solid #4128e9;
}
.game-trend-draw {
  padding: 0px;
  height: 28px;
  width: 28px;
  background-color: #fff;
  border-radius: 50%;
  /* display: inline-block; */
  text-align: center;
  color: #ffffff;
  font-family: arial, sans-serif;
  font-size: 12px;
  font-weight: bold;
  border: 8px solid #2ce454;
}

.reglada {
  height: 213px; /* Adjust height as needed */
  overflow-x: scroll; /* Enable horizontal scrollbar */
  overflow-y: hidden; /* Hide vertical scrollbar */
  background-size: 32px 32px;
  background-image: linear-gradient(to right, lightgrey 1px, transparent 1px),
    linear-gradient(to bottom, lightgrey 1px, transparent 1px);
  background-repeat: repeat;
  background-attachment: local;
  background-color: white;
  line-height: normal;
  text-align: start;
}
.p-paginator .p-paginator-pages .p-paginator-page,
.p-paginator .p-paginator-first,
.p-paginator .p-paginator-prev,
.p-paginator .p-paginator-next,
.p-paginator .p-paginator-last {
  width: 1rem;
  height: 2rem;
}
.draw-content {
  margin-top: 10px;
}
.draw-content .p-datatable .p-datatable-thead > tr > th {
  background-color: rgb(36, 36, 36) !important;
  color: #fff;
  font-weight: 500 !important;
  font-size: 0.9rem;
  border-bottom: 1px solid #e5e7eb4d !important;
}
.draw-content .p-datatable .p-datatable-tbody > tr {
  background-color: rgb(36, 36, 36) !important;
  color: #fff;
  font-size: 0.8rem;
}
.draw-content .p-datatable .p-datatable-tbody > tr > td {
  border-bottom: 1px solid #e5e7eb4d !important;
}
/* .headtable thead td {
  padding: 10px;
  font-weight: 500;
}
.headtable tbody tr {
  border-bottom: 1px solid red !important;
} */
.headdraw {
  background-color: #101010;
  padding: 20px;
  color: red;
}
.drawtext {
  font-weight: 500;
  color: #d7d7d763;
}
.par-bet-draw {
  background-color: #101010;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 3px;
  margin-bottom: 10px;
}
.betdraw {
  flex: 1;
  background-color: green;
  padding: 15px;
  text-align: center;
  border-radius: 3px;
  cursor: pointer;
}
.betdraw:hover {
  background-color: rgb(12, 109, 12);
}
.betnum {
  flex: 1;
  text-align: center;
  color: rgb(150, 255, 150);
  font-weight: 500;
}
.content2-sabong {
  display: flex;
  gap: 2rem;
  margin-top: 30px;
}
.content-right-sabong {
  flex: 1;
}

.content-left-sabong {
  flex: 1;
}
.chip1 {
  background: url("@/assets/chips/chip1.png") !important;
  background-size: contain !important;
}
.chip2 {
  background: url("@/assets/chips/chip2.png") !important;
  background-size: contain !important;
}
.chip3 {
  background: url("@/assets/chips/chip3.png") !important;
  background-size: contain !important;
}
.chip4 {
  background: url("@/assets/chips/chip4.png") !important;
  background-size: contain !important;
}
.chip5 {
  background: url("@/assets/chips/chip5.png") !important;
  background-size: contain !important;
}
.chip6 {
  background: url("@/assets/chips/chip6.png") !important;
  background-size: contain !important;
}
.chip7 {
  background: url("@/assets/chips/chip7.png") !important;
  background-size: contain !important;
}
.chip8 {
  background: url("@/assets/chips/chip8.png") !important;
  background-size: contain !important;
}
.chip-item span {
  background-color: #fff;
  color: #000;
  width: 60px;
  text-align: center;
  margin-left: -2px;
  font-weight: 600;
}
.chip-item {
  margin: 10px;
  cursor: pointer;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background-color: #7c3333;
}
.chips-amount {
  display: flex;
}
.wrapper-input-bet {
  background-color: rgb(22, 22, 22);
  display: flex;
  gap: 10px;
  border: 1px solid rgba(233, 233, 233, 0.2);
}
.clearBtn {
  background-color: rgba(13, 13, 13, 0.359);
  padding: 10px;
  padding: 15px;
  border: 1px solid rgba(233, 233, 233, 0.2);
  color: rgba(255, 255, 255, 0.508);
  cursor: pointer;
}
.input-bet {
  background: none;
  outline: none;
  color: #fff;
  font-weight: 500;
  font-size: 1.2rem;
  border: none;
  padding: 15px;
}
.parent-sabong {
  width: 100%;
  min-height: 100vh;
  height: auto;
  background-color: #1e1a1a;
  padding: 1rem 3rem;
}
.content-sabong {
  display: flex;
  justify-content: center;
  gap: 2rem;
}
.iframeSabong {
  /* height: 350px; */
  border-radius: 5px;
}
.sabong-title {
  margin-left: -100px;
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
}
.item-sabong {
  width: 50%;
  height: 550px;
  position: relative;
}
.table-custom {
  background-color: rgb(18, 18, 18);
  width: 100%;
  text-align: center;
}
.table-custom th {
  background-color: #282828;
  padding: 1rem;
  font-weight: 500;
}
.table-custom td {
  padding: 0.8rem;
  font-weight: 500;
}
.betTypeBtn {
  background-color: green;
  padding: 1rem;
  cursor: pointer;
  border-radius: 3px;
}
.isLoadingBtn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 128, 0, 0.558);
}
.isDisabled {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 128, 0, 0.558);
}
.betTypeBtn:hover {
  background-color: rgb(3, 107, 3);
}
.current-balance {
  padding: 10px;
}
.header-sabong {
  text-align: center;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
}
.betting-content {
  background-color: #2e2e2e;
  height: auto;
}
.fadedBetting {
  animation: faded 3s linear infinite alternate;
}

@keyframes faded {
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
}
</style>
