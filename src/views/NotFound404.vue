<template>
  <div class="notFound-parent">
    <img
      src="@/assets/images/notfound.svg"
      class=""
      style="width: clamp(300px, 30vw, 40vw); margin-bottom: 60px" />
    <h1>Page Not found</h1>
  </div>
</template>
<script setup></script>
<style>
.notFound-parent {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
