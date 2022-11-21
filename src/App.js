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
import { Operadores } from './components/Operadores/Operadores';
import { Franquicias } from './components/Franquicias/Franquicias'
import { Contadores } from './components/Contadores/Contadores'
import { ProtectedRoute } from './ProtectedRoute';
function App() {
  return (
    <BrowserRouter>
      <div className="container-principal" id='button'> 
        
          <Routes>

            <Route path="/" element={<LogIn/>} />

            <Route path="/landing" element={
              <ProtectedRoute>
                <Landing/>
              </ProtectedRoute>
             }
             />

            <Route path="/proveedores" element={
              <ProtectedRoute>
                <Proveedores/>      
              </ProtectedRoute>
            } 
            />

            <Route path="/operadores" element={
              <ProtectedRoute>
                <Operadores/>
              </ProtectedRoute>
            }
            />

            <Route path="/franquicias" element={
              <ProtectedRoute>
                <Franquicias/>
              </ProtectedRoute>
            } 
            />

            <Route path="/contabilidad" element={
              <ProtectedRoute>
                <Contadores/>      
              </ProtectedRoute>
            } 
            />
            
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
