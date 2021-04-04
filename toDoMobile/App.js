import React from 'react'
import 'react-native-gesture-handler' 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 

//import { View, StyleSheet, Text, TextInput, Button, Image, SafeAreaView, ScrollView , FlatList, TouchableOpacity } from "react-native";

import Lista from './src/components/Lista';
import Cadastro from './src/components/Cadastro';    



const Stack = createStackNavigator();     

const SecondApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Lista}/>
        <Stack.Screen name="Cadastro" component={Cadastro}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default SecondApp;
