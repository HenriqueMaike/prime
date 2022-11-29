import axios from 'axios';

//Base da API: https://api.themoviedb.org/3/
//URL da API: /movie/now_playing?api_key=7f3fa4b7e219a692d83a3f720992fbe7&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;