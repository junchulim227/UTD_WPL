import React, { useEffect, useState } from "react";
import DisplayTable from "./DisplayTable";
import { Table, Button, Card, Modal, Form } from "react-bootstrap";
import {getAll, BACKEND_ROUTES} from "../api/api";
const Patient = () => {
  const [candidateDoctor, setCandidateDoctor] = useState({
    Person_ID:"",
    Name: "",
    Email_Addr: "",
    Phone_number: "",
    Sex: "",
    Address: "",
    Birthdate: null,
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
        displayName: "Sex",
        type: "text",
        placeholder: "Enter Sex",
        name: "Sex",
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
  ];

  return (
    <div className="mx-5 my-3">
     
      <Card className="mb-3">
        <Card.Body>
          <b>This page shows the Patients registed in our Hospital system.</b>
        </Card.Body>
      </Card>
      <DisplayTable
      id={"Person_ID"}
        candidateEntity={candidateDoctor}
        setCandidateEntity={setCandidateDoctor}
        getTable={getAll}
        backendRoute={BACKEND_ROUTES.patient}
        formGroups={formGroups}
      />

    
    </div>
  );
};

export default Patient;
