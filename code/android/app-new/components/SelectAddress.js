import React, {Component} from 'react';
import {Platform, StyleSheet, View, Dimensions,Alert,Linking,ImageBackground} from 'react-native';
import {Image,Header,Icon,Text,Button} from 'react-native-elements'
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
import { callExpression } from '@babel/types';
import {
  Modal,
  Provider,InputItem
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
 * @description SelectAddress
 * @constructor
 */
export default class SelectAddress extends Component {
    constructor(props){
        super(props);
        this.state = {
          tarAddress:{},
          carrierAddress:{},
          size:-1,
          markers:{latitude:31.204429834743763,longitude:121.44134695857332},
          center:{latitude:31.204429834743763,longitude:121.44134695857332}
        };
    }
  /** 
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
  
   
}*/
submit(){
     //地图空白区域点击事件,返回经纬度
        let title = '';
        Geolocation.geocode('上海市','上海交通大学')
            .then(res => {
                console.log(res)
                Geolocation.reverseGeoCode(res.latitude,res.longitude)
                .then(res => {
                    console.log(res.poiList);
                    this.props.navigation.navigate('PossibleAddress',{poiList:res.poiList});
                    title = res.address;
                })
                .catch(err => {
                    console.log(err)
                })
            
            })
            .catch(err => {
                console.log(err)
            })
}
  render() {
    const { Marker, Arc, Circle, Polyline, Polygon, InfoWindow } = Overlay;
    var center = this.state.center;
    var markers = this.state.markers;
    console.log(center);
    return (
      <Provider>
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
            <Text style={{fontSize:20}}>获取地址</Text>
          </View>
        </View>
        </View>
        <View style={{width:width,backgroundColor:'#F8F8F8',flexDirection:'row',height:height*0.09}}>
        <View style={{marginLeft:10,
          marginRight:5,
          width:width*0.8,
          backgroundColor:'#ffffff',
          borderRadius:20}}
        >
          <InputItem
            clear
            type="text"
            value={this.state.text}
              onChange={value => {
                this.setState({
                  text: value,
                });
              }}
            placeholder="地址名"
          >
            <Icon
              name="search"
              color={"#D0D0D0"}
              size={40}
            />
          </InputItem>
        </View>
        <TouchableOpacity onPress={this.submit.bind(this)}>
          <View style={{borderRadius:5,
            backgroundColor:'#ffffff', 
            borderColor:"#D0D0D0",
            borderWidth:1}}
          >
            <Icon
              name="search"
              color={'#D0D0D0'}
              size={40}
            />
          </View>
        </TouchableOpacity>    
        </View>
                <View style={{marginLeft:10,marginRight:10,marginTop:10,marginBottom:10}}>
        <MapView 
          width={width-20} 
          height={height*0.82-20} 
          zoom={15}
          trafficEnabled={true}
          zoomControlsVisible={true}
        //  mapType={MapTypes.SATELLITE}
          center={ center}
          onMapClick={(e) => { //地图空白区域点击事件,返回经纬度
            let title = '';
            Geolocation.reverseGeoCode(e.latitude,e.longitude)
                .then(res => {
                    console.log(res.poiList);
                    this.props.navigation.navigate('PossibleAddress',{poiList:res.poiList});
                    title = res.address;
                    this.setState({
                        center: {
                            longitude: e.longitude,
                            latitude: e.latitude,
                        },
                        markers:{
                            longitude: e.longitude,
                            latitude: e.latitude,
                            title: title,
                        },
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            
        }}
        >
          <Marker location={markers}/>
        </MapView>
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