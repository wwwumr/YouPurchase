import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Image,Text } from 'react-native-elements'
import {ScrollView,View,DeviceEventEmitter} from 'react-native';
import ItemMenu from '../components/Menu';
import ShopItem from '../components/ShopItem';
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import axios from 'axios'
import PushMessage from './PushMessage';
const list1=[
  {
      "storeDTO": {
          "key": 1,
          "storeName": "水果店1",
          "address": "华山路",
          "coverPicUrl": "add-location",
          "contact": "18039859163",
          "startHour": "21:00",
          "endHour": "09:07",
          "dealerId": null,
          "dealerName": null,
          "deliveryType": null,
          "deliveryRange": 10.0
      },
      "distance": 1.1025092747414367,
      "sales": 0,
      "score": 1.0
  },
  {
      "storeDTO": {
          "key": 2,
          "storeName": "水果店2",
          "address": "中山路",
          "coverPicUrl": "accessible",
          "contact": "123123123",
          "startHour": "21:07",
          "endHour": "09:07",
          "dealerId": null,
          "dealerName": null,
          "deliveryType": null,
          "deliveryRange": 10.0
      },
      "distance": 1.1595639255411594,
      "sales": 0,
      "score": 2.0
  },
  {
      "storeDTO": {
          "key": 3,
          "storeName": "水果店3",
          "address": "南京路",
          "coverPicUrl": "add-circle",
          "contact": "143143143",
          "startHour": "21:07",
          "endHour": "09:07",
          "dealerId": null,
          "dealerName": null,
          "deliveryType": null,
          "deliveryRange": 10.0
      },
      "distance": 1.2207360541976997,
      "sales": 0,
      "score": 3.0
  },
  {
      "storeDTO": {
          "key": 4,
          "storeName": "水果店4",
          "address": "重庆路",
          "coverPicUrl": "apps",
          "contact": "111222333",
          "startHour": "21:07",
          "endHour": "09:07",
          "dealerId": null,
          "dealerName": null,
          "deliveryType": null,
          "deliveryRange": 10.0
      },
      "distance": 1.1530888522449445,
      "sales": 0,
      "score": 4.0
  },
  {
      "storeDTO": {
          "key": 5,
          "storeName": "水果店5",
          "address": "江苏路",
          "coverPicUrl": "arrow-back",
          "contact": "112233",
          "startHour": "21:07",
          "endHour": "09:07",
          "dealerId": null,
          "dealerName": null,
          "deliveryType": null,
          "deliveryRange": 10.0
      },
      "distance": 1.0963868803008017,
      "sales": 0,
      "score": 5.0
  },
  {
      "storeDTO": {
          "key": 6,
          "storeName": "水果店6",
          "address": "上海路",
          "coverPicUrl": "beenhere",
          "contact": "112121",
          "startHour": "21:07",
          "endHour": "09:07",
          "dealerId": null,
          "dealerName": null,
          "deliveryType": null,
          "deliveryRange": 10.0
      },
      "distance": 1.166526175260866,
      "sales": 0,
      "score": 1.0
  },
  {
      "storeDTO": {
          "key": 7,
          "storeName": "水果店7",
          "address": "无锡路",
          "coverPicUrl": "block",
          "contact": "12123131",
          "startHour": "21:07",
          "endHour": "09:07",
          "dealerId": null,
          "dealerName": null,
          "deliveryType": null,
          "deliveryRange": 10.0
      },
      "distance": 0.9537206741817918,
      "sales": 0,
      "score": 2.0
  },
  {
      "storeDTO": {
          "key": 8,
          "storeName": "水果店8",
          "address": "浙江路",
          "coverPicUrl": "book",
          "contact": "67676767",
          "startHour": "21:07",
          "endHour": "09:07",
          "dealerId": null,
          "dealerName": null,
          "deliveryType": null,
          "deliveryRange": 10.0
      },
      "distance": 0.8752874904405831,
      "sales": 0,
      "score": 3.5
  },
  {
      "storeDTO": {
          "key": 9,
          "storeName": "水果店9",
          "address": "江南路",
          "coverPicUrl": "camera",
          "contact": "76767676",
          "startHour": "21:07",
          "endHour": "09:07",
          "dealerId": null,
          "dealerName": null,
          "deliveryType": null,
          "deliveryRange": 10.0
      },
      "distance": 1.2000071101084804,
      "sales": 0,
      "score": 4.5
  },
  {
      "storeDTO": {
          "key": 10,
          "storeName": "水果店10",
          "address": "江北路",
          "coverPicUrl": "cloud-download",
          "contact": "8787878",
          "startHour": "21:07",
          "endHour": "09:07",
          "dealerId": null,
          "dealerName": null,
          "deliveryType": null,
          "deliveryRange": 10.0
      },
      "distance": 1.2731889718769713,
      "sales": 0,
      "score": 4.0
  }
]
var list = [
]
export default class ShopList extends Component{
    constructor(props){
        super(props);
        state={
            text:'',
            itemlist:list,
            center:{},
            tempvalue:'',
            yes:''
        }
    }
    change1(){
      list.sort(function(item1,item2){
          return item1.distance-item2.distance;
      })
      this.setState({itemlist:list})
    }
    change2(){
      list.sort(function(item1,item2){
          return item2.sales-item1.sales;
      })
      this.setState({itemlist:list})
    }
    change3(){
      list.sort(function(item1,item2){
          return item2.score-item1.score;
      })
      this.setState({itemlist:list})
    }
    handler(){
      this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Goodslist' })
        ],
      }))
    }
    componentWillMount(){
      var tempcenter={};
      var url = "http://192.168.0.102:9000/stores/sort";
      Geolocation.getCurrentPosition()
        .then(data => {
             console.log(data)
             tempcenter['longitude']=parseFloat(data.longitude);
             tempcenter['latitude'] = parseFloat(data.latitude);
             console.log(tempcenter.longitude);
             console.log(tempcenter.latitude);
             url+=("?longitude="+tempcenter.longitude+"&latitude="+tempcenter.latitude);
             axios.get(url).then((response)=>{
                list = response.data;
                console.log(this.state.itemlist);
                this.setState({itemlist:list,center:tempcenter});
            }).catch(function(error){
                console.log(error);
            })
            this.setState({itemlist:list,center:tempcenter});
        })
        .catch(e =>{
            console.warn(e, 'error');
        })
      
      this.setState({itemlist:list,center:tempcenter});
      
    }
    componentWillReceiveProps(){
      var tempcenter={};
      var url = "http://192.168.0.102:9000/stores/sort";
      Geolocation.getCurrentPosition()
        .then(data => {
             console.log(data)
             tempcenter['longitude']=parseFloat(data.longitude);
             tempcenter['latitude'] = parseFloat(data.latitude);
             console.log(tempcenter.longitude);
             console.log(tempcenter.latitude);
             url+=("?longitude="+tempcenter.longitude+"&latitude="+tempcenter.latitude);
             axios.get(url).then((response)=>{
                list = response.data;
                console.log(this.state.itemlist);
                this.setState({itemlist:list,center:tempcenter});
            }).catch(function(error){
                console.log(error);
            })
            this.setState({itemlist:list,center:tempcenter});
        })
        .catch(e =>{
            console.warn(e, 'error');
        })
      
      this.setState({itemlist:list,center:tempcenter});
      var yes = this.props.yes+"123";
      this.setState({itemlist:list,yes:yes});
    }
    componentDidMount(){
      this.listener = DeviceEventEmitter.addListener('change1', () => {
        this.change1();
          })
        this.listener = DeviceEventEmitter.addListener('change2', () => {
          this.change2();
          })
        this.listener = DeviceEventEmitter.addListener('change3', () => {
          this.change3()
          })
    }
    componentWillUnmount() {
      //移除监听
      if (this.listener) {
        this.listener.remove();
      }
    }
    render(){
      console.log(this.props.userId);
        return(
            <View>
                <Header
                leftComponent={<ItemMenu change1={this.change1}change2={this.change2}change3={this.change3}/>}
                centerComponent={{ text: '商 店 列 表', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{icon:'home',color:"#fff"}}/>  
                <SearchBar round={true}
          placeholder="商 店 名"
        />
          
<ScrollView style={{marginBottom:150}}>
    <View>
<Text  style={{marginTop:10,textAlign:'center',fontSize:20,
    color:'#0080ff'}}>-- 推荐商家 --</Text>
    <View>
  {
    this.state.itemlist.map((item, i) => (
      <ShopItem 
      storeId={item.storeDTO.key}
      userId={this.props.userId}
      info={item.storeDTO}
        key={item.storeDTO.key}
        storeName={item.storeDTO.storeName}
        address={item.storeDTO.address}
        contact={item.storeDTO.contact}
        distance={item.distance.toFixed(2)}
        sales={item.sales}
        score={item.score}
        navigation={this.props.navigation}
      />
    ))
  }</View>
  </View>
        </ScrollView>
        <PushMessage/>
        </View>)}
}