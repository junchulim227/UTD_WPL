// This is the Main page of the app

import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
console.lo;
const app = express();

//It just crashes for mine..
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// const db = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"Rkselrksel1!",
//     database:"utd_cs6360"
// })

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

// GET QUERY DATA FROM SQL
app.get("/person", (req, res) => {
  const q = "SELECT * FROM person";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Error!");
    }
    return res.json(data);
  });
});

app.post("/person", (req, res) => {
  const q =
    "INSERT INTO person (Person_ID, Address, Birthdate, Name, Sex, Email_Addr, Phone_Number) VALUES (?, ?, ?, ?, ?, ?, ?)";

  //postman -> body -> raw -> JSON to edit
  const values = [
    req.body.Person_ID,
    req.body.Address,
    req.body.Birthdate,
    req.body.Name,
    req.body.Sex,
    req.body.Email_Addr,
    req.body.Phone_number,
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ error: err.message });
    }
    console.log("finised query: ", data);
    return res.json("INSERT IS WORKING!");
  });
});

// // this is for delete

app.delete("/person/:Person_ID", (req, res) => {
  const personId = req.params.Person_ID;
  console.log(`Person_ID: ${personId}`);
  const q = "DELETE FROM person WHERE Person_ID = ?";

  db.query(q, [personId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Person has been deleted successfully.");
  });
});

// this is for update
app.put("/person/:Person_ID", (req, res) => {
  const personId = req.params.Person_ID;
  const q =
    "UPDATE person SET Person_ID=?, Address=?, Birthdate=?, Name=?, Sex=?, Email_Addr=?, Phone_Number=? WHERE Person_ID=?";

  const values = [
    req.body.Person_ID,
    req.body.Address,
    req.body.Birthdate,
    req.body.Name,
    req.body.Sex,
    req.body.Email_Addr,
    req.body.Phone_number,
  ];

  db.query(q, [...values, personId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Person has been updated successfully.");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});

//////////////////////From this point, duplicate above code to have more tables///////////////

// DEPARMENT
app.get("/department", (req, res) => {
  const q = "SELECT * FROM department";
  db.query(q, (err, data) => {
    if (err) return res.json("Error!");
    return res.json(data);
  });
});

app.post("/department", (req, res) => {
  const q = "INSERT INTO department (Dept_Number, Dept_Name) VALUES (?, ?)";

  const values = [req.body.Dept_Number, req.body.Dept_Name];

  db.query(q, values, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json("INSERT IS WORKING!");
  });
});

app.delete("/department/:Dept_Number", (req, res) => {
  const deptId = req.params.Dept_Number;
  const q = "DELETE FROM department WHERE Dept_Number = ?";

  db.query(q, [deptId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Department has been deleted successfully.");
  });
});

app.put("/department/:Dept_Number", (req, res) => {
  const deptId = req.params.Dept_Number;
  const q = "UPDATE department SET Dept_Number=?, Dept_Name=? WHERE Dept_ID=?";

  const values = [req.body.Dept_Number, req.body.Dept_Name];

  db.query(q, [...values, deptId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Department has been updated successfully.");
  });
});

//Doctor
// GET all doctors
app.get("/doctor", (req, res) => {
  const q = "SELECT * FROM doctor";
  db.query(q, (err, data) => {
    if (err) return res.json("Error!");
    return res.json(data);
  });
});

// INSERT a new doctor
app.post("/doctor", (req, res) => {
  const q = "INSERT INTO doctor (Doctor_SSN) VALUES (?)";

  const values = [req.body.Doctor_SSN];

  db.query(q, values, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json("Insert successful!");
  });
});

// DELETE a doctor
app.delete("/doctor/:Doctor_SSN", (req, res) => {
  const doctorSSN = req.params.Doctor_SSN;
  const q = "DELETE FROM doctor WHERE Doctor_SSN = ?";

  db.query(q, [doctorSSN], (err, data) => {
    if (err) return res.json(err);
    return res.json("Doctor has been deleted successfully.");
  });
});

// UPDATE a doctor
app.put("/doctor/:Doctor_SSN", (req, res) => {
  const doctorSSN = req.params.Doctor_SSN;
  const q = "UPDATE doctor SET Doctor_SSN=? WHERE Doctor_SSN=?";

  const values = [req.body.Doctor_SSN];

  db.query(q, [...values, doctorSSN], (err, data) => {
    if (err) return res.json(err);
    return res.json("Doctor has been updated successfully.");
  });
});

// Disease

// GET all diseases
app.get("/disease", (req, res) => {
  const q = "SELECT * FROM disease";
  db.query(q, (err, data) => {
    if (err) return res.json("Error!");
    return res.json(data);
  });
});

// INSERT a new disease
app.post("/disease", (req, res) => {
  const q =
    "INSERT INTO disease (Disease_patient_ID, Disease_Name, Treatments) VALUES (?, ?, ?)";

  const values = [
    req.body.Disease_patient_ID,
    req.body.Disease_Name,
    req.body.Treatments,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json("Insert successful!");
  });
});

// DELETE a disease
// We assume that Disease_patient_ID uniquely identifies a disease record
app.delete("/disease/:Disease_patient_ID", (req, res) => {
  const diseasePatientId = req.params.Disease_patient_ID;
  const q = "DELETE FROM disease WHERE Disease_patient_ID = ?";

  db.query(q, [diseasePatientId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Disease record has been deleted successfully.");
  });
});

// UPDATE a disease
// We assume that Disease_patient_ID uniquely identifies a disease record
app.put("/disease/:Disease_patient_ID", (req, res) => {
  const diseasePatientId = req.params.Disease_patient_ID;
  const q =
    "UPDATE disease SET Disease_patient_ID=?, Disease_Name=?, Treatments=? WHERE Disease_patient_ID=?";

  const values = [
    req.body.Disease_patient_ID,
    req.body.Disease_Name,
    req.body.Treatments,
  ];

  db.query(q, [...values, diseasePatientId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Disease record has been updated successfully.");
  });
});

//has_appointment
// GET all appointments
app.get("/has_appointment", (req, res) => {
  const q = "SELECT * FROM has_appointment";
  db.query(q, (err, data) => {
    if (err) return res.json("Error!");
    return res.json(data);
  });
});

// INSERT a new appointment
app.post("/has_appointment", (req, res) => {
  const q =
    "INSERT INTO has_appointment (Patient_ID, Medical_ID) VALUES (?, ?)";

  const values = [req.body.Patient_ID, req.body.Medical_ID];

  db.query(q, values, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json("Insert successful!");
  });
});

