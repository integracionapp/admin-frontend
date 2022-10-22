import React from "react"
import './seccioncrear.css'
import { Direccion } from './Direccion/Direccion';
import { PopUp } from "../../PopUp/PopUp";

export const SeccionCrear = ({data}) => {
    
    const [showModal, setShowModal] = React.useState(false);
    const [popUp, setpopUp] = React.useState({
        mensaje: "",
        titulo: ""
    })

    const [datos, setDatos] = React.useState({
        nombre: '',
        telefono: '',
        email: '',
        cuit: '',
        pagina: '', 
        direcciones: []
    })
    const [direcciones, setDirecciones] = React.useState([
        {
            calle:'',
            codigo:'',
            provincia:'',
            numero:'',
            ciudad:''
        }
    ])
    
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
        setDatos({
            ...datos,
            direcciones: direcciones
        })
        console.log(datos)
    }

    const handleAddDireccion = () => {
        const aux = direcciones.slice();
        aux.push({
            calle:'',
            codigo:'',
            provincia:'',
            numero:'',
            ciudad:''
        })
        setDirecciones(aux);
    }

    const handleDelDireccion = () => {
        const aux = direcciones.slice();
        aux.pop()
        setDirecciones(aux);
    }

    const eliminar = () => {
        //COLOCO FUNCIONALIDAD DEL ELIMINAR
        setShowModal(true)
        setpopUp({mensaje:'Se han eliminado los datos', titulo: "Eliminar"})
    }

    const modificar = () => {
        //COLOCO FUNCIONALIDAD DEL MODIFICAR
        setShowModal(true)
        setpopUp({mensaje:'Se han modificado los datos', titulo: "Modificar"})
    }

    return (
        <div className="container-seccion-crear">

            <p className="seccion-crear-titulo" style={{marginTop: '10px'}}>Datos Generales</p>
            
            <label className="etiqueta-formulario">Nombre</label>
            <input value={datos.nombre} name='nombre' type="text" className="input-formulario" placeholder="Nombre" onChange={(e) => handleChange(e)}/>
            
            <div className="subseccion-otros-datos">
                <div className="columna-subseccion">
                    <div style={{width:'100%'}}>
                        <label className="etiqueta-formulario">Número de teléfono</label>
                        <input value={datos.telefono} name='telefono' type="text" className="input-formulario" placeholder="Teléfono" onChange={(e) => handleChange(e)}/>
                    </div>
                    
                    <div style={{width:'100%'}}>
                        <label className="etiqueta-formulario">E-mail</label>
                        <input value={datos.email} name='email' type="text" className="input-formulario" placeholder="E-mail" onChange={(e) => handleChange(e)}/>  
                    </div>
                   
                </div>
                <div className="columna-subseccion">
                    <div style={{width:'100%'}}>
                        <label className="etiqueta-formulario">Cuit</label>
                        <input value={datos.cuit} name='cuit' type="text" className="input-formulario" placeholder="Cuit" onChange={(e) => handleChange(e)}/>
                    </div>
                    
                    <div style={{width:'100%'}}>
                        <label className="etiqueta-formulario">Página web</label>
                        <input value={datos.pagina} name='pagina' type="text" className="input-formulario" placeholder="Web" onChange={(e) => handleChange(e)}/>
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
            {/*  */}

            {
                !data 
                    ?
                    <div className="botones-crear">
                        <div className="botones-crear-col">
                            <button className="boton-masmenos-direccion" onClick={handleAddDireccion}>+</button>
                            {
                                direcciones.length>1 && <button className="boton-masmenos-direccion" onClick={handleDelDireccion}>-</button>
                            }
                        </div>
                        <div className="botones-crear-col">
                            <button className="boton-masmenos-direccion" style={{width: '35%'}} onClick={()=>crear()}>Crear</button>
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