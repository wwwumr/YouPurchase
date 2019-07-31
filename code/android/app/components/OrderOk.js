import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Text,Image,Icon,Divider,Button,Overlay, Input,AirbnbRating,StyleSheet } from 'react-native-elements'
import {ScrollView,View,DeviceEventEmitter,Alert,TouchableOpacity,} from 'react-native'
import axios from 'axios';
import { MapView, MapTypes, Geolocation } from 'react-native-baidu-map';
import Item from './Item';
import OrderItem from './OrderItem';
import {commonStyle} from './commonStyle'
const list1 = [
    {
      title: '苹果',
      icon: <Image source={require('../images/fruit/apple_pic.png')} style={{width:30,height:30}}/>,
      money:2,
      number:2
    },
    {
      title: '香蕉',
      icon: <Image source={require('../images/fruit/banana_pic.png')} style={{width:30,height:30}}/>,
      money:3,
      number:2
    },
    {
      title: '樱桃',
      icon: <Image source={require('../images/fruit/cherry_pic.png')} style={{width:30,height:30}}/>,
      money:4,
      number:2
    },
    {
      title: '葡萄',
      icon: <Image source={require('../images/fruit/grape_pic.png')} style={{width:30,height:30}}/>,
      money:5,
      number:2
    },
    {
      title: '芒果',
      icon: <Image source={require('../images/fruit/mango_pic.png')} style={{width:30,height:30}}/>,
      money:20,
      number:2
    },
    {
      title: '橙子',
      icon: <Image source={require('../images/fruit/orange_pic.png')} style={{width:30,height:30}}/>,
      money:20,
      number:2
    },
    {
      title: '香梨',
      icon: <Image source={require('../images/fruit/pear_pic.png')} style={{width:30,height:30}}/>,
      money:20,
      number:2
    },
    {
      title: '菠萝',
      icon: <Image source={require('../images/fruit/pineapple_pic.png')} style={{width:30,height:30}}/>,
      money:20,
      number:2
    },
    {
      title: '草莓',
      icon: <Image source={require('../images/fruit/strawberry_pic.png')} style={{width:30,height:30}}/>,
      money:20,
      number:2
    },
    {
      title: '西瓜',
      icon: <Image source={require('../images/fruit/watermelon_pic.png')} style={{width:30,height:30}}/>,
      money:20,
      number:2
    }
  ]
export default class OrderOk extends Component{
    constructor(props){
        super(props);
        this.state={
          yes:"",
          orderItemlist:[],
          shopName:"",
          total:0
        }
    }
    componentWillMount(){
        var orderItemlist = this.props.navigation.state.params.orderItemlist;
        var shopName = this.props.navigation.state.params.shopName;
        var total = this.props.navigation.state.params.total;
        console.log(orderItemlist)
        this.setState({
            orderItemlist:orderItemlist,
            shopName:shopName,
            total:total
        })
    }
    render(){
        return(
            <View style={{flex:1}}> 
            <View style={{flex:0.2}}> 
                <Header
                leftComponent={<Icon name='arrow-back' color='#fff'
                onPress={() => {this.props.navigation.goBack();
                } }/> }
                centerComponent={{ text: '确定订单', style: { color: '#fff',fontSize:20 } }}
                /></View>
                <ScrollView style={{backgroundColor:"#E8E8E8",marginTop:15,marginBottom:10,flex:0.7}}>
                <View >
                <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10}}>
                        <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10}}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('AddAddress',{})}}>
                     <Text 
                    style={{fontSize:30}}> {"选择收货地址 >"}</Text></TouchableOpacity>
                    <Divider style={{marginTop:15,marginBottom:15,backgroundColor: 'blue'}}/>
                    <View style={{flexDirection:"row"}}>
                    <Text 
                    style={{fontSize:16,marginBottom:15}}>送达时间</Text><View style={{marginLeft:150}}><Text style={{fontSize:16,marginBottom:15}}>尽快送达</Text></View></View>
                   <Divider style={{backgroundColor: 'blue',marginTop:0,marginBottom:10}}/>
                   <View style={{flexDirection:"row"}}>
                    <Text 
                    style={{fontSize:16,marginBottom:15}}>支付方式</Text><View style={{marginLeft:150}}><Text style={{fontSize:16,marginBottom:15}}>在线支付</Text></View></View>
                         </View>
                 </View>
                 <View

                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10,marginTop:15}}>
                        <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10}}>
                        <ListItem leftIcon={<Image source={require('../images/dianpu.jpg')} style={{width:30,height:30}}/>}
                        title={this.state.shopName} rightTitle={">"}/>
                        <Divider style={{backgroundColor:"blue",marginBottom:5}}/>
                        <Divider style={{backgroundColor:"blue",marginBottom:5}}/>    
                        <View>
                        {
                            this.state.orderItemlist.map((item, i) =>{ return(
                                <View>
                             <ListItem
                                 key={i}
                                leftAvatar={<Image source={{uri:item.itemimg}} style={{width:30,height:30}}/>}
                                title={item.commodityInfo}
                                subtitle={"x "+item.quantity}
                                rightSubtitle={"￥ "+item.itemPrice}
                            />
                            <Divider style={{backgroundColor:"blue",marginLeft:10,marginRight:10}}/>
                            </View>
                            )})
                        }   
                        </View>
                        <Divider style={{backgroundColor:"blue",marginBottom:5,marginTop:10,marginLeft:10,marginRight:10}}/>    
                        <View style={{alignItems:"flex-end"}}>
                        <Text style={{fontSize:20,marginBottom:15}}>{"小计 ￥"+this.state.total}</Text></View>
                         </View>
                 </View>
                 <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10,marginTop:15,marginBottom:10}}>
                        <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10}}>
                     <Text style={{fontSize:18,color:"#484848",marginTop:5,marginBottom:5}}>订单信息</Text>
                     <Divider style={{backgroundColor:"blue",marginTop:5,marginBottom:5}}/>
                     <Text style={{fontSize:15,color:"#484848",marginTop:5,marginBottom:5}}>{"联系人：   王志远"}</Text>
                     <Text style={{fontSize:15,color:"#484848",marginTop:5,marginBottom:5}}>{"电话:      18039859163"}</Text>
                     <Text style={{fontSize:15,color:"#484848",marginTop:5,marginBottom:5}}>{"地址:      上海交通大学"}</Text>
                         </View>
                 </View>
                </View>
                </ScrollView>
                <View style={{flex:0.1}}>
          <View style={{ 
    height: commonStyle.cellHeight,
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    flex:1
  }}>
      <View style={{flex:0.65}}>

          <Text style={{marginHorizontal: 10}}>合计:
            <Text style={{color: commonStyle.red}}>{"￥"+this.state.total}</Text>
          </Text>
          </View>
          <View style={{flex:0.35}}>
          <TouchableOpacity>
          <View style={{width: 120, backgroundColor: commonStyle.red, alignItems: commonStyle.center, justifyContent: commonStyle.center, height: commonStyle.cellHeight}}>
            <Text style={{color: commonStyle.white}}>去支付</Text>
          </View>
          </TouchableOpacity></View></View>
          </View>
                </View>
        );
    }
}