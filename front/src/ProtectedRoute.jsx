import Auth from "./Auth"
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({children}) => {
    if(Auth.isLoged()){
        return children
    }else{
        return(<Navigate to='/'/>)
    }
}