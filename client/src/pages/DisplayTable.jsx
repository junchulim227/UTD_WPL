import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Table, Card, Alert } from "react-bootstrap";
import {
  addEntity,
  updateEntity,
  deleteEntity,
  BACKEND_ROUTES,
  getAllPersons,
} from "../api/api";
// props - candidateEntity, setCandidateEntity, getTable, backendRoute, formGroups, tableCols
export default function DisplayTable(props) {
  const [entities, setEntities] = useState([]);
  const [fetch, setFetch] = useState(true);
  const [action, setAction] = useState("");
  const [alert, setAlert] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalID, setModalID] = useState(-1);
  const [cols, setCols] = useState([]);
  useEffect(() => {
    if (alert === 0) return;

    setTimeout(() => {
      setAlert(0);
    }, 2000);
  }, [alert]);

  useEffect(() => {
    if (!fetch) return;
    async function getAll() {
      const res = await props.getTable(props.backendRoute+"s");
      if (res.status === 200) {
        console.log("data: ", res.result);
        setEntities(res.result);
        if(res.result.length > 0)
          setCols(Object.keys(res.result[0]))
        setFetch(false);
      } else {
        console.error("unable to fetch table", res.result);
      }
    }
    getAll();
  }, [fetch]);

  const handleAdd = async () => {
    const res = await addEntity(props.candidateEntity, props.backendRoute);
    setAlert(res ? 1 : -1);
    setFetch(true);
    handleModalClose();
  };

  const handleUpdate = async () => {
    console.log(modalID, props.candidateEntity, props.backendRoute);
    const res = await updateEntity(
      modalID,
      props.candidateEntity,
      props.backendRoute
    );
    setAlert(res ? 1 : -1);
    setFetch(true);
    handleModalClose();
  };

  const handleDelete = async (id) => {
    const res = await deleteEntity(id, props.backendRoute);
    setAlert(res ? 1 : -1);
    setFetch(true);
  };

  const handleChange = (e) => {
    props.setCandidateEntity((prev) => ({
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
    <div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {action === "update"
              ? "Update the selected " + props.backendRoute
              : "Add new " + props.backendRoute}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              if (action === "update") handleUpdate();
              else if (action === "add") handleAdd();
              console.log("submitted");
            }}
          >
            {props.formGroups.map((group, idx) => {
              return (
                <Form.Group
                  className="mb-3"
                  controlId={`formGroup_${idx}`}
                  key={idx}
                >
                  <Form.Label>{group.displayName}</Form.Label>
                  <Form.Control
                    type={group.type}
                    placeholder={group.placeholder}
                    name={group.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              );
            })}

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
            {cols.map((tableCol, idx) => {
              return <th key={idx}>{tableCol}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {entities.map((entity, i) => (
            <tr className="entity" key={i}>
              {Object.keys(entity).map((key, j) => {
                return <td key={j}>{entity[key]}</td>;
              })}
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <Button
                          className="delete"
                          variant="outline-danger"
                          onClick={() => handleDelete(entity[props.id])}
                        >
                          Delete
                        </Button>
                      </td>

                      <td>
                        <Button
                          variant="outline-secondary"
                          className="update"
                          onClick={() => {
                            setAction("update");
                            handleModalOpen(entity[props.id]);
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
          To register a new {props.backendRoute}{" "}
          <Button
            variant="outline-primary"
            onClick={() => {
              setAction("add");
              handleModalOpen(-1);
            }}
          >
            click here
          </Button>
          .
        </Card.Body>
      </Card>
      {alert === 1 && (
        <Alert key={"success"} variant={"success"}>
          Action successful!
        </Alert>
      )}

      {alert === -1 && (
        <Alert key={"danger"} variant={"danger"}>
          Action Failed.
        </Alert>
      )}
    </div>
  );
}
