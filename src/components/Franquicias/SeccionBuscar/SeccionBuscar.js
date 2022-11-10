import './seccionbuscar.css'
import React from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const SeccionBuscar = ({busqueda}) => {

    let navigate = useNavigate();

    const [prov, setProv] = React.useState([])

    
    React.useEffect(()=>{

        const buscar = () => {
            var config = {
                method: 'get',
                url: `https://${process.env.REACT_APP_API_URL}/franchises/`,
                headers: { 
                  'Authorization': `Bearer ${sessionStorage.getItem('token')}` 
                }
              };
              
            axios(config)
            .then(function (response) {
                setAuxBusqueda(response.data)
                setProv(response.data)
            })
            .catch(function (error) {
                if(error.response.status === 403){
                    var refresh = {
                        method: 'get',
                        url: `https://${process.env.REACT_APP_API_URL}/token/refresh`,
                        headers: { 
                          'Authorization': `Bearer ${sessionStorage.getItem('refresh')}` 
                        }
                      };
                      
                      axios(refresh)
                      .then(function (response) {
                        
                        sessionStorage.setItem('token', response.data.access_token)
                        var llamadoNuevo = {
                            method: 'get',
                            url: `https://${process.env.REACT_APP_API_URL}/franchises/`,
                            headers: { 
                              'Authorization': 'Bearer ' + response.data.access_token
                            }
                          };
                          
                        axios(llamadoNuevo)
                        .then(function (response) {
                            setProv(response.data)
                            setAuxBusqueda(response.data)
                        })
                        .catch(function(error){
                            console.log(error)
                        })

                      })
                      .catch(function () {
                        navigate('/login')
                      });
                      
                }
            });
        }

        buscar();
    },[])
    
    
    const [auxBusqueda, setAuxBusqueda] = React.useState(prov)
    const handleChange = (event) => {
        setAuxBusqueda(prov.filter((elem) => {
            return elem.businessName.toLowerCase().includes(event.target.value.toLowerCase());
        }));
    }
    return (
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
                                    <td>{elem.name}</td>
                                    <td>{elem.cuit}</td>
                                    <td>
                                        <button 
                                            className='boton-ver-perfil'
                                            onClick={()=>busqueda({
                                                itemName: elem.name
                                            })}
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
    )
}