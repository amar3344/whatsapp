import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList, TextInput} from 'react-native-gesture-handler';

interface IProps {
  navigattion?: {
    navigate: (arg: string) => void;
  };
}

interface IState {
  inputMessage: string;
  userDetails: any;
  chartList: {
    message: string;
    isRight: boolean;
  }[];
  displayLogout:boolean,
}

export class Home extends Component<IProps, IState> {
  state: IState = {
    userDetails: {},
    inputMessage: '',
    chartList: [],
    displayLogout:false,
  };

  getAsyncData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userDetails');
      const userInfo =
        jsonValue != null
          ? JSON.parse(jsonValue)
          : this.props.navigattion?.navigate('LoginPage');
      this.setState({userDetails: userInfo});
    } catch (e) {
      console.log(Error);
    }
  };

  componentDidMount(): void {
    this.getAsyncData();
  }

  getMessageText = (message: string) => {
    this.setState({inputMessage: message});
  };

  clickOnDownButton = (mes: string) => {
    const addStringToList = {
      message: mes,
      isRight: false,
    };
    this.setState(p => ({
      chartList: [...p.chartList, addStringToList],
      inputMessage: '',
    }));
  };

  clickOnUpButton = (message: string) => {
    const addStringToList = {
      message: message,
      isRight: true,
    };
    this.setState(p => ({
      chartList: [...p.chartList, addStringToList],
      inputMessage: '',
    }));
  };

  onToogleButton=()=>{
    this.setState(p=>({displayLogout:!p.displayLogout}))
  }

  render() {
    const currentDate = new Date();
    const timehours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const currentTime = timehours + ':' + minutes;

    return (
      <View style={styles.homeConat}>
        <View style={styles.headerCont}>
          <View style={styles.leftCont}>
            <IonIcons name="ios-person-circle" color={'#fff'} size={30} />
            <Text style={styles.userText}>
              {this.state.userDetails.userName}
            </Text>
          </View>
          <View style={styles.leftCont}>
            <Feather name="phone" color={'#fff'} size={30} />
            <Feather name="video" color={'#fff'} size={30} />
            <TouchableOpacity onPress={this.onToogleButton}>
                <Entypo name="dots-three-vertical" color={"#fff"} size={30}/>
            </TouchableOpacity>
          </View>
          {this.state.displayLogout && <Text style={styles.logoutTxt}>Log Out</Text>}
        </View>
        <View style={styles.middleCont}>
          <FlatList data={this.state.chartList}
          keyExtractor={item => item.message}
          renderItem={({item})=>(
            <View>
              {item.isRight ? (
                <View style={styles.leftMessageCont}>
                  <Text style={styles.messageText}>{item.message}</Text>
                  <Text style={styles.currentTime}>{currentTime}</Text>
              </View>
              ):(
                <View style={styles.rightMessageCont}>
                    <Text style={styles.messageText}>{item.message}</Text>
                    <Text style={styles.currentTime}>{currentTime}</Text>
                </View>
              )}
            </View>
          )

          }
          />
        </View>
        <View style={styles.footerMainCont}>
          <View style={styles.footerCont}>
            <TextInput
              value={this.state.inputMessage}
              placeholder="Enter a Message"
              placeholderTextColor={'#fff'}
              style={styles.inputTextMessage}
              onChangeText={message => this.getMessageText(message)}
            />
            <TouchableOpacity
              style={styles.arrowButtons}
              onPress={() => this.clickOnDownButton(this.state.inputMessage)}>
              <AntDesign name="arrowdown" color={'#fff'} size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.arrowButtons}
              onPress={() => this.clickOnUpButton(this.state.inputMessage)}>
              <AntDesign name="arrowup" color={'#fff'} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({

  chatCont:{
    backgroundColor:'#075E54',
    padding:10,
  },

    
    logoutTxt:{
        fontSize:23,
        color:'#fff',
    },

    
  currentTime: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
  },

  messageText: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'Roboto',
  },

  leftMessageCont: {
    padding: 10,
    alignItems: 'flex-start',
    marginTop:5,
    marginBottom:5,
  },

  rightMessageCont: {
    alignItems: 'flex-end',
    padding: 10,
    marginBottom:5,
    marginTop:5,
  },

  arrowButtons: {
    backgroundColor: 'grey',
    width: 30,
    height: 30,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  middleCont: {
    flexDirection: 'column',
  },

  footerMainCont: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    flexGrow: 1,
  },

  inputTextMessage: {
    borderRadius: 20,
    width: '75%',
    borderWidth: 1,
    backgroundColor: 'grey',
    padding: 10,
    color: '#fff',
  },

  footerCont: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    paddingRight: 30,
  },

  userText: {
    fontSize: 25,
    fontWeight: '800',
    fontFamily: 'Roboto',
    color: '#fff',
  },

  leftCont: {
    flexDirection: 'row',
    alignItemns: 'center',
    gap: 30,
  },

  homeConat: {
    backgroundColor: '#000',
    flex: 1,
  },

  headerCont: {
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
});
