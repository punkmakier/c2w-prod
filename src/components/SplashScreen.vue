<template>
  <div class="load-parent">
    <img
      class="showFades"
      src="@/assets/images/logo.webp"
      style="width: 280px"
      alt="" />

    <LoadingDesign />
  </div>
</template>
<script setup>
import LoadingDesign from "./LoadingDesign.vue";
</script>
<style>
.load-parent {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("@/assets/images/mobilebg.avif");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000;
}
.showFades {
  animation: fadeInImage 0.8s ease-in;
}

@keyframes fadesIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInImage {
  0% {
    transform: scale(0);
  }
  25% {
    transform: scale(1.6);
  }
  50% {
    transform: scale(0.9);
  }
  75% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
