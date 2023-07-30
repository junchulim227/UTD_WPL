"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
var RESPONSE_STATUS;
(function (RESPONSE_STATUS) {
    RESPONSE_STATUS[RESPONSE_STATUS["ERROR"] = 400] = "ERROR";
    RESPONSE_STATUS[RESPONSE_STATUS["OK"] = 200] = "OK";
})(RESPONSE_STATUS || (RESPONSE_STATUS = {}));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.json("hello this is the backend");
});
app.get("/readPersons", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const persons = yield prisma.person.findMany();
        res.json({ status: RESPONSE_STATUS.OK, result: persons });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.get("/readRooms", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield prisma.room.findMany();
        res.json({ status: RESPONSE_STATUS.OK, result: rooms });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.get("/readDepartments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departments = yield prisma.department.findMany();
        res.json({ status: RESPONSE_STATUS.OK, result: departments });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.get("/readDoctors", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.doctor.findMany();
        res.json({ status: RESPONSE_STATUS.OK, result: result });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.get("/readAppointments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.has_Appointment.findMany();
        res.json({ status: RESPONSE_STATUS.OK, result: result });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.get("/readIs_Ins", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.is_In.findMany();
        res.json({ status: RESPONSE_STATUS.OK, result: result });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.get("/readPatients", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.patient.findMany();
        res.json({ status: RESPONSE_STATUS.OK, result: result });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.get("/readDiseases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.disease.findMany();
        res.json({ status: RESPONSE_STATUS.OK, result: result });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.get("/readHasDiseases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.has_Disease.findMany();
        res.json({ status: RESPONSE_STATUS.OK, result: result });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.post("/createPerson", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body, "request createPerson");
        const personDetails = req.body;
        const personInput = {
            Name: personDetails.Name,
            Address: personDetails.Address,
            Birth_Date: new Date(personDetails.Birthdate).toISOString(),
            Sex: personDetails.Sex,
            Email_Addr: personDetails.Email_Addr,
            Phone_Number: Number(personDetails.Phone_number),
        };
        const person = yield prisma.person.create({
            data: Object.assign({}, personInput),
        });
        res.json({ status: RESPONSE_STATUS.OK, result: person });
    }
    catch (e) {
        console.log(e, "createPerson");
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.post("/updatePerson", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, data } = req.body;
        const personDetails = data;
        delete personDetails.Person_ID;
        console.log(id, personDetails, "udpate");
        const personInput = {
            Name: personDetails.Name,
            Address: personDetails.Address,
            Birth_Date: new Date(personDetails.Birthdate).toISOString(),
            Sex: personDetails.Sex,
            Email_Addr: personDetails.Email_Addr,
            Phone_Number: Number(personDetails.Phone_number),
        };
        const person = yield prisma.person.update({
            where: {
                Person_ID: Number(id),
            },
            data: Object.assign({}, personInput),
        });
        res.json({ status: RESPONSE_STATUS.OK, result: person });
    }
    catch (e) {
        console.log(e, "createPerson");
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.post("/deletePerson", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.body.id);
        console.log("id: ", id);
        const person = yield prisma.person.delete({
            where: { Person_ID: id },
        });
        res.json({ status: RESPONSE_STATUS.OK, result: person });
    }
    catch (e) {
        console.log(e, "deletePerson");
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.post("/createPatient", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientDetails = req.body;
        const personInput = {
            Name: patientDetails.Name,
            Address: patientDetails.Address,
            Birth_Date: new Date(patientDetails.Birthdate).toISOString(),
            Sex: patientDetails.Sex,
            Email_Addr: patientDetails.Email_Addr,
            Phone_Number: Number(patientDetails.Phone_number),
        };
        const patient = yield prisma.patient.create({
            data: {
                profile: {
                    create: personInput,
                },
            },
        });
        res.json({ status: RESPONSE_STATUS.OK, result: patient });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
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
app.post("/createDepartment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentRequests = req.body;
        const departments = yield prisma.department.createMany({
            data: {
                Department_Name: departmentRequests.DepartmentName,
            },
        });
        res.json({ status: RESPONSE_STATUS.OK, result: departments });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
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
app.post("/createRoom", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomRequest = req.body;
        const rooms = yield prisma.room.create({
            data: {
                RoomNumber: Number(roomRequest.RoomNumber),
                Type: roomRequest.Type,
                Beds: Number(roomRequest.Beds),
            },
        });
        res.json({ status: RESPONSE_STATUS.OK, result: rooms });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.post("/createDiseases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const diseaseRequests = req.body;
        const diseases = yield prisma.disease.createMany({
            data: diseaseRequests,
        });
        res.json({ status: RESPONSE_STATUS.OK, result: diseases });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.post("/createDoctor", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorDetails = req.body;
        const personInput = {
            Name: doctorDetails.Name,
            Address: doctorDetails.Address,
            Birth_Date: new Date(doctorDetails.Birthdate).toISOString(),
            Sex: doctorDetails.Sex,
            Email_Addr: doctorDetails.Email_Addr,
            Phone_Number: Number(doctorDetails.Phone_number),
        };
        const doctorInput = {
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
        const doctor = yield prisma.doctor.create({
            data: doctorInput,
        });
        res.json({ status: RESPONSE_STATUS.OK, result: doctor });
    }
    catch (e) {
        console.error(e);
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.post("/createAppointment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentDetails = req.body;
        const appointment = yield prisma.has_Appointment.create({
            data: {
                Patient_ID: Number(appointmentDetails.Patient_ID),
                Doctor_ID: Number(appointmentDetails.Doctor_ID),
                DateTime: new Date(appointmentDetails.DateTime).toISOString(),
            },
        });
        res.json({ status: RESPONSE_STATUS.OK, result: appointment });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.post("/updateAppointment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentDetails = req.body;
        const appointment = yield prisma.has_Appointment.update({
            where: {
                Appointment_ID: Number(appointmentDetails.Appointment_ID),
            },
            data: {
                Patient_ID: Number(appointmentDetails.Patient_ID),
                Doctor_ID: Number(appointmentDetails.Doctor_ID),
                DateTime: new Date(appointmentDetails.DateTime).toISOString(),
            },
        });
        res.json({ status: RESPONSE_STATUS.OK, result: appointment });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.post("/deleteAppointment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentDetails = req.body;
        const appointment = yield prisma.has_Appointment.delete({
            where: {
                Appointment_ID: Number(appointmentDetails),
            },
        });
        res.json({ status: RESPONSE_STATUS.OK, result: appointment });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.post("/createIs_In", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inRoomDetails = req.body;
        const inRoom = yield prisma.is_In.create({
            data: {
                RoomNumber: Number(inRoomDetails.RoomNumber),
                Patient_ID: Number(inRoomDetails.Patient_ID),
            },
        });
        res.json({ status: RESPONSE_STATUS.OK, result: inRoom });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.post("/deleteIs_In", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inRoomDetails = req.body;
        const inRoom = yield prisma.is_In.delete({
            where: {
                RoomNumber: Number(inRoomDetails),
            },
        });
        res.json({ status: RESPONSE_STATUS.OK, result: inRoom });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.post("/createTest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testDetails = req.body;
        const test = yield prisma.test.create({
            data: testDetails,
        });
        res.json({ status: RESPONSE_STATUS.OK, result: test });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.post("/createDisease", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hasDiseaseDetails = req.body;
        const hasDisease = yield prisma.disease.create({
            data: {
                Disease_Name: hasDiseaseDetails.Disease_Name,
            },
        });
        res.json({ status: RESPONSE_STATUS.OK, result: hasDisease });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.post("/createHasDisease", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hasDiseaseDetails = req.body;
        const hasDisease = yield prisma.has_Disease.create({
            data: {
                Disease_ID: Number(hasDiseaseDetails.Disease_ID),
                Patient_ID: Number(hasDiseaseDetails.Patient_ID),
            },
        });
        res.json({ status: RESPONSE_STATUS.OK, result: hasDisease });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.get("/getPatientsGT2Diseases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.$queryRawUnsafe(`
      SELECT p.Name
      FROM Person p
      JOIN Patient pat ON p.Person_ID = pat.ID
      JOIN Has_Disease hd ON pat.ID = hd.Patient_ID
      GROUP BY p.Name, pat.ID
      HAVING COUNT(DISTINCT hd.Disease_ID) >= 2;
    `);
        console.log("q1", result);
        res.json({ status: RESPONSE_STATUS.OK, result });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.get("/getDepartmentAvgSalaries", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.$queryRawUnsafe(`
      SELECT d.Department_Name, AVG(s.Salary) AS Average_Salary
      FROM Department d
      JOIN Staff s ON d.Department_Number = s.Department_ID
      GROUP BY d.Department_Name;
    `);
        console.log("q2", result);
        res.json({ status: RESPONSE_STATUS.OK, result });
    }
    catch (e) {
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
app.get("/mostCommonDisease", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.$queryRawUnsafe(`
      SELECT d.Disease_Name, COUNT(hd.Disease_ID) AS Occurrences
      FROM Disease d
      JOIN Has_Disease hd ON d.Disease_ID = hd.Disease_ID
      GROUP BY d.Disease_Name
      ORDER BY Occurrences DESC;
    `);
        console.log("q3", result);
        const serial = result.map((elem) => {
            return {
                Disease_Name: elem.Disease_Name,
                Occurrences: JSON.stringify(elem.Occurrences, (_, value) => typeof value === "bigint" ? Number(value) : value),
            };
        });
        console.log("serial", serial);
        res.json({ status: RESPONSE_STATUS.OK, result: serial });
    }
    catch (e) {
        console.log("errored", e);
        res.json({ status: RESPONSE_STATUS.ERROR, result: e });
    }
}));
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
