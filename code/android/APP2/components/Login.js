import React,{Component} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Image,Header,Text,Button } from 'react-native-elements';
import {View,StyleSheet,TouchableOpacity,Alert} from'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
export default class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      phone:'',
      password:''
    }
  }
  handler(){
    console.log(this.state.phone);
    console.log(this.state.password);
    axios.post('http://192.168.1.59:8080/user/login',{phone:this.state.phone,password:this.state.password})
    .then((response)=> {
      var responseData = response.data;
      console.log(responseData);
      
      if(responseData.status==200)
      {
        console.log("登录成功!");
        var id=responseData.userId;
        this.props.navigation.navigate('MainPage',{userId:id})}
      else
      Alert.alert("登录失败")
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render(){
    return(
      <View>
        <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: '优 邻 购', style: { color: '#fff',fontSize:25 } }}
                rightComponent={{ icon: 'home', color: '#fff' }}/>
                <View style={styles.title}>
                <Text h3 style={{textAlign:'center',
    color:'#0080ff'}}>登 录</Text></View>
    <View style={styles.image}>
    <Image source={require('../images/logo.jpg')}
                style={{width:100,height:100,alignItems:'center' } }/></View>
                <View style={styles.input}>
                  
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
           </View>
           <View style={styles.textfooter}>
             <TouchableOpacity>
               <Text  style={{ marginLeft:10,color:"#0080ff",fontSize:15}}>
                 忘记密码
               </Text>
             </TouchableOpacity>
             <TouchableOpacity>
               <Text  style={{color:"#0080ff",fontSize:15,marginLeft:250}}>
                 注册
               </Text>
             </TouchableOpacity>
           </View>
           <View style={{marginLeft:30,marginRight:30,marginTop:10}}>
           <Button onPress={this.handler.bind(this)}
           icon={
          <Image source={require('../images/login.png')} style={{width:20,height:20,alignItems:'center'}}/>
           }title="登 录"
           /></View>
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
    flexDirection:'row',
    marginTop:10,
    marginLeft:30,
  }
})