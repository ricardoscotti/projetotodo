import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, FlatList } from 'react-native';

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
    
      
    
      const TextTarefa = ({item}) => {
        return(
          <View>
            <Text style={styles.tarefaNome}>{item.nome} - {item.tipo}</Text>
          </View>
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
            <Text style={styles.tituloLista}>Listagem de Tarefas</Text>
            <FlatList
            data={tarefas}
            renderItem={TextTarefa}
            keyExtractor={ tarefa => tarefa.nome }
            
            
            ></FlatList>
          </View>
        </>
      );







    // return (
    //     <View style={styles.container}>
    //         <TouchableOpacity style={styles.button} onPress={() => {
    //             navigation.navigate('Cadastro', { name: 'TEste123' })
    //         }}>
    //             <Text style={styles.buttonText}>Click me</Text>
    //         </TouchableOpacity>
    //     </View>
    // );
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
      paddingLeft: 20
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


export default Lista;