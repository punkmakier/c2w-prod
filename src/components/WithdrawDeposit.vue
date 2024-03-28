<template>
  <div class="mainDepWith">
    <div v-if="type == 'Deposit'">
      <Message :severity="severity" :closable="false" v-if="responseMessage">{{
        responseMessage
      }}</Message>
      <div class="depo" style="display: block">
        <div class="deposit_info">
          <div style="width: 50%">
            <span style="font-weight: 600"
              >{{ $t("paymentProvider") }}
              <small style="color: var(--red-300)">*</small></span
            >
            <Dropdown
              v-model="selectedPaymentProvider"
              :options="optionPaymentProvider"
              optionLabel="name"
              :placeholder="$t('selectPaymentProvider')"
              class="w-100"
              style="margin-top: 5px"
              @change="handleChangeProvider" />
          </div>
          <div style="width: 50%">
            <span style="font-weight: 600"
              >{{ $t("paymentMethod") }}
              <small style="color: var(--red-300)">*</small></span
            >
            <Dropdown
              @change="handleChangePaymentMethod"
              v-model="selectedPaymentMethod"
              :options="optionResultPaymentMethod"
              optionLabel="name"
              :placeholder="$t('selectPaymentMethod')"
              class="w-100"
              style="margin-top: 5px">
              <template #value="slotProps">
                <div
                  v-if="slotProps.value"
                  class="flex align-items-center"
                  style="display: flex; gap: 10px">
                  <img
                    :alt="slotProps.value.label"
                    :src="`/src/assets/payment_gateway_logo/${slotProps.value.logo}`"
                    class="mr-2"
                    style="width: 30px; border-radius: 4px" />
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div
                  class="flex align-items-center"
                  style="display: flex; gap: 10px">
                  <img
                    :alt="slotProps.option.label"
                    :src="`/src/assets/payment_gateway_logo/${slotProps.option.logo}`"
                    class="mr-2"
                    style="width: 30px; border-radius: 4px" />
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>

        <!-- <div class="paymentMethods"> -->
        <!-- <div
            :class="`g ${
              depositActivePayment == 'GCash' ? 'active-payment' : ''
            }`"
            @click="depositActivePayment = 'GCash'">
            <span>GCash</span>
            <div class="gcash"></div>
          </div>

          <div
            :class="`g ${
              depositActivePayment == 'Paymaya' ? 'active-payment' : ''
            }`"
            @click="depositActivePayment = 'Paymaya'">
            <span>Paymaya</span>
            <div class="paymaya"></div>
          </div>
          <div
            :class="`g ${
              depositActivePayment == 'Bank' ? 'active-payment' : ''
            }`"
            @click="depositActivePayment = 'Bank'">
            <span>Bank</span>
            <div class="bank"></div>
          </div>
          <div
            :class="`g ${
              depositActivePayment == 'CreditCard' ? 'active-payment' : ''
            }`"
            @click="depositActivePayment = 'CreditCard'">
            <span style="width: 180px">Credit Card</span>
            <div class="creditcard"></div>
          </div> -->
        <!-- </div> -->
        <!-- <div
          v-if="
            depositActivePayment == 'GCash' || depositActivePayment == 'Paymaya'
          ">
          <span>Select Providers</span>

          <div
            style="
              display: flex;
              gap: 10px;
              margin-top: 10px;
              margin-bottom: 20px;
              justify-content: center;
              align-self: center;
            ">
            <div
              class="paymentProv"
              v-for="(value, index) in paymentProviders"
              :class="`g ${
                value == selectedPaymentGateway ? 'active-payment' : ''
              }`"
              @click="selectedPaymentGateway = value"
              :key="index">
              <span>{{ value }}</span>
            </div>
          </div>
        </div> -->

        <div class="paymentInput">
          <div class="flex flex-column gap-2">
            <label for="username" class="fw-500"
              >{{ $t("amount") }} <small style="color: var(--red-300)">*</small>

              <small
                style="color: var(--red-600); margin-left: 10px"
                class="mindep"
                >({{ $t("minimum") }}: 200)</small
              ></label
            >
            <InputNumber
              v-model="depositAmount"
              inputId="minmaxfraction"
              :min="200"
              class="w-100" />
          </div>
          <div
            style="
              margin-top: 15px;
              margin-bottom: 20px;
              display: flex;
              gap: 10px;
              flex-wrap: wrap;
            ">
            <span
              v-for="(value, index) in amountDepoList"
              :key="index"
              style="
                background-color: rgb(238, 238, 238);
                text-align: center;
                padding: 7px 15px;
                border-radius: 3px;
                cursor: pointer;
                font-weight: 600;
                box-shadow: 0 0 5px rgba(114, 114, 114, 0.5);
              "
              @click="depositAmount = value"
              >₱ {{ value }}</span
            >
          </div>
          <Button
            :label="$t('proceed')"
            class="w-100 mt-1"
            @click="depositSubmit"
            :loading="isLoading" />
        </div>
      </div>
    </div>

    <div v-if="type == 'Withdraw'">
      <Message :severity="severity" :closable="false" v-if="responseMessage">{{
        responseMessage
      }}</Message>
      <div class="w-method">
        <div class="w-parent w-100">
          <label for="username" class="fw-500 me-5">{{
            $t("paymentMethod")
          }}</label>
          <div class="withdrawMethods">
            <div
              :class="`g ${
                withdrawActivePayment == 'GCash' ? 'active-payment' : ''
              }`"
              @click="
                withdrawActivePayment = 'GCash';
                selectedBank = '';
              ">
              <span>GCash</span>
              <div class="gcash"></div>
            </div>
            <div
              :class="`g ${
                withdrawActivePayment == 'PayMaya' ? 'active-payment' : ''
              }`"
              @click="
                withdrawActivePayment = 'PayMaya';
                selectedBank = '';
              ">
              <span>PayMaya</span>
              <div class="paymaya"></div>
            </div>
            <div
              :class="`g ${
                withdrawActivePayment == 'Bank' ? 'active-payment' : ''
              }`"
              @click="withdrawActivePayment = 'Bank'">
              <span>Bank</span>
              <div class="bank"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="customDivider1"></div>
      <div class="depositView">
        <div
          class="flex flex-column gap-2 provMob"
          :class="{ depbank: withdrawActivePayment === 'Bank' }"
          v-if="withdrawActivePayment === 'Bank'"
          style="width: 25%">
          <label for="username" class="fw-500"
            >Provider <small style="color: var(--red-300)">*</small></label
          >
          <Dropdown
            v-model="selectedProviderWithdraw"
            :options="providerOptionsWithdraw"
            optionLabel="name"
            placeholder="Select Provider"
            @change="handleProviderChange"
            class="w-100" />
          <small
            style="color: var(--red-500); font-weight: 500"
            v-if="accountBankErrorMessage"
            >{{ accountBankErrorMessage }}</small
          >
        </div>
        <div
          class="flex flex-column gap-2 provMob"
          :class="{ depbank: withdrawActivePayment === 'Bank' }"
          v-if="withdrawActivePayment === 'Bank'"
          style="width: 25%">
          <label for="username" class="fw-500"
            >Bank <small style="color: var(--red-300)">*</small></label
          >
          <Dropdown
            v-model="selectedBank"
            :options="bankOptions"
            optionLabel="name"
            placeholder="Select Payment Method"
            class="w-100 withdrawD"
            filter />
          <small
            style="color: var(--red-500); font-weight: 500"
            v-if="accountBankErrorMessage"
            >{{ accountBankErrorMessage }}</small
          >
        </div>

        <div
          class="flex flex-column gap-2"
          :class="{ depbank: withdrawActivePayment === 'Bank' }">
          <label for="username" class="fw-500"
            >{{ $t("accountName") }}
            <small style="color: var(--red-300)">*</small></label
          >
          <InputText
            id="username"
            v-model="accountName"
            placeholder="Ex: John Doe"
            :maxlength="50"
            aria-describedby="username-help"
            style="margin-top: 5px"
            autocomplete="off" />
          <small
            style="color: var(--red-500); font-weight: 500"
            v-if="accountNameErrorMsg"
            >{{ accountNameErrorMsg }}</small
          >
        </div>
        <div
          class="flex flex-column gap-2"
          :class="{ depbank: withdrawActivePayment === 'Bank' }">
          <label for="username" class="fw-500"
            >{{ $t("accountNum") }}
            <small style="color: var(--red-300)">*</small></label
          >

          <InputMask
            id="ssn"
            v-model="accountNumber"
            mask="9999-999-9999"
            placeholder="09xx-xxx-xxxx"
            style="margin-top: 5px"
            v-if="withdrawActivePayment != 'Bank'" />
          <InputText
            type="text"
            class="w-100"
            v-model="accountNumber"
            @blur="handleInputAmount"
            :maxlength="20"
            style="margin-top: 5px"
            v-else />
          <small
            style="color: var(--red-500); font-weight: 500"
            v-if="accountNumErrorMessage"
            >{{ accountNumErrorMessage }}</small
          >
        </div>
      </div>
      <div class="flex flex-column gap-2 mt-1">
        <div
          class=""
          style="
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          ">
          <div class="amountDep">
            <label
              >{{ $t("amount") }}
              <small style="color: var(--red-300)">*</small></label
            >
            <small
              style="
                color: var(--red-600);
                font-size: 0.8rem;
                margin-left: 10px;
              "
              class="mindep"
              >({{ $t("minimum") }}: 200)</small
            >
          </div>
          <!-- <label for="username" class="fw-500"
            >Amount <small style="color: var(--red-300)">*</small>
            <small
              style="color: var(--red-600); font-size: 0.7rem; margin-left: 4px"
              >(Minimum: 200)</small
            ></label
          > -->

          <span
            >{{ $t("currentBalance") }}:
            <span
              style="
                color: #ff1354;
                text-shadow: 0 0 3px rgba(61, 33, 33, 0.258);
                font-weight: 700;
              "
              >{{ formatCurrency(currentBalance) }}</span
            >
          </span>
        </div>

        <InputNumber
          v-model="amountValue"
          inputId="minmaxfraction"
          :maxFractionDigits="2"
          :max="availableBalance"
          :min="200"
          @input="handleChangeInput"
          class="w-100" />
      </div>
      <div
        style="
          margin-top: 15px;
          margin-bottom: 20px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        ">
        <span
          v-for="(value, index) in amountWithdrawMinimum"
          :key="index"
          style="
            background-color: rgb(238, 238, 238);
            text-align: center;
            padding: 7px 15px;
            border-radius: 3px;
            cursor: pointer;
            font-weight: 600;
            box-shadow: 0 0 5px rgba(114, 114, 114, 0.5);
          "
          @click="withdrawButtonClicked(value)"
          >₱ {{ value }}</span
        >
      </div>
      <div class="amountSlider">
        <Slider
          v-model="amountSlider"
          style="z-index: 3"
          @change="handleSliderChange" />
        <div class="percentIconHolder">
          <p class="amountPercentageSlider" @click="percentButton(0)">
            0 <i class="pi pi-percentage"></i>
          </p>
          <p class="amountPercentageSlider" @click="percentButton(25)">
            25 <i class="pi pi-percentage"></i>
          </p>
          <p class="amountPercentageSlider" @click="percentButton(50)">
            50 <i class="pi pi-percentage"></i>
          </p>
          <p class="amountPercentageSlider" @click="percentButton(75)">
            75 <i class="pi pi-percentage"></i>
          </p>
          <p class="amountPercentageSlider" @click="percentButton(100)">
            100 <i class="pi pi-percentage"></i>
          </p>
        </div>
      </div>
      <div style="display: flex; gap: 15px; margin-top: 30px">
        <Button
          :label="$t('proceed')"
          class="w-100"
          @click="withdrawSubmit"
          :loading="isLoading" />
        <Button
          class="w-100"
          :label="$t('clear')"
          outlined
          @click="clearFields" />
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, onMounted, watch, toRefs } from "vue";
import { useAuthStore } from "@/stores/user.js";
import { C2WAPIService as axios } from "@/plugins/APIServices.js";
import { useAccountBalance } from "@/stores/user_balance";
import { useToast } from "primevue/usetoast";
export default {
  setup(props, { emit }) {
    const { severity, type } = toRefs(props);

    const selectedBank = ref();
    const bankOptions = ref();

    const providerOptionsWithdraw = ref([
      { name: "Toppay", code: "toppay" },
      { name: "Pagarstar", code: "pagarstar" },
    ]);

    const store = useAuthStore();
    const amountSlider = ref(0);
    const amountValue = ref(0);
    const depositAmount = ref(0);
    const availableBalance = ref(0);
    const addPaymentInfo = ref(false);
    const currentBalance = ref(0);
    const depositActivePayment = ref("GCash");
    const withdrawActivePayment = ref("GCash");
    const accountName = ref("");
    const accountNumber = ref("");
    const selectedPaymentGateway = ref("A+Pay");
    const accountNumErrorMessage = ref("");
    const accountBankErrorMessage = ref("");
    const optionPaymentProvider = ref();
    const selectedPaymentProvider = ref();
    const optionResultPaymentMethod = ref();
    const selectedPaymentMethod = ref();
    const available_payments = ref();
    const minimumdeposit = ref(0);
    const { balance } = useAccountBalance();
    const toast = useToast();
    const paymentMethod = ref();
    const accountNameErrorMsg = ref("");
    const providerID = ref("");

    const selectedProviderWithdraw = ref();

    const handleInputAmount = computed(() => {
      const numericValue = accountNumber.value.replace(/\D/g, "");
      accountNumber.value = numericValue.length > 0 ? numericValue : "";
    });

    const handleSliderChange = () => {
      amountValue.value = (availableBalance.value * amountSlider.value) / 100;
    };

    const handleChangeInput = computed(() => {
      amountSlider.value = (amountValue.value / availableBalance.value) * 100;
    });

    const percentButton = (percent) => {
      amountValue.value = (availableBalance.value * percent) / 100;
      amountSlider.value = percent;
    };

    const clearFields = () => {
      amountSlider.value = 0;
      amountValue.value = 0;
      accountName.value = "";
      accountNumber.value = "";
      depositAmount.value = 0;
    };
    const formatCurrency = (value) => {
      const res = parseFloat(value).toLocaleString("en-US", {
        style: "currency",
        currency: "PHP",
      });
      return res.replace("₱", "₱ ");
    };

    const handleChangeProvider = (event) => {
      selectedPaymentMethod.value = null;
      if (available_payments.value) {
        const pgLogos = [
          { name: "bdo", logo: "bdo.png" },
          { name: "bpi", logo: "bpi.png" },
          { name: "chinabank", logo: "chinabank.png" },
          { name: "easetwest", logo: "ew.png" },
          { name: "gcash", logo: "gcash.png" },
          { name: "komo", logo: "komo.png" },
          { name: "landbank", logo: "lb.png" },
          { name: "metrobank", logo: "mb.png" },
          { name: "PayMaya", logo: "paymaya.png" },
          { name: "pnb", logo: "pnb.png" },
          { name: "rcbc", logo: "rcbc.svg" },
          { name: "security bank", logo: "scb.png" },
          { name: "tonik", logo: "tonik.png" },
          { name: "unionbank", logo: "ub.png" },
          { name: "ucpb", logo: "ucpb.png" },
          { name: "grabpay", logo: "GrabPay.webp" },
        ];

        const res = available_payments.value.filter(
          (item) => item.providerName === event.value.name
        );
        optionResultPaymentMethod.value = res.map((item) => {
          const hasWhiteSpace = /\s/.test(item.method);
          const nameParts = hasWhiteSpace
            ? item.method.split(/\s+/)
            : [item.method];

          const methodName = nameParts[0].toLowerCase()
            ? nameParts[0].toLowerCase()
            : item.name;

          const matchingLogo = pgLogos.find(
            (logo) => logo.name.toLowerCase() === methodName
          );

          return {
            name: item.method,
            paymentID: item.paymentID,
            minDeposit: item.minDeposit,
            providerName: item.providerName,
            logo: matchingLogo.logo,
          };
        });
      }
    };

    if (type.value === "Withdraw") {
      // Show balance
      availableBalance.value = balance.current_balance;
      currentBalance.value = balance.current_balance;

      // Fetch bank list available
    }

    const handleChangePaymentMethod = (event) => {
      console.log(event.value);
      minimumdeposit.value = event.value.minDeposit;
    };

    const handleProviderChange = async () => {
      const res = await axios.postBanklist({
        username: store.user[0].username,
        token: store.user[0].token,
        providerName: selectedProviderWithdraw.value.code,
      });
      const updatedData = res.map((item) => {
        return {
          providerID: item.providerID,
          name: item.method, // Updating 'method' to 'name'
          methodID: item.methodID,
        };
      });
      bankOptions.value = updatedData;
      console.log(bankOptions.value);
    };

    onMounted(async () => {
      if (store.user) {
        // const uname = store.user[0].username;
        const token = store.user[0].token;

        const getPaymentsInfo = await axios.postPaymentsInfo({ token: token });
        available_payments.value = getPaymentsInfo;

        const uniqueProviders = new Set(
          getPaymentsInfo.map((item) => item.providerName)
        );
        optionPaymentProvider.value = Array.from(uniqueProviders).map(
          (name) => ({
            name,
            code: name,
          })
        );
      }
    });

    const withdrawSubmit = () => {
      if (withdrawActivePayment.value != "Bank") {
        let accs = accountNumber.value.replace(/-/g, "");
        if (accs.slice(0, 2) != "09") {
          accountNumErrorMessage.value =
            "Invalid number. It should start with '09xx'-xxx-xxxx.";
          return;
        }
        if (accountName.value == "") {
          accountNameErrorMsg.value = "Account name is required.";
          return;
        } else {
          accountNumErrorMessage.value = "";
          accountNameErrorMsg.value = "";
          paymentMethod.value = withdrawActivePayment.value;
          providerID.value =
            withdrawActivePayment.value === "GCash" ? "6" : "1";
          accountNumber.value = accs;
        }
      } else {
        console.log(selectedBank.value);
        if (!selectedBank.value) {
          accountBankErrorMessage.value = "Please select a bank";
          return;
        }
        if (accountName.value == "") {
          accountNameErrorMsg.value = "Account name is required.";
          return;
        }
        if (accountNumber.value == "") {
          accountNumErrorMessage.value = "Account number is required.";
          return;
        } else {
          accountNumErrorMessage.value = "";
          accountNameErrorMsg.value = "";
          paymentMethod.value = selectedBank.value.name;
        }
      }

      accountNumErrorMessage.value = "";
      accountBankErrorMessage.value = "";
      const data = {
        methods: paymentMethod.value,
        amount: amountValue.value
          ? parseFloat(amountValue.value.toFixed(2))
          : 0,
        accountName: accountName.value.trim(),
        accountNumber: accountNumber.value.trim(),
        // selectedBank: selectedBank.value ? selectedBank.value.code : "",
      };
      emit("submitWithdraw", data);
    };

    const amountDepoList = [100, 200, 500, 1000, 2000, 3000, 4000, 5000];
    const amountWithdrawMinimum = [200, 300, 500, 1000, 2000, 3000, 4000, 5000];

    const withdrawButtonClicked = (val) => {
      if (val > availableBalance.value) {
        amountValue.value = availableBalance.value;
      } else {
        amountValue.value = val;
      }
    };

    const paymentProviders = ref(["A+Pay", "FPAy", "Pagarstar"]);

    watch(depositActivePayment, (newVal) => {
      if (newVal === "PayMaya") {
        paymentProviders.value = ["Toppay"];
        selectedPaymentGateway.value = "Toppay";
      } else if (newVal === "GCash") {
        paymentProviders.value = ["A+Pay", "FPAy", "Pagarstar"];
        selectedPaymentGateway.value = "A+Pay";
      }
    });

    watch(withdrawActivePayment, (newVal) => {
      console.log(newVal);
      accountNumErrorMessage.value = "";
      accountNameErrorMsg.value = "";
    });

    watch(severity, (newVal) => {
      if (newVal === "success") {
        currentBalance.value = currentBalance.value - amountValue.value;
        availableBalance.value = currentBalance.value;
        balance.current_balance = currentBalance.value;

        accountNumber.value = "";
        accountName.value = "";
        amountValue.value = 0;
        withdrawActivePayment.value = "GCash";
      }
    });

    const depositSubmit = () => {
      if (depositAmount.value <= 0) {
        toast.add({
          severity: "error",
          summary: "Failed",
          detail: "Amount deposit should not be 0",
          life: 5000,
        });
        return;
      }
      if (!selectedPaymentProvider.value) {
        toast.add({
          severity: "error",
          summary: "Failed",
          detail: "Please fill the required fields",
          life: 5000,
        });
        return;
      }
      if (!selectedPaymentMethod.value) {
        toast.add({
          severity: "error",
          summary: "Failed",
          detail: "Please fill the required fields",
          life: 5000,
        });
        return;
      }

      const data = {
        paymentID: selectedPaymentMethod.value.paymentID,
        methods: selectedPaymentMethod.value.name,
        providerName: selectedPaymentMethod.value.providerName,
        amount: depositAmount.value,
      };
      emit("submitDeposit", data);
    };

    return {
      amountWithdrawMinimum,
      accountBankErrorMessage,
      accountNumErrorMessage,
      severity,
      type,
      selectedPaymentGateway,
      paymentProviders,
      amountDepoList,
      selectedBank,
      bankOptions,
      amountValue,
      amountSlider,
      handleChangeInput,
      depositAmount,
      addPaymentInfo,
      depositActivePayment,
      withdrawActivePayment,
      currentBalance,
      availableBalance,
      accountName,
      accountNumber,
      handleInputAmount,
      optionPaymentProvider,
      available_payments,
      selectedPaymentProvider,
      optionResultPaymentMethod,
      selectedPaymentMethod,
      minimumdeposit,
      paymentMethod,
      accountNameErrorMsg,
      providerID,
      providerOptionsWithdraw,
      selectedProviderWithdraw,
      depositSubmit,
      withdrawSubmit,
      withdrawButtonClicked,
      handleChangeProvider,
      clearFields,
      percentButton,
      handleSliderChange,
      formatCurrency,
      handleChangePaymentMethod,
      handleProviderChange,
    };
  },

  props: {
    type: {
      type: String,
      default: "",
    },
    responseMessage: {
      type: String,
      default: "",
    },
    severity: {
      type: String,
      default: "",
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style>
.withdrawD .p-dropdown-panel {
  width: 350px !important;
}
.p-dropdown-items-wrapper {
  right: 0 !important;
}
.deposit_info {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.p-dropdown-items-wrapper {
  background-color: #f5f5f5 !important;
}
.p-dropdown-panel .p-dropdown-items .p-dropdown-item {
  color: #333333cc !important;
  font-weight: 500;
}
.paymentProv {
  background-color: rgb(243, 243, 243);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  padding: 10px;
  border-radius: 3px;
}
.paymentProv:hover {
  background-color: rgb(230, 230, 230);
}
.customDivider1 {
  width: 100%;
  height: 3px;
  background-color: rgba(111, 111, 111, 0.347);
  margin: 20px 0;
}
.withdrawMethods {
  display: flex;
  gap: 10px;
}
.withdrawMethods .g {
  width: min(140px, 80vw, 180px);
}
.w-parent {
  display: flex;
  margin-top: 20px;
}
.depo {
  display: flex;
  gap: 20px;
}
.w-method {
  display: flex;
}
.depo .paymentMethods {
  width: auto;
  display: flex;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.g {
  background-color: rgb(236, 236, 236);
  height: 60px;
  width: 450px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
.g:hover {
  background-color: rgb(197, 197, 197);
  border: 1px solid rgb(124, 124, 124);
}
.g:hover span {
  font-weight: 700 !important;
}
.g span {
  font-weight: 500;
}
.active-payment {
  background-color: #ff1354;
  color: #fff;
}
.active-payment:hover {
  background-color: #eb1854 !important;
}
.gcash {
  background: url("@/assets/payment_gateway_logo/gcash_small.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 100%;
  height: 100%;
}
.creditcard {
  background: url("@/assets/payment_gateway_logo/creditcard_small.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 100%;
  height: 100%;
}
.bank {
  background: url("@/assets/payment_gateway_logo/bank_small.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 100%;
  height: 100%;
}
.paymaya {
  background: url("@/assets/payment_gateway_logo/maya.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.paymentInput {
  width: 100%;
}
.tabparent {
  position: relative;
}
.availbalance span {
  font-weight: 600;
  color: #ff1354;
}
.availbalance {
  position: absolute;
  top: 1%;
  right: 3%;
}
.amountSlider {
  margin-top: 15px;
  position: relative;
}
.chips-holder {
  display: flex;
  align-items: center;
  gap: 20px;
}
.savedPaymentC {
  font-weight: 500;
}
.addPaymentInfo {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(31, 31, 31, 0.331);
  cursor: pointer;
  transition: 0.3s ease;
}
.addPaymentInfo:hover {
  background-color: #1a1c1e8f;
  color: #fff;
}
.depositView {
  display: flex;
  gap: 10px;
}
.depositView .p-dropdown {
  margin-top: 5px;
}
.mainDepWith .p-dropdown .p-dropdown-label.p-placeholder,
.addPaymentInfoDialog .p-dropdown .p-dropdown-label.p-placeholder,
.p-dropdown .p-dropdown-label {
  padding: 10px;
}

.amountPercentageSlider {
  background-color: #a6a6a6;
  padding: 2px 6px;
  color: #fefefe;
  font-size: 0.7rem;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease;
}
.amountPercentageSlider:hover {
  background-color: #1011128a;
}
.amountPercentageSlider .pi-percentage {
  font-size: 0.5rem;
}

.percentIconHolder {
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 1;
  margin-top: -5px;
}
</style>
