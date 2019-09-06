import React,{Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Upload from './Upload';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
import { Input,Button,Image,Header,Text,Overlay, Divider,ListItem } from 'react-native-elements';
import {View,StyleSheet,TouchableOpacity,ImageBackground, NativeModules,Dimensions,DeviceEventEmitter,ToastAndroid,BackHandler} from'react-native';
import { List,Modal,
    WhiteSpace,
    WingBlank,
    Provider,Radio,Toast,InputItem } from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;
const RadioItem = Radio.RadioItem;
var ImagePicker = NativeModules.ImageCropPicker;
const {height, width} = Dimensions.get('window');
import SQLite from './UserSqlite';
var sqLite = new SQLite();
var db;
export default class EditPhone extends Component{
  constructor(props){
    super(props);
    this.state={
        yanzhengma:'',
        password1:'',
        password2:'',
        phone:'',
    }
  }
  phoneNumber(phone) {
    if (phone.length!=11)
      return '-1';
    else if(phone == '') {
      return '-1';
    }
    else if(!/^\d+$/.test(phone))
      return '-1';
    else
      return phone;
  }
  submit(){
        var phone = this.state.phone;
        var yanzhengma = this.state.yanzhengma;
        if(yanzhengma == ''||yanzhengma==null||yanzhengma==undefined){
            ToastAndroid.show('请输入验证码',ToastAndroid.SHORT);
            return;
        }
        var password1 = this.state.password1;
        var password2 = this.state.password2;
        if(password1 == null ||password1 == undefined||password1 == ''){
            ToastAndroid.show('请输入新密码',ToastAndroid.SHORT);
            return; 
        }
        if(password2 == null ||password2 == undefined||password2 == ''){
            ToastAndroid.show('请确认新密码',ToastAndroid.SHORT);
            return; 
        }
        if(password1!=password2){
            ToastAndroid.show('新密码两次输入不一致',ToastAndroid.SHORT);
            return;
        }
        if(password1.length>20||password1.length<6){
            ToastAndroid.show('新密码长度应6-12之间',ToastAndroid.SHORT);
            return; 
        }
        if(phone == null ||phone== undefined ||phone == ''){
            ToastAndroid.show('请输入手机号',ToastAndroid.SHORT);
            return;
        }
        phone = this.phoneNumber(phone);
        if(phone == '-1'){
            ToastAndroid.show('手机号格式错误',ToastAndroid.SHORT);
            return;  
        }
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
          <TouchableOpacity onPress={()=>{
            this.props.navigation.goBack();
          }}>
          <Icon
            name='chevron-left'
            size={17}
            color='#ffffff'
          />
          </TouchableOpacity>
          </View>
          <View>
            <Text style={{color:"#ffffff",fontSize:18}}>修改手机号</Text>
          </View>
          </View>
        </ImageBackground>
        <List>
        <InputItem
            clear
            type="text"
            value={this.state.phone}
            onChange={value => {
                this.setState({
                  phone: value,
                });
              }}
            placeholder="请输入新手机号"
          >
            <Text style={{fontSize:16}}>新手机号</Text>
          </InputItem>
          <View style={{flexDirection:'row'}}>
              <View style={{width:width*0.7}}>
        <InputItem
            clear
            type="text"
            value={this.state.yanzhengma}
            onChange={value => {
              this.setState({
                yanzhengma: value,
              });
            }}
            placeholder="请输入验证码"
          >
            <Text style={{fontSize:16}}>验证码 </Text>
          </InputItem></View>
          <View style={{marginLeft:10,marginRight:40}}>
          <View style={{marginTop:7,
                      alignItems:'center',
                      height:30,
                      borderColor:"#3399ff",
                      borderWidth:1,
                      borderRadius:5,
                      width:70,
                      marginBottom:10}}
                    >
                    <TouchableOpacity>
                    <Text style={{fontSize:13,marginTop:4,color:'#3399ff'}}>获取验证码</Text>
                    </TouchableOpacity>
                    </View>
          </View>
          </View>
          <InputItem
            clear
            type="password"
            value={this.state.password1}
            onChange={value => {
              this.setState({
                password1: value,
              });
            }}
            placeholder="请输入新密码"
          >
            <Text style={{fontSize:16}}>新密码 </Text>
          </InputItem>
          <Divider style={{backgroundColor:'#f8f8f8',height:0.2}}/>
          <InputItem
            clear
            type="password"
            value={this.state.password2}
            onChange={value => {
              this.setState({
                password2: value,
              });
            }}
            placeholder="请确认新密码"
          >
            <Text style={{fontSize:16}}>确认密码</Text>
          </InputItem>
        </List>
        <View style={{marginTop:20,marginLeft:40,marginRight:40}}>
            <Button title="确认修改" type='outline' onPress={this.submit.bind(this)} />
        </View>
      </View>
  );
  }
}