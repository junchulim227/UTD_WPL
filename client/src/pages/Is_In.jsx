import React, { useState } from "react";
import DisplayTable from "./DisplayTable";
import { Card } from "react-bootstrap";
import { getAll, BACKEND_ROUTES } from "../api/api";

export default function Is_In() {
  const [candidateDepartment, setCandidateDepartment] = useState({
    Appointment_ID: "",
    Patient_ID: "",
    Doctor_ID: "",
    DateTime: "",
  });

  const formGroups = [
    {
        displayName: "Room Number",
        type: "text",
        placeholder: "Enter Room Number",
        name: "RoomNumber",
      },
      {
        displayName: "Patient ID",
        type: "text",
        placeholder: "Enter Patient ID",
        name: "Patient_ID",
      },
  ];

  return (
    <div className="mx-5 my-3">
      <Card className="mb-3">
        <Card.Body>
          <b>This page shows the Rooms occupied by patients in our Hospital.</b>
        </Card.Body>
      </Card>
      <DisplayTable
        id={"Person_ID"}
        candidateEntity={candidateDepartment}
        setCandidateEntity={setCandidateDepartment}
        getTable={getAll}
        backendRoute={BACKEND_ROUTES.Is_In}
        formGroups={formGroups}
      />
    </div>
  );
}
