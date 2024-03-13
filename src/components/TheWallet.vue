<template>
  <div>
    <div class="saved-payment-info">
      <span class="savedPaymentC">Saved Payment Info</span>
      <div class="chips-holder mt-1">
        <Chip
          label="09471559441"
          style="padding: 5px 20px"
          image="/src/assets/payment_gateway_logo/gcash.png"
          removable />
        <Chip
          label="2456154541"
          style="padding: 5px 20px"
          image="/src/assets/payment_gateway_logo/bpi.png"
          removable />
        <div class="addPaymentInfo" @click="addPaymentInfo = true">
          Add <i class="pi pi-plus-circle" style="font-size: 1rem"></i>
        </div>
      </div>
    </div>
    <div class="tabparent">
      <TabView class="mt-4">
        <TabPanel header="Deposit">
          <div class="depositView">
            <div class="flex flex-column gap-2">
              <label for="username" class="fw-500">Payment Method</label>
              <Dropdown
                v-model="selectedCity"
                :options="cities"
                optionLabel="name"
                placeholder="Select Payment Method"
                class="w-full md:w-14rem w-100" />
            </div>
            <div class="flex flex-column gap-2">
              <label for="username" class="fw-500">Account Name</label>
              <InputText
                id="username"
                v-model="value"
                aria-describedby="username-help"
                style="margin-top: 5px" />
            </div>
            <div class="flex flex-column gap-2">
              <label for="username" class="fw-500">Account Number</label>
              <InputNumber
                v-model="value2"
                inputId="withoutgrouping"
                :useGrouping="false"
                class="w-100" />
            </div>
          </div>
          <div class="flex flex-column gap-2 mt-1">
            <label for="username" class="fw-500">Amount</label>
            <InputNumber
              v-model="depositAmount"
              inputId="minmaxfraction"
              :min="0"
              class="w-100" />
          </div>

          <div style="display: flex; gap: 15px; margin-top: 30px">
            <Button label="Proceed" class="w-100" />
            <Button class="w-100" label="Clear" outlined />
          </div>
        </TabPanel>
        <TabPanel header="Withdraw">
          <div class="depositView">
            <div class="flex flex-column gap-2">
              <label for="username" class="fw-500">Payment Method</label>
              <Dropdown
                v-model="selectedCity"
                :options="cities"
                optionLabel="name"
                placeholder="Select Payment Method"
                class="w-full md:w-14rem w-100" />
            </div>
            <div class="flex flex-column gap-2">
              <label for="username" class="fw-500">Account Name</label>
              <InputText
                id="username"
                v-model="value"
                aria-describedby="username-help"
                style="margin-top: 5px" />
            </div>
            <div class="flex flex-column gap-2">
              <label for="username" class="fw-500">Account Number</label>
              <InputNumber
                v-model="value2"
                inputId="withoutgrouping"
                :useGrouping="false"
                class="w-100" />
            </div>
          </div>
          <div class="flex flex-column gap-2 mt-1">
            <label for="username" class="fw-500">Amount</label>
            <InputNumber
              v-model="amountValue"
              inputId="minmaxfraction"
              :maxFractionDigits="2"
              :max="4124"
              :min="0"
              @input="handleChangeInput"
              class="w-100" />
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
            <Button label="Proceed" class="w-100" />
            <Button class="w-100" label="Clear" outlined />
          </div>
        </TabPanel>
      </TabView>
      <div class="availbalance">
        <p>Balance: <span>₱ 4124</span></p>
      </div>
    </div>

    <Dialog
      v-model:visible="addPaymentInfo"
      modal
      header="Add Payment Information"
      :style="{ width: '40rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div class="addPaymentInfoDialog">
        <div class="flex flex-column gap-2">
          <label for="username" class="fw-500">Payment Method</label>
          <Dropdown
            v-model="selectedCity"
            :options="cities"
            optionLabel="name"
            placeholder="Select Payment Method"
            class="w-full md:w-14rem w-100" />
        </div>
        <div class="flex flex-column gap-2 mt-1">
          <label for="username" class="fw-500">Account Name</label>
          <InputText
            id="username"
            v-model="value"
            aria-describedby="username-help"
            style="margin-top: 5px" />
        </div>
        <div class="flex flex-column gap-2 mt-1">
          <label for="username" class="fw-500">Account Number</label>
          <InputNumber
            v-model="value2"
            inputId="withoutgrouping"
            :useGrouping="false"
            class="w-100" />
        </div>
        <Button label="Submit" class="w-100 mt-2" />
      </div>
    </Dialog>
  </div>
</template>
<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const selectedCity = ref();
    const cities = ref([
      { name: "New York", code: "NY" },
      { name: "Rome", code: "RM" },
      { name: "London", code: "LDN" },
      { name: "Istanbul", code: "IST" },
      { name: "Paris", code: "PRS" },
    ]);
    const amountSlider = ref(0);
    const amountValue = ref(0);
    const depositAmount = ref(0);
    const availableBalance = ref(4124);
    const addPaymentInfo = ref(false);

    // const fiftyPercent = computed(() => {
    //   return (availableBalance.value * amount.value) / 100;
    // });

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

    return {
      selectedCity,
      cities,
      amountValue,
      amountSlider,
      handleSliderChange,
      handleChangeInput,
      depositAmount,
      percentButton,
      addPaymentInfo,
    };
  },
};
</script>
<style>
.tabparent {
  position: relative;
}
.availbalance span {
  font-weight: 600;
  color: var(--primary-color);
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
.depositView.p-dropdown .p-dropdown-label.p-placeholder,
.addPaymentInfoDialog .p-dropdown .p-dropdown-label.p-placeholder {
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
