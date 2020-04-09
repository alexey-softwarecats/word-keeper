<template>
  <div class="search-item">
    <div v-if="showDragControl" class="search-item_drag">
      ≡
    </div>
    <router-link
      :to="`/word/${title}`"
      class="search-item_title">
      {{ title }}
    </router-link>
    <div class="search-item_speech-part">
      {{ speechPart }}
    </div>
    <div class="search-item_description">
      {{ description }}
    </div>
    <div
      @click="onClickFavor"
      class="search-item_favor">
      {{ favor ? '★' : '☆' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchListItem',
  props: {
    title: String,
    speechPart: String,
    description: String,
    favor: Boolean,
    showDragControl: Boolean
  },
  methods: {
    onClickFavor() {
      this.$emit('favor-clicked', this.title);
    }
  }
};
</script>

<style scoped lang="less">
  .search-item {
    display: flex;
    line-height: 30px;
    padding: 0 10px;
    margin-bottom: 10px;
    font-size: 13px;
    background-color: #fff;
    border-radius: 3px;

    &_speech-part {
      padding: 0 20px;
      font-style: italic;
    }

    &_description {
      flex-grow: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &_favor {
      padding: 0 10px;
      cursor: pointer;
      font-size: 20px;
      color: #6ec0fb;
    }

    &_title {
      font-weight: 600;
      color: #000;
      text-decoration: none;
      white-space: nowrap;
    }

    &_drag {
      margin: 0 20px 0 10px;
      transform: scaleX(2.5);
      cursor: ns-resize;
    }
  }
</style>
