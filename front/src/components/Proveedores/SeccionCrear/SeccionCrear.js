import React from "react"
import './seccioncrear.css'
import { Direccion } from './Direccion/Direccion';

export const SeccionCrear = () => {

    const [datos, setDatos] = React.useState({
        nombre: '',
        telefono: '',
        email: '',
        cuit: '',
        pagina: ''
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

    return (
        <div className="container-seccion-crear">

            <p className="seccion-crear-titulo" style={{marginTop: '10px'}}>Datos Generales</p>
            
            <label className="etiqueta-formulario">Nombre</label>
            <input value={datos.nombre} type="text" className="input-formulario" placeholder="Nombre" onChange={handleChange}/>
            
            <div className="subseccion-otros-datos">
                <div className="columna-subseccion">
                    <div style={{width:'100%'}}>
                        <label className="etiqueta-formulario">Número de teléfono</label>
                        <input value={datos.telefono} type="text" className="input-formulario" placeholder="Teléfono" onChange={handleChange}/>
                    </div>
                    
                    <div style={{width:'100%'}}>
                        <label className="etiqueta-formulario">E-mail</label>
                        <input value={datos.email} type="text" className="input-formulario" placeholder="E-mail" onChange={handleChange}/>  
                    </div>
                   
                </div>
                <div className="columna-subseccion">
                    <div style={{width:'100%'}}>
                        <label className="etiqueta-formulario">Cuit</label>
                        <input value={datos.cuit} type="text" className="input-formulario" placeholder="Cuit" onChange={handleChange}/>
                    </div>
                    
                    <div style={{width:'100%'}}>
                        <label className="etiqueta-formulario">Página web</label>
                        <input value={datos.pagina} type="text" className="input-formulario" placeholder="Web" onChange={handleChange}/>
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
            <div className="botones-crear">
                <div className="botones-crear-col">
                    <button className="boton-masmenos-direccion" onClick={handleAddDireccion}>+</button>
                    {
                        direcciones.length>1 && <button className="boton-masmenos-direccion" onClick={handleDelDireccion}>-</button>
                    }
                </div>
                <div className="botones-crear-col">
                    <button className="boton-masmenos-direccion" style={{width: '25%'}}>Crear</button>
                </div>
                 
            </div>
           
        </div>
    )
}