// DELETE an appointment
// We assume that Patient_ID and Medical_ID together uniquely identifies an appointment record
app.delete("/has_appointment/:Patient_ID/:Medical_ID", (req, res) => {
  const patientId = req.params.Patient_ID;
  const medicalId = req.params.Medical_ID;
  const q =
    "DELETE FROM has_appointment WHERE Patient_ID = ? AND Medical_ID = ?";

  db.query(q, [patientId, medicalId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Appointment record has been deleted successfully.");
  });
});

// UPDATE an appointment
// We assume that Patient_ID and Medical_ID together uniquely identifies an appointment record
app.put("/has_appointment/:Patient_ID/:Medical_ID", (req, res) => {
  const patientId = req.params.Patient_ID;
  const medicalId = req.params.Medical_ID;
  const q =
    "UPDATE has_appointment SET Patient_ID=?, Medical_ID=? WHERE Patient_ID=? AND Medical_ID=?";

  const values = [req.body.Patient_ID, req.body.Medical_ID];

  db.query(q, [...values, patientId, medicalId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Appointment record has been updated successfully.");
  });
});

//INSURANCE
// GET all insurances
app.get("/insurance", (req, res) => {
  const q = "SELECT * FROM insurance";
  db.query(q, (err, data) => {
    if (err) return res.json("Error!");
    return res.json(data);
  });
});

// INSERT a new insurance
app.post("/insurance", (req, res) => {
  const q =
    "INSERT INTO insurance (Member_ID, Group_Number, Policy_Holder, Insurance_Provider) VALUES (?, ?, ?, ?)";

  const values = [
    req.body.Member_ID,
    req.body.Group_Number,
    req.body.Policy_Holder,
    req.body.Insurance_Provider,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json("Insert successful!");
  });
});

