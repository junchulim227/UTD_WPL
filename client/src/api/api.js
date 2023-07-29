import axios from "axios"
const BACKEND_URL = "http://localhost:8800";
const BACKEND_ROUTES = {
  person: "person",
};

async function addEntity(data, route) {
  try {
    await axios.post(`${BACKEND_URL}/${route}`, data);
  } catch (err) {
    console.log(err);
  }
}

async function updateEntity(id, data, route) {
  try {
    await axios.put(`${BACKEND_URL}/${route}/${id}`, data);
  } catch (err) {
    console.log(err);
  }
}

async function deleteEntity(id, route) {
  try {
    await axios.delete(`${BACKEND_URL}/${route}/${id}`);
  } catch (err) {
    console.log(err);
  }
}

async function getAllPersons() {
  try {
    const res = await axios.get(`${BACKEND_URL}/${BACKEND_ROUTES.person}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export { addEntity, updateEntity, deleteEntity, BACKEND_ROUTES, getAllPersons };
