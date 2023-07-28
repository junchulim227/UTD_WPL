import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Person from "./pages/Person"; // Lowercase 'person' to match file name, but capitalized 'Person' for component name
import Add from "./pages/Add";
import Update from "./pages/Update"; // Uppercase 'Update' to match file name
import QueryExecutor from './pages/QueryExecutor';
import Home from "./pages/Home";
import AppNavbar from "./pages/Navbar";

function App() {
  return (
    <div className="App w-100 h-100 d-flex flex-column">
      <AppNavbar/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/person" element={<Person/>}/> 
        <Route path="/add" element={<Add/>}/>
        <Route path="/update/:id" element={<Update/>}/>
        <Route path="/query" element={<QueryExecutor />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
