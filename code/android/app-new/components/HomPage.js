import React,{Component} from 'react';
import {View,Text,ImageBackground,Dimensions,ToastAndroid} from 'react-native';
import SQLite from './UserSqlite';
var sqLite = new SQLite();
var db;
const {height, width} = Dimensions.get('window');
import axios from 'axios';
import config from '../components/config/config';
export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state={
            item:{}
        }
    }
    compennetDidUnmount(){
        sqLite.close();
      }
    componentDidMount(){
        db.transaction((tx)=>{
            tx.executeSql("select * from user", [],(tx,results)=>{
                var item =  results.rows.item(0);
                console.log(item);
                if(item == undefined){
                    setTimeout(()=>{ 
                        ToastAndroid.show("自动登录失败",ToastAndroid.SHORT);
                        this.props.navigation.navigate('Login'); }, 3000);
                    
                }
                console.log("Ok Here!");
                console.log(item.phone);
                console.log(item.password);
                var tempurl = config.url+'user/login';
                axios.post(tempurl,{phone:item.phone,password:item.password})
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
                        setTimeout(()=>{
                            ToastAndroid.show("自动登录失败",ToastAndroid.SHORT);
                            this.props.navigation.navigate('Login');
                        },1500)
                        
                    }
                })
                .catch(function (error) {
                    ToastAndroid.show('网络异常',ToastAndroid.SHORT);
                    this.props.navigation.navigate('Login');
                    console.log(error);
                });
            });
        },(error)=>{//打印异常信息
            console.log(error);
        });
    }

    componentWillMount(){
        if(!db){
            db = sqLite.open();
        }
        sqLite.createTable();
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