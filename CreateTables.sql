-- Person Table
CREATE TABLE Person
( Person_ID INT NOT NULL,
  Address VARCHAR(255),
  Birthdate DATE,
  Name VARCHAR(255),
  Sex CHAR(1),
  Email_Addr VARCHAR(255),
  Phone_Number VARCHAR(255),
  CONSTRAINT person_pk PRIMARY KEY (Person_ID)
);
-- Department Table
CREATE TABLE Department
( Department_Number INT NOT NULL,
  Department_Name VARCHAR(255),
  CONSTRAINT department_pk PRIMARY KEY (Department_Number)
);
-- Staff Table
CREATE TABLE Staff
( SSN INT NOT NULL,
  Department_ID INT NOT NULL,
  Salary INT,
  FOREIGN KEY (Department_ID) REFERENCES Department(Department_Number),
  CONSTRAINT staff_pk PRIMARY KEY (SSN)
);
-- Doctor Table
CREATE TABLE Doctor
( Doctor_SSN INT NOT NULL,
  FOREIGN KEY (Doctor_SSN) REFERENCES Staff(SSN),
  CONSTRAINT doc_pk PRIMARY KEY (Doctor_SSN)
);
-- Insurance Table
CREATE TABLE Insurance
( Member_ID INT NOT NULL,
  Group_Number INT,
  Policy_Holder VARCHAR(255),
  Insurance_Provider VARCHAR(255),
  CONSTRAINT insurance_pk PRIMARY KEY (Member_ID)
);
-- Patient Table
CREATE TABLE Patient
( Patient_ID INT NOT NULL,
  Member_ID INT,
  FOREIGN KEY (Patient_ID) REFERENCES Person(Person_ID),
  FOREIGN KEY (Member_ID) REFERENCES Insurance(Member_ID),
  CONSTRAINT patient_pk PRIMARY KEY (Patient_ID)
);
-- Disease Table
CREATE TABLE Disease
( Patient_ID INT NOT NULL,
  Disease_Name VARCHAR(255) NOT NULL,
  Treatments VARCHAR(255),
  FOREIGN KEY (Patient_ID) REFERENCES Patient(Patient_ID),
  CONSTRAINT disease_pk PRIMARY KEY (Patient_ID, Disease_Name)
);
-- Tests Table
CREATE TABLE Tests
( Test_ID INT NOT NULL,
  Patient_ID Int NOT NULL,
  Disease_Name VARCHAR(255) NOT NULL,
  Test_Results VARCHAR(255),
  Test_Name VARCHAR(255),
  FOREIGN KEY (Patient_ID, Disease_Name) REFERENCES Disease(Patient_ID, Disease_Name),
  CONSTRAINT tests_pk PRIMARY KEY (Patient_ID, Disease_Name, Test_ID)
);
-- Medical Table
CREATE TABLE Medical
( Med_SSN INT NOT NULL,
  CONSTRAINT med_pk PRIMARY KEY (Med_SSN)
);
-- Treats_For Table
CREATE TABLE Treats_For
( Patient_ID INT NOT NULL,
  Disease_Name VARCHAR(255) NOT NULL,
  Doctor_ID INT NOT NULL,
  FOREIGN KEY (Patient_ID, Disease_Name) REFERENCES Disease(Patient_ID, Disease_Name),
  FOREIGN KEY (Doctor_ID) REFERENCES Doctor(Doctor_SSN),
  CONSTRAINT treats_for_pk PRIMARY KEY (Patient_ID, Disease_Name, Doctor_ID)
);
-- Room Table
CREATE TABLE Room
( Room_Number INT NOT NULL,
  Type VARCHAR(255),
  Beds INT,
  CONSTRAINT room_pk PRIMARY KEY (Room_Number)
);
-- Is_In Table
CREATE TABLE Is_In
( Room_Number INT NOT NULL,
  Patient_ID INT NOT NULL,
  FOREIGN KEY (Room_Number) REFERENCES Room(Room_Number),
  FOREIGN KEY (Patient_ID) REFERENCES Patient(Patient_ID),
  CONSTRAINT is_in_pk PRIMARY KEY (Room_Number)
);
-- Has_Appointment
CREATE TABLE Has_Appointment
( Patient_ID INT NOT NULL,
  Doctor_SSN INT NOT NULL,
  FOREIGN KEY (Patient_ID) REFERENCES Patient(Patient_ID),
  FOREIGN KEY (Doctor_SSN) REFERENCES Doctor(Doctor_SSN),
  CONSTRAINT has_appointment_pk PRIMARY KEY (Patient_ID, Doctor_SSN)
);
-- Takes_Medicine Table
CREATE TABLE Takes_Medicine
( Patient_ID INT NOT NULL,
  Medicine VARCHAR(255),
  FOREIGN KEY (Patient_ID) REFERENCES Patient(Patient_ID),
  CONSTRAINT takes_medicine_pk PRIMARY KEY (Patient_ID, Medicine)
);