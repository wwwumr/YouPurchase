import React,{Component} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Image,Header,Text } from 'react-native-elements';
import {View,StyleSheet,TouchableOpacity,Alert,KeyboardAvoidingView,ImageBackground,Dimensions,ToastAndroid} from'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
import SQLite from './UserSqlite';
import { InputItem, List,Button,Toast } from '@ant-design/react-native';
var item={};
var sqLite = new SQLite();
var db;
const {height, width} = Dimensions.get('window');
/**
 * Login
 * @constructor
 */
export default class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      phone:'',
      password:''
    }
  }
  /**
     * @description 页面销毁时关闭数据库
     * 
     */
  compennetDidUnmount(){
    sqLite.close();
  }
  /**
   * @description 页面加载时打开数据库
   * 
   */
  componentWillMount(){
    if(!db){
      db = sqLite.open();
    }
    sqLite.createTable();
  }
  /**
   * @description 处理用户登录操作
   *
   */
  handler(){
    console.log(this.state.phone);
    console.log(this.state.password);
    var phone = this.state.phone;
    var password = this.state.password;
    var phones = phone.split(' ');
    phone = phones.join('');
    if(phone == '') {
      ToastAndroid.show('手机号不能为空',ToastAndroid.SHORT);
      return;
    }
    if(password == '') {
      ToastAndroid.show('密码不能为空',ToastAndroid.SHORT);
      return;
    }
    axios.post('http://192.168.0.100:8080/user/login',{phone:phone,password:this.state.password})
    .then((response)=> {
      var responseData = response.data;
      console.log(responseData);
      
      if(responseData.status==200) {
        ToastAndroid.show('登录成功',ToastAndroid.SHORT);
        var id=responseData.userId;
        var tempItem={};
        tempItem.userId = id;
        tempItem.phone = phone;
        tempItem.password = password;
        sqLite.insertUserData(tempItem);
        this.props.navigation.navigate('MainPage',{userId:id,selectedTab:0})}
      else
        ToastAndroid.show('用户名或密码错误',ToastAndroid.SHORT);        
    })
    .catch(function (error) {
      console.log(error);
      ToastAndroid.show('网络异常',ToastAndroid.SHORT);
    });
  }
  render(){
    return(
      
      <View>
        <ImageBackground
                style={{width:width,height:height}}
                source={require('../images/denglu.jpg')}
        >

        <KeyboardAvoidingView  behavior="position" keyboardVerticalOffset="50" enabled="true"> 
          <View style={{marginTop:80,alignItems:'center'}}>
            <Icon
              name='user'
              size={80}
              color='#f0f0f0'
            />
          </View>
          <View style={{marginTop:20}}>
            <Text h3 style={{textAlign:'center',
              fontFamily:"Times New Roman",
              color:'#f0f0f0'}}>欢迎使用优邻购
            </Text>
          </View>
                  
                    
          <View style={styles.input} > 
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
          <View style={styles.textfooter}>
            <Button type='ghost' size='small'>忘记密码</Button>
            <View style={{marginLeft:190}}>
              <Button size='small'
                type='ghost' 
                onPress={()=>{this.props.navigation.navigate('Registry',{})}}>注册
              </Button>
            </View>
          </View>
          <View style={{marginLeft:30,marginRight:30,marginTop:10,borderRadius:15}}>
            <Button type="ghost" 
              activeStyle={{ backgroundColor: '#f0f0f0' }}
              onPress={this.handler.bind(this)}>登 录
            </Button>
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
  textfooter:{
    flexDirection:'row',
    marginTop:10,
    marginLeft:30,
  }
})