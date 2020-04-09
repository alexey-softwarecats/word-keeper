<template>
  <div class="search">
    <input
      @change="onChangeControl"
      class="search_input"
      type="text"
      placeholder="Search" />
    <img
      class="search_icon"
      src="@/assets/search-icon.svg"
      alt="" />
  </div>
</template>

<script>
export default {
  name: 'Search',
  methods: {
    onChangeControl(e) {
      this.$emit('search-changed', e.target.value);
    }
  }
};
</script>

<style scoped lang="less">
  .search {
    position: relative;

    &_input {
      padding: 10px 40px 10px 10px;
      border: 1px solid #6ec0fb;
      border-radius: 3px;
      font-weight: 600;
    }

    &_icon {
      position: absolute;
      width: 20px;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      pointer-events: none;
    }
  }
</style>
