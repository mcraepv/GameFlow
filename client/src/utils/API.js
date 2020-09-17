import axios from 'axios';

export default {
  login: () => {
    return axios.get('/auth/steam');
  },
  getQuiz: () => {
    return axios.get('/api/quiz');
  },
};
