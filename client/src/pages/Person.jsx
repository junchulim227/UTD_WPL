import React, { useEffect, useState } from "react";
import { Table, Button, Card, Modal, Form } from "react-bootstrap";
import {
  addEntity,
  updateEntity,
  deleteEntity,
  BACKEND_ROUTES,
  getAllPersons,
} from "../api/api";
const Person = () => {
  const [persons, setPersons] = useState([]); // renamed state variable
  const [fetch, setFetch] = useState(true);
  const [action, setAction] = useState("");
  const [candidatePerson, setCandidatePerson] = useState({
    Person_ID: "",
    Address: "",
    Birthdate: null,
    Name: "",
    Sex: "",
    Email_Addr: "",
    Phone_number: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalID, setModalID] = useState(-1);
  useEffect(() => {
    if (!fetch) return;
    async function getAll(){
      const data = await getAllPersons();
      setPersons(data);
      setFetch(false);
    }
    getAll();
  }, [fetch]);

  const handleAdd = async () => {
    await addEntity(candidatePerson, BACKEND_ROUTES.person);
    setFetch(true);
    handleModalClose();
  };

  const handleUpdate = async () => {
    console.log(modalID, candidatePerson, BACKEND_ROUTES.person);
    await updateEntity(modalID, candidatePerson, BACKEND_ROUTES.person);
    setFetch(true);
    handleModalClose();
  };

  const handleDelete = async (id) => {
    await deleteEntity(id, BACKEND_ROUTES.person);
    setFetch(true);
  };

  const handleChange = (e) => {
    setCandidatePerson((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function handleModalOpen(id) {
    setShowModal(true);
    console.log("id selected: " + id);
    setModalID(id);
  }

  function handleModalClose() {
    setShowModal(false);
    setModalID(-1);
  }

  return (
    <div className="mx-5 my-3">
      <Card className="mb-3">
        <Card.Body>
          <b>This page shows the People registed in our Hospital system.</b>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{action==="update" ? "Update the selected person" : "Add new person"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              if(action === "update") handleUpdate();
              else if (action === "add") handleAdd()
              console.log("submitted");
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="Name"
                onChange={handleChange}
              />

              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ID"
                name="Person_ID"
                onChange={handleChange}
              />
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                name="Address"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicBDay">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Birthday"
                name="Birthdate"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="Email_Addr"
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter phone"
                name="Phone_Number"
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                We'll never share your phone number with anyone else.
              </Form.Text>
            </Form.Group>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Person Name</th>
            <th>ID</th>
            <th>Address</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr className="person" key={person.Person_ID}>
              <td>{person.Name}</td>
              <td>{person.Person_ID}</td>
              <td>{person.Address}</td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <Button
                          className="delete"
                          variant="outline-danger"
                          onClick={() => handleDelete(person.Person_ID)}
                        >
                          Delete
                        </Button>
                      </td>

                      <td>
                        <Button
                          variant="outline-secondary"
                          className="update"
                          onClick={() => {
                            setAction("update")
                            handleModalOpen(person.Person_ID);
                          }}
                        >
                          Update
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Card>
        <Card.Body>
          To register a new person <Button variant="outline-primary" onClick={()=>{
            setAction("add");
            handleModalOpen(-1);
          }}>click here</Button>.
        </Card.Body>
      </Card>
    </div>
  );
};

export default Person;
