<template>
  <div class="raffle-prizes">
    <TheMajorRaffle />
    <TheMinorRaffle />
  </div>
</template>
<script>
import TheMajorRaffle from "@/components/TheMajorRaffle.vue";
import TheMinorRaffle from "@/components/TheMinorRaffle.vue";

export default { components: { TheMajorRaffle, TheMinorRaffle } };
</script>
<style>
.raffle-prizes {
  background: rgb(26, 28, 30);
  background: -moz-linear-gradient(
    75deg,
    rgba(26, 28, 30, 1) 0%,
    rgba(26, 28, 30, 1) 33%,
    rgba(253, 45, 94, 0.38139005602240894) 100%
  );
  background: -webkit-linear-gradient(
    75deg,
    rgba(26, 28, 30, 1) 0%,
    rgba(26, 28, 30, 1) 33%,
    rgba(253, 45, 94, 0.38139005602240894) 100%
  );
  background: linear-gradient(
    75deg,
    rgba(26, 28, 30, 1) 0%,
    rgba(26, 28, 30, 1) 33%,
    rgba(253, 45, 94, 0.38139005602240894) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#1a1c1e",endColorstr="#fd2d5e",GradientType=1);
  padding: 30px;
  display: flex;
  justify-content: space-between;
  margin-top: -42px;
  flex-direction: column;
  padding-bottom: 200px;
}
</style>
