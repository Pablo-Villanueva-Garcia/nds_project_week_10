
const hostname = 'http://localhost:8000'
const options = {
    headers:{
    'Content-Type':'aplication/json'
    }
}

export const UseloginUser = () => {
    return{
        loginUser:async(credencials) => {
            return fetch (hostname + '/login',{
                method:'POST',
                body:JSON.stringify(credencials),
                ...options,
            }).then(response=>response.json())
            .then(response =>{
                return response;
            })
        }
    }
    
}