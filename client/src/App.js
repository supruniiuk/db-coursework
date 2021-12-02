import "./App.css";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Clients } from "./pages/Admin/Clients";
import { Dispatchers } from "./pages/Admin/Dispatchers";
import { Drivers } from "./pages/Admin/Drivers";
import { Orders } from "./pages/Admin/Orders";
import { Auth } from "./pages/Auth/Auth";

function App() {
  return (
    <BrowserRouter>
      <div className="App wrapper">
        <Navbar className="Navbar"/>
        
        <div className="main-content container d-flex justify-content-center align-items-center">
          <Routes>
            <Route exact path="/clients" element={<Clients />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/dispatchers" element={<Dispatchers />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
