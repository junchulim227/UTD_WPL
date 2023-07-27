import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Person from "./pages/Person"; // Lowercase 'person' to match file name, but capitalized 'Person' for component name
import Add from "./pages/Add";
import Update from "./pages/Update"; // Uppercase 'Update' to match file name

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Person/>}/> 
        <Route path="/add" element={<Add/>}/>
        <Route path="/update/:id" element={<Update/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
