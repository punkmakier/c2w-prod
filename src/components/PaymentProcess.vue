<template>
  <div
    style="
      background-color: #000000af;
      width: 100%;
      height: 100vh;
      position: fixed;
      z-index: 9999999;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    "
    v-if="url || qr">
    <div class="QROnlyClass" v-if="qr && url">
      <div class="parentqr">
        <div
          style="
            position: absolute;
            right: 10px;
            top: 1%;
            padding: 10px;
            cursor: pointer;
          "
          class="closeQR">
          <i
            class="pi pi-times"
            style="font-size: 1.5rem; color: #000"
            @click="closeQRPayment"></i>
        </div>
        <div
          style="
            background-color: #fff;
            padding: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            border-radius: 7px;
            margin-bottom: 10px;
          "
          class="qrCode">
          <qrcode-vue :value="qr" size="300" level="H" />
        </div>

        <div
          style="
            background-color: #000;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
          ">
          <span style="font-size: 1.5rem">SCAN ME</span>
        </div>
        <div
          style="
            background-color: #638ffd;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            margin-top: 5px;
          ">
          <span style="font-size: 1.2rem">DOWNLOAD IMAGE</span>
        </div>
        <div class="mt-2" style="text-align: center">
          <span style="color: var(--red-400)"
            >Please pay
            <span style="font-weight: 500"
              >₱ {{ amount.toLocaleString() }}</span
            >
            within
            <span style="">{{ countdownText }}</span></span
          ><br />
          <span
            v-if="showErrorM"
            style="color: var(--red-800); font-size: 0.8rem; font-weight: 600"
            >{{ showErrorM }}</span
          >
        </div>
      </div>
      <div>
        <div>
          <ul>
            <li style="color: red">
              Each QR code can only be used once for payment.
            </li>
            <li style="color: red">
              If you need to make another payment, please request a new QR code.
            </li>
          </ul>

          <div style="position: relative">
            <div
              style="
                background-color: #23a0ff;
                padding: 20px;
                text-align: center;
                border-top-right-radius: 8px;
                border-top-left-radius: 8px;
              ">
              <span>ACCEPTS PAYMENTS FROM </span>
            </div>
            <div
              style="
                border-radius: 8px;
                background-color: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                padding: 20px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-evenly;
                align-items: center;
                gap: 20px;
              "
              class="imageHandlerMerchant">
              <img
                v-for="(value, index) in pagarAvailBank"
                :key="index"
                :src="`/src/assets/pagarstar_payment_logo/${value}`"
                class="pagarAvailClass"
                style="width: 100px"
                :alt="value" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="paymentOnlyURL" v-else>
      <div
        style="
          position: relative;
          background-color: rgb(255, 255, 255);
          padding: 20px;
          text-align: end;
          width: 100%;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        "
        class="closeQR">
        <i
          class="pi pi-times"
          style="font-size: 2rem; color: #000; cursor: pointer"
          @click="closeQRPayment"></i>
      </div>
      <iframe
        :src="url"
        frameborder="0"
        style="border-radius: 10px; margin-top: -10px">
      </iframe>
    </div>
  </div>
</template>
<script>
import QrcodeVue from "qrcode.vue";
import { usePaymentProcess } from "@/stores/payment_process";
export default {
  components: { QrcodeVue },
  props: {
    url: {
      type: String,
      required: true,
    },
    qr: {
      type: String,
      required: false,
    },
    amount: {
      type: [String, Number],
      required: false,
    },
  },
  setup() {
    const { state } = usePaymentProcess();
    const pagarAvailBank = [
      "gcash.jpg",
      "cebuana.png",
      "security-bank.jpg",
      "aub.jpg",
      "payMayaLogo.svg",
      "unionbank.svg",
      "psbank-logo.png",
      "pnb.jpg",
      "AllBank.png",
      "Metrobank.webp",
      "eastwest-logo-2.png",
      "cbs.png",
      "tayocash.jpg",
      "USSC.png",
      "coins-ph.jpg",
      "shopee-pay.png",
      "VYBE.jpg",
      "landbank.png",
      "RCBC.jpg",
      "seabnk.jpg",
    ];
    const closeQRPayment = () => {
      state.url = "";
      state.qr = "";
      state.amount = "";
    };
    return { pagarAvailBank, closeQRPayment, state };
  },
  data() {
    return {
      countdownText: "",
      showErrorM: "",
    };
  },
  mounted() {
    this.startCountdown(1);
  },
  methods: {
    startCountdown(minutes) {
      let fetchCounter = 4;
      let seconds = minutes * 60;

      const intervalId = setInterval(() => {
        const minutesLeft = Math.floor(seconds / 60);
        const secondsLeft = seconds % 60;

        this.countdownText = `${minutesLeft}:${secondsLeft} remaining`;

        if (--seconds < 0) {
          clearInterval(intervalId);
          this.showErrorM =
            "This payment request is expired. Please make another request, thank you.";
        } else {
          fetchCounter--;
          if (fetchCounter <= 0) {
            // Fetch callback Pagarstar
            fetchCounter = 4;
            console.log("Fetching: " + fetchCounter);
          }
        }
      }, 1000);
    },
  },
};
</script>
<style>
.QROnlyClass {
  width: 60%;
  height: 65vh;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 10px;
  padding: 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  gap: 60px;
}
.paymentOnlyURL {
  width: 40%;
  height: 98vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
