<template>
  <div id="container">
    <div class="ghost">
      <div class="body">
        <div class="face">
          <div class="eyes"></div>
          <div class="blush"></div>
        </div>
        <div class="line"></div>
        <div class="bottom">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="wave"></div>
        </div>
      </div>
      <div class="shadow"></div>
      <div class="glow"></div>
    </div>
  </div>
</template>

<script>
</script>

<style>
  #container {
    width: 10rem;
    height: 16rem;
  }

  .ghost {
    position: relative;
  }
  .ghost .body {
    width: 10rem;
    height: 15.5rem;
    background: #fff;
    border-radius: 5rem 5rem 1rem 1rem;
    box-shadow: inset -1.25rem 0.025rem 0 #dbdbdb;
    animation: ghostFloat 2s linear infinite;
  }
  .ghost .body .face {
    position: absolute;
    top: 4.625rem;
    left: 3rem;
  }
  .ghost .body .face .eyes {
    width: 1.063rem;
    height: 1.438rem;
    background: #000449;
    border-radius: 50%;
    animation: eyesBlink 2s linear infinite;
  }
  .ghost .body .face .eyes::before {
    position: absolute;
    content: "";
    width: inherit;
    height: inherit;
    left: 2.95rem;
    background: inherit;
    border-radius: inherit;
  }
  .ghost .body .face .blush {
    position: absolute;
    top: 1.95rem;
    right: 0.8rem;
    width: 1.125rem;
    height: 1.1325rem;
    background: #ffbeff;
    border-radius: 50%;
  }
  .ghost .body .face .blush::before {
    position: absolute;
    content: "";
    left: 4.625rem;
    width: inherit;
    height: inherit;
    background: inherit;
    border-radius: inherit;
  }
  .ghost .body .line {
    position: relative;
    z-index: 3;
    top: 14rem;
    width: 8.75rem;
    height: 1.25rem;
    background: #fff;
  }
  .ghost .body .bottom {
    position: absolute;
    top: 14.25rem;
  }
  .ghost .body .bottom .circle {
    position: absolute;
    z-index: 2;
    width: 1.75rem;
    height: 1.75rem;
    background: #fff;
    border-radius: 0 0 1rem 1rem;
  }
  .ghost .body .bottom .circle:nth-child(1) {
    left: 0;
  }
  .ghost .body .bottom .circle:nth-child(2) {
    left: 2.75rem;
    border-radius: 1rem;
  }
  .ghost .body .bottom .circle:nth-child(3) {
    left: 5.5rem;
    border-radius: 1rem;
  }
  .ghost .body .bottom .circle:nth-child(4) {
    left: 8.25rem;
    box-shadow: inset -1.25rem 0.025rem 0 #dbdbdb;
  }
  .ghost .body .bottom .wave {
    position: relative;
    z-index: 1;
    left: 1.425rem;
    width: 1.625rem;
    height: 1.75rem;
    background: #c3c7cb;
    border-radius: 1rem;
    box-shadow: inset 0rem 1rem 0 #fff;
  }
  .ghost .body .bottom .wave::before {
    position: absolute;
    content: "";
    left: 2.75rem;
    width: inherit;
    height: inherit;
    background: inherit;
    border-radius: inherit;
    box-shadow: inherit;
  }
  .ghost .body .bottom .wave::after {
    position: absolute;
    content: "";
    left: 5.5rem;
    width: inherit;
    height: inherit;
    background: inherit;
    border-radius: inherit;
    box-shadow: inherit;
  }
  .ghost .shadow {
    position: absolute;
    z-index: -2;
    top: 18.25rem;
    width: 10rem;
    height: 1rem;
    background: #000031;
    border-radius: 50%;
    filter: blur(0.05rem);
    animation: shadowWidth 2s linear infinite;
  }
  .ghost .glow {
    position: absolute;
    z-index: -1;
    top: -0.625rem;
    left: -0.5rem;
    width: 11rem;
    height: 17rem;
    background: radial-gradient(circle at 50% 50%, #fff, #fff 40%, #fff 50%);
    border-radius: 5rem 5rem 1rem 1rem;
    opacity: 0.3625;
    filter: blur(1.125rem);
    animation: ghostFloat 2s linear infinite, glowBlur 2s linear infinite;
  }

  @supports (display: grid) {


    #container {
      grid-area: main;
      align-self: center;
      justify-self: center;
    }
  }
  @keyframes ghostFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-1rem);
    }
  }
  @keyframes eyesBlink {
    0%, 30%, 38%, 100% {
      transform: translateY(0);
      height: 1.438rem;
    }
    34%, 36% {
      transform: translateY(0.625rem);
      height: 0;
    }
  }
  @keyframes shadowWidth {
    0%, 100% {
      width: 10rem;
    }
    50% {
      width: 8rem;
      transform: translateX(1rem);
    }
  }
  @keyframes glowBlur {
    0%, 50%, 100% {
      opacity: 0.3625;
      filter: blur(1.125rem);
    }
    25%, 75% {
      opacity: 0.25;
      filter: blur(0.85rem);
    }
  }
</style>
