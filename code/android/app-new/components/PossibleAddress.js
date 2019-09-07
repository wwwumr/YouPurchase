import React, {Component} from 'react';
import {Platform, StyleSheet, View, Dimensions,Alert,Linking,ImageBackground,DeviceEventEmitter} from 'react-native';
import {Image,Header,Icon,Text,Button} from 'react-native-elements'
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
import { callExpression } from '@babel/types';
import {
  Modal,List,
  Provider,InputItem
} from '@ant-design/react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
var EARTH_RADIUS = 6378137.0;    //单位M
var PI = Math.PI;
/**
 * 
 * @param {*} d km
 * @description 数值与弧度的转化
 */    
function getRad(d){
  return d*PI/180.0;
}
/**
 * 
 * @param {*} lat1 地址1纬度 
 * @param {*} lng1 地址1经度
 * @param {*} lat2 地址2纬度
 * @param {*} lng2 地址2经度
 */
function getFlatternDistance(lat1,lng1,lat2,lng2){
  var f = getRad((lat1 + lat2)/2);
  var g = getRad((lat1 - lat2)/2);
  var l = getRad((lng1 - lng2)/2);
        
  var sg = Math.sin(g);
  var sl = Math.sin(l);
  var sf = Math.sin(f);
        
  var s,c,w,r,d,h1,h2;
  var a = EARTH_RADIUS;
  var fl = 1/298.257;
        
  sg = sg*sg;
  sl = sl*sl;
  sf = sf*sf;
        
  s = sg*(1-sl) + (1-sf)*sl;
  c = (1-sg)*(1-sl) + sf*sl;
        
  w = Math.atan(Math.sqrt(s/c));
  r = Math.sqrt(s*c)/w;
  d = 2*w*a;
  h1 = (3*r -1)/2/c;
  h2 = (3*r +1)/2/s;
        
  return d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
}
const {height, width} = Dimensions.get('window');
/**
 * @description 搜索得到的可能地址
 * @constructor
 */
export default class PossibleAddress extends Component {
    constructor(props){
        super(props);
        this.state = {
          polilist:[]
        };
    }
  render() {
    console.log(this.props.navigation.state.params.poiList);
    return (
     <View style={{backgroundColor:'#F8F8F8',height:height}}>
        

     <View style={{width:width,height:height*0.09}}>
          <View style={{flexDirection:"row",marginLeft:20,marginTop:15}}>
            <View style={{marginRight:20}}>
            <TouchableOpacity onPress={()=>{
              this.props.navigation.goBack();
            }}>
            <Icon
              name='chevron-left'
              size={30}
              color='#3399ff'
            />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{fontSize:20}}>可能地址</Text>
          </View>
        </View>
        </View>
        <ScrollView style={{marginBottom:20}}>
            <List>
                {
                    this.props.navigation.state.params.poiList.map((item,i)=>{
                        return(
                        <List.Item key={i} wrap onPress={()=>{
                          var flag = this.props.navigation.state.params.flag
                          DeviceEventEmitter.emit('selectedAddress',item);
                          if(flag == 1)
                            this.props.navigation.navigate('AddAddressTable');
                          else
                          this.props.navigation.navigate('AddAddressTable2');
                        }}>{item.address}</List.Item>);
                    })
                }
            </List>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  }
});