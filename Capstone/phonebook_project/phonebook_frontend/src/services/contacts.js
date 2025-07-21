import axios from "axios";
const baseUrl = 'http://localhost:3001/persons';

export default {
  getAll: () => {
    return axios.get(baseUrl).then(response => response.data)
  },
  create: (newObject) => {
    return axios.post(baseUrl, newObject).then(response => response.data)
  },
  delete: (id) => {
    return axios.delete(`${baseUrl}/${id}`)
  }
}
