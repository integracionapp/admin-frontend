import React from "react"
import { UNSAFE_DataStaticRouterContext } from "react-router-dom"
import './direccion.css'

export const Direccion = ({data, modificarData, posicion}) => {

    const [datos, setDatos] = React.useState(
        {
            calle:'',
            codigo:'',
            provincia:'',
            numero:'',
            ciudad:''
        }
    )

    const handleChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value,
        })

        console.log(datos)
        const aux = data.slice()
        aux[posicion] = datos
        
        

    }

    return(
        <div className="container-direccion">
                <p className="seccion-crear-titulo">{`Direccion ${posicion+1}`}</p>

                <div className="datos-direccion">
                    <div className="columna-subseccion">
                        <div>
                            <label className="etiqueta-formulario">Calle</label>
                            <input name="calle" type="text" className="input-formulario" placeholder="Calle" onChange={handleChange}/>
                        </div>
                        
                        <div>
                            <label className="etiqueta-formulario">Código postal</label>
                            <input name="codigo" type="text" className="input-formulario" placeholder="Código"onChange={handleChange}/>
                        </div>

                        <div>
                            <label className="etiqueta-formulario">Provincia</label>
                            <input name="provincia" type="text" className="input-formulario" placeholder="Provincia" onChange={handleChange}/>
                        </div>
                    </div>

                    <div className="columna-subseccion">
                        <div>
                            <label className="etiqueta-formulario">Número</label>
                            <input name="numero" type="text" className="input-formulario" placeholder="Número" onChange={handleChange}/>
                        </div>

                        <div>
                            <label className="etiqueta-formulario">Ciudad</label>
                            <input name="ciudad" type="text" className="input-formulario" placeholder="Ciudad" onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>
    )
}