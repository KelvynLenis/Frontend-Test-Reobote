import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://teste.reobote.tec.br/api',
  headers: {
    'Content-Type': 'application/json',
  },
})
