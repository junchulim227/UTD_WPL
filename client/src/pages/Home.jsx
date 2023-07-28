import React from "react";
import { Container, Row, Col } from "react-bootstrap";
export default function Home() {
  return (
    <div
      className="d-flex flex-grow-1 align-items-center justify-content-center"
      style={{
        backgroundImage: `url("background2.jpeg")`,
        /* Center and scale the image nicely */
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <h1 style={{fontSize: "50px"}}><b>Your health at your fingertips</b></h1>
    </div>
  );
}
