import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Text,Image,Icon } from 'react-native-elements'
import {ScrollView,View} from 'react-native'
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
const list1 = [
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
var list=[];
export default class Goodslist extends Component{
    constructor(props){
        super(props);
        state={
            text:'',
            storeId:-1,
            itemlist:list
        }
    }
    componentWillMount(){
      var id =  this.props.navigation.state.params.storeId;
      var url='http://192.168.1.59:9000/stores/'+id+'/commodities';
      axios.get(url).then((response)=>{
        list = response.data;
        this.setState({itemlist:list,storeId:id});
          console.log(temp);
        console.log(this.state.itemlist[0].commodityPicUrls[0]);
      }).catch(function(error){
        console.log(error);
      })
      this.setState({itemlist:list});
    }
    handler(){
      this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'GoodsDetail' })
        ],
      }))
    }
    render(){
      var info =  this.props.navigation.state.params.info;
      var storeId =  this.props.navigation.state.params.storeId;;
      var storeName= this.props.navigation.state.params.info.storeName
        return(
          <View>
                <Header
                leftComponent={<Icon name='arrow-back' color='#fff'
                onPress={() => this.props.navigation.goBack()}/>}
                centerComponent={{ text: '商 品 列 表', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{icon:'home',color:"#fff"}}/>  
                <SearchBar round={true}
          placeholder="商 品 名"
        />
        
              
<ScrollView style={{marginBottom:170,marginTop:20}}>
    <View>
    <View style={{alignItems:"center"}}>
            <Image source={require('../images/dianpu.jpg')} style={{width:80,height:80}}/>
            <Text  style={{textAlign:'center',fontSize:25,
    color:'#000000'}}>{info.storeName}</Text></View>
    <Text  style={{textAlign:'center',fontSize:20,
    color:'#000000'}}>{info.address}</Text>
    <View style={{marginLeft:40,marginRight:40,flexDirection:'row'}}>
        <Text style={{fontSize:15}}>手机 {info.contact}</Text>
        <Text style={{fontSize:15,marginLeft:30}}>营业 09:00-21:00</Text>
    </View>
<Text  style={{marginTop:10,textAlign:'center',fontSize:20,
    color:'#0080ff'}}>商品列表</Text>
    <View>
  {
    this.state.itemlist.map((item, i) => {
      var name = item.commodityCoverPicUrl;
      return(
      <ListItem onPress={() => {
        this.props.navigation.navigate('GoodsDetail', {
          goodsId:item.key,
          storeId:this.state.storeId,
          storeName:storeName,
          userId:this.props.navigation.state.params.userId
        });
      }}
        key={item.key}
        title={item.commodityInfo}
        subtitle={<Text>{item.price}¥</Text>}
        rightTitle={item.onShelves?"有货":"无货"}
        leftIcon={<Image source={{uri:name}}style={{width: 50, height: 50}}/>}
      />)
     } )
  }</View>
  </View>
        </ScrollView>
        </View>
            )}
}
