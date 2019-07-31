import React, {Component} from 'react';
import {Platform, StyleSheet, View, Dimensions,Alert,Linking} from 'react-native';
import {Image,Header,Icon,Text,Button} from 'react-native-elements'
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
import { callExpression } from '@babel/types';
var EARTH_RADIUS = 6378137.0;    //单位M
    var PI = Math.PI;
    
    function getRad(d){
        return d*PI/180.0;
    }
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

export default class BaiduDemo extends Component {
    constructor(props){
        super(props);
        this.state = {
          tarAddress:{},
          carrierAddress:{}
        };
    }
  
  componentWillMount() {
   var tempaddress1 =this.props.navigation.state.params.tarAddress;
   var tempaddress2 = this.props.navigation.state.params.carrierAddress;
   this.setState({tarAddress:tempaddress1,carrierAddress:tempaddress2})
  
   
}
TarAddress(){
  var address = this.props.navigation.state.params.address;
  Alert.alert(address);
}
CurrertAddress(){
  var temppoint = this.state.carrierAddress;
  var tarpoint = this.state.tarAddress;
    Geolocation.reverseGeoCode(temppoint.latitude,temppoint.longitude).then((data)=>{
      var distance = getFlatternDistance(temppoint.latitude,temppoint.longitude,tarpoint.latitude,tarpoint.longitude)/1000;
      Alert.alert(data.address+"\n"+"相距目的地 "+distance.toFixed(2)+"km");
    })
}
phone(){
  var phone = this.props.navigation.state.params.phone;
  let tel = 'tel:'+phone// 目标电话
      Alert.alert('联系商家', '电话：'+phone,
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
    console.log(center);
    console.log(marker1);
    return (
     <View>
        <Header
                leftComponent={<Icon name='arrow-back' color='#fff'
                onPress={() => {this.props.navigation.goBack();
                } }/> }
                centerComponent={{ text: '订 单 跟 踪', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{icon:'home',color:"#fff"}}/>
                <View style={styles.container}>
        <MapView 
          width={width} 
          height={450} 
          zoom={14.5}
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
      <View style={{height:55,flexDirection:'row',flex:1}}>
        <View style={{flex:0.3,height:50}}><Button title="收货地址"type="outline" onPress={this.TarAddress.bind(this)} /></View>
        <View style={{flex:0.4,height:50}}><Button title="包裹位置"type="outline" onPress={this.CurrertAddress.bind(this)}/></View>
        <View style={{flex:0.3,height:50}}><Button title="联系商家"type="outline" onPress={this.phone.bind(this)}/></View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  }
});