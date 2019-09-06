import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Image,Text, Button,Divider,AirbnbRating,Overlay,Input,Rating } from 'react-native-elements'
import {ScrollView,View,DeviceEventEmitter,Dimensions} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Drawer, List  } from '@ant-design/react-native';
const {height, width} = Dimensions.get('window');
export default class OrderItem extends Component{
    constructor(props){
      super(props);
      this.state={
        yes:"",
          content:"",
          score:-1,
          isVisible:false
      }
    }    
ratingCompleted(rating) {
  this.setState({score:rating})
  console.log("Rating is: " + rating)
}
    handler1(){
        this.setState({isVisible:false});
    }
    handler(){
        this.setState({isVisible:true})
    }
    handler3(){
      console.log("Hello World!");
      if(this.props.status!=0)
      this.props.navigation.navigate('OrderDetail',{orderStatus:this.props.orderStatus,leftIcon:this.props.leftIcon,
        storeName:this.props.storeName,orderItemList:this.props.orderItemList,judged:this.props.judged,
      totalPrice:this.props.totalPrice,tarPeople:this.props.tarPeople,tarPhone:this.props.tarPhone,
      tarAddress:this.props.tarAddress,createData:this.props.time,
      tarLongitude:this.props.tarLongitude,tarLatitude:this.props.tarLatitude,orderNo:this.props.orderNo,
      orderInfoId:this.props.orderInfoId,storeId:this.props.storeId,userId:this.props.userId,mapjudged:this.props.mapjudged
    });
    else{
      var orderItemList = this.props.orderItemList;
      var templist=[];
      for(var i=0;i<orderItemList.length;i++){
        var tempitem={};
        tempitem.itemimg = orderItemList[i].commodityCoverPicUrl;
        tempitem.itemName = orderItemList[i].commodityInfo;
        tempitem.quantity = orderItemList[i].amount;
        tempitem.itemPrice = orderItemList[i].price;
        tempitem.itemId = orderItemList[i].commodityId;
        templist.push(tempitem);
      }
      this.props.navigation.navigate('OrderOk2',{tarPeople:this.props.tarPeople,tarPhone:this.props.tarPhone,orderNo:this.props.orderNo,createData:this.props.time,
        orderStatus:this.props.orderStatus,userId:this.props.userId,
        tarAddress:this.props.tarAddress,orderItemlist:templist,shopName:this.props.storeName,total:this.props.totalPrice,orderInfoId:this.props.orderInfoId});
    }
  }
  componentWillReceiveProps(){
    var yes=this.state.yes+="123";
    this.setState({yes:yes});
  }
    render(){
      return(
  <View style={{marginTop:20,marginBottom:10,backgroundColor:"#ffffff",borderWidth:1,borderColor:"#f0f0f0"}}>
    
      <View style={{marginLeft:10,marginRight:10}}>
    <ListItem
    leftIcon={
      <Image source={require("../images/dianpu.jpg")} style={{width:30,height:30}}/>
    }
    rightSubtitle={<View><Text style={{fontSize:13,color:'#ffffff'}}>123   </Text></View>}
    title={<Text style={{fontSize:15}}>{this.props.storeName}</Text>}
    subtitle={<Text style={{fontSize:13,color:'#B0B0B0'}}>{this.props.time}</Text>}
    rightTitle={<Text style={{fontSize:15}}>{this.props.orderStatus}</Text>}/>
    <View style={{flexDirection:'row'}}>
      <View style={{width:width*0.7}}>
      <Text style={{marginLeft:60,fontSize:13}}>{this.props.orderItemName}</Text></View>
      <View style={{width:width*0.3,flexDirection:'row-reverse'}}>
      <Text style={{fontSize:13,fontWeight:"bold",fontFamily: 'System',marginRight:40}}>￥{this.props.totalPrice}</Text>
      </View>
    </View>
    <View  style={{ width:width,flexDirection:'row-reverse',height:40,marginTop:10}}>
        <View style={{
          borderColor:"#A0A0A0",
          borderWidth:1,
          borderRadius:5,
          marginRight:40,
          width:60,marginBottom:10
          
        }}>
          <View style={{marginTop:4,alignItems:'center'}}>
            <TouchableOpacity onPress={
              this.handler3.bind(this)
            }>
          <Text style={{fontSize:13}}>{this.props.status==0?"去支付":"详情"}</Text>
          </TouchableOpacity></View>
        </View>
      </View>
    </View>
  </View>
      );
    }
  }