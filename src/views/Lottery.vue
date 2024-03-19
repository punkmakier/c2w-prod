<template>
  <div class="info-body">
    <div class="left-content-body">
      <div v-if="routeInfo === 'ez2'">
        <ez2comp
          :picked2numbers="ez2HolderNumber"
          :moneyList="moneyBalls"
          @ez2generatedNumber="ez2generatedNumber"
          @removeBall="removeEZ2Ball"
          @clearEZ2Ball="clearBall"
          @selectedBall="selectedBallEZ2"
          @moneyPlacement="placeBet"
          @updateAmount="updatePlaceBet"
          :valueAmount="amountToBet"
          @mechanics="mechanicsFunc"
          @submitTicket="submitTicketEZ2" />
      </div>
      <div v-if="routeInfo === '3dlotto'">
        <d3lottocomp
          :picked2numbers="D3LottoHolderNumber"
          :moneyList="moneyBalls"
          @ez2generatedNumber="d3lottogeneratedNumber"
          @removeBall="remove3DLottoBall"
          @clearEZ2Ball="clearBall"
          @selectedBall="selectedBall3DLotto"
          @moneyPlacement="placeBet"
          @updateAmount="updatePlaceBet"
          :valueAmount="amountToBet"
          @mechanics="mechanicsFunc"
          @submitTicket="submitTicket3D" />
      </div>
      <div v-if="routeInfo === 'pick3'">
        <pick3comp
          :picked2numbers="pick3HolderNumber"
          :moneyList="moneyBalls"
          @ez2generatedNumber="pick3generatedNumber"
          @removeBall="removePick3Ball"
          @clearEZ2Ball="clearBall"
          @selectedBall="selectedBallPick3"
          @moneyPlacement="placeBet"
          @updateAmount="updatePlaceBet"
          :valueAmount="amountToBet"
          @mechanics="mechanicsFunc"
          @submitTicket="submitTicketPICK3" />
      </div>
    </div>
    <div class="right-content-body"><LottoSidebar /></div>
    <Dialog
      :draggable="false"
      v-model:visible="mechanics"
      modal
      :header="HeaderMechanics"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div v-if="mechanicsType === 'ez2mechanics'"><p>EZ 2 Mechanics</p></div>
      <div v-else-if="mechanicsType === 'pick3'">Pick 3 Mechanics</div>
      <div v-else-if="mechanicsType === '3DLotto'">3D Lotto Mechanics</div>
    </Dialog>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import LottoSidebar from "@/components/Lottery/LottoSidebar.vue";
import TheWalletMoney from "@/components/TheWalletMoney.vue";
import { ref, watch } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ez2comp from "@/components/Lottery/ez2comp.vue";
import d3lottocomp from "@/components/Lottery/d3lottocomp.vue";
import pick3comp from "@/components/Lottery/pick3comp.vue";
import { useAuthStore } from "@/stores/user.js";

