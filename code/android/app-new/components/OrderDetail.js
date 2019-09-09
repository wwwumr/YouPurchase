import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Text,Image,Icon,Divider,Overlay, Input,AirbnbRating } from 'react-native-elements'
import {ScrollView,View,DeviceEventEmitter,Alert,Dimensions,ToastAndroid} from 'react-native'
import axios from 'axios';
import { MapView, MapTypes, Geolocation } from 'react-native-baidu-map';
import Item from './Item';
import OrderItem from './OrderItem';
import { List, TextareaItem,Button } from '@ant-design/react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import config from '../components/config/config';
import {
  Modal,
  WhiteSpace,
  WingBlank,
  Toast,
  Provider,
} from '@ant-design/react-native';
const {height, width} = Dimensions.get('window');
/**
 * @description OrderDetail
 * @constructor
 */
export default class OrderDetail extends Component{
    constructor(props){
      super(props);
      this.state={
        yes:"",
        isVisible:false,
        content:"",
        score:3,
        isPress:this.props.navigation.state.params.judged,
        visible1:false
      }
    }
    /**
     * @description 用户打分函数
     * @param {*} rating 用户评分1--5
     */
    ratingCompleted(rating) {
      this.setState({score:rating})
      console.log("Rating is: " + rating)
    }
    /**
     * @description 生命周期函数
     */
    componentWillReceiveProps(){
      var yes=this.state.yes+="123";
      this.setState({yes:yes,isPress:this.props.navigation.state.params.judged});
    }
    /**
     * @description 用户提交评价
     */
    submit(){
      var time= new Date();
      var year = time.getFullYear();
      var month = time.getMonth()+1;
      if(month<10)month="0"+month;
        var day = time.getDate();
      if(day<10) day="0"+day;
        var hour = time.getHours();
      if(hour<10) hour="0"+hour;
        var min = time.getMinutes();
      if(min<10) min ="0"+min;
        var second = time.getSeconds();
      if(second<10) second="0"+second;
      var currentTime = ""+year+"-"+month+"-"+day+" "+hour+":"+min+":"+second;
      var content = this.state.content;
      var orderInfoId = this.props.navigation.state.params.orderInfoId;
      var score = this.state.score;
      var userId = this.props.navigation.state.params.userId;
      var storeId = this.props.navigation.state.params.storeId;
      if(content==''){
        ToastAndroid.show('请输入评价',ToastAndroid.SHORT);
        return;
      }
      axios.post(config.url+'grade/add',{createDate:currentTime,content:content,orderInfoId:orderInfoId,score:score,userId:userId,storeId:storeId})
      .then((response)=> {
        var responseData = response.data;
        console.log(responseData);
        
        if(responseData==200){
          this.setState({isPress:true,visible1:false})
          ToastAndroid.show('评价成功',ToastAndroid.SHORT);
          DeviceEventEmitter.emit('change');
        }
        else 
          ToastAndroid.show('请勿重复评价',ToastAndroid.SHORT);
      })
      .catch(function (error) {
        ToastAndroid.show('评价失败',ToastAndroid.SHORT);
        console.log(error);
      });
      this.setState({isPress:false})
    }
    /**
     * @description 打开地图页面
     */
    getMap(){
      if(this.props.navigation.state.params.mapjudged)
      {
        ToastAndroid.show('订单未在配送',ToastAndroid.SHORT);
        return;
      }
      axios.post(config.url3+'order/carrier',{partner_order_code:"123"})
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
        this.props.navigation.navigate('Map',{tarAddress:tarAddress,
          carrierAddress:carrierAddress,
          address:this.props.navigation.state.params.tarAddress,
          phone:phone
        })
    })
    .catch(function (error) {
      ToastAndroid.show('网络异常',ToastAndroid.SHORT);
      console.log(error);
    }); 
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
      var uri = this.props.navigation.state.params.uri;
      return(
        <Provider>
          <View style={{backgroundColor:"#F8F8F8"}}> 
            <View style={{backgroundColor:"#F8F8F8",height:height*0.055,flexDirection:'row',marginTop:15}}>
            <View style={{marginLeft:10}}>
              <TouchableOpacity
                onPress={()=>{
                  this.props.navigation.goBack();
                }}
              >
                <Icon
                  name='chevron-left'
                  size={30}
                  color='#3399ff'
                />
              </TouchableOpacity>
            </View>
            </View>
            <ScrollView style={{backgroundColor:"#F8F8F8",marginBottom:50}}>
              <View>
                <Text style={{fontSize:24,
                  marginLeft:10,
                  marginBottom:5}}
                >{orderStatus}
                </Text>
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
                    marginLeft:10,
                    marginRight:10}}
                  >   
                    <Text style={{fontSize:17,
                      marginBottom:5,
                      fontWeight:"bold",
                      fontFamily: 'System',
                      marginTop:10}}
                    >感谢您对优邻购的信任，期待再次光临
                    </Text>
                     <View style={{marginTop:4,
                      alignItems:'center',
                      height:30,
                      borderColor:"#A0A0A0",
                      borderWidth:1,
                      borderRadius:5,
                      width:70,
                      marginBottom:10}}
                    >
                    <TouchableOpacity onPress={()=>{
                      if(this.state.isPress){
                        if(orderStatus == '订单已送达'){
                          ToastAndroid.show('订单已评价',ToastAndroid.SHORT);
                          return;
                        }
                        else{
                          ToastAndroid.show('订单未完成无法评价',ToastAndroid.SHORT);
                          return;
                        }
                      }
                      this.setState({visible1:true});
                    }}>
                    <Text style={{fontSize:13,marginTop:4}}>评价订单</Text>
                    </TouchableOpacity>
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
                  <View style={{backgroundColor:"#ffffff",
                    marginLeft:10,
                    marginRight:10}}
                  >
                    <ListItem 
                      leftIcon={<Image source={{uri:config.url2+uri}} style={{width:30,height:30}}/>}
                      title={<Text style={{fontSize:17,fontWeight:"bold",fontFamily: 'System'}}>{storeName}</Text>} 
                    />
                    <Divider style={{ backgroundColor: '#D0D0D0',height:0.7 }}/>   
                    <View>
                    {
                      OrderItemList.map((item, i) => (
                      <View>
                        <ListItem
                          key={i}
                          leftAvatar={<Image source={{uri:config.url2+item.commodityCoverPicUrl}} style={{width:30,height:30}}/>}
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
                      <Text style={{fontSize:17,
                        marginBottom:10,
                        fontWeight:"bold",
                        fontFamily: 'System'}}>{"实付￥"+totalPrice}
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
                    <Text style={{fontSize:15,marginTop:5,marginBottom:5}}>{"顾客姓名："+tarPeople}</Text>
                    <Text style={{fontSize:15,marginTop:5,marginBottom:5}}>{"顾客电话："+tarPhone}</Text>
                    <Text style={{fontSize:15,marginTop:5,marginBottom:5}}>{"送货地址："+tarAddress}</Text>
                    <Divider style={{ backgroundColor: '#D0D0D0',height:0.7 }}/> 
                    <View style={{flexDirection:'row',flex:1,marginBottom:10}}>
                    <View>
                    <Text style={{fontSize:15,marginTop:5,marginBottom:5}}>配送方式：商家配送</Text></View>
                    <View style={{marginLeft:50}}>
                      <View style={{marginTop:4,
                        alignItems:'center',
                        height:30,
                        borderColor:"#A0A0A0",
                        borderWidth:1,
                        borderRadius:5,
                        width:70}}
                      >
                      <TouchableOpacity onPress={this.getMap.bind(this)}>
                        <Text style={{fontSize:13,marginTop:4}}>订单跟踪</Text>
                      </TouchableOpacity>
                      </View>
                    </View>
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
              <View style={{height:height*0.055,flexDirection:'row',marginTop:15}}>
                <View style={{marginLeft:10}}>
                  <Text style={{fontSize:20}}>订单评价</Text>
                </View>
              </View>
              <AirbnbRating
                onFinishRating={this.ratingCompleted.bind(this)}
              />
              <Divider style={{marginTop:5,height:1,backgroundColor:'#D0D0D0'}}/>
              <TextareaItem 
                rows={4} 
                placeholder="请输入评价" 
                count={100}
                onChange={(value)=>{
                  this.setState({content:value});
                }} 
              />
              <Divider style={{marginBottom:5,height:1,backgroundColor:'#D0D0D0'}}/>
              <View style={{marginLeft:20,marginRight:20,marginBottom:20}}>
                <Button type="primary" onPress={()=>{
                  this.submit();}
                }>
                  确定
                </Button>
              </View>
              </Modal>
            </View>
        </Provider>
        );
    }
}