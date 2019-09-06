import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Text,Image,Icon,Divider,Button,Overlay, Input,AirbnbRating,StyleSheet } from 'react-native-elements'
import {ScrollView,View,DeviceEventEmitter,Alert,TouchableOpacity,ToastAndroid,Dimensions} from 'react-native'
import axios from 'axios';
import { MapView, MapTypes, Geolocation } from 'react-native-baidu-map';
import Item from './Item';
import OrderItem from './OrderItem';
import {commonStyle} from './commonStyle';
import { List } from '@ant-design/react-native';
const{height,width} = Dimensions.get('window');
export default class OrderOk2 extends Component{
    constructor(props){
        super(props);
        this.state={
          yes:"",
          orderItemlist:[],
          shopName:"",
          total:0,
          userId:-1,
          name:"",
          phone:"",
          address:"",
          isVisible:false
        }
    }
    componentWillMount(){
        var orderItemlist = this.props.navigation.state.params.orderItemlist;
        var shopName = this.props.navigation.state.params.shopName;
        var total = this.props.navigation.state.params.total;
        var userId = this.props.navigation.state.params.userId;
        var address=this.props.navigation.state.params.tarAddress;
        var phone = this.props.navigation.state.params.tarPhone;
        var name = this.props.navigation.state.params.tarPeople;
        console.log(orderItemlist)
        this.setState({
            orderItemlist:orderItemlist,
            shopName:shopName,
            total:total,
            userId:userId,
            name:name,
            address:address,
            phone:phone,
            sex:''
        })
    }
    submit(){
        var orderInfoId = this.props.navigation.state.params.orderInfoId;
        console.log(orderInfoId);
        this.setState({isVisible:false});
        axios.post("http://192.168.0.100:8080/order/pay",{createDate:"2018-01-01 00:00:00",payId:orderInfoId,status:1,totalPrice:this.state.total})
        .then((response)=>{
            if(response.data == 200){
                ToastAndroid.show("成功付款",ToastAndroid.SHORT);
                DeviceEventEmitter.emit('changeOrder');
                this.props.navigation.goBack();
            }
            else{
                ToastAndroid.show("支付失败",ToastAndroid.SHORT);
            }
        }).catch(e=>{
            console.log(e);
        })
        
    }
    delete(){
      var orderInfoId = this.props.navigation.state.params.orderInfoId;
      var userId = this.props.navigation.state.params.userId;
      var url = "http://192.168.0.101:8080/order/userDelete?orderInfoId="+orderInfoId+"&userId="+userId;
      axios.get(url)
        .then((response)=>{
                ToastAndroid.show("取消订单",ToastAndroid.SHORT);
                DeviceEventEmitter.emit('changeOrder');
                this.props.navigation.goBack();
        }).catch(e=>{
          ToastAndroid.show("网络异常",ToastAndroid.SHORT);
            console.log(e);
        })
    }
    render(){
      var userId = this.props.navigation.state.params.userId;
      var orderNo = this.props.navigation.state.params.orderNo;
      var createData = this.props.navigation.state.params.createData;
      var orderStatus = this.props.navigation.state.params.orderStatus;
        return(
            <View style={{flex:1,backgroundColor:'#F8F8F8'}}> 
            <View style={{flex:0.1}}> 
        <View style={{flexDirection:"row",marginLeft:10,marginTop:25}}>
          <View>
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
          </View>
                </View>
                <ScrollView style={{backgroundColor:"#F8F8F8",marginTop:15,marginBottom:10,flex:0.8}}>
                <View >
                <Text style={{fontSize:24,
                  marginLeft:10,
                  marginBottom:5}}
                >{orderStatus}</Text>
                <View
                  style={{backgroundColor:"#ffffff",
                    marginLeft:10,
                    marginRight:10,
                    borderColor:'#ffffff',
                    borderRadius:5,
                    borderWidth:1}
                  }
                >
                  <View style={{backgroundColor:"#ffffff",
                   }}
                  >   
          <List.Item wrap={true}
          >
          <Text style={{fontSize:17,
                      marginBottom:5,
                      fontWeight:"bold",
                      fontFamily: 'System',
                      marginTop:10}}
                    >
                      {this.state.address}
                    </Text>
          </List.Item>
          <List.Item extra={'在线支付'}>
            支付方式
          </List.Item>
                    
                  </View>
                 </View>
                 <View
                    style={{backgroundColor:"#ffffff",
                      marginLeft:10,
                      marginRight:10,
                      marginTop:15,
                      borderColor:'#ffffff',
                      borderRadius:5,
                      borderWidth:1
                    }}
                  >
                  <View style={{backgroundColor:"#ffffff",
                    marginLeft:10,
                    marginRight:10}}
                  >
                    <ListItem 
                      leftIcon={<Image source={require("../images/dianpu.jpg")} style={{width:30,height:30}}/>}
                      title={<Text style={{fontSize:17,fontWeight:"bold",fontFamily: 'System'}}>{this.state.shopName}</Text>} 
                    />
                    <Divider style={{ backgroundColor: '#D0D0D0',height:0.7 }}/>   
                    <View>
                    {
                      this.state.orderItemlist.map((item, i) => (
                      <View>
                        <ListItem
                          key={i}
                          leftAvatar={<Image source={{uri:item.itemimg}} style={{width:30,height:30}}/>}
                          title={<Text style={{fontSize:15}}>{item.itemName}</Text>}
                          subtitle={<Text style={{fontSize:13,color:"#606060"}}>{"x"+item.quantity}</Text>}
                          rightSubtitle={<Text style={{fontSize:13,color:"#606060"}}>{"￥ "+item.itemPrice}</Text>}
                        />
                        <Divider style={{ backgroundColor: '#f0f0f0',height:0.7 }}/> 
                      </View>
                      ))
                    }   
                    </View>
                    <Divider style={{ backgroundColor: '#D0D0D0',height:0.9,marginBottom:5,marginTop:5 }}/>   
                    <View style={{alignItems:"flex-end"}}>
                      <Text style={{fontSize:17,
                        marginBottom:10,
                        fontWeight:"bold",
                        fontFamily: 'System'}}>{"小计￥"+this.state.total}
                      </Text>
                    </View>
                  </View>
                  </View>
                  <View 
                    style={{backgroundColor:"#ffffff",
                      marginLeft:10,
                      marginRight:10,
                      marginTop:15,
                      borderColor:'#ffffff',
                      borderRadius:5,
                      borderWidth:1
                    }}
                  >
                  <View style={{marginLeft:10,marginRight:10}}>
                    <Text style={{fontSize:17,marginTop:10,marginBottom:5,fontWeight:"bold",fontFamily: 'System'}}>配送信息</Text>
                    <Divider style={{ backgroundColor: '#D0D0D0',height:0.7 }}/> 
                    <Text style={{fontSize:15,marginTop:5,marginBottom:5}}>{"顾客姓名："+this.state.name+""+this.state.sex}</Text>
                    <Text style={{fontSize:15,marginTop:5,marginBottom:5}}>{"顾客电话："+this.state.phone}</Text>
                    <Text style={{fontSize:15,marginTop:5,marginBottom:5}}>{"送货地址："+this.state.address}</Text>
                    <Divider style={{ backgroundColor: '#D0D0D0',height:0.7 }}/> 
                    <View style={{flexDirection:'row',flex:1,marginBottom:10}}>
                    <View>
                    <Text style={{fontSize:15,marginTop:5,marginBottom:5}}>配送方式：商家配送</Text></View>
                    </View>
                  </View>
                </View>
                <View
                    style={{backgroundColor:"#ffffff",
                      marginLeft:10,
                      marginRight:10,
                      marginTop:15,
                      marginBottom:10,
                      borderColor:'#ffffff',
                      borderRadius:5,
                      borderWidth:1}
                    }
                  >
                  <View style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10}}>
                     <Text style={{fontSize:17,marginTop:10,marginBottom:5,fontWeight:"bold",fontFamily: 'System'}}>订单信息</Text>
                     <Divider style={{ backgroundColor: '#D0D0D0',height:0.7 }}/> 
                     <Text style={{fontSize:15,marginTop:5,marginBottom:5}}>{"订单号：   "+orderNo}</Text>
                    <Text style={{fontSize:15,marginTop:5,marginBottom:10}}>{"下单时间:  "+createData}</Text>
                  </View>
                  </View>
                </View>
                </ScrollView>
                <View style={{flex:0.1,borderTopWidth:0.1,
                  borderTopColor:'#D0D0D0'}}>
          <View style={{ 
    height: commonStyle.cellHeight,
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    flex:1
  }}>
      <View style={{flex:0.35}}>

