interface PersonDetailsRequest {
  Person_ID?: string;
    Name: string;
  Email_Addr: string;
  Phone_number: string;
  Sex: "M" | "F";
  Address: string;
  Birthdate: string;
}

interface PatientDetailsRequest extends PersonDetailsRequest {}

interface PatientUpdateRequest {

}

interface PatientDeleteRequest {

}

interface DoctorUpdateRequest {

}

interface DoctorDeleteRequest {

}

interface DoctorDetailsRequest extends PersonDetailsRequest {
  Salary: string;
  Department_Number: string;
}

type Appointment_ID = string;
type RoomNumber = string;

interface AppointmentDetailsRequest {
  Appointment_ID?: Appointment_ID;
  Patient_ID: string;
  Doctor_ID: string;
  DateTime: string;
}

interface RoomRequest {
    RoomNumber: string;
    Type: string;
    Beds: string;
}

interface DepartmentRequest {
    DepartmentName: string;
}

interface Is_InDetailsRequest {
    RoomNumber: string;
    Patient_ID: string;
}

interface DiseaseDetailsRequest {
    Disease_ID: string;
  Disease_Name: string;
}

interface HasDiseaseDetailsRequest {
    Disease_ID: string;
  Patient_ID: string;
}

export {
  PatientDetailsRequest,
  DoctorDetailsRequest,
  AppointmentDetailsRequest,
  Appointment_ID,
  RoomNumber,
  PersonDetailsRequest,
  RoomRequest,
  DepartmentRequest,
  PatientUpdateRequest,
  PatientDeleteRequest,
  DoctorUpdateRequest,
  DoctorDeleteRequest,
  Is_InDetailsRequest,
  DiseaseDetailsRequest,
  HasDiseaseDetailsRequest
};
