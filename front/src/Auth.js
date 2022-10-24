import axios from "axios";

class Auth{
    constructor() {
        this.autenticado = false;
    }

    refresh(thenCallback, catchCallback) {
        var refresh = {
            method: 'get',
            url: `http://${process.env.REACT_APP_API_URL}:8080/token/refresh`,
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

}

export default new Auth();