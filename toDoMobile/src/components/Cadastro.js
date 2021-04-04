import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { color } from 'react-native-reanimated';

import api from '../services/axios';

const Cadastro = ({navigation}) => {

    // const { name } = route.params;

    const [nomeTarefa, setNomeTarefa] = useState("");
    const [dataprogramada, setDataprogramada] = useState("");
    const [status, setStatus] = useState("");

    const createTarefa = async () => {
    
        if (nomeTarefa && dataprogramada && status){
          try{
            const response = await api.post('/tarefas', {"nome": nomeTarefa, "dataprogramada": dataprogramada, "status": status});
            console.log(JSON.stringify(response.data));
          } catch (error) {
            console.log("DEU RUIM" + error);
          }
        } else {
          console.log("Vazio")
        }
      }

      return(
        <>
          <View style={styles.container}>
            <Text style={styles.header}>Crie a tarefa</Text>
            <TextInput placeholder="Nome da Tarefa" placeholderTextColor="#000" style={styles.input} value={nomeTarefa} onChangeText={item => {
              setNomeTarefa(item)
              }} />
            <TextInput placeholder="Data programada" placeholderTextColor="#000" style={styles.input} value={dataprogramada} onChangeText={item => {setDataprogramada(item)}} />
            <TextInput placeholder="Status" placeholderTextColor="#000" style={styles.input} value={status} onChangeText={item => {setStatus(item)}} />
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
    container: {
      flex: 1,
      borderColor: 'blue',
      borderWidth: 1,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
  
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
      paddingLeft: 20,
      color: '#000000',
      
      
    },
    button: {
      borderColor: '#ffd700',
      borderWidth: 1,
      borderRadius: 1,
      backgroundColor: '#ffd700',
      width: 100,
      height: 25,
      alignItems: 'center',
      marginTop: 15,
    },
    buttonText:{
      color:"#000"
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