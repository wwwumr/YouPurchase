import React,{Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Upload from './Upload'
import { Input,Image,Header,Text,Button,Overlay, Divider } from 'react-native-elements';
import {View,StyleSheet,TouchableOpacity,ImageBackground, NativeModules,Dimensions} from'react-native';
import { List } from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;
var ImagePicker = NativeModules.ImageCropPicker;
const {height, width} = Dimensions.get('window');
export default class EditPage extends Component{
  constructor(props){
      super(props);
  }
  render(){
      var back = "<";
      var front = ">";
      return(
          <View>
              <ImageBackground
                style={{width:width,height:height*0.10}}
                source={require('../images/edit.jpg')}
            >
                <View style={{flexDirection:"row",marginLeft:20,flex:1,marginTop:25}}>
                <View style={{flex:0.45}}>
                <Text style={{color:"#ffffff",fontSize:30}}>{back}</Text></View><View><Text style={{color:"#ffffff",fontSize:18}}>编辑资料</Text></View>
                </View>
            </ImageBackground>
            <View style={{backgroundColor:"#f0f0f0"}}>
               <View
               style={{flexDirection:'row',marginLeft:20,marginRight:20,flex:1,marginTop:20}}
               >
                   <View style={{flex:0.95}}>
                   <Text style={{fontSize:18}}>头像</Text></View>
                   <View >
                   <Text style={{color:"#A0A0A0",fontSize:30}}>{front}</Text>
               </View>
            </View>
          </View>
          </View>
      );
  }
}