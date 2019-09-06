import React, {Component} from 'react'
import { ListItem,Header,Image,Text,Icon, Divider } from 'react-native-elements'
import {ScrollView,View,DeviceEventEmitter,Alert,Dimensions,StyleSheet} from 'react-native';
import ItemMenu from '../components/Menu';
import ShopItem from '../components/ShopItem';
import { SearchBar,InputItem,Carousel } from '@ant-design/react-native';
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import axios from 'axios'
import PushMessage from './PushMessage';
import { TouchableOpacity } from 'react-native-gesture-handler';
var list = [
];
const {height, width} = Dimensions.get('window');
/**
 * @description ShopList
 * @constructor
 */
export default class ShopList extends Component{
  constructor(props){
    super(props);
    state={
      text:'',
      itemlist:list,
      center:{},
      tempvalue:'',
      yes:'',
      class:''
    }
  }
  /**
   * @description 按照距离排序
   */
  change1(){
    var list1 = list;
    list1.sort(function(item1,item2){
      return item1.distance-item2.distance;
    })
    this.setState({itemlist:list1,class:'距离优先'})
  }
  /**
   * @description 按照销量排序
   */
  change2(){
    var list1 = list;
    list1.sort(function(item1,item2){
      return item2.sales-item1.sales;
    })
    this.setState({itemlist:list1,class:'销量优先'})
  }
  /**
   * @description 按照评分排序
   */
  change3(){
    var list1 = list;
    list1.sort(function(item1,item2){
      return item2.score-item1.score;
    })
    this.setState({itemlist:list1,class:'评分优先'})
  }
  /**
   * @description 跳转到商品列表
   */
  handler(){
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Goodslist' })
      ],
    }))
  }
  /**
   * @description 生命周期函数
   */
  componentWillMount(){
    var tempcenter={};
    var url = "http://192.168.0.101:9000/stores/sort";
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
  /**
   * @description 生命周期函数
   */
  componentWillReceiveProps(){
    var tempcenter={};
    var url = "http://192.168.0.101:9000/stores/sort";
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
  /**
   * @description 生命周期函数--注册监听事件
   */
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
  /**
   * @description 生命周期函数--销毁页面时移除监听
   */
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
        <View style={{height:height*0.07,marginTop:15}}>
        <View style={{marginLeft:10}}>
          <Text style={{fontSize:20}}>商店列表</Text>
        </View>
        </View>
        <View style={{width:width,backgroundColor:'#F8F8F8',flexDirection:'row'}}>
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
            placeholder="商店名"
          >
            <Icon
              name="search"
              color={"#D0D0D0"}
              size={40}
            />
          </InputItem>
        </View>
        <TouchableOpacity>
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
        <View style={{marginLeft:20,flexDirection:'row'}}>
          <ItemMenu change1={this.change1}change2={this.change2}change3={this.change3}/>
          <View style={{marginTop:6}}>
            <Icon
              name='chevron-right'
              size={20}
              color={"#000000"}
            />
          </View>
          <Text style={{fontSize:15,marginLeft:5,marginTop:5}}>{this.state.class}</Text> 
        </View>
        <Divider style={{backgroundColor:"#D0D0D0",height:1,marginLeft:20,marginRight:20,marginBottom:5,marginTop:5}}/>
        <View >
        <ScrollView style={{marginBottom:145}}>
        <View>
        <Text  style={{marginTop:10,
            textAlign:'center',
            fontSize:20,
            color:'#585858',
            marginBottom:10}}>-- 推荐商品 --
          </Text>
        <Carousel
            style={styles.wrapper}
            selectedIndex={2}
            autoplay
            infinite
            afterChange={this.onHorizontalSelectedIndexChange}
          >
            <TouchableOpacity onPress={()=>{
              Alert.alert('red');
            }}>
            <View
              style={[styles.containerHorizontal, { backgroundColor: 'red' }]}
            >
              <Text>Carousel 1</Text>
            </View></TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              Alert.alert('blue');
            }}>
            <View
              style={[styles.containerHorizontal, { backgroundColor: 'blue' }]}
            >
              <Text>Carousel 2</Text>
            </View></TouchableOpacity>
            <View
              style={[
                styles.containerHorizontal,
                { backgroundColor: 'yellow' },
              ]}
            >
              <Text>Carousel 3</Text>
            </View>
            <View
              style={[styles.containerHorizontal, { backgroundColor: 'aqua' }]}
            >
              <Text>Carousel 4</Text>
            </View>
            <View
              style={[
                styles.containerHorizontal,
                { backgroundColor: 'fuchsia' },
              ]}
            >
              <Text>Carousel 5</Text>
            </View>
          </Carousel>
          <Text  style={{marginTop:10,
            textAlign:'center',
            fontSize:20,
            color:'#585858'}}>-- 推荐商家 --
          </Text>
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
          }
          </View>
        </View>
      </ScrollView>
    </View>
    <PushMessage/>
  </View>)
  }
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    marginLeft:10,
    marginRight:10
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  containerVertical: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
});