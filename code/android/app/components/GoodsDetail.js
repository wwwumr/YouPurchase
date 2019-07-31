import React,{Component} from 'react';
import {View,TouchableOpacity,StyleSheet,DeviceEventEmitter} from 'react-native';
import {Image,Header,Text,Divider,Icon} from 'react-native-elements';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import DeviceStorage from './Store';
import {commonStyle} from './commonStyle'
import SQLite from './Sqlite';
var sqLite = new SQLite();
var db;
export default class GoodsDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            item:{},
            id:-1
        }
    }
    componentWillMount(){
      if(!db){
        db = sqLite.open();
      }
      //建表
      sqLite.createTable();
        var id =  this.props.navigation.state.params.goodsId;
        var url='http://192.168.1.59:9000//commodities/'+id;
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
      tempitem.amount = 1;
      sqLite.insertUserData(tempitem);
    }
    compennetDidUnmount(){
      sqLite.close();
    }
    deletecart(){
      sqLite.deleteData();
    }
    render(){
      
        console.log(this.props.userId);
        return(
            <View style={{flex:1}}>
                <Header 
                leftComponent={<Icon name='arrow-back' color='#fff'
                onPress={() => this.props.navigation.goBack()}/> }
                centerComponent={{ text: '商 品 详 情', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{icon:'home',color:"#fff"}}/>
                <ScrollView>
                    <View>
                <View style={{alignItems:'center',marginTop:20}}>
                <Image source={{uri:this.state.item.commodityCoverPicUrl}} style={{width:200,height:200}}/>  
                </View>
                <Divider style={{ backgroundColor: 'blue' }}/>
                <Text style={{marginLeft:20}}h2>{this.state.item.commodityInfo}</Text>
                <Divider style={{ backgroundColor: 'blue' }}/>
                <View style={{flexDirection:'row'}}>
                <Text h3 style={{color:'#DC143C',marginLeft:20}}>¥ {this.state.item.price}</Text>
                <Text h4 style={{marginLeft:200}}>{this.state.item.onShelves ?"有货":"无货" }</Text></View>
                <Divider style={{ backgroundColor: 'blue' }}/>
                </View>
                </ScrollView>
                <View style={styles.toolBar}>
          <View style={{flex: 1, flexDirection: commonStyle.row, alignItems: commonStyle.center}}>
            <TouchableOpacity onPress={this.deletecart.bind(this)}>
              <Image style={styles.checkBox} source={require("../images/cart2.jpeg")}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.addcart.bind(this)}>
        <Text style={{fontWeight:"bold",marginLeft:20}}>加入购物车</Text></TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => {
        this.props.navigation.navigate('MainPage')}}><Text style={{marginHorizontal: 10,fontWeight:"bold"}}>首页</Text>
        </TouchableOpacity>
          <View style={{width: 120, backgroundColor: commonStyle.red, alignItems: commonStyle.center, justifyContent: commonStyle.center, height: commonStyle.cellHeight}}>
            <Text style={{color: commonStyle.white}}>立即购买</Text>
          </View>
      </View>
            </View>
        )
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
      height: commonStyle.cellHeight,
      flexDirection: commonStyle.row,
      alignItems: commonStyle.center
    }
  })