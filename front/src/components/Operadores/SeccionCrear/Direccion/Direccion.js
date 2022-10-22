import React from "react"
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
                            <input value={datos.calle} name="calle" type="text" className="input-formulario" placeholder="Calle" onChange={(e) => handleChange(e)}/>
                        </div>
                        
                        <div>
                            <label className="etiqueta-formulario">Código postal</label>
                            <input value={datos.codigo} name="codigo" type="text" className="input-formulario" placeholder="Código" onChange={(e) => handleChange(e)}/>
                        </div>

                        <div>
                            <label className="etiqueta-formulario">Provincia</label>
                            <input value={datos.provincia} name="provincia" type="text" className="input-formulario" placeholder="Provincia" onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>

                    <div className="columna-subseccion">
                        <div>
                            <label className="etiqueta-formulario">Número</label>
                            <input value={datos.numero} name="numero" type="text" className="input-formulario" placeholder="Número" onChange={(e) => handleChange(e)}/>
                        </div>

                        <div>
                            <label className="etiqueta-formulario">Ciudad</label>
                            <input value={datos.ciudad} name="ciudad" type="text" className="input-formulario" placeholder="Ciudad" onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                </div>
            </div>
    )
}