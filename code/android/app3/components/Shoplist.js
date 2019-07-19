import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Image,Text } from 'react-native-elements'
import {ScrollView,View} from 'react-native'
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import axios from 'axios'
var list = [
]
export default class ShopList extends Component{
    constructor(props){
        super(props);
        state={
            text:'',
            itemlist:list
        }
    }
    handler(){
      this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Goodslist' })
        ],
      }))
    }
    componentWillMount(){
      axios.get("http://192.168.1.19:9000/stores").then((response)=>{
        list = response.data;
        this.setState({itemlist:list});
        console.log(this.state.itemlist);
        
      }).catch(function(error){
        console.log(error);
      })
      this.setState({itemlist:list});
    }
    render(){
      console.log(this.props.userId);
        return(
            <View>
                <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: '商 店 列 表', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{icon:'home',color:"#fff"}}/>  
                <SearchBar round={true}
          placeholder="商 店 名"
        />
          
<ScrollView style={{marginBottom:150}}>
    <View>
<Text  style={{marginTop:10,textAlign:'center',fontSize:20,
    color:'#0080ff'}}>-- 推荐商家 --</Text>
    <View>
  {
    this.state.itemlist.map((item, i) => (
      <ListItem onPress={() => {
        this.props.navigation.navigate('Goodslist', {
          storeId:item.key,
          info:item,
          userId:this.props.userId
        });
      }}
        key={item.key}
        title={item.storeName}
        subtitle={item.address}
        rightTitle={<Text style={{fontSize:13}}>{item.contact}</Text>}
        rightSubtitle={item.hours[1]}
        leftIcon={{ name: item.coverPicUrl }}
      />
    ))
  }</View>
  </View>
        </ScrollView>
        </View>)}
}