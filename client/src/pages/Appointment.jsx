import React, { useState } from "react";
import DisplayTable from "./DisplayTable";
import { Card } from "react-bootstrap";
import { getAll, BACKEND_ROUTES } from "../api/api";

export default function Appointment() {
  const [candidateDepartment, setCandidateDepartment] = useState({
    Appointment_ID: "",
    Patient_ID: "",
    Doctor_ID: "",
    DateTime: "",
  });

  const formGroups = [
    {
        displayName: "Patient ID",
        type: "text",
        placeholder: "Enter Patient ID",
        name: "Patient_ID",
      },
      {
        displayName: "Doctor ID",
        type: "text",
        placeholder: "Enter Doctor ID",
        name: "Doctor_ID",
      },
      {
        displayName: "Appointment Date",
        type: "date",
        placeholder: "Enter Appointment Date",
        name: "DateTime",
      },
  ];

  return (
    <div className="mx-5 my-3">
      <Card className="mb-3">
        <Card.Body>
          <b>This page shows the Appointments Scheduled with Doctors in our Hospital.</b>
        </Card.Body>
      </Card>
      <DisplayTable
        id={"Person_ID"}
        candidateEntity={candidateDepartment}
        setCandidateEntity={setCandidateDepartment}
        getTable={getAll}
        backendRoute={BACKEND_ROUTES.appointment}
        formGroups={formGroups}
      />
    </div>
  );
}
