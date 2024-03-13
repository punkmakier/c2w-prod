<script setup>
import { useRoute } from "vue-router";
import { ref, watch, onMounted, computed } from "vue";

const route = useRoute();
const routeInfo = ref(route.params.type || "");

watch(
  () => route.params.type,
  (newInfo) => {
    routeInfo.value = newInfo;
    console.log(routeInfo.value);
  }
);

const currentBets = ref([
  { fight: "174", amount: 100, betType: "Wala", odds: 1.88, payout: 188.26 },
]);
const capitalizedRouteInfo = computed(() => {
  return routeInfo.value.charAt(0).toUpperCase() + routeInfo.value.slice(1);
});
</script>
<template>
  <div class="parent-sabong">
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
          <span>Fight Number: #174</span>
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
              <td></td>
              <td>174</td>
            </tr>
            <tr>
              <td style="background-color: red; font-size: 1.3rem">MERON</td>
              <td style="background-color: blue; font-size: 1.3rem">WALA</td>
            </tr>
            <tr>
              <td>
                <span style="font-size: 1.2rem">1.85</span><br /><small
                  style="font-size: 0.9rem"
                  >0</small
                >
              </td>
              <td>
                <span style="font-size: 1.2rem">1.83</span><br /><small
                  style="font-size: 0.9rem"
                  >400</small
                >
              </td>
            </tr>
            <tr>
              <td><div class="betTypeBtn">BET MERON</div></td>
              <td><div class="betTypeBtn">BET WALA</div></td>
            </tr>
          </tbody>
        </table>
        <div class="current-balance" style="text-align: end">
          <span
            >CURRENT POINTS:
            <span style="color: yellow; font-weight: 500">619.00</span></span
          >
        </div>
        <div class="wrapper-input-bet">
          <input type="number" class="input-bet" placeholder="ENTER AMOUNT" />
          <div class="clearBtn"><span>CLEAR</span></div>
        </div>
        <div class="chips-amount">
          <div class="chip-item chip1"><span>100</span></div>
          <div class="chip-item chip2"><span>200</span></div>
          <div class="chip-item chip3"><span>500</span></div>
          <div class="chip-item chip4"><span>1000</span></div>
          <div class="chip-item chip5"><span>2000</span></div>
          <div class="chip-item chip6"><span>5000</span></div>
        </div>
      </div>
    </div>
    <div class="content2-sabong">
      <div class="content-right-sabong">
        <table>
          <tbody>
            <td>s</td>
          </tbody>
        </table>
      </div>
      <div class="content-left-sabong">
        <div class="par-bet-draw">
          <div class="betdraw">
            <span
              style="
                display: flex;
                align-items: center;
                gap: 5px;
                justify-content: center;
              "
              ><i class="pi pi-plus-circle" style="font-size: 1rem"></i> BET
              DRAW</span
            >
          </div>
          <div class="betnum"><span>0</span></div>
        </div>
        <span class="drawtext"
          >DRAW WINS x 8. Max. DRAW bet per player: 5000/fight</span
        >
        <div class="draw-content">
          <div class="headdraw"><span>CURRENT BETS</span></div>
          <DataTable :value="currentBets" tableStyle="min-width: 50rem">
            <Column field="fight" header="FIGHT #"></Column>
            <Column field="amount" header="AMOUNT"></Column>
            <Column field="betType" header="BET TYPE"></Column>
            <Column field="odds" header="ODDS"></Column>
            <Column field="payout" header="PAYOUT"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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
  align-items: center;
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
</style>
