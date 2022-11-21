import './landing.css'
import { useNavigate } from 'react-router-dom'
import franquicia from './../../assets/images/franquicia.jpg'
import operador from './../../assets/images/operador.jpg'
import proveedor from './../../assets/images/proveedor.jpg'
import contabilidad from './../../assets/images/contabilidad.jpg'
import Auth from './../../Auth'

export const Landing = () => {

    let navigate = useNavigate();
    
    return(
        <div className="main-container-landing">
            <h1 className='welcome-msg'>¡Bienvenido, Usuario!</h1>
            <div className='option-panel'> 
                <div className='option' onClick={()=>navigate("/proveedores")}>
                    <img className='option-logo' src={proveedor} alt='proveedor-img'/>
                    <p className='option-text'>PROVEEDORES</p>
                </div>
                <div className='option' onClick={()=>navigate("/franquicias")}>
                    <img className='option-logo' src={franquicia} alt='franquicia-img'/>
                    <p className='option-text'>FRANQUICIAS</p>
                </div>
                <div className='option' onClick={()=>navigate("/operadores")}>
                    <img className='option-logo' src={operador} alt='operador-img'/>
                    <p className='option-text' >OPERADORES</p>
                </div>
                <div className='option' onClick={()=>navigate("/contabilidad")}>
                    <img className='option-logo' src={contabilidad} alt='operador-img'/>
                    <p className='option-text' >CONTABILIDAD</p>
                </div>
            </div>
            <button onClick={()=>{Auth.logout(); navigate("/");}} className='button-logout'>CERRAR<br/>SESIÓN</button>
        </div>
    );
}