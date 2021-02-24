const {Router} = require ('express');
const validate = require ('../middlewares/validate')

const isInt = text => !isNaN(parseInt(text));

function createRouter(Services) {

    const router  = Router ();

    router.get("/", async (req, res) => {

        const page= parseInt(req.query.page || 0);
        const pagesize= parseInt(req.query.pagesize || 10);
        const serviceData={...req.query}

        if(!isInt(page) || page < 0){
            res.status(400).json({"messsage":"la página no debe ser un número no negativo"})
            return
        }
       
        serviceData.page = page;
    
        if(!isInt(pagesize) || page < 0){
            res.status(400).json({"messsage":"el tamaño de página no debe ser un número no negativo"})
            return
        }
      
        serviceData.pagesize = pagesize;
       
       
           
        const documents = await Services.search(serviceData) 
        res.status(200).json(documents)
    })
    
    
    
    
    router.get('/:id',async (req,res)=>{
        const documents = await Services.Getbyid(req.params.id)
        res.status(200).json(documents) 
    });
    
    
    router.post('/',validate(Services.validate), async (req,res)=>{
        const value = req.body
        const documents = await Services.Create(value)
        res.status(201).json(documents)
    });
    
    
    router.put("/:id",validate(Services.validate), async (req, res) => {
        const id = req.params.id
        const documents = await Services.Update(id, req.body)
        res.status(201).json(documents)
    });
    
    
    router.delete("/:id", async (req,res)=>{
        const removed = await Services.Deletebyid(req.params.id)
        if(removed){
        res.status(204).end(); 
        }else{
        res.status(304).end();
        }
    });
    return router;
}




module.exports = createRouter ;