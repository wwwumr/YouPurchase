import React, {Component} from 'react';
import {Platform, StyleSheet, View, Dimensions,Alert,Linking,ImageBackground} from 'react-native';
import {Image,Header,Icon,Text,Button} from 'react-native-elements'
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
import { callExpression } from '@babel/types';
import {
  Modal,
  Provider,
} from '@ant-design/react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
 * @description BaiduDemo
 * @constructor
 */
export default class BaiduDemo extends Component {
    constructor(props){
        super(props);
        this.state = {
          tarAddress:{},
          carrierAddress:{},
          size:-1
        };
    }
  
  componentWillMount() {
   var tempaddress1 =this.props.navigation.state.params.tarAddress;
   var tempaddress2 = this.props.navigation.state.params.carrierAddress;
   var distance = getFlatternDistance(tempaddress1.latitude,tempaddress1.longitude,tempaddress2.latitude,tempaddress2.longitude);
   console.log(distance);
   var size=-1;
   var zoom = [50,100,200,500,1000,2000,5000,10000,20000,25000,50000,100000,200000,500000,1000000,2000000];
   for (var i = 0; i < zoom.length; i++) {
     console.log(zoom[i]);
    if(zoom[i] - distance > 0){
      //之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
      size = 18-i+2;
      break;
    }
  };

   this.setState({tarAddress:tempaddress1,carrierAddress:tempaddress2,size:size})
  
   
}
/**
 * @description 获得收货地址
 */
 TarAddress() {
  var address = this.props.navigation.state.params.address;
  Modal.alert('收货地址', address, [
    {
      text: '关闭',
      onPress: () => console.log(''),
      style: 'cancel',
    },
  ]);
};
/**
 * @description 当前地址
 */
CurrertAddress(){
  var temppoint = this.state.carrierAddress;
  var tarpoint = this.state.tarAddress;
    Geolocation.reverseGeoCode(temppoint.latitude,temppoint.longitude).then((data)=>{
      var distance = getFlatternDistance(temppoint.latitude,temppoint.longitude,tarpoint.latitude,tarpoint.longitude)/1000;
      Modal.alert('包裹当前位置', data.address+"\n"+"相距目的地 "+distance.toFixed(2)+"km", [
        {
          text: '关闭',
          onPress: () => console.log(''),
          style: 'cancel',
        },
      ]);
    })
}
/**
 * 联系送货人
 */
phone(){
  var phone = this.props.navigation.state.params.phone;
  let tel = 'tel:'+phone// 目标电话
      Modal.alert('联系商家', '电话：'+phone,
        [ { text: '取消', onPress: () => { console.log('取消') } },
          { text: '确定',
            onPress: () => {
              Linking.canOpenURL(tel).then((supported) => {
                if (!supported) {
                  console.log('Can not handle tel:' + tel)
                } else {
                  return Linking.openURL(tel)
                }
              }).catch(error => console.log('tel error', error))
            } }])
  }
  render() {
    const { Marker, Arc, Circle, Polyline, Polygon, InfoWindow,Text } = Overlay;
    var postition = Geolocation.getCurrentPosition();
    var center = this.state.tarAddress;
    var marker1 = this.state.carrierAddress;
    var size = this.state.size;
    console.log(center);
    console.log(marker1);
    console.log(size);
    return (
      <Provider>
     <View>
        <ImageBackground
                style={{width:width,height:height*0.08}}
                source={require('../../images/edit.jpg')}
            >
                <View style={{flexDirection:"row",marginLeft:20,flex:1,marginTop:10}}>
                  <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                <Icon
                            name='chevron-left'
                            size={30}
                            color='#ffffff'
                          /></TouchableOpacity>
                </View>
            </ImageBackground>
                <View>
        <MapView 
          width={width} 
          height={height*0.8} 
          zoom={this.state.size}
          trafficEnabled={true}
          zoomControlsVisible={true}
        //  mapType={MapTypes.SATELLITE}
          center={ center}
        >
          <Marker location={center}title={"当前位置"}/>
          <Text location={center}text={"目的地"} fontSize={40}/>
          <Marker location={marker1}title={"之后位置"}/>
          <Text location={marker1}text={"包裹位置"} fontSize={40}/>
        </MapView>
      </View>
      <View style={{height:height*0.12,flexDirection:'row',flex:1}}>
        <View style={{flex:0.3,height:height*0.12}}><Button title="收货地址"type="outline" onPress={this.TarAddress.bind(this)} /></View>
        <View style={{flex:0.4,height:height*0.12}}><Button title="包裹位置"type="outline" onPress={this.CurrertAddress.bind(this)}/></View>
        <View style={{flex:0.3,height:height*0.12}}><Button title="联系商家"type="outline" onPress={this.phone.bind(this)}/></View>
      </View>
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  }
});