<template>
  <div class="user-profile-parent">
    <Toast position="bottom-center" />
    <div class="user-profile">
      <div class="back-to-homepage">
        <router-link to="/"
          ><i class="pi pi-arrow-left me-1"></i>
          {{ $t("profile.backToHomepage") }}</router-link
        >
      </div>

      <div class="user-profile-inner">
        <div class="upper-profile">
          <div class="image-balance">
            <div class="unameHolder">
              <span class="unameHandler" v-if="username">{{
                username[0].toUpperCase()
              }}</span>
            </div>
            <TheWalletMoney class="w-100" />

            <!-- <div class="balance">
               <div class="balance-amount"><span>₱ 4124</span></div>
              <div class="wallet" @click="wallet = true">
                <i class="pi pi-wallet"></i> Wallet
              </div> 
            </div> -->
          </div>
          <div class="profile-info">
            <div class="firstcolumn">
              <div class="flex flex-column gap-2">
                <label for="username" class="fw-500"
                  ><i class="pi pi-user me-1" style="font-size: 1rem"></i>
                  {{ $t("profile.username") }}</label
                >
                <InputText
                  id="username"
                  v-model="username"
                  aria-describedby="username-help"
                  style="margin-top: 5px"
                  disabled />
              </div>
              <div class="flex flex-column gap-2 mt-1">
                <label for="username" class="fw-500"
                  ><i class="pi pi-at me-1" style="font-size: 1rem"></i>
                  {{ $t("profile.email") }}</label
                >
                <InputText
                  id="username"
                  v-model="email"
                  aria-describedby="username-help"
                  style="margin-top: 5px" />
                <small
                  id="username-help"
                  style="color: var(--red-400); display: none"
                  >Enter your username to reset your password.</small
                >
              </div>
              <div class="flex flex-column gap-2 mt-1">
                <label for="username" class="fw-500"
                  ><i class="pi pi-phone me-1" style="font-size: 1rem"></i>
                  {{ $t("profile.mobile") }}</label
                >
                <InputText
                  id="username"
                  v-model="mobile"
                  @blur="handleInputMobile"
                  aria-describedby="username-help"
                  style="margin-top: 5px" />
                <small
                  id="username-help"
                  style="color: var(--red-400); display: none"
                  >Enter your username to reset your password.</small
                >
              </div>
              <div
                class="savebuttons"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  margin-top: 10px;
                ">
                <Button
                  :label="$t('profile.saveChanges')"
                  @click="UpdateInfo"
                  :loading="isLoading" />
                <a
                  href="javascript:void(0);"
                  @click="changepass = true"
                  style="color: #fff"
                  >{{ $t("profile.changePass") }}</a
                >
              </div>
            </div>
            <div class="secondcolumn">
              <div class="analysis">
                <div class="card-analyst">
                  <img src="@/assets/images/dominos.png" alt="" />

                  <!-- <span class="totals">Reached 300k Game Credits</span> -->
                  <span class="totals">{{
                    $t("profile.unavailableBadge")
                  }}</span>
                </div>
                <div class="card-analyst">
                  <img src="@/assets/images/withdraw-deposit.png" alt="" />

                  <!-- <span class="totals">Reached 200k Withdrawn</span> -->
                  <span class="totals">{{
                    $t("profile.unavailableBadge")
                  }}</span>
                </div>
                <div class="card-analyst">
                  <img src="@/assets/images/profits.png" alt="" />
                  <!-- <span class="totals">Another Badge</span> -->
                  <span class="totals">{{
                    $t("profile.unavailableBadge")
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TabView class="mt-3 tabbersView">
          <!-- <TabPanel header="Transaction History" >
            <div class="card">
              <DataTable
                :value="gameProviders"
                tableStyle="min-width: 10rem"
                paginator
                :rows="5"
                :rowsPerPageOptions="[5, 10, 20, 50]">
                <Column header="Game Provider">
                  <template #body="slotProps">
                    <div style="display: flex; gap: 10px; align-items: center">
                      <img
                        :src="`/src/assets/providers_logo/${slotProps.data.logo}`"
                        :alt="slotProps.data.name"
                        style="width: 90px" />
                      <span>-</span>
                      {{ slotProps.data.name }}
                    </div>
                  </template>
                </Column>
                <Column header="Action">
                  <template #body="slotProps">
                    <Button
                      label="Show History"
                      @click="showHistoryByProvider(slotProps.data.name)"
                      outlined />
                  </template>
                </Column>
              </DataTable>
            </div>
          </TabPanel> -->
          <TabPanel :header="$t('profile.depositHistory')">
            <div class="card">
              <div class="mb-2">
                <label class="daterangetext">{{
                  $t("profile.selectDates")
                }}</label>
                <div
                  class=""
                  style="display: flex; align-items: center; gap: 15px">
                  <Calendar
                    v-model="dateRange"
                    selectionMode="range"
                    :manualInput="false"
                    :numberOfMonths="2" />
                  <Button
                    :label="$t('profile.show')"
                    outlined
                    @click="changeDateRange" />
                </div>
              </div>

              <DataTable
                v-model:expandedRows="expandedRows"
                :value="fetchResult.depositHistory"
                paginator
                :rows="5"
                :rowsPerPageOptions="[5, 10, 20, 50]"
                dataKey="order_id"
                tableStyle="min-width: 18rem">
                <Column expander style="width: 5rem" />

                <Column field="order_id" :header="$t('profile.transactionID')">
                  <template #body="slotProps">
                    {{ slotProps.data.order_id }}
                  </template>
                </Column>
                <Column field="amount" :header="$t('profile.amount')">
                  <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.amount) }}
                  </template>
                </Column>

                <template #expansion="slotProps">
                  <DataTable :value="slotProps">
                    <Column field="date" header="Date & Time">
                      <template #body="slotProps">
                        {{ slotProps.data.date }}
                      </template>
                    </Column>
                    <Column field="method" header="Method">
                      <template #body="slotProps">
                        {{ slotProps.data.method }}
                      </template>
                    </Column>
                    <Column field="status" header="Status">
                      <template #body="slotProps">
                        <div
                          class=""
                          v-if="
                            slotProps.data.status == 0 ||
                            slotProps.data.status == 1
                          ">
                          <Tag
                            :severity="getSeverity(slotProps.data.status)"
                            :value="
                              getValueSeverityStatus(slotProps.data.status)
                            "></Tag>
                        </div>
                      </template>
                    </Column>
                  </DataTable>
                </template>
              </DataTable>
            </div>
          </TabPanel>

          <TabPanel :header="$t('profile.withdrawalHistory')">
            <div class="card">
              <div class="mb-2">
                <label class="daterangetext">{{
                  $t("profile.selectDates")
                }}</label>
                <div
                  class=""
                  style="display: flex; align-items: center; gap: 15px">
                  <Calendar
                    v-model="dateRange"
                    selectionMode="range"
                    :manualInput="false"
                    :numberOfMonths="2" />
                  <Button
                    :label="$t('profile.show')"
                    outlined
                    @click="changeDateRange" />
                </div>
              </div>

              <!-- Cashflow Withdraw History -->
              <DataTable
                v-model:expandedRows="expandedRows"
                :value="fetchResult.withdrawalHistory"
                paginator
                :rows="5"
                :rowsPerPageOptions="[5, 10, 20, 50]"
                dataKey="order_id"
                tableStyle="min-width: 18rem">
                <Column expander style="width: 5rem" />

                <Column field="order_id" :header="$t('profile.transactionID')">
                  <template #body="slotProps">
                    {{ slotProps.data.order_id }}
                  </template>
                </Column>
                <Column field="amount" :header="$t('profile.amount')">
                  <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.amount) }}
                  </template>
                </Column>

                <template #expansion="slotProps">
                  <DataTable :value="slotProps">
                    <Column field="date" header="Date & Time">
                      <template #body="slotProps">
                        {{ slotProps.data.date }}
                      </template>
                    </Column>
                    <Column field="method" header="Method">
                      <template #body="slotProps">
                        {{ slotProps.data.method }}
                      </template>
                    </Column>
                    <Column field="status" header="Status">
                      <template #body="slotProps">
                        <div
                          class=""
                          v-if="
                            slotProps.data.status == 0 ||
                            slotProps.data.status == 1
                          ">
                          <Tag
                            :severity="getSeverity(slotProps.data.status)"
                            :value="
                              getValueSeverityStatus(slotProps.data.status)
                            "></Tag>
                        </div>
                      </template>
                    </Column>
                    <Column field="remarks" header="Remarks">
                      <template #body="slotProps">
                        {{ slotProps.data.method }}
                      </template>
                    </Column>
                  </DataTable>
                </template>
              </DataTable>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>

    <Dialog
      :draggable="false"
      v-model:visible="changepass"
      modal
      :header="$t('profile.changePass')"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <TheChangePassword
        @changePassword="changePassword"
        :errorMessage="errorMessage"
        :isLoading="isLoading" />
    </Dialog>

    <!-- <Dialog
      v-model:visible="wallet"
      modal
      header="Wallet"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <TheWallet />
    </Dialog> -->

    <Dialog
      v-model:visible="showHistoryOfSelectedProvider"
      modal
      header="Provider History"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <span>PROVIDER HISTORY</span>
    </Dialog>
  </div>
