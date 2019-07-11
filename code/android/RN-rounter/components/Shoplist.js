import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Image,Text } from 'react-native-elements'
import {ScrollView,View} from 'react-native'
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
      <ListItem 
        key={item.key}
        title={item.storeName}
        subtitle={item.address}
        rightTitle={item.contact}
        rightSubtitle={item.hours[1]}
        leftIcon={{ name: item.coverPicUrl }}
      />
    ))
  }</View>
  </View>
        </ScrollView>
        </View>)}
}