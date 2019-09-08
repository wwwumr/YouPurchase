import React, {Component} from 'react';
import {Platform, StyleSheet, View, Dimensions,Alert,Linking,ImageBackground,ToastAndroid} from 'react-native';
import {Image,Header,Icon,Text,Button,Divider} from 'react-native-elements'
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
import { callExpression } from '@babel/types';
import {
  Modal,
  Provider,InputItem
} from '@ant-design/react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
const provinces= ['北京市','天津市','上海市','重庆市','河北省','山西省','辽宁省',
'吉林省','黑龙江省','江苏省','浙江省','安徽省','福建省','江西省','山东省','河南省',
'湖北省','湖南省','广东省','海南省','四川省','贵州省','云南省','陕西省','甘肃省',
'青海省','台湾省','内蒙古自治区','广西壮族自治区','西藏自治区','宁夏回族自治区',
'新疆维吾尔自治区','香港特别行政区','澳门特别行政区'];
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
          text:'',
          province:'上海市',
          isVisable2:false,
          markers:{latitude:31.204429834743763,longitude:121.44134695857332},
          center:{latitude:31.204429834743763,longitude:121.44134695857332}
        };
    }
    /**
   * @description 关闭popup事件
   */
  onClose2(){
    this.setState({isVisable2:false});
}
    /**
     * @description 点击跳转到可能地址页面
     */
  submit(){
        var text = this.state.text;
        var province = this.state.province;
        if(text == ''||text == undefined ||text == null){
          ToastAndroid.show('请输入地址名',ToastAndroid.SHORT);
          return;
        }
        Geolocation.geocode(province,text)
            .then(res => {
                console.log(res)
                if(res.errcode ==-1){
                  ToastAndroid.show('不存在相关地址',ToastAndroid.SHORT);
                  return;
                }
                Geolocation.reverseGeoCode(res.latitude,res.longitude)
                .then(res => {
                    console.log(res.poiList);
                    
                    this.props.navigation.navigate('PossibleAddress',{poiList:res.poiList,flag:this.props.navigation.state.params.flag});
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
        <TouchableOpacity onPress={()=>{
              this.setState({isVisable2:true})
            }}>
          <View style={{borderColor:'#D0D0D0',width:width*0.2,borderWidth:0.7,borderRadius:8,marginLeft:10,height:40,justifyContent:'center',alignItems:'center'}}>
            
            <Text ellipsizeMode={'tail'} style={{fontSize:18}} numberOfLines={1}>{this.state.province}</Text>
            
          </View></TouchableOpacity>
        <View style={{marginLeft:5,
          marginRight:5,
          width:width*0.6+5,
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
                    this.props.navigation.navigate('PossibleAddress',{poiList:res.poiList,flag:this.props.navigation.state.params.flag});
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
      <View style={{height:height*0.5}}>
      <Modal
          transparent={false}
          visible={this.state.isVisable2}
          animationType="slide-up"
          onClose={this.onClose2}
        >
        <ScrollView>
        {
          provinces.map((item,i)=>{
            return(
              <View key={i}>
                <TouchableOpacity onPress={()=>{
                  this.setState({province:item,isVisable2:false});
              }}>
              <Text style={{ textAlign: 'center',fontSize:15 }}>{item}</Text></TouchableOpacity>
              <Divider style={{ marginRight:20,marginLeft:20,backgroundColor: '#f0f0f0',height:0.7,marginTop:5,marginBottom:5 }}/></View>
              );
            })
          }
          </ScrollView>
        </Modal></View>
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