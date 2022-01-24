import axios from 'axios'

const api = axios.create({
  baseURL: `http://${process.env.REACT_APP_BACKEND}:3334/`
})

export { api }