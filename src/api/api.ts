import axios from 'axios'

export const apiExpress = axios.create({
    baseURL: "http://localhost:9090"
})