import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Text,Image,Icon,Divider,Button,Overlay, Input,AirbnbRating } from 'react-native-elements'
import {ScrollView,View} from 'react-native'
import axios from 'axios';
import Item from './Item';
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
            isVisible:false,
            pingyu:""
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
            <View> 
                <Header
                leftComponent={<Icon name='arrow-back' color='#fff'
                onPress={() => this.props.navigation.goBack()}/> }
                centerComponent={{ text: '订 单 详 情', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{icon:'home',color:"#fff"}}/>
                <ScrollView style={{backgroundColor:"#E8E8E8",marginTop:15,marginBottom:100}}>
                <View >
                <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10}}>
                        <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10}}>
                     <Text 
                    style={{fontSize:30}}>订单已送达 ></Text>
                    <Divider style={{marginTop:15,marginBottom:15,backgroundColor: 'blue'}}/>
                    <Text 
                    style={{fontSize:18,marginBottom:15}}>感谢您对优邻购的信任，期待再次光临</Text>
                    <View style={{marginRight:200,marginBottom:15}}>
                    <Button title="评价" onPress={this.handler.bind(this)}
                         type="outline"/></View>
                         </View>
                 </View>
                 <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10,marginTop:15}}>
                        <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10}}>
                        <ListItem leftIcon={<Image source={require('../images/dianpu.jpg')} style={{width:30,height:30}}/>}
                        title={"水果店1"} rightTitle={">"}/>
                        <Divider style={{backgroundColor:"blue",marginBottom:5}}/>
                        <Divider style={{backgroundColor:"blue",marginBottom:5}}/>    
                        <View>
                        {
                            list1.map((item, i) => (
                             <ListItem
                                 key={i}
                                leftAvatar={item.icon}
                                title={item.title}
                                subtitle={item.number}
                                rightSubtitle={item.money}
                            />
                            ))
                        }   
                        </View>
                        <Divider style={{backgroundColor:"blue",marginBottom:5}}/>
                        <Divider style={{backgroundColor:"blue",marginBottom:5}}/>    
                        <View style={{alignItems:"flex-end"}}>
                        <Text style={{fontSize:20,marginBottom:15}}>实付 ￥52.3</Text></View>
                         </View>
                 </View>
                 <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10,marginTop:15}}>
                        <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10}}>
                     <Text style={{fontSize:18,color:"#484848",marginTop:5,marginBottom:5}}>配送信息</Text>
                     <Divider style={{backgroundColor:"blue",marginTop:5,marginBottom:5}}/>
                     <Text style={{fontSize:15,color:"#484848",marginTop:5,marginBottom:5}}>顾客姓名：李小明</Text>
                     <Text style={{fontSize:15,color:"#484848",marginTop:5,marginBottom:5}}>顾客电话：123123123</Text>
                     <Text style={{fontSize:15,color:"#484848",marginTop:5,marginBottom:5}}>送货地址：上海交通大学</Text>
                     <Divider style={{backgroundColor:"blue",marginTop:5,marginBottom:5}}/>
                     <Text style={{fontSize:15,color:"#484848",marginTop:5,marginBottom:5}}>配送方式：商家配送</Text>
                         </View>
                 </View>
                 <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10,marginTop:15,marginBottom:10}}>
                        <View
                    style={{backgroundColor:"#ffffff",marginLeft:10,marginRight:10}}>
                     <Text style={{fontSize:18,color:"#484848",marginTop:5,marginBottom:5}}>订单信息</Text>
                     <Divider style={{backgroundColor:"blue",marginTop:5,marginBottom:5}}/>
                     <Text style={{fontSize:15,color:"#484848",marginTop:5,marginBottom:5}}>订单号： 350000111</Text>
                     <Text style={{fontSize:15,color:"#484848",marginTop:5,marginBottom:5}}>下单时间：2019-07-01</Text>
                         </View>
                 </View>
                </View>
                </ScrollView>
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