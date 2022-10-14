import './proveedores.css'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Proveedores = () => {

    const navigate = useNavigate();
    
    const [buscar, setBuscar] = React.useState(true);
    const [crear, setCrear] = React.useState(false);
    const [prov, setProv] = React.useState([
        {
            nombre: 'Guly S.A',
            cuit: '3146633'
        },
        {
            nombre: 'Speratonni',
            cuit: '1141325'
        },
        {
            nombre: 'Commins S.A',
            cuit: '55661333'
        },
        {
            nombre: 'Tretpacking',
            cuit: '6131561'
        },
        {
            nombre: 'Juniher',
            cuit: '9823465'
        },
        {
            nombre: 'Corvencin Limited',
            cuit: '2789521'
        },
        {
            nombre: 'Lopez y Asociados',
            cuit: '6541367'
        },
        {
            nombre: 'Corvencin Limited',
            cuit: '2789521'
        },
        {
            nombre: 'Lopez y Asociados',
            cuit: '6541367'
        },
        {
            nombre: 'Corvencin Limited',
            cuit: '2789521'
        },
        {
            nombre: 'Lopez y Asociados',
            cuit: '6541367'
        },
        {
            nombre: 'Corvencin Limited',
            cuit: '2789521'
        },
        {
            nombre: 'Lopez y Asociados',
            cuit: '6541367'
        },
        {
            nombre: 'Corvencin Limited',
            cuit: '2789521'
        },
        {
            nombre: 'Lopez y Asociados',
            cuit: '6541367'
        }
    ])

    const [auxBusqueda, setAuxBusqueda] = React.useState(prov)


    const handleChange = (event) => {
        setAuxBusqueda(prov.filter((elem) => {
            return elem.nombre.toLowerCase().includes(event.target.value.toLowerCase());
        }));
        
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
                    }}
                >
                    Buscar
                </button>
                <button
                    className={crear ? 'menu-lateral-boton seleccionado' : 'menu-lateral-boton'}
                    onClick={()=>{
                        setBuscar(false)
                        setCrear(true)
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
                <div className="contenedor-scroll-tabla">
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{width:'30%'}}>Nombre</th>
                                <th style={{width:'30%'}}>CUIT</th>
                                <th className='columna-buscador'>
                                    <input
                                        placeholder='Búsqueda por nombre'
                                        className='buscador-tabla'
                                        onChange={handleChange}
                                    />
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                auxBusqueda.map((elem,index)=>{
                                    return(
                                        <tr key={index}>
                                            <td>{elem.nombre}</td>
                                            <td>{elem.cuit}</td>
                                            <td>
                                                <button 
                                                    className='boton-ver-perfil'
                                                    onClick={()=>console.log('Clickie en ' + elem.nombre)}
                                                >
                                                    Ver perfil
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}