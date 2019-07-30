import React, {Component} from 'react';
import {Platform, StyleSheet, View, Dimensions,Alert,Linking} from 'react-native';
import {Image,Header,Icon,Text,Button} from 'react-native-elements'
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
import { callExpression } from '@babel/types';
const {height, width} = Dimensions.get('window');

export default class BaiduDemo extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
  
  componentDidMount() {
    Geolocation.getCurrentPosition()
        .then(data => {
             console.log(data)
             tempcenter={};
             tempcenter['longitude']=parseFloat(data.longitude);
             tempcenter['latitude'] = parseFloat(data.latitude);
             console.log(tempcenter);
             this.setState({
                 center:tempcenter,
                 markers:[
                  {
                      location:{longitude:parseFloat(data.longitude),
                      latitude:parseFloat(data.latitude)},
                      title:"当前的位置",
                      icon:<Image source={require("../../images/ditu.jpg")}/>
                  }
              ],
  
             })
        })
        .catch(e =>{
            console.warn(e, 'error');
        })
   /* Geolocation.geocode('上海','上海交通大学').then((data)=>{
      console.log(data)
      tempcenter={};
      tempcenter['longitude']=parseFloat(data.longitude);
      tempcenter['latitude'] = parseFloat(data.latitude);
      console.log(tempcenter);
      this.setState({
          center:tempcenter,
          markers:[
           {
               location:{longitude:parseFloat(data.longitude),
               latitude:parseFloat(data.latitude)},
               title:"当前的位置",
               icon:<Image source={require("../../images/ditu.jpg")}/>
           }
       ],

      })
 })
 .catch(e =>{
     console.warn(e, 'error');
    })*/
   
}
TarAddress(){
  Alert.alert("上海交通大学");
}
CurrertAddress(){
    Geolocation.reverseGeoCode(31.028667,120.448845).then((data)=>{
      console.log(data);
    })
}
phone(){
  let tel = 'tel:15860150667'// 目标电话
      Alert.alert('联系商家', '电话：15860150667',
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
    const { Marker, Arc, Circle, Polyline, Polygon, InfoWindow } = Overlay;
    var postition = Geolocation.getCurrentPosition();
    const {center,markers } = this.state;
    console.log(center);
    console.log(height);
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
          zoom={14}
          trafficEnabled={true}
          zoomControlsVisible={true}
        //  mapType={MapTypes.SATELLITE}
          center={ center}
          markers={markers}
        >
          <Marker location={center}title={"当前位置"}/>
          <Marker location={{longitude: 120.448845, latitude: 31.028667}}title={"之后位置"}/>
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