import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import {
  PatientDetailsRequest,
  DoctorDetailsRequest,
  AppointmentDetailsRequest,
  Appointment_ID,
  RoomNumber,
  PersonDetailsRequest,
  RoomRequest,
  DepartmentRequest,
  PatientUpdateRequest,
  Is_InDetailsRequest,
  HasDiseaseDetailsRequest,
  DiseaseDetailsRequest,
} from "./types";

enum RESPONSE_STATUS {
  ERROR = 400,
  OK = 200,
}

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get("/readPersons", async (req, res) => {
  try {
    const persons = await prisma.person.findMany();
    res.json({ status: RESPONSE_STATUS.OK, result: persons });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.get("/readRooms", async (req, res) => {
  try {
    const rooms = await prisma.room.findMany();
    res.json({ status: RESPONSE_STATUS.OK, result: rooms });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.get("/readDepartments", async (req, res) => {
  try {
    const departments = await prisma.department.findMany();
    res.json({ status: RESPONSE_STATUS.OK, result: departments });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.get("/readDoctors", async (req, res) => {
  try {
    const result = await prisma.doctor.findMany();
    res.json({ status: RESPONSE_STATUS.OK, result: result });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.get("/readAppointments", async (req, res) => {
  try {
    const result = await prisma.has_Appointment.findMany();
    res.json({ status: RESPONSE_STATUS.OK, result: result });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.get("/readIs_Ins", async (req, res) => {
  try {
    const result = await prisma.is_In.findMany();
    res.json({ status: RESPONSE_STATUS.OK, result: result });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.get("/readPatients", async (req, res) => {
  try {
    const result = await prisma.patient.findMany();
    res.json({ status: RESPONSE_STATUS.OK, result: result });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.get("/readDiseases", async (req, res) => {
  try {
    const result = await prisma.disease.findMany();
    res.json({ status: RESPONSE_STATUS.OK, result: result });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.get("/readHasDiseases", async (req, res) => {
  try {
    const result = await prisma.has_Disease.findMany();
    res.json({ status: RESPONSE_STATUS.OK, result: result });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.post("/createPerson", async (req, res) => {
  try {
    console.log(req.body, "request createPerson");
    const personDetails: PersonDetailsRequest = req.body;
    const personInput: Prisma.PersonCreateInput = {
      Name: personDetails.Name,
      Address: personDetails.Address,
      Birth_Date: new Date(personDetails.Birthdate).toISOString(),
      Sex: personDetails.Sex,
      Email_Addr: personDetails.Email_Addr,
      Phone_Number: Number(personDetails.Phone_number),
    };
    const person = await prisma.person.create({
      data: { ...personInput },
    });
    res.json({ status: RESPONSE_STATUS.OK, result: person });
  } catch (e) {
    console.log(e, "createPerson");
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.post("/updatePerson", async (req, res) => {
  try {
    const { id, data }: { id: string; data: PersonDetailsRequest } = req.body;
    const personDetails = data;
    delete personDetails.Person_ID;
    console.log(id, personDetails, "udpate");
    const personInput: Prisma.PersonUpdateInput = {
      Name: personDetails.Name,
      Address: personDetails.Address,
      Birth_Date: new Date(personDetails.Birthdate).toISOString(),
      Sex: personDetails.Sex,
      Email_Addr: personDetails.Email_Addr,
      Phone_Number: Number(personDetails.Phone_number),
    };
    const person = await prisma.person.update({
      where: {
        Person_ID: Number(id),
      },
      data: { ...personInput },
    });
    res.json({ status: RESPONSE_STATUS.OK, result: person });
  } catch (e) {
    console.log(e, "createPerson");
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.post("/deletePerson", async (req, res) => {
  try {
    const id = Number(req.body.id);
    console.log("id: ", id);
    const person = await prisma.person.delete({
      where: { Person_ID: id },
    });
    res.json({ status: RESPONSE_STATUS.OK, result: person });
  } catch (e) {
    console.log(e, "deletePerson");
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.post("/createPatient", async (req, res) => {
  try {
    const patientDetails: PatientDetailsRequest = req.body;
    const personInput: Prisma.PersonCreateInput = {
      Name: patientDetails.Name,
      Address: patientDetails.Address,
      Birth_Date: new Date(patientDetails.Birthdate).toISOString(),
      Sex: patientDetails.Sex,
      Email_Addr: patientDetails.Email_Addr,
      Phone_Number: Number(patientDetails.Phone_number),
    };
    const patient = await prisma.patient.create({
      data: {
        profile: {
          create: personInput,
        },
      },
    });
    res.json({ status: RESPONSE_STATUS.OK, result: patient });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

// app.post("/createDepartments", async (req, res) => {
//   try {
//     const departmentRequests: Prisma.DepartmentCreateInput[] = req.body;
//     const departments = await prisma.department.createMany({
//       data: departmentRequests,
//     });
//     res.json({ status: RESPONSE_STATUS.OK, result: departments });
//   } catch (e) {
//     res.json({ status: RESPONSE_STATUS.ERROR, result: e });
//   }
// });

app.post("/createDepartment", async (req, res) => {
  try {
    const departmentRequests: DepartmentRequest = req.body;
    const departments = await prisma.department.createMany({
      data: {
        Department_Name: departmentRequests.DepartmentName,
      },
    });
    res.json({ status: RESPONSE_STATUS.OK, result: departments });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

// app.post("/createRooms", async (req, res) => {
//   try {
//     const roomRequests: RoomRequest[] = req.body;
//     const rooms = await prisma.room.createMany({
//       data: roomRequests.map((room) => {
//         return {
//           RoomNumber: Number(room.RoomNumber),
//           Type: room.Type,
//           Beds: Number(room.Beds),
//         };
//       }),
//     });
//     res.json({ status: RESPONSE_STATUS.OK, result: rooms });
//   } catch (e) {
//     res.json({ status: RESPONSE_STATUS.ERROR, result: e });
//   }
// });

app.post("/createRoom", async (req, res) => {
  try {
    const roomRequest: RoomRequest = req.body;
    const rooms = await prisma.room.create({
      data: {
        RoomNumber: Number(roomRequest.RoomNumber),
        Type: roomRequest.Type,
        Beds: Number(roomRequest.Beds),
      },
    });
    res.json({ status: RESPONSE_STATUS.OK, result: rooms });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.post("/createDiseases", async (req, res) => {
  try {
    const diseaseRequests: Prisma.DiseaseCreateInput[] = req.body;
    const diseases = await prisma.disease.createMany({
      data: diseaseRequests,
    });
    res.json({ status: RESPONSE_STATUS.OK, result: diseases });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.post("/createDoctor", async (req, res) => {
  try {
    const doctorDetails: DoctorDetailsRequest = req.body;
    const personInput: Prisma.PersonCreateInput = {
      Name: doctorDetails.Name,
      Address: doctorDetails.Address,
      Birth_Date: new Date(doctorDetails.Birthdate).toISOString(),
      Sex: doctorDetails.Sex,
      Email_Addr: doctorDetails.Email_Addr,
      Phone_Number: Number(doctorDetails.Phone_number),
    };
    const doctorInput: Prisma.DoctorCreateInput = {
      person: {
        create: {
          Salary: Number(doctorDetails.Salary),
          department: {
            connect: {
              Department_Number: Number(doctorDetails.Department_Number),
            },
          },
          person: {
            create: personInput,
          },
        },
      },
    };

    const doctor = await prisma.doctor.create({
      data: doctorInput,
    });
    res.json({ status: RESPONSE_STATUS.OK, result: doctor });
  } catch (e) {
    console.error(e);
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.post("/createAppointment", async (req, res) => {
  try {
    const appointmentDetails: AppointmentDetailsRequest = req.body;
    const appointment = await prisma.has_Appointment.create({
      data: {
        Patient_ID: Number(appointmentDetails.Patient_ID),
        Doctor_ID: Number(appointmentDetails.Doctor_ID),
        DateTime: new Date(appointmentDetails.DateTime).toISOString(),
      },
    });
    res.json({ status: RESPONSE_STATUS.OK, result: appointment });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.post("/updateAppointment", async (req, res) => {
  try {
    const appointmentDetails: AppointmentDetailsRequest = req.body;
    const appointment = await prisma.has_Appointment.update({
      where: {
        Appointment_ID: Number(appointmentDetails.Appointment_ID!),
      },
      data: {
        Patient_ID: Number(appointmentDetails.Patient_ID),
        Doctor_ID: Number(appointmentDetails.Doctor_ID),
        DateTime: new Date(appointmentDetails.DateTime).toISOString(),
      },
    });
    res.json({ status: RESPONSE_STATUS.OK, result: appointment });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.post("/deleteAppointment", async (req, res) => {
  try {
    const appointmentDetails: Appointment_ID = req.body;
    const appointment = await prisma.has_Appointment.delete({
      where: {
        Appointment_ID: Number(appointmentDetails),
      },
    });
    res.json({ status: RESPONSE_STATUS.OK, result: appointment });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.post("/createIs_In", async (req, res) => {
  try {
    const inRoomDetails: Is_InDetailsRequest = req.body;
    const inRoom = await prisma.is_In.create({
      data: {
        RoomNumber: Number(inRoomDetails.RoomNumber),
        Patient_ID: Number(inRoomDetails.Patient_ID),
      },
    });
    res.json({ status: RESPONSE_STATUS.OK, result: inRoom });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.post("/deleteIs_In", async (req, res) => {
  try {
    const inRoomDetails: RoomNumber = req.body;
    const inRoom = await prisma.is_In.delete({
      where: {
        RoomNumber: Number(inRoomDetails),
      },
    });
    res.json({ status: RESPONSE_STATUS.OK, result: inRoom });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.post("/createTest", async (req, res) => {
  try {
    const testDetails: Prisma.TestCreateInput = req.body;
    const test = await prisma.test.create({
      data: testDetails,
    });
    res.json({ status: RESPONSE_STATUS.OK, result: test });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.post("/createDisease", async (req, res) => {
  try {
    const hasDiseaseDetails: DiseaseDetailsRequest = req.body;
    const hasDisease = await prisma.disease.create({
      data: {
        Disease_Name: hasDiseaseDetails.Disease_Name,
      },
    });
    res.json({ status: RESPONSE_STATUS.OK, result: hasDisease });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.post("/createHasDisease", async (req, res) => {
  try {
    const hasDiseaseDetails: HasDiseaseDetailsRequest = req.body;
    const hasDisease = await prisma.has_Disease.create({
      data: {
        Disease_ID: Number(hasDiseaseDetails.Disease_ID),
        Patient_ID: Number(hasDiseaseDetails.Patient_ID),
      },
    });
    res.json({ status: RESPONSE_STATUS.OK, result: hasDisease });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.get("/getPatientsGT2Diseases", async (req, res) => {
  try {
    const result = await prisma.$queryRawUnsafe(`
      SELECT p.Name
      FROM Person p
      JOIN Patient pat ON p.Person_ID = pat.ID
      JOIN Has_Disease hd ON pat.ID = hd.Patient_ID
      GROUP BY p.Name, pat.ID
      HAVING COUNT(DISTINCT hd.Disease_ID) >= 2;
    `);

    console.log("q1", result);
    res.json({ status: RESPONSE_STATUS.OK, result });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.get("/getDepartmentAvgSalaries", async (req, res) => {
  try {
    const result = await prisma.$queryRawUnsafe(`
      SELECT d.Department_Name, AVG(s.Salary) AS Average_Salary
      FROM Department d
      JOIN Staff s ON d.Department_Number = s.Department_ID
      GROUP BY d.Department_Name;
    `);
    console.log("q2", result);
    res.json({ status: RESPONSE_STATUS.OK, result });
  } catch (e) {
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

app.get("/mostCommonDisease", async (req, res) => {
  try {
    const result: [] = await prisma.$queryRawUnsafe(`
      SELECT d.Disease_Name, COUNT(hd.Disease_ID) AS Occurrences
      FROM Disease d
      JOIN Has_Disease hd ON d.Disease_ID = hd.Disease_ID
      GROUP BY d.Disease_Name
      ORDER BY Occurrences DESC;
    `);
    console.log("q3", result);

    const serial = result.map((elem: any) => {
      return {
        Disease_Name: elem.Disease_Name,
        Occurrences: JSON.stringify(elem.Occurrences, (_, value) =>
          typeof value === "bigint" ? Number(value) : value
        ),
      };
    });
    console.log("serial", serial)

    res.json({ status: RESPONSE_STATUS.OK, result: serial });
  } catch (e) {
    console.log("errored", e);
    res.json({ status: RESPONSE_STATUS.ERROR, result: e });
  }
});

const server = app.listen(3000);

/*
  - patient

  - doctor

  - appointment
    - add
    - update
    - cancel
*/
//createPatient
//createDoctor
//createAppointment
//updateAppointment
//deleteAppointment

//createRooms
//createInRoom
//deleteInRoom

//createDiseases

//createTest
//createHasDisease
