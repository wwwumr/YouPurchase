import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Text,Image,Icon,Divider,Button,Overlay, Input,AirbnbRating } from 'react-native-elements'
import {ScrollView,View,DeviceEventEmitter,Alert,Dimensions} from 'react-native'
import axios from 'axios';
import { MapView, MapTypes, Geolocation } from 'react-native-baidu-map';
import Item from './Item';
import OrderItem from './OrderItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Modal,
  WhiteSpace,
  WingBlank,
  Toast,
  Provider,
} from '@ant-design/react-native';
const {height, width} = Dimensions.get('window');
export default class OrderDetail extends Component{
    constructor(props){
        super(props);
        this.state={
          yes:"",
            isVisible:false,
            content:"",
            score:-1,
            isPress:this.props.navigation.state.params.judged,
            visible1:false
        }
    }
    ratingCompleted(rating) {
      this.setState({score:rating})
      console.log("Rating is: " + rating)
    }
    componentWillReceiveProps(){
      var yes=this.state.yes+="123";
      this.setState({yes:yes,isPress:this.props.navigation.state.params.judged});
    }
    submit(){
      var createData = this.props.navigation.state.params.createData
      var content = this.state.content;
      var orderInfoId = this.props.navigation.state.params.orderInfoId;
      var score = this.state.score;
      var userId = this.props.navigation.state.params.userId;
      var storeId = this.props.navigation.state.params.storeId;
      if(score==-1) {
        Alert.alert("请评分！");
        return;
      }
      axios.post('http://192.168.0.100:8080/grade/add',{createDate:createData,content:content,orderInfoId:orderInfoId,score:score,userId:userId,storeId:storeId})
      .then((response)=> {
        var responseData = response.data;
        console.log(responseData);
        
        if(responseData==200)
        {
          Alert.alert("评价成功！");
          DeviceEventEmitter.emit('change');
          this.setState({isPress:true})
        }
        else 
        Alert.alert("您已成功评论！");
      })
      .catch(function (error) {
        console.log(error);
      });
      this.setState({isPress:false})
    }
    handler1(){
        this.setState({isVisible:false});
    }
    handler(){
        this.setState({isVisible:true})
    }
    getMap(){
            axios.post('http://192.168.0.102:9002/order/carrier',{partner_order_code:"123"})
               .then((response)=> {
                 var tarAddress={};
                 tarAddress['longitude']=this.props.navigation.state.params.tarLongitude;
                 tarAddress['latitude'] = this.props.navigation.state.params.tarLatitude;
                   var responseData = response.data;
                   console.log(responseData);
                   var carrierAddress ={};
                   carrierAddress['longitude']=responseData.data.latitude;
                   carrierAddress['latitude'] = responseData.data.longitude;
                   var phone = responseData.data.carrierPhone;
                   console.log(carrierAddress);
                   this.props.navigation.navigate('Map',{tarAddress:tarAddress,carrierAddress:carrierAddress,address:this.props.navigation.state.params.tarAddress,phone:phone})
    })
    .catch(function (error) {
      console.log(error);
    }); 
    }
    render1(){
      var orderStatus = this.props.navigation.state.params.orderStatus
      var judged = this.props.navigation.state.params.judged
      var storeName = this.props.navigation.state.params.storeName
      var leftIcon = this.props.navigation.state.params.leftIcon
      var OrderItemList = this.props.navigation.state.params.orderItemList
      var totalPrice = this.props.navigation.state.params.totalPrice
      var tarPeople = this.props.navigation.state.params.tarPeople
      var tarAddress = this.props.navigation.state.params.tarAddress
      var tarPhone = this.props.navigation.state.params.tarPhone
      
      var orderInfoId = this.props.navigation.state.params.orderInfoId
      var createData = this.props.navigation.state.params.createData
      var mapjudged = this.props.navigation.state.params.mapjudged
      var orderNo = this.props.navigation.state.params.orderNo;
        return(
            <View> 
                <Header
                leftComponent={<Icon name='arrow-back' color='#fff'
                onPress={() => {this.props.navigation.goBack();
                } }/> }
                centerComponent={{ text: '订 单 详 情', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{icon:'home',color:"#fff"}}/>
                <ScrollView style={{backgroundColor:"#E8E8E8",marginBottom:80}}>
                <View >
                <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10}}>
                        <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10}}>
                     <Text 
                    style={{fontSize:30}}> {orderStatus+ ">"}</Text>
                    <Divider style={{marginTop:15,marginBottom:15,backgroundColor: 'blue'}}/>
                    <Text 
                    style={{fontSize:18,marginBottom:15}}>感谢您对优邻购的信任，期待再次光临</Text>
                    <View style={{marginRight:200,marginBottom:15}}>
                    <Button disabled={this.state.isPress} title="评价" onPress={this.handler.bind(this)}
                         type="outline"/></View>
                         </View>
                 </View>
                 <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10,marginTop:15}}>
                        <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10}}>
                        <ListItem leftIcon={leftIcon}
                        title={storeName} rightTitle={">"}/>
                        <Divider style={{backgroundColor:"blue",marginBottom:5}}/>
                        <Divider style={{backgroundColor:"blue",marginBottom:5}}/>    
                        <View>
                        {
                            OrderItemList.map((item, i) => (
                             <ListItem
                                 key={i}
                                leftAvatar={<Image source={{uri:item.commodityCoverPicUrl}} style={{width:30,height:30}}/>}
                                title={item.commodityInfo}
                                subtitle={"x "+item.amount}
                                rightSubtitle={"￥ "+item.price}
                            />
                            ))
                        }   
                        </View>
                        <Divider style={{backgroundColor:"blue",marginBottom:5}}/>
                        <Divider style={{backgroundColor:"blue",marginBottom:5}}/>    
                        <View style={{alignItems:"flex-end"}}>
                        <Text style={{fontSize:20,marginBottom:15}}>{"实付 ￥"+totalPrice}</Text></View>
                         </View>
                 </View>
                 <View 
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10,marginTop:15}}>
                        <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10}}>
                     <Text style={{fontSize:18,color:"#484848",marginTop:5,marginBottom:5}}>配送信息</Text>
                     <Divider style={{backgroundColor:"blue",marginTop:5,marginBottom:5}}/>
                     <Text style={{fontSize:15,color:"#484848",marginTop:5,marginBottom:5}}>{"顾客姓名："+tarPeople}</Text>
                     <Text style={{fontSize:15,color:"#484848",marginTop:5,marginBottom:5}}>{"顾客电话："+tarPhone}</Text>
                     <Text style={{fontSize:15,color:"#484848",marginTop:5,marginBottom:5}}>{"送货地址："+tarAddress}</Text>
                     <Divider style={{backgroundColor:"blue",marginTop:5,marginBottom:5}}/>
                     <View style={{flexDirection:'row',flex:1}}>
                       <View>
                     <Text style={{fontSize:15,color:"#484848",marginTop:5,marginBottom:5}}>配送方式：商家配送</Text></View>
                     <View style={{marginLeft:50}}><Button disabled={mapjudged} onPress={this.getMap.bind(this)} type="outline" title="详情"/></View>
                     </View>
                         </View>
                 </View>
                 <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10,marginTop:15,marginBottom:10}}>
                        <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10}}>
                     <Text style={{fontSize:18,color:"#484848",marginTop:5,marginBottom:5}}>订单信息</Text>
                     <Divider style={{backgroundColor:"blue",marginTop:5,marginBottom:5}}/>
                     <Text style={{fontSize:15,color:"#484848",marginTop:5,marginBottom:5}}>{"订单号： "+orderNo}</Text>
                     <Text style={{fontSize:15,color:"#484848",marginTop:5,marginBottom:5}}>{"下单时间 "+createData}</Text>
                         </View>
                 </View>
                </View>
                </ScrollView>
                <Modal
                  transparent={false}
                  visible={this.state.visible1}
                  animationType="slide-up"
                  onClose={()=>{this.setState({visible1:false})}}
                >
                  <AirbnbRating
                   onFinishRating={this.ratingCompleted.bind(this)}
                />
                  <Button type="primary" onPress={()=>{this.setState({visible1:false})}}>
                    close modal
                  </Button>
                </Modal>
                
              </View>
        );
    }
    render(){
      var orderStatus = this.props.navigation.state.params.orderStatus
      var judged = this.props.navigation.state.params.judged
      var storeName = this.props.navigation.state.params.storeName
      var leftIcon = this.props.navigation.state.params.leftIcon
      var OrderItemList = this.props.navigation.state.params.orderItemList
      var totalPrice = this.props.navigation.state.params.totalPrice
      var tarPeople = this.props.navigation.state.params.tarPeople
      var tarAddress = this.props.navigation.state.params.tarAddress
      var tarPhone = this.props.navigation.state.params.tarPhone
      
      var orderInfoId = this.props.navigation.state.params.orderInfoId
      var createData = this.props.navigation.state.params.createData
      var mapjudged = this.props.navigation.state.params.mapjudged
      var orderNo = this.props.navigation.state.params.orderNo;
        return(
          <Provider>
            <View style={{backgroundColor:"#F8F8F8"}}> 
                <View style={{backgroundColor:"#F8F8F8",height:height*0.055,flexDirection:'row',marginTop:15}}>
            <View style={{marginLeft:10}}>
              <TouchableOpacity>
            <Icon
              name='chevron-left'
              size={30}
              color='#3399ff'
        /></TouchableOpacity>
            </View>
        </View>
                <ScrollView style={{backgroundColor:"#F8F8F8",marginBottom:50}}>
                <View>
                <Text 
                    style={{fontSize:24,marginLeft:10,marginBottom:5}}>{orderStatus}</Text>
                <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10,borderColor:'#ffffff',borderRadius:5,borderWidth:1}}>
                        <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10}}>
                     
                    <Text 
                    style={{fontSize:17,marginBottom:5,fontWeight:"bold",fontFamily: 'System',marginTop:10}}>感谢您对优邻购的信任，期待再次光临</Text>
                     <View style={{marginTop:4,alignItems:'center',height:30,borderColor:"#A0A0A0",
          borderWidth:1,
          borderRadius:5,width:70,marginBottom:10}}>
            <TouchableOpacity onPress={()=>{this.setState({visible1:true})}}>
          <Text style={{fontSize:13,marginTop:4}}>评价订单</Text>
          </TouchableOpacity></View>
                         </View>
                 </View>
                 <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10,marginTop:15,borderColor:'#ffffff',borderRadius:5,borderWidth:1}}>
                        <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10}}>
                        <ListItem leftIcon={<Image source={require("../images/dianpu.jpg")} style={{width:30,height:30}}/>}
                        title={<Text style={{fontSize:17,fontWeight:"bold",fontFamily: 'System'}}>{storeName}</Text>} />
                         <Divider style={{ backgroundColor: '#D0D0D0',height:0.7 }}/>   
                        <View>
                        {
                            OrderItemList.map((item, i) => (
                              <View>
                             <ListItem
                                 key={i}
                                leftAvatar={<Image source={{uri:item.commodityCoverPicUrl}} style={{width:30,height:30}}/>}
                                title={<Text style={{fontSize:15}}>{item.commodityInfo}</Text>}
                                subtitle={<Text style={{fontSize:13,color:"#606060"}}>{"x"+item.amount}</Text>}
                                rightSubtitle={<Text style={{fontSize:13,color:"#606060"}}>{"￥ "+item.price}</Text>}
                            />
                            <Divider style={{ backgroundColor: '#f0f0f0',height:0.7 }}/> 
                            </View>
                            ))
                        }   
                        </View>
                        <Divider style={{ backgroundColor: '#D0D0D0',height:0.9,marginBottom:5,marginTop:5 }}/>   
                        <View style={{alignItems:"flex-end"}}>
                        <Text style={{fontSize:17,marginBottom:10,fontWeight:"bold",fontFamily: 'System'}}>{"实付￥"+totalPrice}</Text></View>
                         </View>
                 </View>
                 <View 
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10,marginTop:15,borderColor:'#ffffff',borderRadius:5,borderWidth:1}}>
                        <View
                    style={{marginLeft:10,marginRight:10}}>
                     <Text style={{fontSize:17,marginTop:10,marginBottom:5,fontWeight:"bold",fontFamily: 'System'}}>配送信息</Text>
                     <Divider style={{ backgroundColor: '#D0D0D0',height:0.7 }}/> 
                     <Text style={{fontSize:15,marginTop:5,marginBottom:5}}>{"顾客姓名："+tarPeople}</Text>
                     <Text style={{fontSize:15,marginTop:5,marginBottom:5}}>{"顾客电话："+tarPhone}</Text>
                     <Text style={{fontSize:15,marginTop:5,marginBottom:5}}>{"送货地址："+tarAddress}</Text>
                     <Divider style={{ backgroundColor: '#D0D0D0',height:0.7 }}/> 
                     <View style={{flexDirection:'row',flex:1,marginBottom:10}}>
                       <View>
                     <Text style={{fontSize:15,marginTop:5,marginBottom:5}}>配送方式：商家配送</Text></View>
                     <View style={{marginLeft:50}}><View style={{marginTop:4,alignItems:'center',height:30,borderColor:"#A0A0A0",
          borderWidth:1,
          borderRadius:5,width:70}}>
            <TouchableOpacity onPress={this.getMap.bind(this)}>
          <Text style={{fontSize:13,marginTop:4}}>订单跟踪</Text>
          </TouchableOpacity></View></View>
                     </View>
                         </View>
                 </View>
                 <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10,marginTop:15,marginBottom:10,borderColor:'#ffffff',borderRadius:5,borderWidth:1}}>
                        <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10}}>
                     <Text style={{fontSize:17,marginTop:10,marginBottom:5,fontWeight:"bold",fontFamily: 'System'}}>订单信息</Text>
                     <Divider style={{ backgroundColor: '#D0D0D0',height:0.7 }}/> 
                     <Text style={{fontSize:15,marginTop:5,marginBottom:5}}>{"订单号：  "+orderNo}</Text>
                     <Text style={{fontSize:15,marginTop:5,marginBottom:10}}>{"下单时间  "+createData}</Text>
                         </View>
                 </View>
                </View>
                </ScrollView>
                <Modal
                  transparent={false}
                  visible={this.state.visible1}
                  animationType="slide-up"
                  onClose={()=>{this.setState({visible1:false})}}
                >
                  <AirbnbRating
                   onFinishRating={this.ratingCompleted.bind(this)}
                />
                  <Button type="primary" onPress={()=>{this.setState({visible1:false})}}>
                    close modal
                  </Button>
                </Modal>
                </View>
                </Provider>
        );
    }
}