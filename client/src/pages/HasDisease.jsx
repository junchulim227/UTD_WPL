import React, { useState } from "react";
import DisplayTable from "./DisplayTable";
import { Card } from "react-bootstrap";
import { getAll, BACKEND_ROUTES } from "../api/api";

export default function HasDisease() {
  const [candidateDepartment, setCandidateDepartment] = useState({
    Patient_ID: "",
    Disease_ID: "",
  });

  const formGroups = [
    {
        displayName: "Patient ID",
        type: "text",
        placeholder: "Enter Patient ID",
        name: "Patient_ID",
      },
      {
        displayName: "Disease ID",
        type: "text",
        placeholder: "Enter Disease ID",
        name: "Disease_ID",
      },
  ];

  return (
    <div className="mx-5 my-3">
      <Card className="mb-3">
        <Card.Body>
          <b>This page shows patients who have diseases.</b>
        </Card.Body>
      </Card>
      <DisplayTable
        id={"Person_ID"}
        candidateEntity={candidateDepartment}
        setCandidateEntity={setCandidateDepartment}
        getTable={getAll}
        backendRoute={BACKEND_ROUTES.hasDisease}
        formGroups={formGroups}
      />
    </div>
  );
}
