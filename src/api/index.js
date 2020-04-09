const API_ENDPOINT = 'https://wordsapiv1.p.rapidapi.com/';
const API_HOST = 'wordsapiv1.p.rapidapi.com';
const API_KEY = 'aef113f840mshafcd5b2684feb08p1fdf0djsn57a65eabc913';
const SEARCH_LIST_LIMIT = 3;

const axios = require('axios');
const http = axios.create({
  baseURL: API_ENDPOINT,
  crossDomain: true,
  headers: {
    'X-RapidAPI-Host': API_HOST,
    'X-RapidAPI-Key': API_KEY
  }
});

export const getSearchedList = (query) => {
  return http.get('/words/', {
    params: {
      page: 1,
      limit: SEARCH_LIST_LIMIT,
      letterPattern: `^${query.toLowerCase()}`,
      hasDetails: 'definitions'
    }
  })
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return [];
    });
};

export const getWordDetails = (word) => {
  return http.get(`/words/${word}`)
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
      return {};
    });
};
