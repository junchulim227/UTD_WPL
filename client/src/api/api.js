import axios from "axios";
const BACKEND_URL = "http://localhost:3000";
const BACKEND_ROUTES = {
  persons: "Persons",
  person: "Person",
  patient: "Patient",
  doctor: "Doctor",
  appointment: "Appointment",
  rooms: "Rooms",
  room: "Room",
  departments: "Departments",
  department: "Department",
  inRoom: "InRoom",
  disease: "Disease",
  diseases: "Diseases",
  test: "Test",
  Is_In: "Is_In",
  hasDisease: "HasDisease",
};

async function addEntity(data, route) {
  try {
    const res = await axios.post(`${BACKEND_URL}/create${route}`, data);
    console.log("response: ", res.data);
    // if(res.data.errno) return false
    if (res.data.status === 200) {
      console.log("result: ", res.data.result);
      return true;
    } else {
      console.error("create entity errored", data, res.data.result);
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

async function updateEntity(id, data, route) {
  try {
    const res = await axios.post(`${BACKEND_URL}/update${route}`, { id, data });
    console.log("response: ", res.data);
    // if(res.data.errno) return false
    if (res.data.status === 200) {
      console.log("result: ", res.data.result);
      return true;
    } else {
      console.error("create entity errored", data, res.data.result);
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

async function deleteEntity(id, route) {
  try {
    console.log("req delete", id, route);
    const res = await axios.post(`${BACKEND_URL}/delete${route}`, { id });
    console.log("response: ", res.data);
    // if(res.data.errno) return false
    if (res.data.status === 200) {
      console.log("result: ", res.data.result);
      return true;
    } else {
      console.error("create entity errored", id, res.data.result);
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

async function getAll(route) {
  try {
    const res = await axios.get(`${BACKEND_URL}/read${route}`);
    console.log("response: ", res.data);
    // if(res.data.errno) return false
    if (res.data.status === 200) {
      console.log("result: ", res.data.result);
      return res.data;
    } else {
      console.error("create entity errored", res.data);
      return [];
    }
  } catch (err) {
    console.log(err);
    return { status: 400, data: [] };
  }
}

async function getPatientsGT2Diseases() {
  try {
    const res = await axios.get(`${BACKEND_URL}/getPatientsGT2Diseases`);
    console.log("response: ", res.data);

    if (res.data.status === 200) {
      console.log("result: ", res.data.result);
      return res.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
    return { status: 400, data: [] };
  }
}

async function getDepartmentAvgSalaries() {
  try {
    const res = await axios.get(`${BACKEND_URL}/getDepartmentAvgSalaries`);
    console.log("response: ", res.data);

    if (res.data.status === 200) {
      console.log("result: ", res.data.result);
      return res.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
    return { status: 400, data: [] };
  }
}

async function mostCommonDisease() {
  try {
    const res = await axios.get(`${BACKEND_URL}/mostCommonDisease`);
    console.log("response: ", res.data);

    if (res.data.status === 200) {
      console.log("result: ", res.data.result);
      return res.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
    return { status: 400, result: [] };
  }
}

export {
  addEntity,
  updateEntity,
  deleteEntity,
  BACKEND_ROUTES,
  getAll,
  getPatientsGT2Diseases,
  getDepartmentAvgSalaries,
  mostCommonDisease
};
