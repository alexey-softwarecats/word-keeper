import { getSearchedList, getWordDetails } from './../api/index';
import Vue from 'vue';
import Vuex from 'vuex';

const STARRED_KEY = 'WORD_KEEPER_STARRED';
const SEARCHED_KEY = 'WORD_KEEPER_SEARCHED';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchedList: [],
    wordData: {},
    starredWords: [],
    starredFilter: {
      query: '',
      speechParts: []
    }
  },
  actions: {
    async searchWords({ commit }, query) {
      let searchedList = [];

      if (query) {
        const searchData = await getSearchedList(query);
        const searchedWords = Array.isArray(searchData.results.data) ? searchData.results.data : [];
        const searchedWordsDetails = await Promise.all(
          searchedWords.map(async(item) => await getWordDetails(item))
        );

        searchedList = searchedWordsDetails
          .filter(item => item.results && item.results.length)
          .map(item => {
            const firstResult = item.results[0] || {};

            return {
              title: item.word,
              description: firstResult.definition,
              speechPart: firstResult.partOfSpeech
            };
          });
      }

      commit('updateSearchedList', searchedList);
      localStorage.setItem(SEARCHED_KEY, JSON.stringify(searchedList));
    },
    fetchSearchedWords({ commit }) {
      const list = JSON.parse(localStorage.getItem(SEARCHED_KEY));
      commit('updateSearchedList', list);
    },
    async fetchWordData({ commit }, word) {
      const wordData = await getWordDetails(word);
      commit('updateWordData', wordData);
    },
    fetchStarredWords({ commit }) {
      const list = JSON.parse(localStorage.getItem(STARRED_KEY));
      commit('updateStarredWords', list);
      commit('updateStarredFilter', {
        query: '',
        speechParts: []
      });
    },
    starWord({ commit, state }, wordData) {
      commit('starWord', wordData);
      localStorage.setItem(STARRED_KEY, JSON.stringify(state.starredWords));
    },
    changeStarredFilter({ commit }, filter) {
      commit('updateStarredFilter', filter);
    },
    changeWordsOrder({ commit, state }) {
      localStorage.setItem(STARRED_KEY, JSON.stringify(state.starredWords));
    }
  },
  mutations: {
    updateSearchedList(state, list) {
      state.searchedList = list || [];
    },
    updateWordData(state, data) {
      state.wordData = data;
    },
    updateStarredWords(state, list) {
      state.starredWords = list || [];
    },
    starWord(state, wordData) {
      const wordIndex = state.starredWords
        .findIndex((word) => word.title === wordData.title);

      if (wordIndex !== -1) {
        state.starredWords.splice(wordIndex, 1);
      } else {
        state.starredWords.push(wordData);
      }
    },
    updateStarredFilter(state, filter) {
      state.starredFilter = {
        ...state.starredFilter,
        ...filter
      };
    }
  },
  getters: {
    searchedList(state) {
      return state.searchedList
        .map((item) => {
          const isFavor = state.starredWords
            .findIndex((starredWord) => starredWord.title === item.title);

          return {
            ...item,
            favor: isFavor !== -1
          };
        });
    },
    wordData(state) {
      return state.wordData;
    },
    starredList(state) {
      const { speechParts, query } = state.starredFilter;
      let list = state.starredWords;

      if (query) {
        const regex = new RegExp(state.starredFilter.query, 'gi');
        list = list.filter((item) => item.title.search(regex) !== -1);
      }

      if (speechParts.length) {
        list = list.filter((item) => {
          return speechParts.some(part => part === item.speechPart);
        });
      }

      return list;
    },
    starredSpeechParts(state) {
      const parts = [];
      state.starredWords.forEach((starredItem) => {
        if (!parts.some(item => item === starredItem.speechPart)) {
          parts.push(starredItem.speechPart);
        }
      });
      return parts.sort();
    }
  }
});
