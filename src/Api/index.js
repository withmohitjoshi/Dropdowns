import axios from 'axios'
export const list = ({ length = 10 }) => axios.post('http://localhost:4000', {
  length
})