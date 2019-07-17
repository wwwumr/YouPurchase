import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Image,Text, Button,Divider,AirbnbRating,Overlay,Input } from 'react-native-elements'
import {ScrollView,View} from 'react-native'
export default class OrderItem extends Component{
    constructor(props){
      super(props);
      this.state={
          isVisible:false
      }
    }
    handler1(){
        this.setState({isVisible:false});
    }
    handler(){
        this.setState({isVisible:true})
    }
    render(){
      return(
  <View style={{marginTop:20,backgroundColor:"#ffffff"}}>
      <View style={{marginLeft:10,marginRight:10}}>
    <ListItem
    leftIcon={this.props.leftIcon}
    title={<Text style={{fontSize:18}}>{this.props.storeName}</Text>}
    subtitle={<Text style={{fontSize:13}}>{this.props.time}</Text>}
    rightTitle={<Text style={{fontSize:15}}>{this.props.orderStatus}</Text>}/>
    <Divider style={{backgroundColor:"blue",marginBottom:5,marginLeft:35}}/>
    <ListItem
    title={<Text style={{marginLeft:35,fontSize:15}}>{this.props.orderItemName}</Text>}
    rightTitle={<Text style={{fontSize:15,fontWeight:"bold",fontFamily: 'System'}}>￥{this.props.totalPrice}</Text>}/>
    <Divider style={{backgroundColor:"blue",marginBottom:5}}/>
    <ListItem
    rightIcon={<Button title="评价" type="outline" onPress={this.handler.bind(this)}/>}/>
    </View>
    <Overlay
                 isVisible={this.state.isVisible}
                >
                <Text h3 style={{textAlign:'center',color:'#0080ff'}}>订 单 评 价</Text>
                <View style={{marginTop:50,marginBottom:10}}>
                <AirbnbRating/>
                </View>
                <View style={{marginTop:30}}>
                <Input 
                onChangeText={(value) => this.setState({pingyu: value})}
                value={this.state.pingyu}
                    placeholder='请 输 入评 价'
                     leftIcon={
                        <Image
                            source={require('../images/pingyu.jpg')}
                           style={{ width: 30, height: 30 }}
                     />}
                            /></View>
                            <View style={{marginLeft:50,marginRight:50,marginTop:50}}>
                <Button title="确定"/></View>
                <View style={{marginRight:50,marginLeft:50,marginTop:10}}>
                <Button  title = "关闭"onPress={this.handler1.bind(this)}/></View>        
               </Overlay>
  </View>
      );
    }
  }