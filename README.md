# utd_db_project_summer2023

Installation Instructions:
To run do the following:

- Open a terminal, cd backend/ and run npm install
- Create a .env file at the root of the project and paste the below line
  - DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
  - Substitute the words USER, PASSWORD, HOST, PORT, DATABASE with your local mysql credentials
  - Example database url: mysql://utd-db-design:turtles123!@127.0.0.1:3306/prisma_hdbms?schema=public
- Run npx prisma migrate dev
  - This command will create the database with the tables in your local instance of mysql
- Run npm run serve
  - This command will start the backend
- Open a second terminal, cd client/
- Run npm install
  - Installs client dependencies
- Run npm start
  - Starts the client site
- In the terminal, it should prompt you whether you should use a different port for the client, click y to accept. The port it should assign you should be localhost:3001
- Navigate to the assigned port on your browser: eg. localhost:3001

Workflows and User Actions:
Each bullet point in this section shows the Follow the workflows shown in the links to perform each task:

- Register new patient
  - As a patient, you can register yourself into our system to become a part of our HDBMS.
  - https://app.tango.us/app/workflow/Creating-a-New-Patient-Record-2fd1b4695e47411887e5b7db4ab43735
- Register new doctor
  - New doctors signing up to our HDBMS can do so through our system by following the instructions below.
  - https://app.tango.us/app/workflow/Adding-a-new-Doctor-4cc766b96e6643c39c3fc0b1ca9be341
- Update a person’s info
  - A person (both patient and doctor) are allowed to update their personal information in the Person’s page, where they can modify fields such as email, Name, Sex, Address, Phone number, Birthday
  - https://app.tango.us/app/workflow/Updating-Person-Information-637a3f0979e34a11b8497516b63b35aa
- Delete a person
  - When a person decides to leave our HDBMS, we provide them a way to delete their account and their data in our registry.
  - Actions
    - Navigate to the Person tab
    - Click on the delete button for the row that you would like to delete
    - Note: this will perform a cascade delete
- Book an appointment with a Doctor
  - https://app.tango.us/app/workflow/Book-an-Appointment-with-a-Doctor-ddc171b935684c829eb9da526ca62468
- Book a room for a patient
  - https://app.tango.us/app/workflow/Reserving-a-Room-66d67f9b198b4bd997d305a1106dff4a
- Add diagnosis for patient’s illness
  - https://app.tango.us/app/workflow/Add-a-diagnosis-for-a-patient-33c0410e4d8d4f0ca16023b486ac9a80
- Other pages
  - Analytics
    - Shows interesting queries on data present in the table
  - Department
    - Shows list of departments that are in HDBMS
    - Can add departments
  - Rooms
    - Shows rooms in HDBMS
    - Can add rooms
  - Diseases
    - Shows diseases in HDBMS
    - Can add diseases
