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
import config from '../components/config/config';
var sqLite = new SQLite();
var db;
/**
 * @constructor
 * @description 修改密码组件
 */
export default class EditPassword extends Component{
  constructor(props){
    super(props);
    this.state={
        phone:this.props.navigation.state.params.phone,
        password:'',
        password1:'',
        password2:'',
    }
  }
  /**
   * @description 提交修改
   */
  submit(){
    var password = this.state.password;
    var password1 = this.state.password1;
    var password2 = this.state.password2;
    var userId = this.props.navigation.state.params.userId;
    if(password == ''||password==null||password==undefined){
      ToastAndroid.show('请输入旧密码',ToastAndroid.SHORT);
      return;
    }
    if(password1 == ''||password1==null||password1==undefined){
      ToastAndroid.show('请输入新密码',ToastAndroid.SHORT);
      return;
    }
    if(password2 == ''||password2==null||password2==undefined){
      ToastAndroid.show('请确认新密码',ToastAndroid.SHORT);
      return;
    }
    if(password1.length>12 ||password1.length<6){
      ToastAndroid.show('新密码长度应在6--12之间',ToastAndroid.SHORT);
      return;
    }
    if(password2 != password1){
      ToastAndroid.show('两次输入新密码不一致',ToastAndroid.SHORT);
      return;
    }
    var url= config.url+'user/pwdModify?userId='+userId+'&oldPwd='+password+'&newPwd='+password1;
    axios.get(url)
    .then((response)=> {
      var responseData = response.data;
      if(responseData == 200){
        ToastAndroid.show('密码修改成功',ToastAndroid.SHORT);
        this.props.navigation.goBack();
      }
      else{
        ToastAndroid.show('原密码输入不正确',ToastAndroid.SHORT);
      }
    })
    .catch(function (error) {
      ToastAndroid.show('网络异常',ToastAndroid.SHORT);
      console.log(error);
    });
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
            <Text style={{color:"#ffffff",fontSize:18}}>修改密码</Text>
          </View>
          </View>
        </ImageBackground>
        <List>
        <InputItem
            clear
            type="phone"
            value={this.state.phone}
            placeholder="15201979195"
            editable={false}
          >
            <Text style={{fontSize:16}}>手机号 </Text>
          </InputItem>
        <InputItem
            clear
            type="password"
            value={this.state.password}
            onChange={value => {
              this.setState({
                password: value,
              });
            }}
            placeholder="请输入原密码"
          >
            <Text style={{fontSize:16}}>原密码 </Text>
          </InputItem>
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
            <Button title="确认修改" type='outline' onPress={this.submit.bind(this)}/>
        </View>
      </View>
  );
  }
}