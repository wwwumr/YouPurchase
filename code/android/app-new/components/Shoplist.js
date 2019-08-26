import React, {Component} from 'react'
import { ListItem,Header,Image,Text } from 'react-native-elements'
import {ScrollView,View,DeviceEventEmitter,Alert} from 'react-native';
import ItemMenu from '../components/Menu';
import ShopItem from '../components/ShopItem';
import { Tabs,SearchBar } from '@ant-design/react-native';
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import axios from 'axios'
import PushMessage from './PushMessage';
var list = [
];
var list1=[];
var list2=[];
const tabs = [
  { title: '距离优先',index:1 },
  { title: '销量优先',index:2 },
  { title: '好评优先',index:3 },
];
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
      var url = "http://192.168.0.100:9000/stores/sort";
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
                list.sort(function(item1,item2){
                  return item1.distance-item2.distance;
              })
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
      var url = "http://192.168.0.100:9000/stores/sort";
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
                list.sort(function(item1,item2){
                  return item1.distance-item2.distance;
              })
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
            <View style={{ flex: 1,backgroundColor:"#F8F8F8" }}>
                <Header
                leftComponent={<ItemMenu change1={this.change1}change2={this.change2}change3={this.change3}/>}
                centerComponent={{ text: '商 店 列 表', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{icon:'home',color:"#fff"}}/>  
                <SearchBar defaultValue="hello" placeholder="搜索" />
     <Tabs tabs={tabs} onChange={(tab)=>{
         if(tab.index ==1) this.change1();
         if(tab.index == 2) this.change2();
         if(tab.index == 3) this.change3(); 
     }}>
      <View >
      <ScrollView style={{marginBottom:5}}>
    <View>
<Text  style={{marginTop:10,textAlign:'center',fontSize:20,
    color:'#585858'}}>-- 推荐商家 --</Text>
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
      </View>
      <View >
      <ScrollView style={{marginBottom:5}}>
    <View>
<Text  style={{marginTop:10,textAlign:'center',fontSize:20,
    color:'#585858'}}>-- 推荐商家 --</Text>
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
      </View>
      <View >
      <ScrollView style={{marginBottom:5}}>
    <View>
<Text  style={{marginTop:10,textAlign:'center',fontSize:20,
    color:'#585858'}}>-- 推荐商家 --</Text>
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
      </View></Tabs>    
        <PushMessage/>
</View>)}
 /* render(){
    
    return(<View style={{ flex: 1 }}><Tabs tabs={tabs}>
      <View >
        <Text>Content of First Tab</Text>
      </View>
      <View >
        <Text>Content of Second Tab</Text>
      </View>
      <View >
        <Text>Content of Third Tab</Text>
      </View></Tabs></View>)
  }*/
}