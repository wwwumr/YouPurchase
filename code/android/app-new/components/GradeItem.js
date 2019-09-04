import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Text,Image,Icon,Button, Divider,Rating} from 'react-native-elements'
import {ScrollView,View,Dimensions,StyleSheet,DeviceEventEmitter} from 'react-native'
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
import SideMenu from 'react-native-side-menu'
import LeftMenu from './test/Test1'
import styles from 'react-native-side-menu/build/styles';
import { List } from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;
let {width,height} = Dimensions.get('window');
/**
 * @description GradeItem
 * @constructor
 */
export default class GradeItem extends Component{
    constructor(props){
        super(props);
        this.state={
            isWrap:true
        }
    }
    render(){
        return(
         <View>   
            <View style={{backgroundColor:"#ffffff",borderRadius:10,borderWidth:1,borderColor:'#FFFFFF'}}>
            <ListItem 
                key={this.props.index}
                title={this.props.item.userName}
                subtitle={<View style={{flexDirection:"row"}}>
                    <Rating readonly imageSize={15} startingValue={this.props.item.score}/>
                    <Text style={{fontSize:13}}> {this.props.item.score}</Text>
                </View>}
                rightTitle={<Text style={{fontSize:13}}>{this.props.item.createDate.substring(0,10)}</Text>}
                leftIcon={<Image source={require('../images/touxiang1.jpg')} style={{width:30,height:30}}/>}
            />
            <View style={{marginLeft:50,backgroundColor:'#ffffff'}}>
                <Divider style={{backgroundColor:"#F0f0f0",height:0.7,marginRight:10}}/>
                <Item wrap={this.state.isWrap} onPress={()=>{
                    var tempValue = !this.state.isWrap;
                    console.log(this.state.isWrap);
                    this.setState({isWrap:tempValue});
                }}>
                    <Text style={{fontSize:13}}>{this.props.item.content}</Text>  
                </Item>
            </View>
        </View>
    <View style={{backgroundColor:"#f8f8f8",height:10}}/>
    </View>);
        
    }
}