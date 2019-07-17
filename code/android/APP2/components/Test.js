import React,{Component} from 'react';
import {View,TouchableOpacity} from 'react-native';
import {Image,Header,Text,Divider,Icon,Button} from 'react-native-elements';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import DeviceStorage from './Store';
export default class Test extends Component{
    constructor(props){
        super(props);
        this.state={
            item:{}
        }
    }
    render(){
        return(
            <View>
                <Button onPress={()=>{
                    DeviceStorage.save("tel",[1,2,3]);
                }}>Button1</Button>
                <Button onPress={()=>{
                    DeviceStorage.get('tel').then((tel)=>{
                        console.log(tel);
                    })
                }}>Button1</Button>
            </View>
        )
    }
}