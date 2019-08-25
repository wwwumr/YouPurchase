import React,{Component} from 'react';
import {View,Text,ImageBackground,Dimensions,ToastAndroid} from 'react-native';
import SQLite from './UserSqlite';
var sqLite = new SQLite();
var db;
const {height, width} = Dimensions.get('window');
var item={};
import axios from 'axios';
export default class HomePage extends Component{
    constructor(props){
        super(props);
    }
    compennetDidUnmount(){
        sqLite.close();
      }
    componentDidMount(){
        console.log(item);
        axios.post('http://192.168.0.102:8080/user/login',{phone:item.phone,password:item.password})
        .then((response)=> {
            console.log(response)
            var responseData = response.data;
            console.log(responseData); 
            if(responseData.status==200) {
                ToastAndroid.show("自动登录",ToastAndroid.SHORT);
                console.log("登录成功!");
                var id=responseData.userId;
                this.props.navigation.navigate('MainPage',{userId:id,selectedTab:0})
            }
            else {
                ToastAndroid.show("自动登录失败",ToastAndroid.SHORT);
                this.props.navigation.navigate('Login');
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentWillMount(){
        if(!db){
            db = sqLite.open();
        }
        sqLite.createTable();
        db.transaction((tx)=>{
            tx.executeSql("select * from user", [],(tx,results)=>{
                item =  results.rows.item(0);
                console.log(item);
                console.log("Ok Here!");
                console.log(item.phone);
                console.log(item.password);
            });
        },(error)=>{//打印异常信息
            console.log(error);
        });
    }
    render(){
        return(
            <ImageBackground
                style={{width:width,height:height}}
                source={require('../images/beijing.jpg')}
            >

            </ImageBackground>);
    }
}