<template>
  <div class="header-lottery" style="margin-bottom: 20px">
    <div class="lotoTypeLogo">
      <img src="@/assets/lotto_logos/ez2.png" style="width: 80px" alt="" />
    </div>
    <div class="nextDrawClass">
      <div class="ndtime">
        <span>Next Draw</span
        ><span class="countdownLottoTime">{{ nextDrawTimeVal }}</span>
      </div>
    </div>
    <div class="money-wallet"><TheWalletMoney /></div>
  </div>

  <div
    class="header-mobile-lottery"
    style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      display: none;
      margin-bottom: 50px;
    ">
    <div class="lotoTypeLogo">
      <img src="@/assets/lotto_logos/ez2.png" style="width: 50px" alt="" />
    </div>
    <div class="money-wallet"><TheWalletMoney /></div>
    <div class="burger" @click="sidebarCanvas = true">
      <i class="pi pi-align-right" style="font-size: 2rem; cursor: pointer"></i>
    </div>
  </div>

  <div class="mobile-draw-class mb-5" style="text-align: center; display: none">
    <div
      style="
        display: flex;
        flex-direction: column;
        text-align: center;
        margin-bottom: 30px;
      ">
      <span style="font-size: 0.8rem !important">LATEST RESULT</span>
      <div
        v-if="latestResult"
        style="
          display: flex;
          gap: 40px;
          justify-content: center;
          align-items: center;
          margin-top: 30px;
        ">
        <div
          v-for="(val, index) in latestResult"
          :key="index"
          class="diamond-shape"
          :class="{
            'red-ball': index === 0 || index === 3,
            'blue-ball': index === 1 || index === 4,
            'green-ball': index === 2 || index === 5,
          }">
          <div class="item-count">
            <span
              style="
                color: #fff !important;
                font-weight: 700;
                font-size: 1.3rem !important;
              "
              >{{ val }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <span class="nextDrawMobile">Next Draw</span
      ><span class="countdownLottoTimeMobile">{{ nextDrawTimeVal }}</span>
    </div>
  </div>
  <div style="display: grid; place-items: center">
    <iframe
      class="lotto-vid"
      width="1300"
      height="500"
      style="border-radius: 10px"
      src="https://www.youtube.com/embed/I4-4rUCJ6FE?si=YNvXSXbONipdPq6W"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen></iframe>
  </div>

  <div class="lottery-body-info">
    <div class="create-lot">
      <div class="creating-lottery">
        <div class="creating-lottery-viewmy-tickets"></div>
        <div class="youpick">
          <div class="first-youpick">
            <span style="font-weight: 600; color: #fff">Pick 2 Numbers </span>
            <div class="pick-balls-handler">
              <div
                class="noballs"
                v-if="!picked2numbers || !picked2numbers[0]"></div>
              <div class="red-ball balls-pick remove-cursor" v-else>
                <span class="nums">First Number</span>
                <span
                  class="removeBall"
                  @click="$emit('removeBall', picked2numbers[0])"
                  ><i
                    class="pi pi-times"
                    style="font-size: 0.6rem; color: #1e1a1a"></i
                ></span>
                <span>{{ picked2numbers[0] }}</span>
              </div>
              <div
                class="noballs"
                v-if="!picked2numbers || !picked2numbers[1]"></div>
              <div class="blue-ball balls-pick remove-cursor" v-else>
                <span class="nums2">Second Number</span>
                <span
                  class="removeBall"
                  @click="$emit('removeBall', picked2numbers[1])"
                  ><i
                    class="pi pi-times"
                    style="font-size: 0.6rem; color: #1e1a1a"></i
                ></span>
                <span>{{ picked2numbers[1] }}</span>
              </div>
            </div>
          </div>
          <!-- <div class="second-youpick"></div> -->
        </div>
        <div class="divider mt-1 mb-3"></div>
        <div class="balls-handler">
          <div
            class="lottery-balls remove-cursor"
            v-for="numb in lottoNumbers"
            :key="numb.id"
            @click="$emit('selectedBall', numb)"
            :class="{
              'active-red': isBallSelected(numb) || isBallSelected2(numb),
              'active-blue': isBallSelected3(numb) || isBallSelected4(numb),
              'full-ball': picked2numbers.length == 2,
            }">
            <span>{{ numb }}</span>
          </div>
        </div>
      </div>
      <div class="bettings">
        <div class="bet-expect-money">
          <div class="bet bem">
            <div class="inner-bet">
              <div class="inputBet" style="width: 50%">
                <span style="color: #fff"
                  >Your Bet <small style="color: var(--red-300)">*</small></span
                ><InputNumber
                  v-model="dataValue"
                  inputId="minmaxfraction"
                  :maxFractionDigits="2"
                  :max="balance.current_balance"
                  :min="0"
                  class="w-100"
                  @input="updateAmountBet" />
              </div>
              <!-- <div class="betTypes" style="width: 27%">
                <span>Bet Type</span>
                <div
                  class=""
                  style="display: flex; gap: 20px; margin-top: 10px">
                  <div class="flex align-items-center betType">
                    <RadioButton
                      v-model="betTypeValue"
                      inputId="straight"
                      name="bettingType"
                      value="Straight" />
                    <label for="straight" class="ml-2">Straight</label>
                  </div>
                  <div class="flex align-items-center betType">
                    <RadioButton
                      v-model="betTypeValue"
                      inputId="Rambol"
                      name="bettingType"
                      value="Rambol" />
                    <label for="Rambol" class="ml-2">Rambol</label>
                  </div>
                </div>
              </div> -->

              <div class="nameOptional" style="width: 50%">
                <span style="color: #fff">Enter player name (Optional)</span
                ><InputText type="text" v-model="playerName" />
              </div>
            </div>
          </div>

          <div class="money bem">
            <div
              class="money-ball remove-cursor"
              v-for="mb in moneyList"
              :key="mb.id"
              @click="$emit('moneyPlacement', mb)">
              <span style="color: #1e1a1a">₱ {{ mb }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bettings-button mt-3">
        <Button label="Place Bet" class="w-100" @click="submitTicket" />
        <Button
          label="View Mechanics"
          class="w-100"
          outlined
          @click="$emit('mechanics', 'ez2mechanics')" />
      </div>
    </div>
    <div class="lottery-prizes">
      <div class="latest-result">
        <div class="latest-result-header">
          <span style="font-weight: 600">Latest Result</span>
          <span>2023-01-10 / 09:00:00</span>
        </div>
        <div class="latestResBalls">
          <div class="successBalls">
            <div class="sb" v-for="value in latestResult" :key="value.id">
              <span>{{ value }}</span>
            </div>
          </div>
          <Button label="View All Result" @click="viewAllResultFunc" />
        </div>
      </div>
      <div class="mt-3 myBetsClass">
        <span style="font-weight: 600">My Bets</span>
        <DataTable
          :value="myBets"
          tableStyle="min-width: 40rem"
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]">
          <Column field="comb" header="Combination"></Column>
          <Column field="bet" header="Bet"></Column>
          <Column field="possibleWin" header="Possible Win"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="status" header="status"></Column>
        </DataTable>
      </div>
      <!-- <div class="imagePrize">
        <img src="@/assets/lotto_logos/ez2prizes.png" alt="" />
      </div> -->
    </div>

    <Dialog
      :draggable="false"
      v-model:visible="viewAllResultModal"
      modal
      header="View All Results"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <p>N/A</p>
    </Dialog>
    <Sidebar
      v-model:visible="sidebarCanvas"
      header=" "
      class="w-full md:w-20rem lg:w-30rem"
      position="right">
      <LottoSidebar />
    </Sidebar>
  </div>
