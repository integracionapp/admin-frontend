import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { LogIn } from './components/LogIn/LogIn';
import { Landing } from './components/Landing/Landing';
import { Proveedores } from './components/Proveedores/Proveedores';

function App() {
  return (
    <BrowserRouter>
    <div className="container-principal" id='button'> 
      
        <Routes>
          <Route path="/" element={<LogIn/>} />
          <Route path="/landing" element={<Landing/>} />
          <Route path="/proveedores" element={<Proveedores/>} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
