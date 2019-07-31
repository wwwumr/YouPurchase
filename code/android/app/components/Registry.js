import React,{Component} from 'react';
import axios from 'axios';
import { Input,Image,Header,Text,Button,Icon } from 'react-native-elements';
import {View,StyleSheet,TouchableOpacity,Alert,KeyboardAvoidingView} from'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
var responseData;
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
    axios.get('http://192.168.1.59:8080/user/getMsg',{params:{phone:this.state.phone}})
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
    axios.post('http://192.168.1.59:8080/user/checkMsg',{phone:this.state.phone,
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
        <KeyboardAvoidingView  behavior="position" keyboardVerticalOffset="25" enabled="true"> 
        <Header
                leftComponent={<Icon name='arrow-back' color='#fff'
                onPress={() => this.props.navigation.goBack()}/>}
                centerComponent={{ text: '注 册', style: { color: '#fff',fontSize:25 } }}
                rightComponent={{ icon: 'home', color: '#fff' }}/>
    <View style={styles.image}>
    <Image source={require('../images/logo.jpg')}
                style={{width:100,height:100,alignItems:'center' } }/></View>
                  
                    
                  <View style={styles.input} >      
       <Input
       onChangeText={(value) => this.setState({phone: value})}
       value={this.state.phone}
           placeholder='手 机 号'
           leftIcon={
               <Image
                   source={require('../images/shouji.jpg')}
                  style={{ width: 30, height: 30 }}
            />
           }
           />
           <Input  onChangeText={(value) => this.setState({yanzhengma: value})}
       value={this.state.yanzhengma}
           placeholder='验 证 码' name='yanzhengma'
           leftIcon={
               <Image
                   source={require('../images/yanzhengma.jpg')}
                  style={{ width: 30, height: 30 }}
            />
           }
           />
           <Input onChangeText={(value) => this.setState({password: value})}
       value={this.state.password}
           placeholder='密 码' name='password'
           leftIcon={
               <Image
                   source={require('../images/password.jpg')}
                  style={{ width: 30, height: 30 }}
            />
           }
           />
             <Input onChangeText={(value) => this.setState({password1: value})}
       value={this.state.password1}
           placeholder='确 认 密 码' name='password1'
           leftIcon={
               <Image
                   source={require('../images/password.jpg')}
                  style={{ width: 30, height: 30 }}
            />
           }
           /></View>
            <View style={{marginLeft:30,marginRight:30,marginTop:10}}>
           <Button onPress={this.getMsg.bind(this)}
           icon={
          <Image source={require('../images/login.png')} style={{width:20,height:20,alignItems:'center'}}/>
           }title="获取验证码"
           /></View>
           <View style={{marginLeft:30,marginRight:30,marginTop:10}}>
           <Button onPress={this.registry.bind(this)}
           icon={
          <Image source={require('../images/login.png')} style={{width:20,height:20,alignItems:'center'}}/>
           }title="注 册"
           /></View>
           </KeyboardAvoidingView>
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
    marginTop:20,
    marginLeft:30,
    marginRight:30,
    backgroundColor:"#f0f0f0"
  },
  textfooter:{
    flex:1,
    flexDirection:'row',
    marginTop:10,
    marginLeft:30,
  }
})