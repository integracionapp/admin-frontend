import './contadores.css'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { SeccionBuscar } from './SeccionBuscar/SeccionBuscar';
import { SeccionCrear } from './SeccionCrear/SeccionCrear';

export const Contadores = () => {

    const navigate = useNavigate();
    
    const [buscar, setBuscar] = React.useState(true);
    const [crear, setCrear] = React.useState(false);
    const [opcion, setOpcion] = React.useState('buscar')
    const [paramsBusqueda, setParamsBusqueda] = React.useState(null)

    const realizarBusqueda = (data) => {
        setParamsBusqueda(data)
        setBuscar(false)
        setCrear(false)
        setOpcion('crear')
    }
    const switchOpcion = (opcion) => {
        switch(opcion){
            case 'buscar':
                return <SeccionBuscar busqueda={realizarBusqueda} />
            case 'crear':
                return <SeccionCrear busqueda={paramsBusqueda}/>
        }
    }
    return(
        <div className="contenedor-principal-proveedores">
            <div className='menu-lateral'>
                <p className='menu-lateral-titulo'>Contabilidad</p>
                <button 
                    className={buscar ? 'menu-lateral-boton seleccionado' : 'menu-lateral-boton'}
                    onClick={()=>{
                        setBuscar(true)
                        setCrear(false)
                        setOpcion('buscar')
                        setParamsBusqueda(null)
                    }}
                >
                    Buscar
                </button>
                <button
                    className={crear ? 'menu-lateral-boton seleccionado' : 'menu-lateral-boton'}
                    onClick={()=>{
                        setBuscar(false)
                        setCrear(true)
                        setOpcion('crear')
                        setParamsBusqueda(null)
                    }}
                >
                    Crear
                </button>
                <button 
                    className='menu-lateral-boton'
                    onClick={()=>navigate('/landing')}
                >
                    Volver
                </button>
            </div>
            <div className='contenido-pantalla'>
                {
                    switchOpcion(opcion)
                }
            </div>
        </div>
    )
}