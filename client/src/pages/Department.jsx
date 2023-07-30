import React, { useState } from "react";
import DisplayTable from "./DisplayTable";
import { Card } from "react-bootstrap";
import {getAll, BACKEND_ROUTES} from "../api/api";

export default function Department() {
    const [candidateDepartment, setCandidateDepartment] = useState({
        RoomNumber: -1,
        Type: "",
        Beds: ""
      });

    const formGroups = [
        {
            displayName: "Department Name",
            type: "text",
            placeholder: "Enter Department Name",
            name: "DepartmentName",
          },
    ]
  
    return (
        <div className="mx-5 my-3">
         
          <Card className="mb-3">
            <Card.Body>
              <b>This page shows the Departments in our Hospital.</b>
            </Card.Body>
          </Card>
          <DisplayTable
          id={"Person_ID"}
            candidateEntity={candidateDepartment}
            setCandidateEntity={setCandidateDepartment}
            getTable={getAll}
            backendRoute={BACKEND_ROUTES.department}
            formGroups={formGroups}
    
          />
    
        
        </div>
      );
}
