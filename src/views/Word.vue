<template>
  <div class="word-block">
    <Loader v-if="loading" />
    <div v-else>
      <h2 class="word-block_title">
        {{wordData.word}}
      </h2>
      <div class="word-block_pronunciation" v-if="pronunciation">
        [{{pronunciation}}]
      </div>
      <ul class="word-block_word-defs">
        <li
          v-for="(result, index) in wordData.results"
          :key="`def-${index}`"
        >
          - <span class="word-block_speech-part">
          ({{result.partOfSpeech}})
        </span>
          {{result.definition}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Loader from '../components/Loader';
export default {
  name: 'Word',
  components: {
    Loader
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapGetters(['wordData']),
    pronunciation() {
      return this.wordData.pronunciation ? this.wordData.pronunciation.all : '';
    }
  },
  methods: mapActions(['fetchWordData']),
  async created() {
    const { word } = this.$router.currentRoute.params;
    this.loading = true;
    await this.fetchWordData(word);
    this.loading = false;
  }
};
</script>

<style lang="less">
  .word-block {
    padding: 10px;
    &_title {
      text-transform: capitalize;
      margin: 0;
    }
    &_word-defs {
      list-style: none;
      padding: 0;
      li {
        margin-bottom: 10px;
      }
    }
    &_pronunciation {
      margin: 5px 0 15px;
      color: #607d8b;
    }
    &_speech-part {
      font-style: italic;
    }
  }
</style>
