import React, { useState } from "react";
import DisplayTable from "./DisplayTable";
import { Card } from "react-bootstrap";
import {getAll, BACKEND_ROUTES} from "../api/api";

export default function Rooms() {
    const [candidateRoom, setCandidateRoom] = useState({
        RoomNumber: -1,
        Type: "",
        Beds: ""
      });

    const formGroups = [
        {
            displayName: "Room Number",
            type: "text",
            placeholder: "Enter Room Number",
            name: "RoomNumber",
          },
          {
            displayName: "Room Type",
            type: "text",
            placeholder: "Enter Room Type",
            name: "Type",
          },
          {
            displayName: "Number of Beds",
            type: "text",
            placeholder: "Enter Number of Beds",
            name: "Beds",
          },
    ]
  
    return (
        <div className="mx-5 my-3">
         
          <Card className="mb-3">
            <Card.Body>
              <b>This page shows the Rooms in our Hospital.</b>
            </Card.Body>
          </Card>
          <DisplayTable
          id={"Person_ID"}
            candidateEntity={candidateRoom}
            setCandidateEntity={setCandidateRoom}
            getTable={getAll}
            backendRoute={BACKEND_ROUTES.room}
            formGroups={formGroups}
    
          />
    
        
        </div>
      );
}
