import React,{Component} from 'react';
import axios from 'axios';
import { Input,Image,Header,Text,Icon } from 'react-native-elements';
import {View,StyleSheet,TouchableOpacity,Alert,KeyboardAvoidingView,Dimensions,ImageBackground,ToastAndroid} from'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
import { InputItem,Button } from '@ant-design/react-native';
import config from '../components/config/config';
const {height, width} = Dimensions.get('window');
/**
 * @description Registry
 * @constructor
 */
export default class Registry extends Component{
  constructor(props){
    super(props);
    this.state={
      phone:'',
      password:'',
      password1:'',
      yanzhengma:'',
      responseData:{},
      time:-1
    }
  }
  /**
   * @description 判断输入的手机号是否合法
   */
  phoneNumber() {
    var phone = this.state.phone;
    if(phone == null||phone == undefined ||phone == ''){
      return '-2';
    }
    var phones = phone.split(' ');
    phone = phones.join('');
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
   * @description 发送验证码
   */
  getMsg(){
    var t1 = new Date().getTime()/1000;
    if(this.state.time!=-1 && t1-this.state.time<300){
      ToastAndroid.show('请勿在5分钟内重复发验证码',ToastAndroid.SHORT);
      return;
    }
    console.log(this.state.phone);
    console.log(this.state.password);
    var phone = this.phoneNumber();
    if(phone == '-2'){
      ToastAndroid.show('手机号不能为空',ToastAndroid.SHORT);
      return;
    }
    if(phone == '-1'){
      ToastAndroid.show('请输入合法的手机号',ToastAndroid.SHORT);
      return;
    }
    axios.get(config.url+'/user/getMsg',{params:{phone:phone}})
    .then((response)=> {
      var responseData = response.data;
      console.log(responseData);
      
      if(responseData){
        this.setState({responseData:responseData,time:responseData.time});
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
   * @description 用户注册
   */
  registry(){
    var t1 = new Date().getTime()/1000;
    console.log(t1);
    var phone = this.phoneNumber();
    if(this.state.time == -1){
      ToastAndroid.show('请先发送验证码',ToastAndroid.SHORT);
      return;
    }
    if(t1-this.state.time>300){
      ToastAndroid.show('验证超时',ToastAndroid.SHORT);
      return;
    }
    if(phone=='-1') {
      ToastAndroid.show('请输入合法手机号',ToastAndroid.SHORT);
      return;
    }
    if(this.state.yanzhengma==''){
      ToastAndroid.show('请输入验证码',ToastAndroid.SHORT);
      return;
    }
    if(this.state.password==''){
      ToastAndroid.show('请输入密码',ToastAndroid.SHORT);
      return;
    }
    if(this.state.password1==''){
      ToastAndroid.show('请输入确认密码',ToastAndroid.SHORT);
      return;
    }
    if(this.state.password1.length>12||this.state.password1.length<6){
      ToastAndroid.show('密码长度应为6-12位',ToastAndroid.SHORT);
      return;
    }
    if(this.state.password!=this.state.password1){
      ToastAndroid.show('密码与确认密码不一致',ToastAndroid.SHORT);
      return;
    }
    axios.post(config.url+'user/checkMsg',{phone:phone,
      password:this.state.password,
      msgId:this.state.responseData.msgId,code:this.state.yanzhengma,time:t1})
    .then((response)=> {
      var responsedata = response.data;
      console.log(responsedata);
      if(responsedata == -404){
        ToastAndroid.show('验证码失效，请五分钟后重试',ToastAndroid.SHORT);
        return;
      }
      else if(responsedata == -406){
        ToastAndroid.show('输入的手机号错误,请五分钟后重试',ToastAndroid.SHORT);
        return;
      }
      else if(responsedata==-402)
        ToastAndroid.show('验证操作超时',ToastAndroid.SHORT);
      else if(responsedata==-403)
        ToastAndroid.show('验证码错误，请五分钟后重试',ToastAndroid.SHORT);
      else {
        this.setState({responseData:{}})
        ToastAndroid.show('成功注册',ToastAndroid.SHORT);
        this.props.navigation.navigate('Login')
      }
    })
    .catch(function (error) {
      ToastAndroid.show('网络异常',ToastAndroid.SHORT);
      console.log(error);
    });
  }
  render(){
    return(
      
      <View>
        <ImageBackground
                style={{width:width,height:height}}
                source={require('../images/denglu.jpg')}
        >
        <KeyboardAvoidingView  behavior="position" keyboardVerticalOffset="25" enabled="true"> 
          <View style={{marginTop:80}}>
            <Text h3 style={{textAlign:'center',
              fontFamily:"Times New Roman",
              color:'#f0f0f0'}}>欢迎使用优邻购
            </Text>
          </View>
          <View style={{marginTop:40,
            borderRadius:15,
            borderStyle:"solid",
            borderColor:"#f0f0f0",
            borderWidth:0.5,
            marginLeft:20,
            marginRight:20,
          }}>
            <View style={styles.input2} > 
              <InputItem
                clear
                type="phone"
                value={this.state.phone}
                onChange={value => {
                  this.setState({
                    phone: value,
                  });
                }}
                placeholder="手机号"
              >
                <Image
                  source={require('../images/shouji.jpg')}
                  style={{ width: 30, height: 30 }}
                />
              </InputItem>
            </View>    
            <View style={styles.input1} > 
              <View style={{width:200}}>
                <InputItem
                  clear
                  value={this.state.yanzhengma}
                  onChange={value => {
                    this.setState({
                      yanzhengma: value,
                    });
                  }}
                  placeholder="验证码"
                >
                  <Image
                    source={require('../images/yanzhengma.jpg')}
                    style={{ width: 30, height: 30 }}
                  />
                </InputItem>
              </View>
              <View style={{justifyContent:'center'}}>
                <Button type='ghost'
                  size='small' 
                  onPress={this.getMsg.bind(this)}>验证码
                </Button>
              </View>
            </View>  
            <View style={styles.input}>
              <InputItem
                clear
                type="password"
                value={this.state.password}
                onChange={value => {
                  this.setState({
                    password: value,
                  });
                }}
                placeholder="密码"
              >
                <Image
                  source={require('../images/password.jpg')}
                  style={{ width: 30, height: 30 }}
                />
              </InputItem>     
            </View>
            <View style={styles.input}>
              <InputItem
                clear
                type="password"
                value={this.state.password1}
                onChange={value => {
                  this.setState({
                    password1: value,
                  });
                }}
                placeholder="确认密码"
              >
                <Image
                  source={require('../images/password.jpg')}
                  style={{ width: 30, height: 30 }}
                />
              </InputItem>     
            </View>    
            <View style={{marginLeft:30,marginRight:30,marginTop:10}}>
              <View style={{marginBottom:30}}>
                <Button onPress={this.registry.bind(this)}
                  type="ghost"
                >注册
                </Button>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
        </ImageBackground>
      </View>  
    );
  }
}
const styles = StyleSheet.create({
  image:{
    marginTop:30,
    alignItems:'center'
  },
  title:{
    marginTop:30
    
  },
  input:{
    marginTop:10,
    borderRadius:15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:"#f0f0f0"
  },
  input2:{
    marginTop:40,
    borderRadius:15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:"#f0f0f0"
  },
  input1:{
    marginTop:10,
    borderRadius:15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:"#f0f0f0",
    flexDirection:'row',

  },
  textfooter:{
    flex:1,
    flexDirection:'row',
    marginTop:10,
    marginLeft:30,
  }
})