import './landing.css'
import { useNavigate } from 'react-router-dom'
import franquicia from './../../assets/images/franquicia.jpg'
import operador from './../../assets/images/operador.jpg'
import proveedor from './../../assets/images/proveedor.jpg'

export const Landing = () => {
    let navigate = useNavigate();
    return(
        <div className="main-container-landing">
            <h1 className='welcome-msg'>¡Bienvenido, Usuario!</h1>
            <div className='option-panel'> 
                <div className='option'>
                    <img className='option-logo' src={proveedor} alt='proveedor-img'/>
                    <p className='option-text'>PROVEEDORES</p>
                </div>
                <div className='option'>
                    <img className='option-logo' src={franquicia} alt='franquicia-img'/>
                    <p className='option-text'>FRANQUICIA</p>
                </div>
                <div className='option'>
                    <img className='option-logo' src={operador} alt='operador-img'/>
                    <p className='option-text'>OPERADORES</p>
                </div>
            </div>
            <button onClick={()=>navigate("/")} className='button-logout'>CERRAR<br/>SESIÓN</button>
        </div>
    );
}