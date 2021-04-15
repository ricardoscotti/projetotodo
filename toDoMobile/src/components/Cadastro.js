import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { color } from 'react-native-reanimated';

import Datepicker from 'react-native-datepicker';
import {Picker} from '@react-native-picker/picker'

import api from '../services/axios';
import { TarefaContext } from '../TarefasContext';

const Cadastro = ({navigation}) => {

    // const { name } = route.params;
  const dataAtual = new Date()
  const diaAtual = dataAtual.getDate()
  const mesAtual = dataAtual.getMonth()+1
  const anoAtual = dataAtual.getFullYear()
    const [nomeTarefa, setNomeTarefa] = useState("");
    const [dataprogramada, setDataprogramada] = useState(`${diaAtual}/0${mesAtual}/${anoAtual}`);
    const [status, setStatus] = useState("");
    const {getTarefa} = useContext(TarefaContext)

    const changeDate2 = (valor) => {
        setDataprogramada(valor)
      }

      const definiStatus = (valor) => {
        setStatus(valor)
        console.log(status)
        }


    const createTarefa = async () => {
        const newDateValue = dataprogramada.split('/')
        const newDateDay = newDateValue[0]
        const newDateMonth = newDateValue[1]
        const newDateYear = newDateValue[2]
        const newDate = new Date(`${newDateYear}/${newDateMonth}/${newDateDay}`)
        dataAtual.setHours(0)
        dataAtual.setMinutes(0)
        dataAtual.setSeconds(0)
        dataAtual.setMilliseconds(0)
        if(newDate<dataAtual){
          alert('Informe uma data válida.')
        }else{
        if (nomeTarefa && dataprogramada){
          try{
            const response = await api.post('/tarefas', {"nome": nomeTarefa, "dataprogramada": dataprogramada, "status": "Pendente"});
            console.log(JSON.stringify(response.data));
            await getTarefa()
            navigation.navigate('Home')
          } catch (error) {
            console.log("DEU RUIM" + error);
          }
        } else {
          console.log("Vazio")
          alert("Informe todos os campos")
        }
      }
    }
    
      return(
        <>
          <View style={styles.container}>
            <Text style={styles.header}>Crie a tarefa</Text>
            <TextInput placeholder="Nome da Tarefa" placeholderTextColor="#000" style={styles.input} value={nomeTarefa} onChangeText={item => {
              setNomeTarefa(item)
              }} />
            <Datepicker 
              format="DD/MM/YYYY"
              style={styles.dateComponente}
              onDateChange={changeDate2}
              date={dataprogramada}
            />
            {/*<TextInput placeholder="Data programada" placeholderTextColor="#000" style={styles.input} value={dataprogramada} onChangeText={item => {setDataprogramada(item)}} />*/}
            {/*<TextInput placeholder="Status" placeholderTextColor="#000" style={styles.input} value={status} onChangeText={item => {setStatus(item)}} />*/}

            <View>
            <TouchableOpacity style={styles.button} onPress={createTarefa}>
                <Text style={styles.buttonText}>Criar</Text>
            </TouchableOpacity>
            </View>
            
          </View>
        </>
      );

}
const styles = StyleSheet.create({
    dateComponente: {
      width: 190,
      backgroundColor: '#F8F8FF',
      borderRadius: 10,
      borderColor:"black"
    },
    container: {
      flex: 1,
      borderColor: 'blue',
      borderWidth: 1,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#87CEEB'
  
    },
    header: {
      fontSize: 42,
      marginBottom: 15,
      color:"#F8F8FF",
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10
    },
    input:{
      width: 200,
      height: 40,
      marginVertical: 10,
      fontWeight: 'bold',
      borderColor:'black',
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 20,
      color: 'black',
      backgroundColor: '#F8F8FF'
      
    },
    button: {
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: '#F8F8FF',
      width: 150,
      height: 40,
      alignItems: 'center',
      marginTop: 15,
    },
    buttonText:{
      color:"black",
      marginTop: 8,
      fontWeight: 'bold'
    },
    cervejaNome: {
      borderColor: '#9e9e9e',
      borderTopWidth: 1,
      paddingVertical: 20,
      width: 200,
      textAlign: 'center'
    },
    tituloLista:{
      fontSize: 24,
      marginTop: 30,
      marginBottom: 20
    }
    
  });


export default Cadastro;