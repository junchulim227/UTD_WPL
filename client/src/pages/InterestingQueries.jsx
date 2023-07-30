import React, { useEffect, useState } from "react";
import DisplayTable from "./DisplayTable";
import { Card } from "react-bootstrap";
import {
  getAll,
  BACKEND_ROUTES,
  mostCommonDisease,
  getDepartmentAvgSalaries,
  getPatientsGT2Diseases,
} from "../api/api";
import { PieChart } from "react-minimal-pie-chart";

export default function InterestingQueries() {
  const [candidateQ1, setCandidateQ1] = useState([]);
  const [candidateQ2, setCandidateQ2] = useState([]);
  const [candidateQ3, setCandidateQ3] = useState([]);
  const [commonDiseases, setCommonDiseases] = useState([]);
  const formGroups = [];


  function randomColor() {
    return "#"+Math.floor(Math.random()*16777215).toString(16);
}
console.log("color", randomColor())

  useEffect(() => {
    async function func(){
        const result = await mostCommonDisease();
        console.log("resultttt", result)
        setCommonDiseases(result.result);
    }
    func();
  }, []);
  return (
    <div className="mx-5 my-3">
      <Card className="mb-3">
        <Card.Body>
          <b>This page shows Analytics and Trends.</b>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Title>
          Get the names of all patients who have more than 2 diseases
        </Card.Title>
        <Card.Body>
          <DisplayTable
            id={"Person_ID"}
            candidateEntity={candidateQ1}
            setCandidateEntity={setCandidateQ1}
            getTable={getPatientsGT2Diseases}
            backendRoute={"custom"}
            formGroups={formGroups}
          />
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Title>Get department average salaries</Card.Title>
        <Card.Body>
          <DisplayTable
            id={"Person_ID"}
            candidateEntity={candidateQ3}
            setCandidateEntity={setCandidateQ3}
            getTable={getDepartmentAvgSalaries}
            backendRoute={"custom"}
            formGroups={formGroups}
          />
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Title>Get the most common diseases</Card.Title>
        <Card.Body>
          <DisplayTable
            id={"Person_ID"}
            candidateEntity={candidateQ3}
            setCandidateEntity={setCandidateQ2}
            getTable={mostCommonDisease}
            backendRoute={"custom"}
            formGroups={formGroups}
          />
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Title>Get the most common diseases</Card.Title>
        <Card.Body>
          <PieChart
            data={commonDiseases.map((elem) => {
              return { title: elem.Disease_Name, value: Number(elem.Occurrences), color: randomColor() };
            })}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
