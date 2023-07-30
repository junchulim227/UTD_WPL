import React, { useState } from "react";
import DisplayTable from "./DisplayTable";
import { Card } from "react-bootstrap";
import { getAll, BACKEND_ROUTES } from "../api/api";

export default function Disease() {
  const [candidateDepartment, setCandidateDepartment] = useState({
    Disease_ID: "",
    Disease_Name: "",
  });

  const formGroups = [
      {
        displayName: "Disease Name",
        type: "text",
        placeholder: "Enter Disease Name",
        name: "Disease_Name",
      },
  ];

  return (
    <div className="mx-5 my-3">
      <Card className="mb-3">
        <Card.Body>
          <b>This page shows the known Diseases in our HDBMS.</b>
        </Card.Body>
      </Card>
      <DisplayTable
        id={"Person_ID"}
        candidateEntity={candidateDepartment}
        setCandidateEntity={setCandidateDepartment}
        getTable={getAll}
        backendRoute={BACKEND_ROUTES.disease}
        formGroups={formGroups}
      />
    </div>
  );
}
