import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Button, Card } from "react-bootstrap";

const Person = () => {
  const [persons, setPersons] = useState([]); // renamed state variable

  useEffect(() => {
    const fetchAllPersons = async () => {
      // renamed function
      try {
        const res = await axios.get("http://localhost:8800/person");
        setPersons(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPersons();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/person/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mx-5 my-3">
      <Card className="mb-3">
      <Card.Body>This page shows the Patients registed in our Hospital system.</Card.Body>
    </Card>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Patient Name</th>
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
                    className="delete" variant="outline-danger"
                    onClick={() => handleDelete(person.Person_ID)}
                  >
                    Delete
                  </Button>
                  </td>
              
                  <td>
                  <Button variant="secondary" className="outline-update">
                    <Link style={{color:"white"}}to={`/update/${person.Person_ID}`}>Update</Link>
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
     
      // Add button for 'Add'
      <button>
        <Link to="/add">Add new person</Link>
      </button>
    </div>
  );
};

export default Person;
