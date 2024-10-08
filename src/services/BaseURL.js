import axios from 'axios';

const BaseUrl = axios.create({
    baseURL: import.meta.env.VITE_POKEAPI_BASE_URL
});

export default BaseUrl;