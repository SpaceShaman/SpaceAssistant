<script setup></script>

<template>
  <div>
    <h1>
      <img class="logo" src="@/assets/logo.svg" width="50" height="50" />
      Voice Assistant
    </h1>
    <p>Click the microphone icon and say something&hellip;</p>
    <img class="microphone" src="@/assets/microphone.svg" width="60" height="60" />
  </div>
</template>

<style scoped>
h1 {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
}
.logo {
  margin-right: 0.5rem;
}
.microphone {
  display: block;
  margin: 0 auto;
  margin-top: 0.5rem;
  cursor: pointer;
}
.microphone:hover {
  opacity: 0.8;
}
.microphone:active {
  opacity: 0.6;
}
</style>
