import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [person, setPerson] = useState({
        Person_ID:"",
        Address:"",
        Birthdate:null,
        Name:"",
        Sex:"",
        Email_Addr:"",
        Phone_number:""
    })

    const navigate = useNavigate()


    const handleChange = (e) =>{
        setPerson(prev=>({...prev, [e.target.name]: e.target.value}))}
    
    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.post('http://localhost:8800/person', person)
            navigate("/")

        }catch(err){
            console.log(err)
        }

    }

    // console.log(person)

  return (
    <div className='form'>
      <h1> Add New Person </h1>
      <input type = 'number' placeholder='Person_ID' onChange={handleChange} name='Person_ID' />
      <input type = 'text' placeholder='Address' onChange={handleChange} name= 'Address'/>
      <input type = 'date' placeholder='Birthdate' onChange={handleChange} name='Birthdate' />
      <input type = 'text' placeholder='Name' onChange={handleChange} name='Name' />
      <input type = 'text' placeholder='Sex' onChange={handleChange} name='Sex' />
      <input type = 'text' placeholder='Email_Addr' onChange={handleChange} name='Email_Addr' />
      <input type = 'text' placeholder='Phone_Number' onChange={handleChange} name='Phone_Number' />
    
    <button onClick={handleClick}>
        Add
    </button>
    
    </div>
  )
}

export default Add
