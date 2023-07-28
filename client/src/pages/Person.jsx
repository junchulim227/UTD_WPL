import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


const Person = () => {
  const [persons, setPersons] = useState([]) // renamed state variable

  useEffect(()=>{
    const fetchAllPersons = async ()=>{ // renamed function
        try{
            const res = await axios.get("http://localhost:8800/person")
            setPersons(res.data);
        }catch(err){
            console.log(err)
        }
    }
    fetchAllPersons()

  },[])
  

  const handleDelete = async (id) => {
    try{
        await axios.delete('http://localhost:8800/person/' + id)
        window.location.reload()

    }catch(err){
        console.log(err)

        }
    }
  

  return (
    <div>
      <h1> Database Hospital Project </h1>
      <div className='person'>
        {persons.map(person=>(
            <div className='person' key={person.Person_ID}>
                <h2>{person.Name}</h2>
                <p>{person.Person_ID}</p>
                <span>{person.Address}</span>

                <button className='delete' onClick={()=> handleDelete(person.Person_ID)}>Delete</button>

                <button className='update'><Link to={`/update/${person.Person_ID}`}>Update</Link></button>


            </div>
        ))}
      </div>

        // Add button for 'Add'
      <button>
      <Link to="/add">Add new person</Link>
      </button>

    </div>
  )
}

export default Person