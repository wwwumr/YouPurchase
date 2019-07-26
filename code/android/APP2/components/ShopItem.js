import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Image,Text, Button,Divider,AirbnbRating,Overlay,Input,Rating } from 'react-native-elements'
import {ScrollView,View,DeviceEventEmitter} from 'react-native'
export default class ShopItem extends Component{
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
      this.props.navigation.navigate('OrderDetail',{orderStatus:this.props.orderStatus,leftIcon:this.props.leftIcon,
        storeName:this.props.storeName,orderItemList:this.props.orderItemList,judged:this.props.judged,
      totalPrice:this.props.totalPrice,tarPeople:this.props.tarPeople,tarPhone:this.props.tarPhone,
      tarAddress:this.props.tarAddress,createData:this.props.time,
      orderInfoId:this.props.orderInfoId,storeId:this.props.storeId,userId:this.props.userId
    });
  }
  componentWillReceiveProps(){
    var yes=this.state.yes+="123";
    this.setState({yes:yes});
  }
    render(){
      return(
  <View style={{marginTop:20,marginBottom:10,backgroundColor:"#ffffff"}}>
      <View style={{marginLeft:10,marginRight:10}}>
    <ListItem
    leftIcon={<Image source={require("../images/dianpu.jpg")}  style={{width:40,height:40} }/>}
    title={<Text style={{fontSize:18}}>水果店1</Text>}
    subtitle={<View style={{flexDirection:'row'}}><Rating readonly imageSize={15} startingValue={3.3}/><Text style={{fontSize:13}}> 3.3</Text><Text style={{fontSize:13}}>    月销量130</Text><Text style={{fontSize:13}}>    距离4km</Text></View>}
    />
    <Divider style={{backgroundColor:"blue",marginLeft:55}}/>
    <ListItem
    leftAvatar={<View style={{width:40,height:40}}/>}
    title={<Text>电话：18039859163</Text>}
    subtitle={<Text style={{fontSize:13}}>环山路</Text>}
    rightTitle={<View style={{height:10,width:100}}><Button type="outline" title="进入店铺"/></View>}/>
    </View>
  </View>
      );
    }
  }