// DELETE an insurance
app.delete("/insurance/:Member_ID", (req, res) => {
  const memberId = req.params.Member_ID;
  const q = "DELETE FROM insurance WHERE Member_ID = ?";

  db.query(q, [memberId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Insurance record has been deleted successfully.");
  });
});

// UPDATE an insurance
app.put("/insurance/:Member_ID", (req, res) => {
  const memberId = req.params.Member_ID;
  const q =
    "UPDATE insurance SET Member_ID=?, Group_Number=?, Policy_Holder=?, Insurance_Provider=? WHERE Member_ID=?";

  const values = [
    req.body.Member_ID,
    req.body.Group_Number,
    req.body.Policy_Holder,
    req.body.Insurance_Provider,
  ];

  db.query(q, [...values, memberId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Insurance record has been updated successfully.");
  });
});

// is_intable

// GET all room assignments
app.get("/is_in", (req, res) => {
  const q = "SELECT * FROM is_in";
  db.query(q, (err, data) => {
    if (err) return res.json("Error!");
    return res.json(data);
  });
});

// INSERT a new room assignment
app.post("/is_in", (req, res) => {
  const q = "INSERT INTO is_in (Room_Number, Patient_ID) VALUES (?, ?)";

  const values = [req.body.Room_Number, req.body.Patient_ID];

  db.query(q, values, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json("Insert successful!");
  });
});

// DELETE a room assignment
app.delete("/is_in/:Room_Number/:Patient_ID", (req, res) => {
  const roomNumber = req.params.Room_Number;
  const patientId = req.params.Patient_ID;
  const q = "DELETE FROM is_in WHERE Room_Number = ? AND Patient_ID = ?";

  db.query(q, [roomNumber, patientId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Room assignment has been deleted successfully.");
  });
});

// UPDATE a room assignment
app.put("/is_in/:Room_Number/:Patient_ID", (req, res) => {
  const roomNumber = req.params.Room_Number;
  const patientId = req.params.Patient_ID;
  const q =
    "UPDATE is_in SET Room_Number=?, Patient_ID=? WHERE Room_Number=? AND Patient_ID=?";

  const values = [req.body.Room_Number, req.body.Patient_ID];

  db.query(q, [...values, roomNumber, patientId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Room assignment has been updated successfully.");
  });
});

// medical
// GET all medical records
app.get("/medical", (req, res) => {
  const q = "SELECT * FROM medical";
  db.query(q, (err, data) => {
    if (err) return res.json("Error!");
    return res.json(data);
  });
});

// INSERT a new medical record
app.post("/medical", (req, res) => {
  const q = "INSERT INTO medical (Med_SSN) VALUES (?)";

  const values = [req.body.Med_SSN];

  db.query(q, values, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json("Insert successful!");
  });
});

// DELETE a medical record
// We assume that Med_SSN uniquely identifies a medical record
app.delete("/medical/:Med_SSN", (req, res) => {
  const medSSN = req.params.Med_SSN;
  const q = "DELETE FROM medical WHERE Med_SSN = ?";

  db.query(q, [medSSN], (err, data) => {
    if (err) return res.json(err);
    return res.json("Medical record has been deleted successfully.");
  });
});

// UPDATE a medical record
// We assume that Med_SSN uniquely identifies a medical record
app.put("/medical/:Med_SSN", (req, res) => {
  const medSSN = req.params.Med_SSN;
  const q = "UPDATE medical SET Med_SSN=? WHERE Med_SSN=?";

  const values = [req.body.Med_SSN];

  db.query(q, [...values, medSSN], (err, data) => {
    if (err) return res.json(err);
    return res.json("Medical record has been updated successfully.");
  });
});

// patient
// GET all patients
app.get("/patient", (req, res) => {
  const q = "SELECT * FROM patient";
  db.query(q, (err, data) => {
    if (err) return res.json("Error!");
    return res.json(data);
  });
});

// INSERT a new patient
app.post("/patient", (req, res) => {
  const q = "INSERT INTO patient (Patient_ID, Member_ID) VALUES (?, ?)";

  const values = [req.body.Patient_ID, req.body.Member_ID];

  db.query(q, values, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json("Insert successful!");
  });
});

