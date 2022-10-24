import React from "react"
import './direccion.css'

export const Direccion = ({data, modificarData, posicion}) => {

   

    const [datos, setDatos] = React.useState(
        {
            street:'',
            zipCode:'',
            province:'',
            number: '',
            city:'',
            type: 'Provider',
            latitude: '1',
            longitude: '1'
        }
    )

    React.useEffect(()=>{
        setDatos(data[posicion])
    },[])


    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        })

        const aux = data.slice()
        aux[posicion] = {
            ...datos,
            [event.target.name]: event.target.value,
        }
       
        modificarData(aux)
        
    }

    return(
        <div className="container-direccion">
                <p className="seccion-crear-titulo">{`Dirección ${posicion+1}`}</p>

                <div className="datos-direccion">
                    <div className="columna-subseccion">
                        <div>
                            <label className="etiqueta-formulario">Calle</label>
                            <input value={datos.street} name="street" type="text" className="input-formulario" placeholder="Calle" onChange={(e) => handleChange(e)}/>
                        </div>
                        
                        <div>
                            <label className="etiqueta-formulario">Código postal</label>
                            <input value={datos.zipCode} name="zipCode" type="text" className="input-formulario" placeholder="Código" onChange={(e) => handleChange(e)}/>
                        </div>

                        <div>
                            <label className="etiqueta-formulario">Provincia</label>
                            <input value={datos.province} name="province" type="text" className="input-formulario" placeholder="Provincia" onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>

                    <div className="columna-subseccion">
                        <div>
                            <label className="etiqueta-formulario">Número</label>
                            <input value={datos.number} name="number" type="number" className="input-formulario" placeholder="Número" onChange={(e) => handleChange(e)}/>
                        </div>

                        <div>
                            <label className="etiqueta-formulario">Ciudad</label>
                            <input value={datos.city} name="city" type="text" className="input-formulario" placeholder="Ciudad" onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                </div>
            </div>
    )
}