import axios from "../utils/apiClient";
const baseUrl = "/api/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const createPerson = (newPerson) =>
  axios.post(baseUrl, newPerson).then((createdPerson) => createdPerson.data);

const deletePerson = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((response) => response.data);

const updatePerson = (changedPerson) =>
  axios
    .put(`${baseUrl}/${changedPerson.id}`, changedPerson)
    .then((response) => response.data);

export default { getAll, createPerson, deletePerson, updatePerson };
