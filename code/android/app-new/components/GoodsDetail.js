import React,{Component} from 'react';
import {View,TouchableOpacity,StyleSheet,DeviceEventEmitter,Dimensions,ToastAndroid} from 'react-native';
import {Image,Header,Text,Divider,Icon} from 'react-native-elements';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import DeviceStorage from './Store';
import {commonStyle} from './commonStyle'
import SQLite from './Sqlite';
import { Tag, InputItem, List,Button,Stepper } from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;
const {height, width} = Dimensions.get('window');
var sqLite = new SQLite();
var db;
export default class GoodsDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            item:{},
            id:-1,
            number:1
        }
    }
    componentWillMount(){
      if(!db){
        db = sqLite.open();
      }
      //建表
      sqLite.createTable();
        //var id = 1;
        var id =  this.props.navigation.state.params.goodsId;
        var url='http://192.168.1.19:9000//commodities/'+id;
        axios.get(url).then((response)=>{
        tempitem = response.data;
        this.setState({item:tempitem,id:id});
        console.log(this.state.item);
      }).catch(function(error){
        console.log(error);
      })
    }
    addcart(){
      var goodId =  this.props.navigation.state.params.goodsId;
      var storeName =  this.props.navigation.state.params.storeName;
      var storeId =  this.props.navigation.state.params.storeId;
      var tempitem={};
      tempitem.price = this.state.item.price;
      tempitem.storeName= storeName;
      tempitem.storeId = storeId;
      tempitem.goodId = goodId;
      tempitem.commodityInfo = this.state.item.commodityInfo;
      tempitem.commodityCoverPicUrl = this.state.item.commodityCoverPicUrl;
      tempitem.amount = this.state.number;
      sqLite.insertUserData(tempitem);
    }
    compennetDidUnmount(){
      sqLite.close();
    }
    deletecart(){
      sqLite.deleteData();
    }
    render(){
      return(
        <View style={{height:height,flex:1}}>
        <View style={{backgroundColor:"#ffffff",height:height*0.07,marginTop:15,flexDirection:'row'}}>
            <View style={{marginLeft:10}}>
              <TouchableOpacity onPress={()=>{
                this.props.navigation.goBack();
              }}>
            <Icon
              name='chevron-left'
              size={30}
              color='#686868'
        /></TouchableOpacity>
            </View></View>
            <ScrollView>
              <View>
            <View style={{alignItems:'center',alignContent:'center'}}>
                <Image source={{uri:this.state.item.commodityCoverPicUrl}} style={{width:width*0.8,height:width*0.8}}/>  
                </View>
                
                <View style={{flexDirection:'row'}}>
                  <View style={{backgroundColor:'#FF0066',width:width*0.7,height:height*0.1,justifyContent:'center'}}>
                  <Text h3 style={{color:'#ffffff',marginLeft:20}}>¥ {this.state.item.price}</Text>
                  </View>
                  <View style={{backgroundColor:'#F0f0f0',width:width*0.3,height:height*0.1,justifyContent:'center'}}>
                  <Text h3 style={{textAlign:'center'}}></Text>
                  </View>
                  
                </View>
                
                <View style={{}}>
                  <View style={{marginLeft:20,marginTop:10}}>
                <Text h4>{this.state.item.commodityInfo}</Text></View>
                <View style={{marginRight:20,marginLeft:width*0.7,marginTop:5,marginBottom:5,height:40}}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
                  <TouchableOpacity 
                     onPress={()=>{
                      if(this.state.number > this.state.item.remaining){
                        ToastAndroid.show('数量已超过库存',ToastAndroid.SHORT);
                        return;
                      }
                      else{
                        var number = this.state.number+1;
                        this.setState({number:number});
                      }
                    }}
                    >
                  <View style={{justifyContent:'center',alignItems:'center',height:30,width:30,borderColor:'#C0C0C0',borderWidth:0.5,borderRadius:5}}>
                    <Text style={{color:"#C0C0C0"}}>+</Text>
                  </View>
                  </TouchableOpacity>
                  <View style={{justifyContent:'center',alignItems:'center',height:30,width:30}}>
                    <Text style={{color:"#C0C0C0"}}>{this.state.number}</Text>
                  </View>
                  <TouchableOpacity
                  onPress={()=>{
                    if(this.state.number == 1){
                      ToastAndroid.show('数量不能小于1',ToastAndroid.SHORT);
                      return;
                    }
                    else{
                      var number = this.state.number-1;
                      this.setState({number:number});
                    }
                  }}
                   
                  >
                  <View style={{justifyContent:'center',alignItems:'center',height:30,width:30,borderColor:'#C0C0C0',borderWidth:0.5,borderRadius:5}}>
                    <Text style={{color:"#C0C0C0"}}>-</Text>
                  </View>
                  </TouchableOpacity>
                </View>
                </View>
                </View>
                <Divider style={{ backgroundColor: '#f0f0f0',height:1 }}/>
                </View></ScrollView>
                <View style={styles.toolBar}>
          <View style={{flex: 1, flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
          </View>
          <TouchableOpacity onPress={this.addcart.bind(this)}><View style={{backgroundColor:'#FFFF00',width:120,alignItems:'center',justifyContent:'center',height: commonStyle.cellHeight}}><Text style={{marginHorizontal: 10,color:'#fff'}}>加入购物车</Text></View>
        </TouchableOpacity>
          <View style={{width: 120, backgroundColor: commonStyle.red, alignItems: commonStyle.center, justifyContent: commonStyle.center, height: commonStyle.cellHeight}}>
            <Text style={{color: commonStyle.white}}>立即购买</Text>
          </View>
      </View>
        </View>
      );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: commonStyle.white
    },
    navBar: {
      height: commonStyle.navHeight,
      alignItems: commonStyle.center,
      justifyContent: commonStyle.center,
      borderBottomWidth: commonStyle.lineWidth,
      borderBottomColor: commonStyle.lineColor
    },
    cellStyle: {
      flexDirection: commonStyle.row,
      alignItems: commonStyle.center,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: commonStyle.lineColor
    },
    sectionHeader: {
      height: 40,
      flexDirection: commonStyle.row,
      backgroundColor: commonStyle.bgColor,
      alignItems: commonStyle.center,
    },
    checkBox: {
      width: 40,
      height: 40,
    },
    toolBar: {
      backgroundColor:'#f0f0f0',
      height: commonStyle.cellHeight,
      flexDirection: commonStyle.row,
      alignItems: commonStyle.center
    }
  })