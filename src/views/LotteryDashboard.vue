<template>
  <div class="info-body">
    <div class="body-lotto">
      <div class="header-carousel">asdasd</div>
      <div class="lotto-thumbnails">
        <LotteryCards
          v-for="(data, index) in lottoGames"
          :key="data.id"
          :id="data.id"
          :bgimage="data.image"
          :url="data.url"
          :title="data.title" />
      </div>
    </div>
  </div>
</template>
<script setup>
import LotteryCards from "@/components/LotteryCards.vue";
const lottoGames = [
  {
    id: "1",
    name: "ez2",
    image: "2d.png",
    url: "https://www.come2win.ph/",
    title: "EZ-2",
  },

  {
    id: "2",
    name: "3d",
    image: "3d.png",
    url: "https://www.come2win.ph/",
    title: "EZ-2",
  },
  {
    id: "3",
    name: "pick3",
    image: "pick3.png",
    url: "https://www.come2win.ph/",
    title: "EZ-2",
  },
  {
    id: "4",
    name: "Cock Fighting",
    image: "cockfighting.png",
    url: "https://www.come2win.ph/",
    title: "EZ-2",
  },
];
</script>
<style>
.info-body {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 40px;
  background-color: #1a1c1e;
  display: flex;
  justify-content: center;
}
.body-lotto {
  width: 70%;
  padding: 20px 0;
}
.header-carousel {
  background-color: blue;
  height: 320px;
  border-radius: 10px;
}
.lotto-thumbnails {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 40px;
}
</style>