export default {
  components: {
    LottoSidebar,
    TheWalletMoney,
    ez2comp,
    d3lottocomp,
    pick3comp,
  },
  setup() {
    const route = useRoute();
    const routeInfo = ref(route.params.type || "");
    const store = useAuthStore();
    const token = store.user[0].token;
    const user = store.user[0].username;

    const moneyBalls = [
      "10",
      "50",
      "100",
      "150",
      "200",
      "250",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
      "1000",
    ];

    const amountToBet = ref(0);
    const ez2HolderNumber = ref([]);
    const pick3HolderNumber = ref([]);
    const D3LottoHolderNumber = ref([]);

    // Mechanics Handler
    const mechanics = ref(false);
    const mechanicsType = ref("");
    const HeaderMechanics = ref("");
    const mechanicsFunc = (mechtype) => {
      mechanics.value = true;
      mechanicsType.value = mechtype;
      if (mechtype === "ez2mechanics") {
        HeaderMechanics.value = "EZ-2 Mechanics";
      }
      if (mechtype === "3DLotto") {
        HeaderMechanics.value = "3D Lotto Mechanics";
      }
      if (mechtype === "pick3") {
        HeaderMechanics.value = "Pick 3 Mechanics";
      }
    };

    const getRandomNumbers = (min, max, balls) => {
      let randomNumbers = [];
      for (let i = 1; i <= balls; i++) {
        let generatedNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        randomNumbers.push(generatedNumber);
      }

      return randomNumbers;
    };
    const clearBall = () => {
      ez2HolderNumber.value = [];
      pick3HolderNumber.value = [];
      D3LottoHolderNumber.value = [];
    };
    const placeBet = (money) => {
      amountToBet.value = money;
    };
    const updatePlaceBet = (newValue) => {
      amountToBet.value = newValue;
    };

    // EZ-2
    const ez2generatedNumber = () => {
      ez2HolderNumber.value = [...getRandomNumbers(1, 31, 2)];
    };
    // const submitTicket = (data) => {
    //   console.log(data);
    // };
    const showAlert = () => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
      });
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your imaginary file is safe :)",
              icon: "error",
            });
          }
        });
    };
    const submitTicketEZ2 = (data) => {
      showAlert();
      const firstNum = data[0].pickedNumbers[0];
      const secondNum = data[0].pickedNumbers[1];
      const bet = data[0].bet;
      const name = data[0].name;

      const sendData = [
        {
          username: user,
          token: token,
          firstNumber: firstNum,
          secondNumber: secondNum,
          amountBet: bet,
          name: name,
        },
      ];
      console.log(sendData);
    };

    const submitTicketPICK3 = (data) => {
      const firstNum = data[0].pickedNumbers[0];
      const secondNum = data[0].pickedNumbers[1];
      const thirdNum = data[0].pickedNumbers[2];
      const bet = data[0].bet;
      const name = data[0].name;

      const sendData = [
        {
          username: user,
          token: token,
          firstNumber: firstNum,
          secondNumber: secondNum,
          thirdNumber: thirdNum,
          amountBet: bet,
          name: name,
        },
      ];
      console.log(sendData);
    };
    const submitTicket3D = (data) => {
      const firstNum = data[0].pickedNumbers[0];
      const secondNum = data[0].pickedNumbers[1];
      const thirdNum = data[0].pickedNumbers[2];
      const bet = data[0].bet;
      const name = data[0].name;

      const sendData = [
        {
          username: user,
          token: token,
          firstNumber: firstNum,
          secondNumber: secondNum,
          thirdNumber: thirdNum,
          amountBet: bet,
          name: name,
        },
      ];
      console.log(sendData);
    };

    const selectedBallEZ2 = (ball) => {
      if (ez2HolderNumber.value.length <= 1) {
        ez2HolderNumber.value.push(ball);
      }
    };

    const removeEZ2Ball = (ballIndex) => {
      if (ez2HolderNumber.value) {
        const index = ez2HolderNumber.value.indexOf(ballIndex);

        if (index !== -1) {
          ez2HolderNumber.value.splice(index, 1);
        }
      }
    };

    // PICK-3
    const pick3generatedNumber = () => {
      pick3HolderNumber.value = [...getRandomNumbers(1, 66, 3)];
    };

    const selectedBallPick3 = (ball) => {
      if (pick3HolderNumber.value.length <= 2) {
        if (pick3HolderNumber.value.includes(ball)) {
          console.log("EXIST");
        } else {
          pick3HolderNumber.value.push(ball);
        }
      }
    };

    const removePick3Ball = (ballIndex) => {
      if (pick3HolderNumber.value) {
        const index = pick3HolderNumber.value.indexOf(ballIndex);

        if (index !== -1) {
          pick3HolderNumber.value.splice(index, 1);
        }
      }
    };

    // 3D Lotto
    const d3lottogeneratedNumber = () => {
      D3LottoHolderNumber.value = [...getRandomNumbers(1, 31, 3)];
    };

    const selectedBall3DLotto = (ball) => {
      if (D3LottoHolderNumber.value.length <= 2) {
        D3LottoHolderNumber.value.push(ball);
      }
    };

    const remove3DLottoBall = (ballIndex) => {
      if (D3LottoHolderNumber.value) {
        const index = D3LottoHolderNumber.value.indexOf(ballIndex);

        if (index !== -1) {
          D3LottoHolderNumber.value.splice(index, 1);
        }
      }
    };

    watch(
      () => route.params.type,
      (newInfo) => {
        routeInfo.value = newInfo;
      }
    );

    return {
      selectedBallPick3,
      removePick3Ball,
      pick3generatedNumber,
      pick3HolderNumber,
      d3lottogeneratedNumber,
      selectedBall3DLotto,
      remove3DLottoBall,
      routeInfo,
      moneyBalls,
      placeBet,
      getRandomNumbers,
      ez2generatedNumber,
      ez2HolderNumber,
      selectedBallEZ2,
      removeEZ2Ball,
      clearBall,
      amountToBet,
      updatePlaceBet,
      mechanicsFunc,
      mechanics,
      mechanicsType,
      HeaderMechanics,
      D3LottoHolderNumber,
      submitTicketEZ2,
      submitTicketPICK3,
      submitTicket3D,
    };
  },
};
</script>
<style>
.removeBall i {
  position: absolute;
  top: -15%;
  right: -20%;
  background-color: #1a1c1e;
  padding: 4px 3px;
  border-radius: 3px;
  cursor: pointer;
}
.noballs {
  width: 20px;
  height: 20px;
  background-color: #d095a3;
  border-radius: 50%;
}
.lottery-prizes {
  width: 40%;
}
.imagePrize {
  margin-top: 15px;
  border-radius: 17px;
  height: 560px;
}
.imagePrize img {
  border-radius: 17px;
}
.latestResBalls {
  display: flex;
  justify-content: space-between;
  padding: 15px;
}
.latest-result {
  background-color: #f1f1f1;
  color: #1a1c1e;
  padding: 10px;
  border-radius: 17px;
}
.sb {
  width: 60px;
  height: 60px;
  background-color: rgb(39, 202, 112);
  border-radius: 50%;
  justify-content: center;
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #fff;
  box-shadow: 0 2px 10px rgb(39, 202, 112);
}
.successBalls {
  display: flex;
  gap: 10px;
}
.latest-result-header {
  display: flex;
  justify-content: space-between;
}
.bettings-button {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.inner-bet {
  font-weight: 600;
  color: #1a1c1ebe;
  display: flex;
  width: 100%;
  gap: 10px;
}
/* .equals {
  width: 10%;
  justify-content: center;
} */
/* .expected-bet {
  width: 40%;
} */
/* .equals {
  display: flex;
  padding: 0 10px;
  align-items: center;
} */
/* .equivalent {
  font-weight: 700;
  color: #fff314;
  text-shadow: 0 2px 4px #1a1c1ec7;
  font-size: 1.3rem;
}
.equals span {
  font-weight: 800;
} */
.bet {
  width: 100%;
  display: flex;
}
.expected {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.expected .text-estimated {
  font-size: 1rem;
  color: #1a1c1ebe;
  font-weight: 600;
}
.money {
  width: 100%;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: start;
  align-items: start;
  margin-top: 20px;
}
.money-ball {
  width: 55px;
  height: 55px;
  background: rgb(255, 243, 20);
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: -1px 1px 2px #1a1c1e43;
  transition: 0.5s ease-in-out;
  position: relative;
  overflow: hidden;
}
.money-ball::before {
  content: "";
  width: 30px;
  height: 30px;
  position: absolute;
  top: -10%;
  right: -10%;
  background-color: #fff;
  border-radius: 50%;
  filter: blur(5px); /* Adjust the blur value as needed */
  opacity: 0.2; /* Adjust the opacity value as needed */
  transition: transform 0.3s ease-in-out, top 0.3s ease-in-out,
    right 0.3s ease-in-out; /* Added transition for smooth effect */
}
.money-ball:hover {
  transform: translateY(-2px);
}
.money-ball:hover::before {
  top: 60%;
  left: 10%;
}

.money-ball span {
  font-size: 0.7rem;
}

.bet-expect-money {
  display: flex;
  flex-direction: column;
}
.bettings {
  width: 100%;
  background-color: #f1f1f1;
  margin-top: 20px;
  color: #1a1c1e;
  padding: 20px;
  border-bottom-left-radius: 17px;
  border-bottom-right-radius: 17px;
}
.balls-handler {
  width: 90%;
  height: auto;
  margin: 0 auto;
  display: flex;
  gap: 10px;
  padding-bottom: 30px;
  flex-wrap: wrap;
}
.balls-handler .lottery-balls {
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  color: #1a1c1e;
  justify-content: center;
  box-shadow: -1px 1px 2px #1a1c1e43;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
.lottery-balls:hover {
  font-weight: 600;
  background: rgb(255, 243, 20);
  background: -moz-linear-gradient(
    52deg,
    rgba(255, 243, 20, 1) 0%,
    rgba(255, 243, 20, 1) 32%,
    rgba(253, 45, 94, 1) 79%,
    rgba(253, 45, 94, 1) 100%
  );
  background: -webkit-linear-gradient(
    52deg,
    rgba(255, 243, 20, 1) 0%,
    rgba(255, 243, 20, 1) 32%,
    rgba(253, 45, 94, 1) 79%,
    rgba(253, 45, 94, 1) 100%
  );
  background: linear-gradient(
    52deg,
    rgba(255, 243, 20, 1) 0%,
    rgba(255, 243, 20, 1) 32%,
    rgba(253, 45, 94, 1) 79%,
    rgba(253, 45, 94, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fff314",endColorstr="#fd2d5e",GradientType=1);
}
.active-ball {
  font-weight: 600;
  background: rgb(255, 243, 20);
  background: -moz-linear-gradient(
    52deg,
    rgba(255, 243, 20, 1) 0%,
    rgba(255, 243, 20, 1) 32%,
    rgba(253, 45, 94, 1) 79%,
    rgba(253, 45, 94, 1) 100%
  );
  background: -webkit-linear-gradient(
    52deg,
    rgba(255, 243, 20, 1) 0%,
    rgba(255, 243, 20, 1) 32%,
    rgba(253, 45, 94, 1) 79%,
    rgba(253, 45, 94, 1) 100%
  );
  background: linear-gradient(
    52deg,
    rgba(255, 243, 20, 1) 0%,
    rgba(255, 243, 20, 1) 32%,
    rgba(253, 45, 94, 1) 79%,
    rgba(253, 45, 94, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fff314",endColorstr="#fd2d5e",GradientType=1);
}
.divider {
  background-color: #64646428;
  height: 2px;
}
.youpick {
  color: #1a1c1e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.btnc {
  background-color: blue;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
}
.youpick .first-youpick {
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.youpick .second-youpick {
  display: flex;
  justify-content: space-around;
  width: 40%;
  gap: 10px;
}
.youpick .balls-pick {
  width: 60px;
  height: 60px;
  background-color: #ff1354;
  box-shadow: -1px 2px 5px #ff1354;
  border-radius: 50%;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;
}
.red-ball {
  background-color: #df1818 !important;
  box-shadow: -1px 2px 5px #df1818 !important;
}
.blue-ball {
  background-color: #3d18df !important;
  box-shadow: -1px 2px 5px #3d18df !important;
}
.green-ball {
  background-color: #17e117 !important;
  box-shadow: -1px 2px 5px #17e117 !important;
}
.pick-balls-handler {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  align-items: center;
}
.lottery-body-info {
  display: flex;
  width: 95%;
  margin: 0 auto;
  margin-top: 30px;
  gap: 50px;
}
.lottery-body-info .creating-lottery {
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
.create-lot {
  width: 60%;
  position: relative;
}
.creating-lottery-viewmy-tickets {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  color: #1a1c1e;
  position: relative;
  overflow: hidden;
  background-color: #ff1354;
  border-top-right-radius: 17px;
  border-top-left-radius: 17px;
  color: #fff;
  transition: 0.3s ease-in-out;
}
.creating-lottery-viewmy-tickets:hover {
  background-color: #df1846;
}

.creating-lottery-viewmy-tickets::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 150%; /* Adjust as needed for the size of the highlight */
  height: 150%; /* Adjust as needed for the size of the highlight */
  background: rgba(255, 255, 255, 0.1); /* White with low opacity */
  border-radius: 50%;
  animation: moveHighlight 2s linear infinite; /* Adjust duration and timing function as needed */
}

@keyframes moveHighlight {
  0% {
    transform: translate(-50%, -50%);
  }
  100% {
    transform: translate(50%, 50%);
  }
}
.money-wallet,
.lotoTypeLogo {
  width: 20%;
}
.nextDrawClass {
  widows: 60%;
}
.ndtime {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.header-lottery {
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  margin-top: 20px;
}
.countdownLottoTime {
  font-size: 3rem;
  text-shadow: 0 2px 10px #ffffff;
}
.info-body {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 40px;
  background-color: #1a1c1e;
  display: flex;
}
.left-content-body {
  width: 80%;
}
.right-content-body {
  width: 20%;
}
</style>
