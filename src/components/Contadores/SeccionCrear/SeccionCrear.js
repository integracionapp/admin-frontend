import React from "react"
import './seccioncrear.css'
import { PopUp } from "../../PopUp/PopUp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Auth from "../../../Auth";


export const SeccionCrear = () => {
    
    let navigate = useNavigate();
    const [showModal, setShowModal] = React.useState(false);
    const [popUp, setpopUp] = React.useState({
        mensaje: "",
        titulo: ""
    })

    const [datos, setDatos] = React.useState({
        name: '',
        username: '',
        password: '',
        roles:['ROLE_ACCOUNTABLE']
    })
 
    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        })
    }

    const crear = () => {

        var config = {
        method: 'post',
        url: `https://${process.env.REACT_APP_API_URL}/users/`,
        headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`, 
            'Content-Type': 'application/json'
        },
        data : datos
        };
        
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            setpopUp({
                mensaje:'Se ha creado el contador',
                titulo:'Creacion Contabilidad'
            })

            setShowModal(true)
            setTimeout(() => {
                window.location.reload(true)
            }, 2000);
            
        })
        .catch(function (error) {
            
            if(error.response.status === 403){

                console.log('ERROR TOKEN VENCIDO')

                Auth.refresh(
                    (response)=>{
                        sessionStorage.setItem('token', response.data.access_token)
                        
                        var config = {
                            method: 'post',
                            url: `https://${process.env.REACT_APP_API_URL}/users/`,
                            headers: { 
                                'Authorization': 'Bearer ' + response.data.access_token, 
                                'Content-Type': 'application/json'
                            },
                            data : datos
                        };
                        axios(config)
                        .then(()=>{
                            setpopUp({
                                mensaje:'Se ha creado el proveedor',
                                titulo:'Creacion Proveedores'
                            })
                            setShowModal(true)
                            setTimeout(() => {
                                window.location.reload(true)
                            }, 2000);
                        })
                        .catch((error)=>{
                            console.log(error)
                            setpopUp({
                                titulo:'Error',
                                mensaje: error.response.data.message
                            })
            
                            setShowModal(true)
                        })
                    },
                    (error)=>{
                        navigate('/login')
                    }
                )
                
            }else{
                
                setpopUp({
                    titulo:'Error',
                    mensaje: error.response.data.message
                })

                setShowModal(true)
            }
        });

    }

   
    if(datos){
        return (
        
            <div className="container-seccion-crear">
                

                <div className="container-estrecho">
                <p className="seccion-crear-titulo" style={{marginTop: '50px'}}>Datos Generales</p>
                    <div>
                        <label className="etiqueta-formulario">Nombre</label>
                        <input value={datos.name} name='name' type="text" className="input-formulario" placeholder="Nombre" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <label className="etiqueta-formulario">Nombre de Usuario</label>
                        <input value={datos.username} name='username' type="text" className="input-formulario" placeholder="Nombre" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <label className="etiqueta-formulario">Contraseña</label>
                        <input value={datos.password} name='password' type="password" className="input-formulario" placeholder="Nombre" onChange={(e) => handleChange(e)}/>
                    </div>
                    

                    <div className="botones-crear">
                        <div className="botones-crear-col">
                            <button className="boton-masmenos-direccion" style={{width: '35%'}} onClick={crear}>Crear</button>
                        </div>
                    </div>

                </div>
                
              
               
                
                
                <PopUp show={showModal} onHide={() => setShowModal(false)} text={popUp.mensaje} title={popUp.titulo}/>
    
            </div>
        )
    }
    
}