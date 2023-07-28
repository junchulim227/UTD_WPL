CREATE VIEW Multiple_Diseases AS
	SELECT Person.Name, COUNT(Disease.Disease_Name) 
    FROM Person, Disease
    WHERE Person.Person_ID=Disease.Patient_ID
    GROUP BY Person.Person_ID
    HAVING COUNT(Disease.Disease_NAME) > 1;

CREATE VIEW Doctors_Dept_Sal AS
	SELECT Doctor.Doctor_SSN AS Doctor_SSN,
		Person.Name as Name,
		Staff.Department_ID AS Department_ID,
		Staff.Salary AS Salary
	FROM (Doctor JOIN Staff JOIN Person)
	WHERE (Doctor.Doctor_SSN=Staff.SSN AND 
    Doctor.Doctor_SSN=Person.Person_ID);


