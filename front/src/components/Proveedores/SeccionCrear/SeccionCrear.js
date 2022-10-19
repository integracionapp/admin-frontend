import React from "react"
import './seccioncrear.css'
import { Direccion } from './Direccion/Direccion';

export const SeccionCrear = () => {

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
            <input type="text" className="input-formulario" placeholder="Nombre"/>
            
            <div className="subseccion-otros-datos">
                <div className="columna-subseccion">
                    <div style={{width:'100%'}}>
                        <label className="etiqueta-formulario">Número de teléfono</label>
                        <input type="text" className="input-formulario" placeholder="Teléfono"/>
                    </div>
                    
                    <div style={{width:'100%'}}>
                        <label className="etiqueta-formulario">E-mail</label>
                        <input type="text" className="input-formulario" placeholder="E-mail"/>  
                    </div>
                   
                </div>
                <div className="columna-subseccion">
                    <div style={{width:'100%'}}>
                        <label className="etiqueta-formulario">Cuit</label>
                        <input type="text" className="input-formulario" placeholder="Cuit"/>
                    </div>
                    
                    <div style={{width:'100%'}}>
                        <label className="etiqueta-formulario">Página web</label>
                        <input type="text" className="input-formulario" placeholder="Web"/>
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