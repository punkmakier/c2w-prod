<template>
  <div class="header-lottery" style="margin-bottom: 90px">
    <div class="lotoTypeLogo">
      <img src="@/assets/lotto_logos/3d.png" style="width: 80px" alt="" />
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
      <img src="@/assets/lotto_logos/3d.png" style="width: 50px" alt="" />
    </div>
    <div class="money-wallet"><TheWalletMoney /></div>
    <div class="burger" @click="sidebarCanvas = true">
      <i class="pi pi-align-right" style="font-size: 2rem; cursor: pointer"></i>
    </div>
  </div>

  <div class="mobile-draw-class" style="text-align: center; display: none">
    <div
      style="
        display: flex;
        flex-direction: column;
        text-align: center;
        margin-bottom: 30px;
      ">
      <span style="font-size: 0.8rem !important">LATEST RESULT</span>
      <span style="font-size: 4rem !important">12, 7, 23</span>
    </div>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <span class="nextDrawMobile">Next Draw</span
      ><span class="countdownLottoTimeMobile">{{ nextDrawTimeVal }}</span>
    </div>
  </div>
  <div class="lottery-body-info">
    <div class="create-lot">
      <div class="creating-lottery">
        <div class="creating-lottery-viewmy-tickets"></div>
        <div class="youpick">
          <div class="first-youpick">
            <span>Pick 3 Numbers </span>
            <div class="pick-balls-handler">
              <div
                class="noballs"
                v-if="!picked2numbers || !picked2numbers[0]"></div>
              <div class="red-ball balls-pick remove-cursor" v-else>
                <span
                  class="removeBall"
                  @click="$emit('removeBall', picked2numbers[0])"
                  ><i class="pi pi-times" style="font-size: 0.6rem"></i
                ></span>
                <span>{{ picked2numbers[0] }}</span>
              </div>
              <div
                class="noballs"
                v-if="!picked2numbers || !picked2numbers[1]"></div>
              <div class="blue-ball balls-pick remove-cursor" v-else>
                <span
                  class="removeBall"
                  @click="$emit('removeBall', picked2numbers[1])"
                  ><i class="pi pi-times" style="font-size: 0.6rem"></i
                ></span>
                <span>{{ picked2numbers[1] }}</span>
              </div>
              <div
                class="noballs"
                v-if="!picked2numbers || !picked2numbers[2]"></div>
              <div class="green-ball balls-pick remove-cursor" v-else>
                <span
                  class="removeBall"
                  @click="$emit('removeBall', picked2numbers[2])"
                  ><i class="pi pi-times" style="font-size: 0.6rem"></i
                ></span>
                <span>{{ picked2numbers[2] }}</span>
              </div>
            </div>
          </div>
          <!-- <div class="second-youpick">
            <Button
              label="Quick Pick"
              class="w-100"
              @click="$emit('ez2generatedNumber')" />
            <Button
              label="Clear"
              class="w-100"
              outlined
              @click="$emit('clearEZ2Ball')" />
          </div> -->
        </div>
        <div class="divider mt-1 mb-3"></div>
        <div class="balls-handler d3LottoBallsHandler">
          <div
            class="lottery-balls remove-cursor"
            v-for="numb in lottoNumbers"
            :key="numb.id"
            @click="$emit('selectedBall', numb)"
            :class="{
              'active-red': isBallSelected(numb) || isBallSelected2(numb),
              'active-blue': isBallSelected3(numb) || isBallSelected4(numb),
              'active-green': isBallSelected5(numb) || isBallSelected6(numb),
            }">
            <span>{{ numb }}</span>
          </div>
        </div>
      </div>
      <div class="bettings">
        <div class="bet-expect-money">
          <div class="bet bem">
            <div class="inner-bet">
              <div class="">
                <span
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
              <div class="">
                <span>Enter player name (Optional)</span
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
              <span>₱ {{ mb }}</span>
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
          @click="$emit('mechanics', '3DLotto')" />
      </div>
    </div>
    <div class="lottery-prizes">
      <div class="latest-result">
        <div class="latest-result-header">
          <span>Latest Result</span>
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
      <div class="mt-3">
        <span>My Bets</span>
        <DataTable
          :value="products"
          tableStyle="min-width: 40rem"
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]">
          <Column field="name" header="Method"></Column>
          <Column field="category" header="Amount"></Column>
          <Column field="quantity" header="Status"></Column>
          <Column field="quantity" header="Remarks"></Column>
          <Column field="quantity" header="Player Name"></Column>
        </DataTable>
      </div>
      <!-- <div class="imagePrize">
        <img src="@/assets/lotto_logos/ez2prizes.png" alt="" />
      </div> -->
    </div>

    <Dialog
      :draggable="false"
      v-model:visible="viewBoughtTickets"
      modal
      header="My Tickets"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <p>TABLE FORMAT - FOR BOUGHT TICKETS FOR 3D</p>
    </Dialog>
    <Dialog
      :draggable="false"
      v-model:visible="viewAllResultModal"
      modal
      header="View All Results"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <p>View All Result Modal Here 3D</p>
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
import { ref, watch, onMounted } from "vue";
import TheWalletMoney from "@/components/TheWalletMoney.vue";
import LottoSidebar from "@/components/Lottery/LottoSidebar.vue";
import { useAccountBalance } from "@/stores/user_balance.js";
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
  },
  setup(props, { emit }) {
    const lottoNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const { balance } = useAccountBalance();

    const sidebarCanvas = ref(false);
    const localPicked2Numbers = ref(props.picked2numbers);

    const dataValue = ref(props.valueAmount);
    const playerName = ref(props.name);
    const nextDrawTimeVal = ref();

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

    const isBallSelected5 = (numb) => {
      return (
        parseInt(numb) ===
        (localPicked2Numbers.value && localPicked2Numbers.value[2])
      );
    };
    const isBallSelected6 = (numb) => {
      return numb === (props.picked2numbers && props.picked2numbers[2]);
    };

    function getNextDrawTime() {
      const drawTimes = ["2:00 PM", "5:00 PM", "9:00 PM"];
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();
      const currentAMPM = currentHour >= 12 ? "PM" : "AM";

      // Convert current time to string format like the draw times
      const currentTimeString = `${currentHour % 12}:${
        currentMinutes < 10 ? "0" + currentMinutes : currentMinutes
      } ${currentAMPM}`;

      let nextDrawIndex = 0;
      for (let i = 0; i < drawTimes.length; i++) {
        if (drawTimes[i] > currentTimeString) {
          nextDrawIndex = i;
          break;
        }
      }

      let nextDrawTime;
      if (nextDrawIndex === 0) {
        nextDrawTime = drawTimes[0];
      } else if (nextDrawIndex === drawTimes.length || currentHour > 21) {
        nextDrawTime = drawTimes[0];
      } else {
        nextDrawTime = drawTimes[nextDrawIndex];
      }
      nextDrawTimeVal.value = nextDrawTime;
      console.log("Next draw time:", nextDrawTime);
    }
    onMounted(() => {
      getNextDrawTime();
      emit("updateAmount", dataValue.value);
    });

    const updateAmountBet = () => {
      emit("updateAmount", dataValue.value);
    };

    const viewBoughtTickets = ref(false);

    const viewMytickets = () => {
      viewBoughtTickets.value = true;
    };

    const latestResult = ref(["12", "7", "23"]);
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
          gameID: 1,
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
      viewMytickets,
      viewBoughtTickets,
      latestResult,
      viewAllResultModal,
      viewAllResultFunc,
      playerName,
      sidebarCanvas,
      submitTicket,
      isBallSelected3,
      isBallSelected4,
      isBallSelected5,
      isBallSelected6,
      nextDrawTimeVal,
      balance,
    };
  },
};
</script>
