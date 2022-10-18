import './proveedores.css'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { SeccionBuscar } from './SeccionBuscar/SeccionBuscar';
import { SeccionCrear } from './SeccionCrear/SeccionCrear';

export const Proveedores = () => {

    const navigate = useNavigate();
    
    const [buscar, setBuscar] = React.useState(true);
    const [crear, setCrear] = React.useState(false);
    const [opcion, setOpcion] = React.useState('buscar')

    const switchOpcion = (opcion) => {
        switch(opcion){
            case 'buscar':
                return <SeccionBuscar/>
            case 'crear':
                return <SeccionCrear/>
        }
    }
    return(
        <div className="contenedor-principal-proveedores">
            <div className='menu-lateral'>
                <p className='menu-lateral-titulo'>Proveedores</p>
                <button 
                    className={buscar ? 'menu-lateral-boton seleccionado' : 'menu-lateral-boton'}
                    onClick={()=>{
                        setBuscar(true)
                        setCrear(false)
                        setOpcion('buscar')
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