// DELETE a patient
app.delete("/patient/:Patient_ID", (req, res) => {
  const patientId = req.params.Patient_ID;
  const q = "DELETE FROM patient WHERE Patient_ID = ?";

  db.query(q, [patientId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Patient record has been deleted successfully.");
  });
});

// UPDATE a patient
app.put("/patient/:Patient_ID", (req, res) => {
  const patientId = req.params.Patient_ID;
  const q = "UPDATE patient SET Patient_ID=?, Member_ID=? WHERE Patient_ID=?";

  const values = [req.body.Patient_ID, req.body.Member_ID];

  db.query(q, [...values, patientId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Patient record has been updated successfully.");
  });
});

//Room

// GET all rooms
app.get("/room", (req, res) => {
  const q = "SELECT * FROM room";
  db.query(q, (err, data) => {
    if (err) return res.json("Error!");
    return res.json(data);
  });
});

// INSERT a new room
app.post("/room", (req, res) => {
  const q = "INSERT INTO room (Room_Number, Type, Beds) VALUES (?, ?, ?)";

  const values = [req.body.Room_Number, req.body.Type, req.body.Beds];

  db.query(q, values, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json("Insert successful!");
  });
});

// DELETE a room
app.delete("/room/:Room_Number", (req, res) => {
  const roomNumber = req.params.Room_Number;
  const q = "DELETE FROM room WHERE Room_Number = ?";

  db.query(q, [roomNumber], (err, data) => {
    if (err) return res.json(err);
    return res.json("Room record has been deleted successfully.");
  });
});

// UPDATE a room
app.put("/room/:Room_Number", (req, res) => {
  const roomNumber = req.params.Room_Number;
  const q = "UPDATE room SET Room_Number=?, Type=?, Beds=? WHERE Room_Number=?";

  const values = [req.body.Room_Number, req.body.Type, req.body.Beds];

  db.query(q, [...values, roomNumber], (err, data) => {
    if (err) return res.json(err);
    return res.json("Room record has been updated successfully.");
  });
});

//Staff
// GET all staff
app.get("/staff", (req, res) => {
  const q = "SELECT * FROM staff";
  db.query(q, (err, data) => {
    if (err) return res.json("Error!");
    return res.json(data);
  });
});

// INSERT a new staff
app.post("/staff", (req, res) => {
  const q = "INSERT INTO staff (SSN, Department_ID, Salary) VALUES (?, ?, ?)";

  const values = [req.body.SSN, req.body.Department_ID, req.body.Salary];

  db.query(q, values, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json("Insert successful!");
  });
});

// DELETE a staff
app.delete("/staff/:SSN", (req, res) => {
  const ssn = req.params.SSN;
  const q = "DELETE FROM staff WHERE SSN = ?";

  db.query(q, [ssn], (err, data) => {
    if (err) return res.json(err);
    return res.json("Staff record has been deleted successfully.");
  });
});

// UPDATE a staff
app.put("/staff/:SSN", (req, res) => {
  const ssn = req.params.SSN;
  const q = "UPDATE staff SET SSN=?, Department_ID=?, Salary=? WHERE SSN=?";

  const values = [req.body.SSN, req.body.Department_ID, req.body.Salary];

  db.query(q, [...values, ssn], (err, data) => {
    if (err) return res.json(err);
    return res.json("Staff record has been updated successfully.");
  });
});

// takes_medicine
// GET all takes_medicine records
app.get("/takes_medicine", (req, res) => {
  const q = "SELECT * FROM takes_medicine";
  db.query(q, (err, data) => {
    if (err) return res.json("Error!");
    return res.json(data);
  });
});

// INSERT a new takes_medicine record
app.post("/takes_medicine", (req, res) => {
  const q = "INSERT INTO takes_medicine (Patient_ID, Medicine) VALUES (?, ?)";

  const values = [req.body.Patient_ID, req.body.Medicine];

  db.query(q, values, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json("Insert successful!");
  });
});

// DELETE a takes_medicine record
app.delete("/takes_medicine/:Patient_ID/:Medicine", (req, res) => {
  const patientId = req.params.Patient_ID;
  const medicine = req.params.Medicine;
  const q = "DELETE FROM takes_medicine WHERE Patient_ID = ? AND Medicine = ?";

  db.query(q, [patientId, medicine], (err, data) => {
    if (err) return res.json(err);
    return res.json("Takes_medicine record has been deleted successfully.");
  });
});

