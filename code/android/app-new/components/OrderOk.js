import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Text,Image,Icon,Divider,Button,Overlay, Input,AirbnbRating,StyleSheet } from 'react-native-elements'
import {ScrollView,View,DeviceEventEmitter,Alert,TouchableOpacity,ToastAndroid} from 'react-native'
import axios from 'axios';
import { MapView, MapTypes, Geolocation } from 'react-native-baidu-map';
import Item from './Item';
import { List } from '@ant-design/react-native';
import OrderItem from './OrderItem';
import {commonStyle} from './commonStyle'
/**
 * @description 确认订单页面
 * @constructor
 */
export default class OrderOk extends Component{
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
          sex:"",
          deliveryAddressId:-1,
          orderPayId:-1,
          isVisible:false
        }
    }
    /**
     * @description 生命周期函数
     */
    componentWillMount(){
        var orderItemlist = this.props.navigation.state.params.orderItemlist;
        var shopName = this.props.navigation.state.params.shopName;
        var total = this.props.navigation.state.params.total;
        var userId = this.props.navigation.state.params.userId;
        var storeId = this.props.navigation.state.params.shopId;
        console.log(storeId);
        
        var url = 'http://192.168.1.19:9000/api/u/stores/'+storeId
        axios.get(url).then((response)=>{
          console.log(response);
          var responseData =response.data;
          if(responseData.coverPicUrl!=null){
            this.setState({
              orderItemlist:orderItemlist,
              shopName:shopName,
              total:total,
              userId:userId,
              address:'',
              title:'请选择收货地址',
              coverPicUrl:responseData.coverPicUrl
          })
          }else{
            ToastAndroid.show('出现异常');
            return;
          }
        }).catch((err)=>{
          ToastAndroid.show('网络异常',ToastAndroid.SHORT);
        })
    }
    /**
     * @description 设置对addAddress监听
     */
    componentDidMount() {
      //收到监听
      this.listener = DeviceEventEmitter.addListener('addAddress',(item)=>{
          this.change(item);
      });
  }
  /**
   * @description 当页面销毁时移除监听
   */
  componentWillUnmount(){
      // 移除监听 
      this.listener.remove();
  }
  /**
   * @description 提交订单
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
    console.log(currentTime);
    var deliveryAddressId = this.state.deliveryAddressId;
    var storeId = this.props.navigation.state.params.shopId;
    var tarAddress = this.state.address;
    var tarPeople= this.state.name;
    var tarPhone=this.state.phone;
    var total = this.props.navigation.state.params.total;
    var userId = this.props.navigation.state.params.userId;
    var templist=[];
    if(deliveryAddressId==-1) {Alert.alert("请先选择收货地址");return;}
    for(var i=0;i<this.state.orderItemlist.length;i++){
      var item=this.state.orderItemlist[i];
      console.log("ok Here!");
      var tempitem={};
      tempitem.amount = item.quantity;
      tempitem.commodityId=item.itemId;
      tempitem.price = item.itemPrice;
      templist.push(tempitem);
    }
    console.log(templist);
    console.log(deliveryAddressId);
    console.log(storeId);
    axios.post("http://192.168.1.19:8080/order/add",{createDate:currentTime,deliveryAddressId:deliveryAddressId,
    orderItemList:templist,storeId:storeId,tarAddress:tarAddress,tarPeople:tarPeople,tarPhone:tarPhone,totalPrice:total,userId:userId
  }).then((response)=>{
    console.log(response.data);
      var responseDate= response.data;
      if(responseDate.orderPayId){
        ToastAndroid.show("已生成订单",ToastAndroid.SHORT);
        this.setState({orderPayId:responseDate.orderPayId,isVisible:true});
        if(responseDate.shortageDTOS.length!=0){
          var id = responseDate.shortageDTOS[0].commodityId;
          var number = responseDate.shortageDTOS[0].actualRemaining;
          var name="";
          for(var i=0;i<this.state.orderItemlist.length;i++){
            if(id == this.state.orderItemlist[i].itemId){
              name = this.state.orderItemlist[i].commodityInfo;
              Alert.alert( ""+name+"库存只有"+number );
            }
          }
        }
      }else{
        ToastAndroid.show("订单生成失败",ToastAndroid.SHORT);
      }
  }).catch(e=>{
    console.log(e)
  })
  }
  /**
   * @description 进行付款
   */
  submit1(){
    var userId = this.props.navigation.state.params.userId;
    var orderInfoId = this.state.orderPayId;
    console.log(orderInfoId);
    this.setState({isVisible:false});
    axios.post("http://192.168.1.19:8080/order/pay",{createDate:"2018-01-01 00:00:00",payId:orderInfoId,status:1,totalPrice:this.state.total})
    .then((response)=>{
        if(response.data == 200){
            ToastAndroid.show("成功付款",ToastAndroid.SHORT);
            this.props.navigation.goBack();
        }
        else{
            ToastAndroid.show("支付失败",ToastAndroid.SHORT);
        }
    }).catch(e=>{
        console.log(e);
    })
    
}
/**
 * 
 * @param {json} item 地址
 * @description 监听事件响应函数 
 */
  change(item){
       this.setState({sex:item.sex,
        name:item.name,
        phone:item.contact,
        address:item.address,
        deliveryAddressId:item.deliveryAddressId,
        title:item.address})
  }
    render(){
      var userId = this.props.navigation.state.params.userId;
        return(
            <View style={{flex:1,backgroundColor:'#F8F8F8'}}> 
            <View style={{flex:0.1}}> 
        <View style={{flexDirection:"row",marginLeft:20,marginTop:25}}>
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
          <View style={{marginLeft:20}}>
            <Text style={{fontSize:20}}>确认订单</Text>
          </View>
          </View>
                </View>
                <ScrollView style={{backgroundColor:"#F8F8F8",marginTop:15,marginBottom:10,flex:0.8}}>
                <View >
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
                  <ListItem onPress={()=>{this.props.navigation.navigate('AddAddress',{userId:userId})}}
                   title={<Text style={{fontSize:17,
                    marginBottom:5,
                    fontWeight:"bold",
                    fontFamily: 'System',
                    marginTop:10}}
                  >
                    {this.state.title}
                  </Text>}
                  rightAvatar={<Icon
                    name='chevron-right'
                    size={30}
                    color='#3399ff'
                  />}
                  /> 
                  <Divider style={{backgroundColor:'#f0f0f0',height:0.7}}/>
                  <ListItem
                   title={<Text style={{fontSize:16}}>支付方式</Text>}
                   rightTitle={<Text style={{fontSize:16}}>在线支付</Text>}
                  />
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
                      leftIcon={<Image source={{uri:this.state.coverPicUrl}} style={{width:30,height:30}}/>}
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
                </View></View>
                </ScrollView>
                <View style={{flex:0.1,borderTopWidth:0.7,
                  borderTopColor:'#F0F0F0'}}>
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
            <TouchableOpacity onPress={this.submit.bind(this)}>
            <Text style={{color: commonStyle.white}}>去支付</Text></TouchableOpacity>
          </View>
          </TouchableOpacity></View></View>
          </View>
          <Overlay isVisible={this.state.isVisible}>
          <Text h3 style={{textAlign:'center'}}>确认付款</Text>
          <View style={{marginTop:150}}>
                <Text h3 style={{textAlign:'center'}}>{"￥"+this.state.total}</Text>
                <View style={{marginLeft:10,marginRight:10}}><Button title="立即付款" onPress={this.submit1.bind(this)}/></View>
                <View style={{marginTop:20,marginLeft:10,marginRight:10}}><Button title="取消付款" onPress={()=>{this.setState({isVisible:false});
                this.props.navigation.goBack();}}/></View>
                </View>
          </Overlay>
                </View>
        );
    }

}