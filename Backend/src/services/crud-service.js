const mongoose = require('../models/mongoose')
const Joi = require("joi")


function CreateCrudSerives({Collection,schema,beforesave}) {

    function validate(documents) {
        const { error, value } = schema.validate(documents)
        return { error, value }
    }

   async function search(searchinput) {
       const {page,pagesize,...query} = searchinput

    
       Object.keys(query).forEach(
           key => {
               const value = query[key];
               if(value.includes(',')){
                query[key] = { $in: value.split(',') }
               }
           });
    
        return ({
            contents:await mongoose[Collection].find(query).skip(page * pagesize).limit(pagesize),
            totalElements:await mongoose.Recipe.count(query),
            page:page,
            pagesize:pagesize,
        })
    }
    
    async function Create(documents) {
        
        if(beforesave){
            documents = await beforesave(documents)
        }
     
        return (new mongoose[Collection](documents)).save();
    
    }
    
    async function Update(id, fields) {

        const documents = await mongoose[Collection].findById(id).exec();
   
      let newdocument = {
          ...documents.toObject(),
          ...fields,
      }
     

     
      documents.set(newdocument)
        await documents.save();
       return documents
    }
    
    async function  Deletebyid(id) { 
        const response = await mongoose[Collection].findByIdAndDelete(id).exec()
        return response !== null;
    }
    
    function Getbyid(id) {
        const documents = mongoose[Collection].findById(id).exec();
         if(!documents){
         return null
         }
         return documents
     }
     return({
            search,
            Create,
            Update,
            Deletebyid,
            Getbyid,
            validate,
        });
}


 module.exports = CreateCrudSerives