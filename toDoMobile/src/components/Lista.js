import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, FlatList, Modal } from 'react-native';

import api from '../services/axios';

const Lista = ({navigation}) => {

      const [tarefas, setTarefas] = useState();
    
      const getTarefas = async () => {
        try{
          const response = await api.get('/tarefas');
          console.log(JSON.stringify(response));
          setTarefas(response.data);
        } catch (error) {
          console.log("DEU RUIM" + error);
        }
      }
      const [isRender, setisRender] = useState(false);
      const [isModalVisible, setisModalVisible] = useState(false);
      const [inputText, setinputText] = useState();
      const [editItem, seteditItem] = useState();

      
      const onPressItem = (item) => {
        setisModalVisible(true);
        setinputText(item.text)
        seteditItem(item)
         console.log(editItem)
         console.log(inputText)
      }

      const handleEditItem = (editItem) => {
        const newData = tarefas.map(item =>{
          if(item.id == editItem){
            item.text = inputText;
            return item
          }
          return item;
        })
        setTarefas(newData)
        setisRender(!isRender);
      }

      const onPressSaveEdit = () => {
        console.log(editItem)
        handleEditItem(editItem); //save input text to data
        setisModalVisible(false);

      }

      
    
      const TextTarefa = ({item}) => {
        return(
          <TouchableOpacity onPress={() => onPressItem(item)}>
          <View style={styles.row}>
            <Text>{item.nome} - {item.dataprogramada} - {item.status} </Text>
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
              <TouchableOpacity style={styles.button} onPress={getTarefas}>
                <Text style={styles.buttonText}>Atualizar</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.tituloLista}>Tarefas</Text>
            <FlatList
            data={tarefas}
            renderItem={TextTarefa}
            keyExtractor={ tarefa => tarefa.nome }
            extraData={isRender}
            
            
            ></FlatList>
            <Modal animationType='fade'
                  visible={isModalVisible}
                  onRequestClose={() => setisModalVisible(false)}
            >
              <View style={styles.modalView}>
                <Text> Edite a tarefa</Text>
                <TextInput 
                onChange={(text) => setinputText(text)}
                defaultValue={inputText}
                editable={true}
                multiline={false}
                maxLength={200}
                style={styles.input}
                placeholder="Novo nome da tarefa" placeholderTextColor="#000"
                ></TextInput>
                <TextInput 
                onChange={(text) => setinputText(text)}
                defaultValue={inputText}
                editable={true}
                multiline={false}
                maxLength={200}
                style={styles.input}
                placeholder="Data Programada" placeholderTextColor="#000"
                ></TextInput>
                <TextInput 
                onChange={(text) => setinputText(text)}
                defaultValue={inputText}
                editable={true}
                multiline={false}
                maxLength={200}
                style={styles.input}
                placeholder="Status" placeholderTextColor="#000"
                ></TextInput>
                <TouchableOpacity onPress={() => onPressSaveEdit()} style={styles.touchableSave}>
                  <Text style={styles.text}>Save</Text>
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