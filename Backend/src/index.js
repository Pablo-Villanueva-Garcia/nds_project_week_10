require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('express-async-errors');
const errorHandler = require("./middlewares/error-handler")

const app = express();
const port = process.env.PORT || 8000;


const UserService = require('./services/user-services');
const CreateRouter = require('./controller/crud-controller');
const auth = require('./controller/Auth-controller');
const { PromiseProvider } = require('mongoose');

app.use(errorHandler)

app.use(cors({
    origin:'*',
    optionsSuccessStatus:200 ,
}))
app.use(express.json());

app.use(auth);

app.use('/users',CreateRouter(UserService));


app.listen(port,()=>{
    console.log(`You are listening port ${port}`)   
})