// UPDATE a takes_medicine record
app.put("/takes_medicine/:Patient_ID/:Medicine", (req, res) => {
  const patientId = req.params.Patient_ID;
  const medicine = req.params.Medicine;
  const q =
    "UPDATE takes_medicine SET Patient_ID=?, Medicine=? WHERE Patient_ID=? AND Medicine=?";

  const values = [req.body.Patient_ID, req.body.Medicine];

  db.query(q, [...values, patientId, medicine], (err, data) => {
    if (err) return res.json(err);
    return res.json("Takes_medicine record has been updated successfully.");
  });
});

// test table
// GET all tests
app.get("/tests", (req, res) => {
  const q = "SELECT * FROM tests";
  db.query(q, (err, data) => {
    if (err) return res.json("Error!");
    return res.json(data);
  });
});

// INSERT a new test
app.post("/tests", (req, res) => {
  const q =
    "INSERT INTO tests (Test_ID, Patient_ID, Disease_Name, Test_Results, Test_Name) VALUES (?, ?, ?, ?, ?)";

  const values = [
    req.body.Test_ID,
    req.body.Patient_ID,
    req.body.Disease_Name,
    req.body.Test_Results,
    req.body.Test_Name,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json("Insert successful!");
  });
});

// DELETE a test
app.delete("/tests/:Test_ID", (req, res) => {
  const testId = req.params.Test_ID;
  const q = "DELETE FROM tests WHERE Test_ID = ?";

  db.query(q, [testId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Test record has been deleted successfully.");
  });
});

// UPDATE a test
app.put("/tests/:Test_ID", (req, res) => {
  const testId = req.params.Test_ID;
  const q =
    "UPDATE tests SET Test_ID=?, Patient_ID=?, Disease_Name=?, Test_Results=?, Test_Name=? WHERE Test_ID=?";

  const values = [
    req.body.Test_ID,
    req.body.Patient_ID,
    req.body.Disease_Name,
    req.body.Test_Results,
    req.body.Test_Name,
  ];

  db.query(q, [...values, testId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Test record has been updated successfully.");
  });
});

// treats for
// GET all treats_for records
app.get("/treats_for", (req, res) => {
  const q = "SELECT * FROM treats_for";
  db.query(q, (err, data) => {
    if (err) return res.json("Error!");
    return res.json(data);
  });
});

// INSERT a new treats_for record
app.post("/treats_for", (req, res) => {
  const q =
    "INSERT INTO treats_for (Patient_ID, Disease_Name, Doctor_ID) VALUES (?, ?, ?)";

  const values = [
    req.body.Patient_ID,
    req.body.Disease_Name,
    req.body.Doctor_ID,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json("Insert successful!");
  });
});

// DELETE a treats_for record
app.delete("/treats_for/:Patient_ID/:Disease_Name/:Doctor_ID", (req, res) => {
  const patientId = req.params.Patient_ID;
  const diseaseName = req.params.Disease_Name;
  const doctorId = req.params.Doctor_ID;
  const q =
    "DELETE FROM treats_for WHERE Patient_ID = ? AND Disease_Name = ? AND Doctor_ID = ?";

  db.query(q, [patientId, diseaseName, doctorId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Treats_for record has been deleted successfully.");
  });
});

// UPDATE a treats_for record
app.put("/treats_for/:Patient_ID/:Disease_Name/:Doctor_ID", (req, res) => {
  const patientId = req.params.Patient_ID;
  const diseaseName = req.params.Disease_Name;
  const doctorId = req.params.Doctor_ID;
  const q =
    "UPDATE treats_for SET Patient_ID=?, Disease_Name=?, Doctor_ID=? WHERE Patient_ID=? AND Disease_Name=? AND Doctor_ID=?";

  const values = [
    req.body.Patient_ID,
    req.body.Disease_Name,
    req.body.Doctor_ID,
  ];

  db.query(q, [...values, patientId, diseaseName, doctorId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Treats_for record has been updated successfully.");
  });
});
