import React from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'

export const LogIn = () => {

    let navigate = useNavigate();

    return(
        <div className='main-container-login bg-image'>
           <div className='enter-user-container'> 
                <p className='label-login'>USUARIO</p>
                <input placeholder='Ingrese usuario'/>
           </div>
           <div className='enter-user-container'> 
                <p className='label-login'>CONTRASEÑA</p>
                <input type='password' placeholder='Ingrese contraseña'/>
           </div>
           <button onClick={()=>navigate("/landing")} className='button-login'>INICIAR<br/>SESIÓN</button>
        </div>
    );
}