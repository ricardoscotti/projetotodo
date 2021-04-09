import React, { createContext, useState } from 'react'
import api from './services/axios'

export const TarefaContext = createContext()

const TarefaStorage = ({children}) => {
    const [tarefas, setTarefas] = useState(null)
    const [loading, setLoading]  = useState(false)
    const getTarefa = async () => {
        try{
            setLoading(true)
            const response = await api.get('/tarefas')
            const tarefasList = response.data
            setTarefas(tarefasList)
            setLoading(false)
        }catch(e){
            console.log('ERROR', e)
        }
    }
    return (
        <TarefaContext.Provider value={{tarefas, loading, getTarefa}}>
            {children}
        </TarefaContext.Provider>
    )
}

export default TarefaStorage;