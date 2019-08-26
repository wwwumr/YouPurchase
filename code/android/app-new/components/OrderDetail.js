import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Text,Image,Icon,Divider,Button,Overlay, Input,AirbnbRating } from 'react-native-elements'
import {ScrollView,View,DeviceEventEmitter,Alert} from 'react-native'
import axios from 'axios';
import { MapView, MapTypes, Geolocation } from 'react-native-baidu-map';
import Item from './Item';
import OrderItem from './OrderItem';
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
export default class OrderDetail extends Component{
    constructor(props){
        super(props);
        this.state={
          yes:"",
            isVisible:false,
            content:"",
            score:-1,
            isPress:this.props.navigation.state.params.judged
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
            axios.post('http://192.168.0.100:9002/order/carrier',{partner_order_code:"123"})
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
            <View> 
                <Header
                leftComponent={<Icon name='arrow-back' color='#fff'
                onPress={() => {this.props.navigation.goBack();
                } }/> }
                centerComponent={{ text: '订 单 详 情', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{icon:'home',color:"#fff"}}/>
                <ScrollView style={{backgroundColor:"#E8E8E8",marginTop:15,marginBottom:100}}>
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
                <Overlay
                 isVisible={this.state.isVisible}
                >
                <Text h3 style={{textAlign:'center',color:'#0080ff'}}>订 单 评 价</Text>
                <View style={{marginTop:50,marginBottom:10}}>
                <AirbnbRating
                   onFinishRating={this.ratingCompleted.bind(this)}
                />
                </View>
                <View style={{marginTop:30}}>
                <Input 
                onChangeText={(value) => this.setState({content: value})}
                value={this.state.content}
                    placeholder='请 输 入评 价'
                     leftIcon={
                        <Image
                            source={require('../images/pingyu.jpg')}
                           style={{ width: 30, height: 30 }}
                     />}
                            /></View>
                            <View style={{marginLeft:50,marginRight:50,marginTop:30}}>
                <Button onPress={this.submit.bind(this)} title="确定"/></View>
                <View style={{marginRight:50,marginLeft:50,marginTop:10}}>
                <Button title = "关闭"onPress={this.handler1.bind(this)}/></View>        
               </Overlay>
                </View>
        );
    }
}