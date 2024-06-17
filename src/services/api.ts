import axios from "axios";

export const apiCEP = axios.create({
   baseURL: "https://viacep.com.br/ws/"
})