import React, { Component } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { Text, View,StyleSheet,Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './src/components/Home';
import LoginPage from './src/components/LoginPage';

interface IProps{

}

interface IState{
  isLoggedIn : string,
}

const Stack = createStackNavigator()

export class App extends Component<IProps,IState>{
  state:IState = {isLoggedIn:"no"}

  setLoggedin=async(value:string)=>{
    try{
      await AsyncStorage.setItem("login",value)
    }
    catch{
      console.log(Error)
    }

  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}> 
        <Stack.Screen name="LoginPage" component={LoginPage}/>
        <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App

const styles = StyleSheet.create({

  flashScreen:{
    flex:1,
  },
})
