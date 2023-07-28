SELECT Person.Name, Insurance.Policy_Holder
FROM Person, Patient, Insurance
WHERE Person.Person_ID=Patient.Patient_ID AND Patient.Member_ID=Insurance.Member_ID 
AND Person.Name NOT IN 
(SELECT Person.Name
FROM Person, Patient, Insurance
WHERE Person.Person_ID=Patient.Patient_ID AND Patient.Member_ID=Insurance.Member_ID AND Insurance.Policy_Holder=Person.Name);

SELECT COUNT(Person.Name)
FROM Person, Room, Is_In, Patient
WHERE Person.Person_ID=Patient.Patient_ID AND Patient.Patient_ID=Is_In.Patient_ID AND Is_In.Room_Number=Room.Room_Number;

D

SELECT * FROM multiple_diseases;

SELECT * FROM doctors_dept_sal;