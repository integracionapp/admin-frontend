import axios from "axios";

class Auth{
    constructor() {
        this.autenticado = false;
    }

    refresh(thenCallback, catchCallback) {
        var refresh = {
            method: 'get',
            url: `https://${process.env.REACT_APP_API_URL}/token/refresh`,
            headers: { 
              'Authorization': `Bearer ${sessionStorage.getItem('refresh')}` 
            }
        };
        
        axios(refresh)
        .then((response)=>{
            thenCallback(response)
        })
        .catch((error)=>{
            catchCallback(error)
        })
    }

    isLoged(){
        const token = sessionStorage.getItem('token')

        if(token){
            return true
        }else{
            return false
        }
    }

    logout(){
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('refresh')
    }

}

export default new Auth();