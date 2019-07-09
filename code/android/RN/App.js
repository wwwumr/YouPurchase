import React,{Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Image,Header,Text,Button } from 'react-native-elements';
import {View,StyleSheet,TouchableOpacity,ImageBackground} from'react-native';
import GoodsDetail from './components/GoodsDetail';
import Login from './components/Login';
import PersonPage from './components/PersonPage'
export default class App extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <PersonPage />
    )
  }
}