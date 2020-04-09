<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Word Keeper</router-link>
      <router-link to="/starred">★ Starred Words</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
body {
  margin: 0;
  background: #f8f4f4;
  color: #000;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  padding: 10px 20px;
  background-color: #6ec0fb;
  border-radius: 3px;

  a {
    color: #ffffff;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
  }
}
</style>
