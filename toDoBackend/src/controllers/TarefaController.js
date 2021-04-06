 import TarefaSchema from '../Schema/TarefaSchema';

 
 
 class TarefaController {

   async index(req, res){

      const tarefas = await TarefaSchema.find().catch(error => console.log(error));

      console.log(tarefas);


      return res.json(tarefas)
   }
   
   async create(req, res){
     const { nome, dataprogramada, status} = req.body; 

     console.log(nome);
    
    await TarefaSchema.create(
    {
      nome: nome,
      dataprogramada: dataprogramada,
      status: status
    }
    ).catch(error => {
      console.log(error);
    });

     return res.json(nome);
   }

   async delete (req,res){
    try{
      const tarefaDeletada = await TarefaSchema.findByIdAndRemove({_id: req.params.id})
      return res.send(tarefaDeletada)
    }catch(err){
      return res.status(400).send({err: 'erro', erro})
    }
   }

   async update(req, res){
    const tarefas = await TarefaSchema.findOneAndUpdate({"nome": req.params.nome}, req.body)
    .catch(error => console.log(error));

    console.log(tarefas);


    return res.json(tarefas) 
   }
    
 }

 export default new TarefaController();  