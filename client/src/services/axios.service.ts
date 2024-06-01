import axios from 'axios'
const serverEndpoint = import.meta.env.VITE_SERVER_URL
export const axiosClient = axios.create({
  baseURL: serverEndpoint,
})
