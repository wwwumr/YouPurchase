import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Image,Text } from 'react-native-elements'
import {ScrollView,View} from 'react-native'
const list = [
  {
    title: '苹果',
    icon: <Image source={require('../images/fruit/apple_pic.png')} style={{width:30,height:30}}/>,
    money:2
  },
  {
    title: '香蕉',
    icon: <Image source={require('../images/fruit/banana_pic.png')} style={{width:30,height:30}}/>,
    money:3
  },
  {
    title: '樱桃',
    icon: <Image source={require('../images/fruit/cherry_pic.png')} style={{width:30,height:30}}/>,
    money:4
  },
  {
    title: '葡萄',
    icon: <Image source={require('../images/fruit/grape_pic.png')} style={{width:30,height:30}}/>,
    money:5
  },
  {
    title: '芒果',
    icon: <Image source={require('../images/fruit/mango_pic.png')} style={{width:30,height:30}}/>,
    money:20
  },
  {
    title: '橙子',
    icon: <Image source={require('../images/fruit/orange_pic.png')} style={{width:30,height:30}}/>,
    money:20
  },
  {
    title: '香梨',
    icon: <Image source={require('../images/fruit/pear_pic.png')} style={{width:30,height:30}}/>,
    money:20
  },
  {
    title: '菠萝',
    icon: <Image source={require('../images/fruit/pineapple_pic.png')} style={{width:30,height:30}}/>,
    money:20
  },
  {
    title: '草莓',
    icon: <Image source={require('../images/fruit/strawberry_pic.png')} style={{width:30,height:30}}/>,
    money:20
  },
  {
    title: '西瓜',
    icon: <Image source={require('../images/fruit/watermelon_pic.png')} style={{width:30,height:30}}/>,
    money:20
  }
]
export default class ShopList extends Component{
    constructor(props){
        super(props);
        state={
            text:'',
            itemlist:[]
        }
    }
    componentWillMount(){
        this.setState({
            itemlist:list
        })
    }
    render(){
        return(
            <View>
                <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: '水 果 店', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{icon:'home',color:"#fff"}}/>  
                <SearchBar round={true}
          placeholder="商 品 名"
        />
        
              
<ScrollView style={{marginBottom:170,marginTop:20}}>
    <View>
    <View style={{alignItems:"center"}}>
            <Image source={require('../images/dianpu.jpg')} style={{width:80,height:80}}/>
            <Text  style={{textAlign:'center',fontSize:25,
    color:'#000000'}}>水果店</Text></View>
    <Text  style={{textAlign:'center',fontSize:20,
    color:'#000000'}}>华山路</Text>
    <View style={{marginLeft:40,marginRight:40,flexDirection:'row'}}>
        <Text style={{fontSize:15}}>手机 18039859163</Text>
        <Text style={{fontSize:15,marginLeft:30}}>营业 09:00-21:00</Text>
    </View>
<Text  style={{marginTop:10,textAlign:'center',fontSize:20,
    color:'#0080ff'}}>商品列表</Text>
    <View>
  {
    this.state.itemlist.map((item, i) => (
      <ListItem 
        key={i}
        title={item.title}
        subtitle={<Text>{item.money}¥</Text>}
        rightTitle={"有货"}
        leftIcon={item.icon}
      />
    ))
  }</View>
  </View>
        </ScrollView>
        </View>)}
}