// This is the Main page of the app

import express from 'express'
import mysql from 'mysql'
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Rkselrksel1!",
    database:"utd_cs6360"
})

app.use(express.json())
app.use(cors())


app.get('/', (req,res)=>{
    res.json('hello this is the backend')
})


// GET QUERY DATA FROM SQL
app.get('/person', (req,res)=>{
    const q = 'SELECT * FROM person'
    db.query(q,(err,data)=>{
        if(err) return res.json('Error!');
        return res.json(data);
    })
})

app.post('/person', (req, res) => {
    const q = 'INSERT INTO person (Person_ID, Address, Birthdate, Name, Sex, Email_Addr, Phone_Number) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    //postman -> body -> raw -> JSON to edit
    const values = [
        req.body.Person_ID,
        req.body.Address,
        req.body.Birthdate,
        req.body.Name,
        req.body.Sex,
        req.body.Email_Addr,
        req.body.Phone_number
    ];

    db.query(q, values, (err, data) => {
        if (err) return res.json({ error: err.message });
        return res.json('INSERT IS WORKING!');
    });
});

// // this is for delete

app.delete('/person/:Person_ID', (req, res) => {
    const personId = req.params.Person_ID;
    console.log(`Person_ID: ${personId}`);
    const q = 'DELETE FROM person WHERE Person_ID = ?';

    db.query(q, [personId], (err, data) => {
        if (err) return res.json(err);
        return res.json('Person has been deleted successfully.');
    });
});




// this is for update
app.put('/person/:Person_ID', (req, res) => {
    const personId = req.params.Person_ID;
    const q = 'UPDATE person SET Person_ID=?, Address=?, Birthdate=?, Name=?, Sex=?, Email_Addr=?, Phone_Number=? WHERE Person_ID=?';

    const values = [
        req.body.Person_ID,
        req.body.Address,
        req.body.Birthdate,
        req.body.Name,
        req.body.Sex,
        req.body.Email_Addr,
        req.body.Phone_number
    ];

    db.query(q, [...values, personId], (err, data) => {
        if (err) return res.json(err);
        return res.json('Person has been updated successfully.');
    });
});


app.listen(8800, ()=>{
    console.log('Connected to backend!')
})