</template>
<script>
import TheChangePassword from "@/components/TheChangePassword.vue";
import TheWallet from "@/components/TheWallet.vue";
import { ref, onMounted, reactive, computed } from "vue";
import { useAuthStore } from "@/stores/user.js";
import TheWalletMoney from "../components/TheWalletMoney.vue";
import { C2WAPIService as axios } from "@/plugins/APIServices.js";
import { useToast } from "primevue/usetoast";

export default {
  components: { TheWallet, TheChangePassword, TheWalletMoney },
  data() {
    return {
      wallet: false,
    };
  },
  setup() {
    const showHistoryOfSelectedProvider = ref(false);
    const changepass = ref(false);
    const gameProviders = [{ name: "JILI", logo: "jili.png" }];

    const expandedRows = ref([]);
    const errorMessage = ref("");
    const toast = useToast();
    const fetchResult = reactive({
      totalDeposit: 0,
      totalWithdraw: 0,
      totalProfit: 0,
      depositHistory: null,
      withdrawalHistory: null,
    });
    const username = ref("");
    const email = ref("");
    const mobile = ref("");
    const isLoading = ref(false);

    const dateRange = ref();
    const cashflowhistory = ref();
    const store = useAuthStore();

    const getFormattedDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const getLast7Days = () => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7); // 7 days ago

      return getFormattedDate(startDate);
    };

    const dateToday = () => {
      const currentDate = new Date();
      return getFormattedDate(currentDate);
    };

    const dateStart = ref(getLast7Days());
    const getDateToday = ref(dateToday());

    onMounted(async () => {
      const localD = localStorage.getItem("auth.user");
      const udata = JSON.parse(localD);

      const uname = store.user[0].username;
      dateRange.value = [
        new Date(dateStart.value),
        new Date(getDateToday.value),
      ];
      username.value = uname;
      email.value = udata[0].email.replace("default@gmail.com", "");
      mobile.value = udata[0].mobile;

      const req =
        "username=" +
        store.user[0].username +
        "&token=" +
        store.user[0].token +
        "&datestart=" +
        dateStart.value +
        "&dateend=" +
        getDateToday.value;
      const cashflowHistory = await axios.getCashFlowHistory(req);

      if (cashflowHistory.resMsg === "Success") {
        const updatedDepositHistory = cashflowHistory.depositHistory.map(
          (entry) => {
            if (entry.method == 0) {
              entry.method = "Paymaya";
            } else if (
              entry.method == 7 ||
              entry.method === "gcashCopo" ||
              entry.method == "gcashHP"
            ) {
              entry.method = "GCash";
            }

            return entry;
          }
        );

        const updatedWithdrawalHistory = cashflowHistory.withdrawalHistory.map(
          (entry) => {
            if (entry.method == 0) {
              entry.method = "Paymaya";
            } else if (
              entry.method == 7 ||
              entry.method === "gcashCopo" ||
              entry.method == "gcashHP"
            ) {
              entry.method = "GCash";
            }

            return entry;
          }
        );

        fetchResult.depositHistory = updatedDepositHistory;
        fetchResult.withdrawalHistory = updatedWithdrawalHistory;
      }

      // cashflowhistory.value = cashflowHistory
    });

    const UpdateInfo = async () => {
      isLoading.value = true;
      const data = {
        username: store.user[0].username,
        token: store.user[0].token,
        email: email.value.trim(),
        mobile: mobile.value.trim(),
      };
      const getResult = await axios.postUpdateUserinfo(data);
      console.log(getResult);
      if (getResult.resStatus == 1) {
        toast.add({
          severity: "error",
          summary: "Invalid",
          detail: getResult.resMsg.email,
          life: 5000,
        });
        isLoading.value = false;
      } else if (getResult.resStatus == 0) {
        toast.add({
          severity: "success",
          summary: "Updated Successfully",
          detail: getResult.resMsg,
          life: 5000,
        });
        const localStorageData = localStorage.getItem("auth.user");
        const userData = JSON.parse(localStorageData);
        userData[0].email = getResult.email;
        userData[0].mobile = getResult.mobile;
        const updatedLocalStorageData = JSON.stringify(userData);
        console.log(updatedLocalStorageData);
        localStorage.setItem("auth.user", updatedLocalStorageData);
        isLoading.value = false;
      } else {
        toast.add({
          severity: "error",
          summary: "Invalid",
          detail: "Something went wrong...",
          life: 5000,
        });
        isLoading.value = false;
      }
    };

    const changePassword = async (data) => {
      isLoading.value = true;
      const req = {
        username: store.user[0].username,
        token: store.user[0].token,
        ...data,
      };

      const getResult = await axios.postChangePassword(req);
      if (getResult.resStatus == 1) {
        errorMessage.value = getResult.resMsg;
        isLoading.value = false;
      } else if (getResult.resStatus == 0) {
        toast.add({
          severity: "success",
          summary: "Updated Successfully",
          detail: "Your password has been successfully updated.",
          life: 3000,
        });
        errorMessage.value = "";
        changepass.value = false;
        isLoading.value = false;
      } else {
        errorMessage.value = "Something went wrong...";
        isLoading.value = false;
      }
    };

    const changeDateRange = async () => {
      const splitDates = dateRange.value.map((dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      });

      const req =
        "username=" +
        store.user[0].username +
        "&token=" +
        store.user[0].token +
        "&datestart=" +
        splitDates[0] +
        "&dateend=" +
        splitDates[1];
      const cashflowHistory = await axios.getCashFlowHistory(req);
      if (cashflowHistory.resMsg === "Success") {
        fetchResult.depositHistory = cashflowHistory.depositHistory;
        fetchResult.withdrawalHistory = cashflowHistory.withdrawalHistory;
      }
    };

    const formatCurrency = (value) => {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "PHP",
      });
    };
    const getSeverity = (value) => {
      console.log(value);
      if (value == 0) {
        return "success";
      }
      if (value == 1) {
        return "failed";
      }
      if (value == undefined) {
        return;
      } else {
        return;
      }
    };
    const getValueSeverityStatus = (value) => {
      switch (value) {
        case 0:
          return "success";

        case 1:
          return "failed";

        default:
          return null;
      }
    };

    const getPaymentMethod = (value) => {
      console.log(value);
      // switch (value) {
      //   case 0:
      //     return "Paymaya";

      //   case 7:
      //     return "GCash";

      //   case "gcashCOPO":
      //     return "GCash";

      //   case "gcashHP":
      //     return "GCash";

      //   default:
      //     return null;
      // }
    };

    const showHistoryByProvider = (data) => {
      console.log(data);
      showHistoryOfSelectedProvider.value = true;
    };

    const handleInputMobile = computed(() => {
      // return (availableBalance.value * amount.value) / 100;

      const numericValue = mobile.value.replace(/\D/g, "");

      mobile.value = numericValue.length > 0 ? numericValue : "";
    });

    return {
      username,
      email,
      mobile,
      dateRange,
      cashflowhistory,
      fetchResult,
      expandedRows,
      errorMessage,
      changepass,
      gameProviders,
      showHistoryOfSelectedProvider,
      UpdateInfo,
      changePassword,
      changeDateRange,
      getValueSeverityStatus,
      getSeverity,
      formatCurrency,
      getPaymentMethod,
      showHistoryByProvider,
      handleInputMobile,
      isLoading,
    };
  },
};
</script>
<style>
.tabbersView .p-paginator {
  background-color: transparent !important;
}
.tabbersView .p-dropdown {
  background-color: transparent !important;
  border: 1px solid #2f2f2f !important;
}
.tabbersView .p-paginator .p-dropdown .p-dropdown-label {
  color: #fff !important;
}
.tabbersView .p-inputtext {
  background-color: transparent !important;
  border: 1px solid #2f2f2f !important;
  color: #fefefea5 !important;
}
.daterangetext {
  color: #fefefea5 !important;
}
.card-analyst img {
  width: 100px;
}
.profile-info {
  display: flex;
  gap: 50px;
  width: 75%;
}
.secondcolumn {
  display: flex;
  align-items: center;
  width: 70%;
}
.image-balance .unameHolder {
  width: 300px;
  height: 220px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 8px 32px 0 rgba(32, 33, 34, 0.37);
  margin-bottom: 20px;
  position: relative;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff1354;
  box-shadow: 0 0 10px #ff1354;
}
.image-balance .unameHandler {
  font-size: 7rem;
}
.balance {
  display: flex;
}
.analysis {
  border-left: 3px solid rgba(36, 36, 36, 0.599);
  padding: 30px;
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.card-analyst {
  width: 240px;
  gap: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  background-color: #1a1c1e;
}
.card-analyst span {
  text-align: center;
}
.user-profile-parent {
  width: 100%;
  min-height: 100vh;
  height: auto;
  background: url("@/assets/images/test.avif");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.user-profile {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.user-profile-inner {
  width: 90%;
  height: 80vh;
  background: rgba(25, 29, 29, 0.75);
  box-shadow: 0 8px 32px 0 rgba(32, 33, 34, 0.37);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border-radius: 10px;
  padding: 50px;
  margin: 0 auto;
}
.back-to-homepage {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 30px;
}
.back-to-homepage a {
  color: #fff;
  text-decoration: none;
}
.upper-profile {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.image-balance {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.balance-amount {
  padding: 10px 15px;
  color: yellow;
}
.wallet {
  background-color: rgb(80, 78, 78);
  padding: 10px 15px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  caret-color: transparent; /* Standard property */
  caret-shape: none; /* For Firefox */
}
.wallet:hover {
  background-color: rgb(51, 50, 50);
}
.balance {
  width: 100%;
  justify-content: space-between;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background-color: #1a1c1e;
  border-radius: 8px;
}

.transaction-histroy {
  width: 100%;
  background-color: #1a1c1e;
  border-radius: 5px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.user-profile-inner .p-tabview .p-tabview-panels,
.user-profile-inner .p-tabview .p-tabview-nav,
.user-profile-inner .p-tabview .p-tabview-nav li .p-tabview-nav-link {
  background: transparent;
}
.user-profile-inner .p-tabview .p-tabview-nav {
  border: none;
}

.user-profile-inner .p-datatable .p-datatable-tbody > tr {
  background: transparent;
  color: #fff !important;
}
.user-profile-inner .p-datatable .p-datatable-tbody > tr > td {
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.user-profile-inner .p-datatable .p-datatable-thead > tr > th {
  background-color: #1a1c1e;
  color: #fefefea5;
  font-weight: 400;
  font-size: 0.9rem;
  border: none;
}

.upper-profile .p-inputtext {
  background-color: #1a1c1e;
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #fefe;
}

.firstcolumn label {
  color: rgba(255, 238, 255, 0.679);
}
.card-analyst .totals {
  font-weight: 500;
  font-size: 1rem;
  color: rgba(255, 238, 255, 0.496);
}
.amountTotals {
  font-weight: 500;
  font-size: 1rem;
}
.withdraw-depositClass {
  font-size: 1rem;
}
</style>