</template>
<script>
import { ref, watch, onMounted, onUnmounted } from "vue";
import TheWalletMoney from "@/components/TheWalletMoney.vue";
import LottoSidebar from "@/components/Lottery/LottoSidebar.vue";
import { useAccountBalance } from "@/stores/user_balance.js";
import { C2WAPIService as axios } from "@/plugins/APIServices.js";
import { useAuthStore } from "@/stores/user.js";

export default {
  components: { TheWalletMoney, LottoSidebar },
  props: {
    picked2numbers: {
      type: Array,
      required: false,
      default: () => [],
    },
    moneyList: {
      type: Array,
      required: false,
      default: () => [],
    },
    valueAmount: {
      type: Number,
      required: false,
      default: 0,
    },
    name: {
      type: String,
      required: false,
      default: "",
    },
    betType: {
      type: String,
      required: false,
      default: "straight",
    },
  },
  setup(props, { emit }) {
    const sidebarCanvas = ref(false);
    const { balance } = useAccountBalance();
    const lottoNumbers = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
    ];
    const myBets = ref();
    const localPicked2Numbers = ref(props.picked2numbers);
    const store = useAuthStore();
    const token = store.user[0].token;
    const user = store.user[0].username;
    const gameID = ref();
    const dataValue = ref(props.valueAmount);
    const playerName = ref(props.name);
    const betTypeValue = ref(props.betType);
    const nextDrawTimeVal = ref();
    const latestResult = ref();
    const resCountdownVal = ref(null);
    const startCountdown = ref(null);
    watch(
      () => props.valueAmount,
      (newValue) => {
        dataValue.value = newValue;
      }
    );

    watch(
      () => props.picked2numbers,
      (newValue) => {
        localPicked2Numbers.value = newValue;
      },
      { immediate: true }
    );

    const isBallSelected = (numb) => {
      return (
        parseInt(numb) ===
        (localPicked2Numbers.value && localPicked2Numbers.value[0])
      );
    };
    const isBallSelected2 = (numb) => {
      return numb === (props.picked2numbers && props.picked2numbers[0]);
    };

    const isBallSelected3 = (numb) => {
      return (
        parseInt(numb) ===
        (localPicked2Numbers.value && localPicked2Numbers.value[1])
      );
    };
    const isBallSelected4 = (numb) => {
      return numb === (props.picked2numbers && props.picked2numbers[1]);
    };

    const lottoLogin = async () => {
      const passData = {
        username: user,
        token: token,
        gameType: "2D",
      };
      const res = await axios.postLotteryLogin(passData);
      if (res.error === 0) {
        gameID.value = res.gameDetails.id;
        resCountdownVal.value = res.gameDetails.ballClose;

        console.log(gameID.value);
      } else {
        toast.add({
          severity: "error",
          summary: "Failed",
          detail: res.description,
          life: 3000,
        });
      }
    };

    const formatedStatus = (val) => {
      switch (val) {
        case 1:
          return "Unsettled";
        case 2:
          return "Win";
        case 0:
          return "Loss";
        default:
          return "";
      }
    };

    const fetchMyBets = async () => {
      const passData = {
        username: user,
        token: token,
        gameType: "2D",
      };
      const res = await axios.postFetchMybets(passData);
      console.log(res);
      if (res.error === 0) {
        const finalBetList = res.betList.map((bet) => ({
          comb: bet.firstNumber + "*" + bet.secNumber,
          bet: bet.betAmount,
          possibleWin: (bet.betAmount * res.multi2D).toLocaleString(),
          name: bet.name === "default" ? "" : bet.name,
          status: formatedStatus(bet.status),
        }));
        myBets.value = finalBetList;
      } else {
        toast.add({
          severity: "error",
          summary: "Failed",
          detail: res.description,
          life: 3000,
        });
      }
    };

    const fetchLatestResult = async () => {
      const passData = {
        username: user,
        token: token,
        gameType: "2D",
      };
      const res = await axios.postFetchLatestResult(passData);
      if (res.error === 0) {
        latestResult.value = [
          res.betHistory[0].firstNumber,
          res.betHistory[0].secNumber,
        ];
      } else {
        toast.add({
          severity: "error",
          summary: "Failed",
          detail: res.description,
          life: 3000,
        });
      }
    };

    const calculateCountdown = () => {
      if (!startCountdown.value || !resCountdownVal.value) return;

      const currentDatetime = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Etc/GMT+8" })
      );
      const diff = startCountdown.value - currentDatetime;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      if (seconds < 0) {
        nextDrawTimeVal.value = "00:00:00 - CLOSED";
        return;
      }
      nextDrawTimeVal.value = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };
    onMounted(() => {
      lottoLogin();
      fetchMyBets();
      fetchLatestResult();

      watch(resCountdownVal, (newVal) => {
        if (newVal) {
          startCountdown.value = new Date(newVal);
        }
      });

      calculateCountdown();
      // Update the countdown every second
      const interval = setInterval(calculateCountdown, 1000);

      // Clean up
      onUnmounted(() => clearInterval(interval));

      emit("updateAmount", dataValue.value);
    });

    const updateAmountBet = () => {
      emit("updateAmount", dataValue.value);
    };

    const viewAllResultModal = ref(false);
    const viewAllResultFunc = () => {
      viewAllResultModal.value = true;
    };

    const submitTicket = () => {
      const data = [
        {
          pickedNumbers: localPicked2Numbers.value,
          bet: dataValue.value,
          name: playerName.value,
          gameID: gameID.value,
        },
      ];
      emit("submitTicket", data);
    };

    return {
      dataValue,
      updateAmountBet,
      lottoNumbers,
      isBallSelected,
      localPicked2Numbers,
      isBallSelected2,
      latestResult,
      viewAllResultModal,
      viewAllResultFunc,
      playerName,
      submitTicket,
      betTypeValue,
      sidebarCanvas,
      isBallSelected3,
      isBallSelected4,
      nextDrawTimeVal,
      balance,
      myBets,
    };
  },
};
</script>
<style>
.nextDrawMobile {
  font-size: 1rem !important;
}
.countdownLottoTimeMobile {
  font-size: 1.8rem !important;
  text-shadow: 0 0 3px #fff;
}
</style>
