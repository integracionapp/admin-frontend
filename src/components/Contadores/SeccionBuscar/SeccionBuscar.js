import './seccionbuscar.css'
import React from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const SeccionBuscar = () => {

    let navigate = useNavigate();

    const [account, setAccount] = React.useState([])

    
    React.useEffect(()=>{
        
        const buscar = () => {
           
            let config = {
                method: 'get',
                url: `https://${process.env.REACT_APP_API_URL}/users/roles/ROLE_ACCOUNTABLE`,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                }
            };
            
            axios(config)
            
            .then(function (response) {
                setAuxBusqueda(response.data)
                setAccount(response.data)
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
                        let config = {
                            method: 'get',
                            url: `http://${process.env.REACT_APP_API_URL}/users/roles/ROLE_ACCOUNTABLE`,
                            headers: {
                                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                            }
                        };
                        
                        axios(config)
                        .then(function (response) {
                            setAccount(response.data)
                        })
                        .catch(function(error){
                            console.log(error)
                        })

                      })
                      .catch(function () {
                        navigate('/login')
                      });
                      
                }else{
                    console.log(error)
                }
            });
        }

        buscar();
    },[])
    
    
    const [auxBusqueda, setAuxBusqueda] = React.useState(account)
    const handleChange = (event) => {
        setAuxBusqueda(account.filter((elem) => {
            return elem.name.toLowerCase().includes(event.target.value.toLowerCase());
        }));
    }
    return (
        <div className="contenedor-scroll-tabla">
            <table className="table">
                <thead>
                    <tr>
                        <th style={{width:'30%'}}>Nombre</th>
                        <th style={{width:'30%'}}>Usuario</th>
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
                                    <td>{elem.username}</td>    
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>   
    )
}