import {useState} from 'react';


const UseToken = () => {
    //RECOGER EL TOKEN DEL LOCALSTORAGE
    const getToken = () => {
        //Recogemos el valor de token en una variable
        const TokenString = localStorage.getItem('token');
        //Lo parseamos (convertir texto a un objeto de Javascript) en este caso a un objeto JSON
        const userToken = JSON.parse(TokenString);
        //Si tenemos valor retornamos el token del usuario
        return userToken?.token
    };
    //Usestate para recoger el token 
    const [token, settoken] = useState(getToken());
 
    //GUARDAR EL TOKEN 
    const saveToken = userToken => {
        /*Hacemos el mismo porceso con localstorage pero para guardar datos usando setitem, pasamos la key token y el valor de usertoken ,
        pasandolo por un stringify para convertir un objeto Javascript a una cadena */
        localStorage.setItem('token',JSON.stringify(userToken));
        //Guardamos el token de usertoken en settoken 
        settoken(userToken.token);
    }
//Devolvemos el valor de settoken como el valor resultante de la funcion save y el token 
    return{
        settoken:saveToken,
        token
    }
}

export default UseToken;


/*El sesionstorage nos permite guardar valores dentro de un diccionario (funciona mas o menos igual / CLAVE->VALOR)
guardando valores asociados a claves de valor , y se mantienen mientras esa pestaña del navegador se mantiene abierta.*/


/*El Localstorage nos permite guardar valores dentro de un diccionario (funciona mas o menos igual / CLAVE->VALOR)
guardando valores asociados a claves de valor ,a diferencia del sesion funciona a nivel de navegador*/