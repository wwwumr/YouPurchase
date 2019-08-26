import React,{Component} from 'react';
import axios from 'axios';
import { Input,Image,Header,Text,Icon } from 'react-native-elements';
import {View,StyleSheet,TouchableOpacity,Alert,KeyboardAvoidingView,Dimensions,ImageBackground} from'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
import { InputItem,Button } from '@ant-design/react-native';
var responseData;
const {height, width} = Dimensions.get('window');
export default class Registry extends Component{
  constructor(props){
    super(props);
    this.state={
      phone:'',
      password:'',
      password1:'',
      yanzhengma:''
    }
  }
  getMsg(){
    console.log(this.state.phone);
    console.log(this.state.password);
    axios.get('http://192.168.0.100:8080/user/getMsg',{params:{phone:this.state.phone}})
    .then((response)=> {
      responseData = response.data;
      console.log(responseData);
      
      if(responseData)
      {
        Alert.alert("验证码已发送");
      }
      else
      Alert.alert("该手机号已被注册")
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  registry(){
    var t1 = new Date().getTime()/1000;
    console.log(t1);
    if(this.state.password!=this.state.password1){
    Alert.alert("密码与确认密码不符请重新输入")
    return;
  }
  if(!responseData){
    Alert.alert("请先发送验证码");
    return;

  }
    axios.post('http://192.168.0.100:8080/user/checkMsg',{phone:this.state.phone,
    password:this.state.password,
  msgId:responseData.msgId,code:this.state.yanzhengma,time:t1})
    .then((response)=> {
      var responsedata = response.data;
      console.log(responsedata);
      
      if(responsedata==-402)
      {
        Alert.alert("验证超时")
      }
      else if(responsedata==-403)
      Alert.alert("验证码错误")
      else {
        Alert.alert("成功注册");
        this.props.navigation.navigate('Login')
      }
    })
    .catch(function (error) {
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
        <Text h3 style={{textAlign:'center',fontFamily:"Times New Roman",
            color:'#f0f0f0'}}>欢迎使用优邻购</Text>
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
              </InputItem></View>
              <View style={{justifyContent:'center'}}>
              <Button type='ghost'size='small' onPress={()=>{this.registry.bind(this)}}>验证码</Button></View>
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
           </View>
           <View style={{marginLeft:30,marginRight:30,marginTop:10}}>
             <View style={{marginBottom:30}}>
           <Button onPress={this.registry.bind(this)}
               type="ghost"
           >注册</Button></View></View>
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