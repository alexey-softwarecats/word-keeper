<template>
  <div class="search-block">
    <div class="search-block_filter">
      <Search @search-changed="onChangeSearch" />
    </div>
    <div class="search-block_list">
      <Loader v-if="loading" />
      <div v-else>
        <SearchListItem
          v-for="item in searchedList"
          :key="item.title"
          :title="item.title"
          :speechPart="item.speechPart"
          :description="item.description"
          :favor="item.favor"
          @favor-clicked="onClickFavor"
        />
        <p v-if="!searchedList.length">
          No results.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Search from './../components/Search.vue';
import SearchListItem from './../components/SearchListItem';
import Loader from '../components/Loader';

export default {
  name: 'Home',
  components: {
    Search,
    SearchListItem,
    Loader
  },
  data() {
    return {
      loading: false
    };
  },
  computed: mapGetters(['searchedList']),
  methods: {
    ...mapActions(['searchWords', 'starWord', 'fetchSearchedWords']),
    async onChangeSearch(value) {
      this.loading = true;
      await this.searchWords(value);
      this.loading = false;
    },
    onClickFavor(title) {
      const wordData = this.searchedList.find((item) => item.title === title);
      this.starWord(wordData);
    }
  },
  created() {
    this.fetchSearchedWords();
  }
};
</script>

<style lang="less">
  .search-block {
    display: flex;
    padding: 10px;
    &_filter {
      background-color: #efefef;
      padding: 10px;
      margin-right: 20px;
    }
    &_list {
      flex-grow: 1;
      min-width: 0;
    }
  }
</style>
