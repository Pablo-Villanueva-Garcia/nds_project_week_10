const express = require ('express');
const router = express.Router();
const bodyparser = require ('body-parser');

require ('dotenv').config();
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');

const UserService = require('../services/user-services');
const {User} = require('../models/mongoose');

router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());

//ENDPOINT PARA AUTENTIFICACION 

//REGISTER

router.post ('/register',(req,res) => {
    const email = req.body.email;
    //1* HASH DE LA CONTRASEÑA USANDO BCRYPT
   const hashedPassword = bcrypt.hashSync(req.body.password,8);
   //2* GENERAMOS EL TOKEN USANDO JWT (EL email sera la id de referencia y nuestro hash sera secret , no es la manera correcta de hacerlo pero es un primer paso)
   const token = jwt.sign({id:email},process.env.SECRET,{
       //DURACION DEL TOKEN 
        expiresIn:86400
   });
   //3* CREAMOS USUARIO , pasandolo por un try - catch para corroborar que todo valla bien 
   try{
    UserService.Create({ email:email,password:hashedPassword,token:token});
    res.status(201).send({token:token})
   }catch (e){
        console.log(e)
        res.status(500).send({error:e})
   }
    
})


//LOGIN

router.post('/login',(req,res) => {
    //Busqueda de datos del usuario
    User.findOne({email:req.body.email},(err,user) => {
        //FILTROS DE ERROR Y SIN NO TENGO USUARIO
            if(err) return res.status(500).send('Error on the server');
            if(!user) return res.status(500).send('Error on the server');
        //VALIDACION DE PASSWORD (el compareSync comapara la password de la req con la password encriptada de forma logica )
            const passwordValid = bcrypt.compareSync(req.body.password,user.password);   
        //FILTROS DE ERROR DEL PASSWORDVALID
            if(!passwordValid) return res.status(401).send({token:null});
            const token = jwt.sign({id:user.email},process.env.SECRET,{
                expiresIn:86400
            })
            res.status(200).send({token:token});
    });

});



module.exports = router;