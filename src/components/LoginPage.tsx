import React, { Component } from 'react'
import { Text, View,StyleSheet, Image, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';


interface IProps{
    navigation?:{
        navigate:(arg:string)=>void
    }
}

interface IState{
    isLoggedIn:string,
    inputName:string,
    inputPhonenumber:string,
    inputemail:string,
    inputPassword: string,
    isDisplay:boolean,

}


export class LoginPage extends Component<IProps,IState>{

    state:IState = {isLoggedIn:"No",
    inputName:"",
    inputPhonenumber:"",
    inputemail:"",
    inputPassword:'',
    isDisplay:true,
}

componentDidMount(): void {
    setTimeout(() => {
        this.setState({isDisplay:false})
    }, 3000);
}
    handleLoginPage=async()=>{
        try {
            this.setState({isLoggedIn:"Yes"})
            const addUserDetails = {
                userName : this.state.inputName,
                userPhoneNumber : this.state.inputPhonenumber,
                userEmailAddress:this.state.inputemail,
                login : this.state.isLoggedIn
            }
            const userDetails = await JSON.stringify(addUserDetails);
            await AsyncStorage.setItem("userDetails",userDetails)
            this.props.navigation?.navigate("Home")
          } catch (e) {
            console.log(Error)
          }
        
    }
    
    getUserName=(name:string)=>{
        this.setState({inputName:name})
    }

    getEmailInput=(email:string)=>{
        this.setState({inputemail:email})
    }

    getInputPhonenumber=(number:string)=>{
        this.setState({inputPhonenumber:number})
    }

    getPassword=(password:string)=>{
        this.setState({inputPassword:password})
    }


  render() {
    return (
      <View style={styles.loginCont}>
        {
            this.state.isDisplay ? (
                <View style={styles.flashScreenCont}>
                    <Image source={{uri:"https://img.freepik.com/premium-vector/whatsapp-icon-with-hand_23-2147917009.jpg?w=740"}} style={styles.flashscreen}/>
                </View>
            ):(<View style={{padding:20}}>
                <View style={styles.whatsappImageCont}>
                    <Image source={{uri:'https://png.pngtree.com/png-clipart/20221019/original/pngtree-whatsapp-mobile-software-icon-png-image_8704828.png'}} style={styles.watsappImage}/>
                </View>
                <View style={{gap:10}}>
                    <View>
                        <Text style={styles.textfileds}>UserName</Text>
                        <TextInput placeholder='User name' placeholderTextColor={"grey"} style={styles.inputText} onChangeText={(name)=>this.getUserName(name)}/>
                    </View>
                    <View>
                        <Text style={styles.textfileds}>Email</Text>
                        <TextInput placeholder='Enter Email' placeholderTextColor={"grey"} style={styles.inputText} onChangeText={(email)=>this.getEmailInput(email)}/>
                    </View>
                    <View>
                        <Text style={styles.textfileds}>Paassword</Text>
                        <TextInput placeholder='Password' placeholderTextColor={"grey"} style={styles.inputText} onChangeText={(password)=>this.getPassword(password)}/>
                    </View>
                    <View>
                        <Text style={styles.textfileds}>Phone Number</Text>
                        <TextInput placeholder='Phone Number' placeholderTextColor={"grey"} style={styles.inputText} onChangeText={(number)=>this.getInputPhonenumber(number)}/>
                    </View>
                    <TouchableOpacity style={styles.LoginButton} onPress={()=>this.handleLoginPage()}>
                        <Text style={styles.loginText}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>)
        }
      </View>
    )
  }
}

export default LoginPage

const styles = StyleSheet.create({

    whatsappImageCont:{
        justifyContent:'center',
        alignItems:'center',
    },

    flashScreenCont:{
        flex:1,
        backgroundColor:'#128C7E',

    },

    flashscreen:{
      width:"100%",
      height:"100%",
    },

    loginText:{
        fontSize:22,
        fontWeight:'600',
        fontFamily:'Roboto',
        color:'#fff',
    },

    LoginButton:{
        backgroundColor:'green',
        padding:10,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
    },

    inputText:{
        borderWidth:1,
        borderColor:"#000",
        borderRadius:10,
        padding:10,
        color:"#000"
    },

    textfileds:{
        fontSize:18,
        fontWeight:'600',
        fontFamily:'Roboto',
        color:'#000',
    },

    loginCont:{
        flex:1,
        justifyContent:'center',
        alignitems:'center',
        
    },

    watsappImage:{
        width:200,
        height:200,
        
    },
})
