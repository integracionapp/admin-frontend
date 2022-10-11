import React from 'react'
import './login.css'

export const LogIn = () => {
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
           <button className='button-login'>INICIAR<br/>SESIÓN</button>
        </div>
    );
}