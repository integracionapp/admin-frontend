import React from "react"
import './seccioncrear.css'
import { Direccion } from './Direccion/Direccion';
import { PopUp } from "../../PopUp/PopUp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Auth from "../../../Auth";


export const SeccionCrear = ({busqueda}) => {
    
    let navigate = useNavigate();
    const [showModal, setShowModal] = React.useState(false);
    const [popUp, setpopUp] = React.useState({
        mensaje: "",
        titulo: ""
    })

    const [datos, setDatos] = React.useState(null)
    const [direcciones, setDirecciones] = React.useState(null)

    React.useEffect(()=>{
        
        if(busqueda){
            
            var config = {
                method: 'get',
                url: `http://${process.env.REACT_APP_API_URL}:8080/providers/name/${busqueda.itemName}`,
                headers: { 
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            };
            
            axios(config)
            .then((response) => {
                setDatos(response.data[0])
                setDirecciones(response.data[0].addresses)
                
            })
            .catch((error) => {
                console.log(error)
                if(error.response.status === 403){
                    Auth.refresh(
                        (response)=>{
    
                            sessionStorage.setItem('token', response.data.access_token)
                            var nuevoLlamado = {
                                method: 'get',
                                url: `http://${process.env.REACT_APP_API_URL}:8080/providers/name/${busqueda.itemName}`,
                                headers: { 
                                    'Authorization': 'Bearer' + response.data.access_token
                                }
                            };
                            
                            axios(nuevoLlamado)
                            .then((response)=>{
                                setDatos(response.data[0])
                                setDirecciones(response.data[0].addresses)
                            })
                            .catch((error)=>{
                                setShowModal(true)
                                setpopUp({mensaje:'Consulta al desarrollador', titulo: "Error"})
                            })
                        },
                        (error)=>{
                            navigate('/login')
                        }   
                    )
                }else{
                    setShowModal(true)
                    setpopUp({mensaje:'Consulta al desarrollador', titulo: "Error"})
                }
                
            });
        }else{
            
            setDatos({
                businessName: '',
                phone: '',
                email: '',
                cuit: '',
                webPageUrl: '', 
                addresses: []
            })
            setDirecciones([
                {
                    street:'',
                    zipCode:'',
                    province:'',
                    number:'',
                    city:'',
                    latitude: '1',
                    longitude: '1'
                }
            ])
        }
    },[busqueda])
    
    const modificarDirecciones = (direc) => {
        setDirecciones(direc)
    }

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        })
    }

    const crear = () => {
        
        var data = 
            {
                ...datos,
                addresses: direcciones
            }
        
        
        console.log(data)

        var config = {
        method: 'post',
        url: `http://${process.env.REACT_APP_API_URL}:8080/providers/`,
        headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`, 
            'Content-Type': 'application/json'
        },
        data : data
        };
        
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            setpopUp({
                mensaje:'Se ha creado el proveedor',
                titulo:'Creacion Proveedores'
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
                            url: `http://${process.env.REACT_APP_API_URL}:8080/providers/`,
                            headers: { 
                                'Authorization': 'Bearer ' + response.data.access_token, 
                                'Content-Type': 'application/json'
                            },
                            data : data
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

    const handleAddDireccion = () => {
        const aux = direcciones.slice();
        aux.push({
            street:'',
            zipCode:'',
            province:'',
            number:'',
            city:'',
            type: 'Provider',
            latitude: '1',
            longitude: '1'
        })
        setDirecciones(aux);
    }

    const handleDelDireccion = () => {
        const aux = direcciones.slice();
        aux.pop()
        setDirecciones(aux);
    }

    const eliminar = () => {
        var config = {
            method: 'delete',
            url: `http://${process.env.REACT_APP_API_URL}:8080/providers/${datos.id}`,
            headers: { 
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
          };
          
          axios(config)
          .then(function (response) {
            setShowModal(true)
            setpopUp({mensaje:'Se han eliminado los datos', titulo: "Eliminar"})
            setTimeout(() => {
                window.location.reload(true)
            }, 2000);
            
          })
          .catch(function (error) {
                if(error.response.status === 403){
                    Auth.refresh(
                        (response)=>{
                            sessionStorage.setItem('token', response.data.access_token)
                            var config = {
                                method: 'delete',
                                url: `http://${process.env.REACT_APP_API_URL}:8080/providers/${datos.id}`,
                                headers: { 
                                    'Authorization': 'Bearer ' + response.data.access_token
                                }
                            };
                              
                            axios(config)
                            .then(()=>{
                                setShowModal(true)
                                setpopUp({mensaje:'Se han eliminado los datos', titulo: "Eliminar"})
                                setTimeout(() => {
                                    window.location.reload(true)
                                }, 2000);
                            })
                            .catch(()=>{
                                setShowModal(true)
                                setpopUp({mensaje:'Consulta al desarrollador', titulo: "Error"})
                            })
                        },
                        (error)=>{
                            navigate('/login')
                        }
                    )
                }
          });
          
        
    }

    const modificar = () => {
        var data = 
            {
                ...datos,
                addresses: direcciones
            }
        var config = {
            method: 'put',
            url: `http://${process.env.REACT_APP_API_URL}:8080/providers/`,
            headers: { 
              'Authorization': `Bearer ${sessionStorage.getItem('token')}`, 
              'Content-Type': 'application/json'
            },
            data : data
        };
        
        axios(config)
        .then(function (response) {
            setpopUp({mensaje:'Se han modificado los datos', titulo: "Modificar"})
            setShowModal(true)
        })
        .catch(function (error) {
            if(error.response.status === 403){
                Auth.refresh(
                    (response)=>{
                        
                        sessionStorage.setItem('token', response.data.access_token)
                        var llamadoActualizar = {
                            method: 'put',
                            url: `http://${process.env.REACT_APP_API_URL}:8080/providers/`,
                            headers: { 
                              'Authorization': 'Bearer ' + response.data.access_token, 
                              'Content-Type': 'application/json'
                            },
                            data : data
                        };
                        

                        axios(llamadoActualizar)
                        .then((response)=>{
                            setpopUp({mensaje:'Se han modificado los datos', titulo: "Modificar"})
                            setShowModal(true)
                        })
                        .catch((error)=>{
                            setShowModal(true)
                            setpopUp({mensaje:'Consulta al desarrollador', titulo: "Error"})
                        })
                    },
                    (error)=>{
                        navigate('/login')
                    }
                )
            }else{
                setShowModal(true)
                setpopUp({mensaje:'Consulta al desarrollador', titulo: "Error"})
            }
        });
        
    }

    if(datos){
        return (
        
            <div className="container-seccion-crear">
                <p className="seccion-crear-titulo" style={{marginTop: '10px'}}>Datos Generales</p>
                
                <label className="etiqueta-formulario">Nombre</label>
                <input value={datos.businessName} name='businessName' type="text" className="input-formulario" placeholder="Nombre" onChange={(e) => handleChange(e)}/>
                
                <div className="subseccion-otros-datos">
                    <div className="columna-subseccion">
                        <div style={{width:'100%'}}>
                            <label className="etiqueta-formulario">Número de teléfono</label>
                            <input value={datos.phone} name='phone' type="text" className="input-formulario" placeholder="Teléfono" onChange={(e) => handleChange(e)}/>
                        </div>
                        
                        <div style={{width:'100%'}}>
                            <label className="etiqueta-formulario">E-mail</label>
                            <input value={datos.email} name='email' type="text" className="input-formulario" placeholder="E-mail" onChange={(e) => handleChange(e)}/>  
                        </div>
                       
                    </div>
                    <div className="columna-subseccion">
                        <div style={{width:'100%'}}>
                            <label className="etiqueta-formulario">Cuit</label>
                            <input value={datos.cuit} name='cuit' type="number" className="input-formulario" placeholder="Cuit" onChange={(e) => handleChange(e)}/>
                        </div>
                        
                        <div style={{width:'100%'}}>
                            <label className="etiqueta-formulario">Página web</label>
                            <input value={datos.webPageUrl} name='webPageUrl' type="text" className="input-formulario" placeholder="Web" onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
    
                </div>
    
                
                {
                    direcciones.map((elem, index)=>{
                        return(
                            <Direccion key={index} posicion={index} data={direcciones} modificarData={modificarDirecciones}/>
                        )
                    })
                }
           
    
                {
                    !busqueda 
                        ?
                        <div className="botones-crear">
                            <div className="botones-crear-col">
                                <button className="boton-masmenos-direccion" onClick={handleAddDireccion}>+</button>
                                {
                                    direcciones.length>1 && <button className="boton-masmenos-direccion" onClick={handleDelDireccion}>-</button>
                                }
                            </div>
                            <div className="botones-crear-col">
                                <button className="boton-masmenos-direccion" style={{width: '35%'}} onClick={crear}>Crear</button>
                            </div>
                        </div>
                        :
                        <div className="botones-crear">
                            <div className="botones-crear-col">
                                <button className="boton-masmenos-direccion" onClick={handleAddDireccion}>+</button>
                                {
                                    direcciones.length>1 && <button className="boton-masmenos-direccion" onClick={handleDelDireccion}>-</button>
                                }
                            </div>
                            <div className="botones-crear-col">
                                <button className="boton-direccion edit" onClick={modificar}>Modificar</button>
                                <button className="boton-direccion delete" onClick={eliminar}>Eliminar</button>
                            </div>
    
                        </div>
                }
                
                <PopUp show={showModal} onHide={() => setShowModal(false)} text={popUp.mensaje} title={popUp.titulo}/>
    
            </div>
        )
    }
    
}