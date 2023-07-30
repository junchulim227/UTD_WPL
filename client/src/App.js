import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Person from "./pages/Person"; // Lowercase 'person' to match file name, but capitalized 'Person' for component name
import QueryExecutor from './pages/QueryExecutor';
import Home from "./pages/Home";
import AppNavbar from "./pages/Navbar";
import Rooms from "./pages/Rooms";
import Department from "./pages/Department";
import Doctor from "./pages/Doctor";
import Patient from "./pages/Patient";
import Appointment from "./pages/Appointment";
import Is_In from "./pages/Is_In";
import Disease from "./pages/Disease";
import HasDisease from "./pages/HasDisease";
import InterestingQueries from "./pages/InterestingQueries";

function App() {
  return (
    <div className="App w-100 h-100 d-flex flex-column">
      <AppNavbar/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/person" element={<Person/>}/> 
        <Route path="/patient" element={<Patient />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/Is_In" element={<Is_In />} />
        <Route path="/room" element={<Rooms/>}/> 
        <Route path="/department" element={<Department/>}/> 
        <Route path="/query" element={<QueryExecutor />} />
        <Route path="/disease" element={<Disease />} />
        <Route path="/hasDisease" element={<HasDisease />} />
        <Route path="/interesting" element={<InterestingQueries />} />
        

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
