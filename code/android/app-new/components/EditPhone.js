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
/**
 * @description EditPhone 修改手机号页面
 * @constructor
 */
export default class EditPhone extends Component{
  constructor(props){
    super(props);
    this.state={
        yanzhengma:'',
        password1:'',
        password2:'',
        phone:'',
        msg:{},
        time :-1
    }
  }
  /**
   * 
   * @param {string} phone 手机号
   * @description 判断输入的手机号是否合法 
   */
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
  /**
   * @description 发送验证码函数
   */
  getMsg(){
    var t1 = new Date().getTime()/1000;
    console.log(t1);
    if(this.state.time!=-1 && t1-this.state.time<300){
      ToastAndroid.show('请勿在5分钟内重复发验证码',ToastAndroid.SHORT);
      return;
    }
    var phone =this.state.phone;
    if(phone == null ||phone== undefined ||phone == ''){
      ToastAndroid.show('请输入手机号',ToastAndroid.SHORT);
      return;
  }
  phone = this.phoneNumber(phone);
  if(phone == '-1'){
      ToastAndroid.show('手机号格式错误',ToastAndroid.SHORT);
      return;  
  }
  var url = 'http://192.168.1.19:8080/user/getMsg?phone='+phone;
  axios.get(url)
  .then((response)=> {
    var responseData = response.data;
    console.log(responseData);
    if(responseData){
      this.setState({msg:responseData,time:responseData.time});
      ToastAndroid.show('验证码已发送',ToastAndroid.SHORT);
    }
    else
      ToastAndroid.show('该手机号已被使用',ToastAndroid.SHORT);
  })
  .catch(function (error) {
    console.log(error);
    ToastAndroid.show('网络异常',ToastAndroid.SHORT);
  });

  }
  /**
   * @description 提交修改
   */
  submit(){
    var t1 = new Date().getTime()/1000;
    console.log(t1);
    if(this.state.time == -1){
      ToastAndroid.show('请先发送验证码',ToastAndroid.SHORT);
      return;
    }
    if(t1-this.state.time>300){
      ToastAndroid.show('验证超时',ToastAndroid.SHORT);
      return;
    }
        var phone = this.state.phone;
        var yanzhengma = this.state.yanzhengma;
        if(yanzhengma == ''||yanzhengma==null||yanzhengma==undefined){
            ToastAndroid.show('请输入验证码',ToastAndroid.SHORT);
            return;
        }
        if(phone == null ||phone== undefined ||phone == ''){
            ToastAndroid.show('请输入手机号',ToastAndroid.SHORT);c
            return;
        }
        phone = this.phoneNumber(phone);
        if(phone == '-1'){
            ToastAndroid.show('手机号格式错误',ToastAndroid.SHORT);
            return;  
        }
        if(this.state.msg){
          var msgId = this.state.msg.msgId;
          var t1 = new Date().getTime()/1000;
          axios.post('http://192.168.1.19:8080/user/phoneModify',{time:t1,code:yanzhengma,msgId:msgId,phone:phone,userId:this.props.navigation.state.params.userId})
          .then((response)=> {
            var responseData = response.data;
            if(responseData == 200){
              ToastAndroid.show('手机号修改成功',ToastAndroid.SHORT);
              DeviceEventEmitter.emit('editPage');
              this.props.navigation.goBack();
            }
            else{
              ToastAndroid.show('修改手机号失败,请五分钟后重试',ToastAndroid.SHORT);
            }
          })
          .catch(function (error) {
            console.log(error);
            ToastAndroid.show('网络异常',ToastAndroid.SHORT);
          });
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
        <View style={{marginTop:10}}>
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
                    <TouchableOpacity onPress={this.getMsg.bind(this)}>
                    <Text style={{fontSize:13,marginTop:4,color:'#3399ff'}}>获取验证码</Text>
                    </TouchableOpacity>
                    </View>
          </View>
          </View>
        </List>
        <View style={{marginTop:20,marginLeft:40,marginRight:40}}>
            <Button title="确认修改" type='outline' onPress={this.submit.bind(this)} />
        </View>
      </View></View>
  );
  }
}