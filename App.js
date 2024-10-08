import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CodeScreen from './screens/CodeScreen';
import MainScreen from './screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NumberScreen from './screens/NumberScreen';
import L from './screens/L';
import React, { useState,useEffect } from 'react';
import * as Contacts from 'expo-contacts';


const Stack = createStackNavigator();


export default function App() {
  useEffect(()=>{
    const getPermission = async ()=>{
      const {status}= await Contacts.requestPermissionsAsync();
      if (status=="granted"){
        console.log(status)
          
      }else{
        console.log(status)
      }
    }
    getPermission();
  },[])
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CodeScreen">
        <Stack.Screen name="CodeScreen" component={CodeScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NumberScreen" component={NumberScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
