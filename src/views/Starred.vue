<template>
  <div>
    <h1 class="starred-block_title">Starred Words</h1>
    <div class="starred-block">
      <div class="starred-block_filter">
        <Search
          @search-changed="onChangeSearchFilter"
          class="starred-block_filter-search"
        />
        <PartOfSpeechFilter
          @filter-changed="onChangePartOfSpeechFilter"
          :speechParts="starredSpeechParts" />
      </div>
      <div
        class="starred-block_list"
        v-draggable="{
          value: starredList,
          handle: 'search-item_drag'
        }"
        @change="changeWordsOrder"
      >
        <SearchListItem
          v-for="item in starredList"
          :key="item.title"
          :title="item.title"
          :speechPart="item.speechPart"
          :description="item.description"
          :favor="true"
          showDragControl
          @favor-clicked="onClickFavor"
        />
        <p v-if="!starredList.length">
          No starred words.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Search from './../components/Search.vue';
import PartOfSpeechFilter from './../components/PartOfSpeechFilter';
import SearchListItem from './../components/SearchListItem';

export default {
  name: 'Home',
  components: {
    Search,
    PartOfSpeechFilter,
    SearchListItem
  },
  computed: mapGetters(['starredList', 'starredSpeechParts']),
  methods: {
    ...mapActions(['changeWordsOrder', 'changeStarredFilter', 'starWord', 'fetchStarredWords']),
    onChangeSearchFilter(value) {
      this.changeStarredFilter({
        query: value
      });
    },
    onChangePartOfSpeechFilter(values) {
      this.changeStarredFilter({
        speechParts: values
      });
    },
    onClickFavor(title) {
      this.starWord({ title });
    }
  },
  created() {
    this.fetchStarredWords();
  }
};
</script>

<style lang="less">
  .starred-block {
    display: flex;
    padding: 10px;
    &_title {
      padding: 0 20px;
    }
    &_filter {
      background-color: #efefef;
      padding: 10px;
      margin-right: 20px;
      &-search {
        margin-bottom: 10px;
      }
    }
    &_list {
      min-width: 0;
      flex-grow: 1;
    }
  }
</style>
