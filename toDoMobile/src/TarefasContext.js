import React, { createContext, useState } from 'react'
import api from './services/axios'

export const TarefaContext = createContext()

const TarefaStorage = ({children}) => {
    const [tarefas, setTarefas] = useState(null)
    const [loading, setLoading]  = useState(false)
    const updateData =  (t) => {
        const dataAtual = new Date()
        console.log(dataAtual)
        if(t){
            t.forEach((item)=>{
                const d = item.dataprogramada.split('/')
                const dia = d[0]
                const mes = d[1]
                const ano = d[2]
                const data = new Date(`${ano}/${mes}/${dia}`)
                console.log(data)
                if(data<dataAtual){
                    const put = async () => {
                        try{
                            await api.put(`/tarefas/${item._id}`, {"status":"Atrasado"});
                        }catch(e){
                            console.log(e)
                        }
                    }
                    put()
                }
            })
        }
    }
    const getTarefa = async () => {
        try{
            setLoading(true)
            const response = await api.get('/tarefas')
            const tarefasList = response.data
            await updateData(tarefasList)
            setTarefas(tarefasList)
            setLoading(false)
        }catch(e){
            console.log('ERROR', e)
        }
    }
    return (
        <TarefaContext.Provider value={{tarefas, loading, getTarefa, updateData}}>
            {children}
        </TarefaContext.Provider>
    )
}

export default TarefaStorage;