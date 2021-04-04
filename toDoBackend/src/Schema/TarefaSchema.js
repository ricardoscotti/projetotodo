import mongoose from 'mongoose';

const TarefaSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        dataprogramada: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Tarefas', TarefaSchema)