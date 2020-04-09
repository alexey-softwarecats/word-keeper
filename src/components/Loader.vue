<template>
  <div class="loader" />
</template>

<script>
export default {
  name: 'Loader'
};
</script>

<style scoped lang="less">
  .loader,
  .loader:after {
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }
  .loader {
    margin: 20px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 3px solid rgba(192,192,192, 0.2);
    border-right: 3px solid rgba(192,192,192, 0.2);
    border-bottom: 3px solid rgba(192,192,192, 0.2);
    border-left: 3px solid #c0c0c0;
    transform: translateZ(0);
    animation: load8 1.1s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

</style>