          <Text style={{marginHorizontal: 20}}>合计:
            <Text style={{color: commonStyle.red}}>{"￥"+this.state.total}</Text>
          </Text>
          </View>
          <View style={{flex:0.30}}>
          <View style={{width: width*0.30,  borderWidth:1,borderColor:'#A0A0A0',alignItems: commonStyle.center, justifyContent: commonStyle.center, height: commonStyle.cellHeight}}>
            <TouchableOpacity onPress={this.delete.bind(this)}>
            <Text >删除订单</Text></TouchableOpacity>
          </View>
          
          </View>
          <View style={{flex:0.35}}>
          <TouchableOpacity>
          <View style={{width: 120, backgroundColor: commonStyle.red, alignItems: commonStyle.center, justifyContent: commonStyle.center, height: commonStyle.cellHeight}}>
            <TouchableOpacity onPress={this.submit.bind(this)}>
            <Text style={{color: commonStyle.white}}>去支付</Text></TouchableOpacity>
          </View>
          </TouchableOpacity></View></View>
          </View>
          <Overlay isVisible={this.state.isVisible}>
          <Text h3 style={{textAlign:'center'}}>确认付款</Text>
          <View style={{marginTop:150}}>
                <Text h3 style={{textAlign:'center'}}>{"￥"+this.state.total}</Text>
                <View style={{marginLeft:10,marginRight:10}}><Button title="立即付款" onPress={this.submit.bind(this)}/></View>
                <View style={{marginTop:20,marginLeft:10,marginRight:10}}><Button title="取消付款" onPress={()=>{this.setState({isVisible:false});}}/></View>
                </View>
          </Overlay>
                </View>
        );
    }
}