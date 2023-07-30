import React, { useEffect, useState } from "react";
import DisplayTable from "./DisplayTable";
import { Table, Button, Card, Modal, Form } from "react-bootstrap";
import {getAll, BACKEND_ROUTES} from "../api/api";
const Doctor = () => {
  const [candidateDoctor, setCandidateDoctor] = useState({
    Person_ID:"",
    Name: "",
    Email_Addr: "",
    Phone_number: "",
    Sex: "",
    Address: "",
    Birthdate: null,
    Salary: "",
    Department_Number: ""
  });

  const formGroups = [
    {
      displayName: "Name",
      type: "text",
      placeholder: "Enter name",
      name: "Name",
    },
    {
      displayName: "Address",
      type: "text",
      placeholder: "Enter Address",
      name: "Address",
    },
    {
      displayName: "Birthday",
      type: "date",
      placeholder: "Enter Birthday",
      name: "Birthdate",
    },
    {
      displayName: "Email address",
      type: "email",
      placeholder: "Enter email",
      name: "Email_Addr",
    },
    {
      displayName: "Phone Number",
      type: "text",
      placeholder: "Enter phone",
      name: "Phone_number",
    },
    {
      displayName: "Salary",
      type: "text",
      placeholder: "Enter Salary",
      name: "Salary",
    },
    {
      displayName: "Department ID",
      type: "text",
      placeholder: "Enter Department Number",
      name: "Department_Number",
    }
  ];

  return (
    <div className="mx-5 my-3">
     
      <Card className="mb-3">
        <Card.Body>
          <b>This page shows the Doctors registed in our Hospital system.</b>
        </Card.Body>
      </Card>
      <DisplayTable
      id={"Person_ID"}
        candidateEntity={candidateDoctor}
        setCandidateEntity={setCandidateDoctor}
        getTable={getAll}
        backendRoute={BACKEND_ROUTES.doctor}
        formGroups={formGroups}
      />

    
    </div>
  );
};

export default Doctor;
