<template>
  <div class="weekly-raffle">
    <div class="wr-header">
      <h2>Join Our Weekly Raffle Draws</h2>
      <p>
        Weekly wins await! Enter our Raffle Draws for a chance to score exciting
        prizes every week.
      </p>
    </div>
    <div class="bag-money-parent">
      <WeeklyRaffleCard
        v-for="(data, index) in weeklyRaffle"
        :key="index"
        :money="data.money"
        :participants="data.participants"
        :countdown="data.countdown"
        :maxParticipants="1000" />
    </div>
  </div>
</template>
<script>
import WeeklyRaffleCard from "@/components/WeeklyRaffleCard.vue";

export default {
  components: { WeeklyRaffleCard },
  setup() {
    const weeklyRaffle = [
      { money: "200", participants: 23, countdown: "83:32:43" },
      { money: "300", participants: 59, countdown: "83:32:43" },
      { money: "400", participants: 2345, countdown: "83:32:43" },
      { money: "500", participants: 23, countdown: "83:32:43" },
    ];

    return {
      weeklyRaffle,
    };
  },
};
</script>
<style>
.weekly-raffle {
  display: flex;
  width: 85%;
  margin: 0 auto;
  margin-top: 10rem;
  flex-direction: column;
  gap: 30px;
}

.bag-money-parent {
  display: flex;
  gap: 30px;
}
.money-bag {
  display: flex;
  background-color: rgb(39, 39, 39);
  padding: 10px 40px 10px 20px;
  justify-content: space-between;
  width: 350px;
  height: 150px;
  border-radius: 10px;
}
.wr-participants {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wr-participants p {
  font-size: 0.9rem;
}
.money-bag img {
  width: 130px;
  height: 130px;
}

.money-bag .p-progressbar-label {
  display: none;
}
.mb-info {
  margin-left: -30px !important;
}
</style>
