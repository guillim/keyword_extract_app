<template>
  <img
    src="/extractor.png"
    alt="Vuetify.js"
    class="mb-5">
</template>



<style scoped>
  .mb-5 {
    max-width: 200px;
    margin-bottom: 0px !important;
  }

  .mb-5 {
    /* display: inline-block; */
    animation: turn 2s linear forwards 1s;
    transform: rotateY(180deg);
    position: relative;
    overflow: hidden;
    /* height: 180px; */
    /* width: 245px; */
  }

  @keyframes turn {
    100% {
      transform: rotateX(0deg);
    }
  }
</style>
