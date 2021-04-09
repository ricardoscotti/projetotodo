import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, FlatList, Modal, Alert } from 'react-native';
import api from '../services/axios';
import {TarefaContext} from '../TarefasContext'


const Lista = ({navigation}) => {
      const {tarefas, getTarefa} = useContext(TarefaContext)
      const [isModalVisible, setisModalVisible] = useState(false);
      const [editItem, seteditItem] = useState({});
      const [novoNome, setNovoNome] = useState('')
      const [novoData, setNovoData]= useState('')
      const [novoStatus, setNovoStatus] = useState('')
      useEffect(()=>{
        getTarefa()
      },[])  
      const onPressItem = (tarefa) => {
        setisModalVisible(true);
        if(tarefa.item){
          seteditItem(tarefa.item)
          setNovoNome(tarefa.item.nome)
          setNovoData(tarefa.item.dataprogramada)
          setNovoStatus(tarefa.item.status)
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
            <Text>{tarefa.item.nome} - {tarefa.item.dataprogramada} - {tarefa.item.status} </Text>
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
            keyExtractor={ tarefa => tarefa.nome }
            ></FlatList>
            <Modal animationType='fade'
                  visible={isModalVisible}
                  onRequestClose={() => setisModalVisible(false)}
            >
              <View style={styles.modalView}>
                <Text> Edite a tarefa</Text>
                <TextInput 
                value={novoNome}
                onChange={(text) => setinputText(text)}
                editable={true}
                multiline={false}
                maxLength={200}
                style={styles.input}
                placeholder="Novo nome da tarefa" placeholderTextColor="#000"
                ></TextInput>
                <TextInput 
                value={novoData}
                onChange={(text) => setinputText(text)}
                editable={true}
                multiline={false}
                maxLength={200}
                style={styles.input}
                placeholder="Data Programada" placeholderTextColor="#000"
                ></TextInput>
                <TextInput 
                value={novoStatus}
                onChange={(text) => setinputText(text)}
                editable={true}
                multiline={false}
                maxLength={200}
                style={styles.input}
                placeholder="Status" placeholderTextColor="#000"
                ></TextInput>
                <TouchableOpacity  style={styles.touchableSave}>
                  <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmaDelete}  style={styles.touchableSave}>
                  <Text style={styles.text}>Apagar</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </>
      );

}
const styles = StyleSheet.create({
    modalView:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    row: {
      flex: 1,
      paddingVertical: 25,
      paddingHorizontal: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: 'white'
    },
    container: {
      flex: 1,
      borderColor: 'blue',
      borderWidth: 1,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#CFCFCF'
  
    },
    header: {
      fontSize: 42,
      marginBottom: 15
    },
    input:{
      width: 200,
      height: 40,
      marginVertical: 10,
      borderColor:'black',
      borderWidth: 1,
      borderRadius: 20,
      paddingLeft: 20
    },
    button: {
      borderColor: '#00ff40',
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: '#00ff40',
      width: 150,
      height: 40,
      alignItems: 'center',
      marginTop: 15,
    },
    buttonText:{
      color:"#000",
      marginTop: 8,
      fontWeight: 'bold'
    },
    tituloLista:{
      fontSize: 25,
      marginTop: 30,
      marginBottom: 20
    }
  });


export default Lista;