import React from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { PopUp } from '../PopUp/PopUp'
import qs from 'qs'

export const LogIn = () => {

    const [showModal, setShowModal] = React.useState(false);
    

    const [datos, setDatos] = React.useState({
        usuario:'',
        contraseña:''
    })
    let navigate = useNavigate();

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        
        })
    }

    const login = () => {

        var data = qs.stringify({
            'username': datos.usuario,
            'password': datos.contraseña 
          });

        
        var config = {
        method: 'post',
        url: `https://${process.env.REACT_APP_API_URL}/token`,
        headers: {  
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
        };
        axios(config)
        .then(function (response) {
            sessionStorage.setItem('token', response.data.access_token)
            sessionStorage.setItem('refresh', response.data.refresh_token)
            navigate('/landing')
        })

        .catch(function () {
            setShowModal(true)
        });
          
    }
    console.log()
   
    return(
        <div className='main-container-login bg-image'>
            
           <div className='enter-user-container'> 
                <p className='label-login'>USUARIO</p>
                <input name='usuario' value={datos.usuario} placeholder='Ingrese usuario' onChange={(e)=> handleChange(e)}/>
           </div>
           <div className='enter-user-container'> 
                <p className='label-login'>CONTRASEÑA</p>
                <input name='contraseña' value={datos.contraseña} type='password' placeholder='Ingrese contraseña' onChange={(e)=> handleChange(e)}/>
           </div>
           <button onClick={login} className='button-login'>INICIAR<br/>SESIÓN</button>

           <PopUp show={showModal} onHide={() => setShowModal(false)} text='No se encuentra registrado en el sistema' title='Error'/>
        </div>
    );
}