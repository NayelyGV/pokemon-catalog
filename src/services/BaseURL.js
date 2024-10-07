import axios from "axios";
const BaseUrl = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
});

export default BaseUrl;

