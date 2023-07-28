-- Population
INSERT INTO Person (Person_ID, Address, Birthdate, Name, Sex, Email_Addr,
Phone_Number)
VALUES
    	(1, '123 Street, City, Country', '1980-12-12', 'Junchul Lim', 'M', 'june.lim@email.com',
'1234567890'),
    	(2, '456 Avenue, City, Country', '1985-10-10', 'Alexis Theodor', 'F', 'alex.theo@email.com',
'0987654321'),
    	(3, '789 Street, City, Country', '1990-08-08', 'Harsha Jaganathan', 'M', 'harsha.jag112@email.com',
'1231231231'),
   	(888991111, '321 Avenue, City, Country', '1982-07-07', 'Anu Ladaybug', 'F', 'anu.lady@email.com',
'2342342342'),
    (333445555, '654 Street, City, Country', '1988-06-06', 'Sid Sundara', 'M', 'sid.sund@email.com', '3453453453'),
    (666778888, '987 Avenue, City, Country', '1992-05-05', 'Jess Beauchert', 'F', 'jess.beau@email.com', '4564564564'),
    (999112222, '135 Street, City, Country', '1984-04-04', 'Ravi Smart', 'M', 'rav.sm@email.com', '5675675675'),
    (444556777, '246 Avenue, City, Country', '1986-03-03', 'Mia Miller', 'F', 'mia.mi@email.com', '6786786786'),
    (111223333, '579 Street, City, Country', '1983-02-02', 'Vig Beardman', 'M', 'vi.bman@email.com', '7897897897'),
    (444556666, '864 Avenue, City, Country', '1991-01-01', 'Jalal Oman', 'F', 'jll.oma@email.com', '8908908908');

INSERT INTO Insurance (Member_ID, Group_Number, Policy_Holder, Insurance_Provider)
VALUES
    (123456789, 100, 'Junchul Lim', 'Insurance Company A'),
    (098765432, 200, 'Ryan Noodle', 'Insurance Company B'),
    (848482456, 300, 'Harsha Jagnathan', 'Insurance Company C');
    
INSERT INTO Patient (Patient_ID, Member_ID)
VALUES
    (1, 123456789),
    (2, 098765432),
    (3, 848482456);
	
 
INSERT INTO Department (Department_Number, Department_Name)
VALUES
    (1, 'Cardiology'),
    (2, 'Neurology'),
    (3, 'Radiology'),
    (4, 'Pediatrics'),
    (5, 'Oncology'),
    (6, 'Gynecology'),
    (7, 'Dermatology'),
    (8, 'Gastroenterology'),
    (9, 'Pulmonology'),
    (10, 'Psychiatry');
 
INSERT INTO Staff (SSN, Department_ID, Salary)
VALUES
    (888991111, 4, 60000),
    (333445555, 5, 95000),
    (666778888, 6, 65000),
    (999112222, 7, 75000),
    (444556777, 8, 85000),
    (111223333, 9, 80000),
    (444556666, 10, 70000);
   
INSERT INTO Doctor (Doctor_SSN)
VALUES
    (666778888),
    (999112222),
    (444556777);

INSERT INTO Disease (Patient_ID, Disease_Name, Treatments)
VALUES
    (1, 'Hypertension', 'Medication, Lifestyle changes'),
    (2, 'Plantar fasciitis', 'Stretching'),
    (2, 'Migraine', 'Sumatriptan, Aimovig, Relaxation techniques'),
    (3, 'Asthma', 'Inhalers, Lifestyle changes');

INSERT INTO Tests (Test_ID, Patient_ID, Disease_Name, Test_Results, Test_Name)
VALUES
    (1, 1, 'Hypertension', 'High', 'Blood Pressure Test'),
    (4, 1, 'Hypertension', '80', "Hemoglobin"),
    (2, 2, 'Migraine', 'Negative', 'MRI Scan'),
    (3, 3, 'Asthma', 'Positive', 'Pulmonary Function Test');
 
INSERT INTO Medical (Med_SSN)
VALUES
 	(888991111),
    (333445555),
    (111223333),
    (444556666);
 
INSERT INTO Treats_For (Patient_ID, Disease_Name, Doctor_ID)
VALUES
    (1, 'Hypertension', 666778888),
    (2, 'Plantar fasciitis', 666778888),
    (2, 'Migraine', 999112222),
    (3, 'Asthma', 444556777);
 
INSERT INTO Room (Room_Number, Type, Beds)
VALUES
    (1, 'Single', 1),
    (2, 'Double', 2),
    (3, 'Triple', 3),
    (4, 'Quad', 4),
    (5, 'Neonatal Scanner', 1),
    (6, 'ICU', 2),
    (7, 'ICU', 3),
    (8, 'Triage', 4),
    (9, 'Primary Care', 1),
    (10, 'Physical Therapy', 2);
 
INSERT INTO Is_In (Room_Number, Patient_ID)
VALUES
    (1, 1),
    (2, 2),
    (3, 3);
 
INSERT INTO Has_Appointment (Patient_ID, Doctor_SSN)
VALUES
    (1, 666778888),
    (2, 999112222),
    (3, 444556777);
 
INSERT INTO Takes_Medicine (Patient_ID, Medicine)
VALUES
    (1, 'Medicine A'),
    (2, 'Medicine B'),
    (3, 'Medicine C'); 
