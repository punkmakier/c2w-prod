<template>
  <div class="container-new">
    <div class="line"></div>
    <div class="line d1"></div>
    <div class="line d2"></div>
    <div class="line d3"></div>
    <div class="line d4"></div>
    <div class="line d5"></div>
    <br />
    <div style="text-align: center">
      <span
        style="
          font-size: 1.2rem;
          color: #fff;
          font-weight: 600;
          text-align: center;
        "
        >Loading...</span
      >
    </div>
  </div>
</template>

<style>
div.container-new {
  background-color: transparent;
  position: relative;
  margin-top: 50px;
}

div.line {
  position: relative;
  background-color: #ffffff80;
  display: inline-block;
  height: 0px;
  border-radius: 5px;
  width: 10px;
  margin: 10px;
  animation: line linear infinite 0.9s;
}

@keyframes line {
  0% {
    height: 0px;
    margin-top: 60px;
  }
  50% {
    height: 50px;
    margin-top: 10px;
  }
  100% {
    height: 0px;
    margin-top: 60px;
  }
}

div.d1 {
  animation-delay: 0.15s;
}
div.d2 {
  animation-delay: 0.3s;
}
div.d3 {
  animation-delay: 0.45s;
}
div.d4 {
  animation-delay: 0.6s;
}
div.d5 {
  animation-delay: 0.75s;
}
div.d6 {
  animation-delay: 0.9s;
}

div.caption {
  text-align: center;
  color: #ffffff90;
}

::selection {
  background-color: transparent;
}
</style>
