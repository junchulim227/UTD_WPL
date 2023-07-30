import React, { useState } from "react";
import DisplayTable from "./DisplayTable";
import { Card } from "react-bootstrap";
import {getAll, BACKEND_ROUTES} from "../api/api";
const Person = () => {
  const [candidatePerson, setCandidatePerson] = useState({
    Person_ID:"",
    Address: "",
    Birthdate: null,
    Name: "",
    Sex: "",
    Email_Addr: "",
    Phone_number: "",
  });

  const formGroups = [
    {
      displayName: "Name",
      type: "text",
      placeholder: "Enter name",
      name: "Name",
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
      displayName: "Sex",
      type: "text",
      placeholder: "Enter Sex",
      name: "Sex",
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
  ];

  return (
    <div className="mx-5 my-3">
     
      <Card className="mb-3">
        <Card.Body>
          <b>This page shows the People registed in our Hospital system.</b>
        </Card.Body>
      </Card>
      <DisplayTable
      id={"Person_ID"}
        candidateEntity={candidatePerson}
        setCandidateEntity={setCandidatePerson}
        getTable={getAll}
        backendRoute={BACKEND_ROUTES.person}
        formGroups={formGroups}

      />

    
    </div>
  );
};

export default Person;
