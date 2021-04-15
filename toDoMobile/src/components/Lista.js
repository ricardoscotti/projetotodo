import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, FlatList, Modal, Alert } from 'react-native';
import api from '../services/axios';
import {TarefaContext} from '../TarefasContext'

import Datepicker from 'react-native-datepicker'
import {Picker} from '@react-native-picker/picker'
import { color } from 'react-native-reanimated';


const Lista = ({navigation}) => {
      
      const {tarefas, getTarefa, updateData} = useContext(TarefaContext)
      const [isModalVisible, setisModalVisible] = useState(false);
      const [editItem, seteditItem] = useState({});
      const [novoNome, setNovoNome] = useState('')
      const [novoData, setNovoData]= useState('')
      const [novoStatus, setNovoStatus] = useState('')
      useEffect(()=>{
        getTarefa()
      },[])  
      
      const changeDate = (valor) => {
        setNovoData(valor)
        }
      
        const definiStatus2 = (valor) => {
          setNovoStatus(valor)
          console.log(novoStatus)
          }
      
      const onPressItem = (tarefa) => {
        setisModalVisible(true);
        if(tarefa.item){
          seteditItem(tarefa.item)
          setNovoNome(tarefa.item.nome)
          setNovoData(tarefa.item.dataprogramada)
          setNovoStatus(tarefa.item.status)
        }
      }

      const updateTarefa = async () => {
          const dataAtual = new Date()
          console.log(editItem.nome)
          console.log(editItem.status)
          console.log(editItem.dataprogramada)
          const newDateValue = novoData.split('/')
          const newDateDay = newDateValue[0]
          const newDateMonth = newDateValue[1]
          const newDateYear = newDateValue[2]
          const newDate = new Date(`${newDateYear}/${newDateMonth}/${newDateDay}`)
          dataAtual.setHours(0)
          dataAtual.setSeconds(0)
          dataAtual.setMinutes(0)
          dataAtual.setMilliseconds(0)
          if(newDate<dataAtual){
            alert('Informe uma data válida.')
          } else {
            try{
              const response = await api.put(`/tarefas/${editItem._id}`, {"nome": novoNome, "dataprogramada": novoData, "status": novoStatus});
              console.log(JSON.stringify(response.data));
              await getTarefa()
              setisModalVisible(false)
            } catch (error) {
              console.log("DEU RUIM" + error);
          }
        }
        
    }

      const deleteTarefa = async (id) => {
        try{
          const response = await api.delete(`/tarefas/${id}`)
          const data = response.data
          await getTarefa()
          setisModalVisible(false)
        }catch(e){
          alert('ERRO', e)
        }
      }
      const confirmaDelete =  () => {
        console.log(editItem._id)
        if(editItem._id){
          const apagar = Alert.alert('Alerta',
          `Apagar a tarefa ${editItem.nome}?`,
          [
            {text: 'NO', style: 'cancel'},
            {text: 'YES', onPress: () => deleteTarefa(editItem._id)},
          ])
        }
      }
      const TextTarefa = (tarefa) => {
        return(
          <TouchableOpacity onPress={() => onPressItem(tarefa)}>
          <View style={styles.row}>
            {tarefa.item.status==='Finalizado'?
            <Text style={{color:'black', fontSize: 20}}>{tarefa.item.nome} - {tarefa.item.dataprogramada} - <Text style={{color: 'green'}}>{tarefa.item.status}</Text></Text>
            :tarefa.item.status==='Atrasado'?
            <Text style={{color:'black', fontSize: 20}}>{tarefa.item.nome} - {tarefa.item.dataprogramada} - <Text style={{color: 'red'}}>{tarefa.item.status}</Text></Text>:
            <Text style={{color:'black', fontSize: 20}}>{tarefa.item.nome} - {tarefa.item.dataprogramada} - <Text style={{color: 'yellow'}}>{tarefa.item.status}</Text></Text>}
          </View>
          </TouchableOpacity>
        )
      }
    
      return(
        <>
          <View style={styles.container}>
            <Text style={styles.header}>To Do List</Text>
            
          <View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
            <Text style={styles.tituloLista}>Tarefas</Text>
          <FlatList
            data={tarefas}
            renderItem={TextTarefa}
            keyExtractor={ tarefa => tarefa._id }
            ></FlatList>
            <Modal animationType='fade'
                  visible={isModalVisible}
                  onRequestClose={() => setisModalVisible(false)}
            >
              <View style={styles.modalView}>
                <Text style={styles.text}> Edite a tarefa</Text>
                <TextInput 
                value={novoNome}
                onChangeText={item => {setNovoNome(item)}}
                editable={true}
                multiline={false}
                maxLength={200}
                style={styles.input}
                placeholder="Novo nome da tarefa" placeholderTextColor="#000"
                style={styles.input}

                ></TextInput>
                <Datepicker 
              format="DD/MM/YYYY"
              style={styles.dateComponente}
              onDateChange={changeDate}
              date={novoData}
            />
            <Picker 
                selectedValue={novoStatus}
                onValueChange={definiStatus2}
                style={{height: 100, width: 200}}
                
            >
              <Picker.Item label="Defina o Status" value="0" />
              <Picker.Item label="Pendente" value="Pendente" />
              <Picker.Item label="Finalizado" value="Finalizado" />
            </Picker>
                {/*<TextInput 
                //value={novoData}
                onChangeText={item => {setNovoData(item)}}
                editable={true}
                multiline={false}
                maxLength={200}
                style={styles.input}
                placeholder="Data Programada" placeholderTextColor="#000"
                ></TextInput>*/}
                {/*<TextInput 
                //value={novoStatus}
                onChangeText={item => {setNovoStatus(item)}}
                editable={true}
                multiline={false} 
                maxLength={200}
                style={styles.input}
                placeholder="Status" placeholderTextColor="#000"
                ></TextInput>*/}
                <TouchableOpacity  style={styles.button} onPress={updateTarefa}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmaDelete}  style={styles.button}>
                  <Text style={styles.buttonText}>Apagar</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </>
      );

}
const styles = StyleSheet.create({
  dateComponente: {
    width: 190,
    backgroundColor: '#F8F8FF',
    borderRadius: 10,
    borderColor:"black",
    },
    text:{
      color:"#F8F8FF",
      marginTop: 8,
      fontSize: 35,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10
    },
    touchableSave:{
      borderColor: '#00ff40',
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: '#00ff40',
      width: 150,
      height: 40,
      alignItems: 'center',
      marginTop: 15,
    },
    modalView:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#87CEEB'
    },
    row: {
      flex: 1,
      paddingVertical: 25,
      paddingHorizontal: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: 60,
      backgroundColor: '#77B8D1',
      marginBottom: 10,
      borderRadius: 10,
    },
    container: {
      flex: 1,
      borderColor: 'blue',
      borderWidth: 1,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#87CEEB',
      
  
    },
    header: {
      fontSize: 42,
      marginBottom: 15,
      color:"#F8F8FF",
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
      
    },
    input:{
      width: 200,
      height: 40,
      marginVertical: 10,
      borderWidth: 1,
      paddingLeft: 20,
      fontWeight: 'bold',
      backgroundColor: '#F8F8FF',
      borderRadius: 10,
      borderColor:"black",
      color:"black",
    },
    button: {
      borderRadius: 10,
      backgroundColor: '#77B8D1',
      width: 150,
      height: 40,
      alignItems: 'center',
      marginTop: 15,
      
      
    },
    buttonText:{
      color:"white",
      marginTop: 8,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: 15
    },
    tituloLista:{
      fontSize: 25,
      marginTop: 30,
      marginBottom: 20,
      color:"#F8F8FF",
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10
    },
  });


export default Lista;