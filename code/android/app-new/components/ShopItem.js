import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Image,Text, Button,Divider,AirbnbRating,Overlay,Input,Rating } from 'react-native-elements'
import {ScrollView,View,DeviceEventEmitter} from 'react-native'
import { Card, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
StoreRating(){
  this.props.navigation.navigate('StoreGradeShow',{storeId:this.props.storeId,contact:this.props.contact,address:this.props.address,storeName:this.props.storeName});
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
      var tempdis = "相距"+this.props.distance+"km";
      return(
<View>
        <WingBlank>
          <Card>
            <TouchableOpacity onPress={()=>{
      this.props.navigation.navigate('Goodslist',{storeId:this.props.storeId,info:this.props.info,userId:this.props.userId})
    }}>
            <Card.Header
              title={<View style={{marginLeft:5}}><Text style={{fontSize:18}}>{this.props.storeName}</Text></View>}
              thumbStyle={{ width: 40, height: 40 }}
              thumb={<Image source={require("../images/dianpu.jpg")}  style={{width:40,height:40} }/>}
              extra={<View style={{flexDirection:'row-reverse'}}><Text style={{color:"#A0A0A0"}}>{tempdis}</Text></View>}
            /></TouchableOpacity>
            <Card.Body>
              <View style={{ height: 42 }}>
              <View style={{flexDirection:'row',marginLeft:16}}>
                <Rating readonly imageSize={15} startingValue={this.props.score}/>
                <Text style={{fontSize:13}}> {this.props.score}</Text>
                <Text style={{fontSize:13}}>    月售{this.props.sales}份</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:16,flex:1}}>
                  <View style={{flex:0.70}}>
                  <Text style={{fontSize:13}}>电话: {this.props.contact}</Text>
                  <Text style={{fontSize:13}}>地址: {this.props.address}</Text>
                  </View>
                  <View style={{flex:0.26}}>
                  <Button onPress={this.StoreRating.bind(this)} title="商店评价" type="outline"/>
                  </View>
                </View>
              </View>
            </Card.Body>
            <Card.Footer
              content=""
              extra=""
            />
          </Card>
        </WingBlank>
        <WhiteSpace /></View>);
    }
  }