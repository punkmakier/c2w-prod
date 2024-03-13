<template>
  <div class="major-raffle">
    <div class="mr-content">
      <h2 class="primary-text">PLAY ANYTIME, ANYWHERE</h2>
      <h1>
        GET A CHANCE TO WIN OUR <br /><span class="">MAJOR RAFFLE PRIZES</span>
        WORTH OF <span class="text-yellow">1,500,000 </span>PESOS
      </h1>
      <p>Don't miss your chance. Will you be our next lucky winner?</p>
      <div class="badge-raffle-parent">
        <div class="badge-raffle-prizes">CAR</div>
        <div class="badge-raffle-prizes">MOTOR</div>
        <div class="badge-raffle-prizes">CELLPHONE</div>
        <div class="badge-raffle-prizes">CASH</div>
      </div>
      <!-- <button class="major-participate-now">PARTICIPATE NOW</button> -->
      <Button label="PARTICIPATE NOW" class="mt-3" />
    </div>
    <div class="mr-images">
      <img
        src="@/assets/images/lightning-bg.png"
        alt=""
        class="lightning-bg"
        style="width: 580px; height: 580px" />
      <img
        src="@/assets/images/car.png"
        alt=""
        style="width: 680px; z-index: 2" />
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.major-raffle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 7rem;
}
.mr-content {
  width: 35%;
}
.mr-images {
  width: 49%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}
.badge-raffle-parent {
  display: flex;
  gap: 15px;
}
.badge-raffle-prizes {
  background-color: #ff1354;
  padding: 3px 10px;
  border-radius: 3px;
}
.major-participate-now {
  background-color: aqua;
  width: auto;
}
.lightning-bg {
  position: absolute;
  z-index: 2;
  animation: rotationLight 6s linear infinite;
}
@keyframes rotationLight {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
