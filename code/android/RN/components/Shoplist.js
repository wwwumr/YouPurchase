import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Image,Text } from 'react-native-elements'
import {ScrollView,View} from 'react-native'
const list = [
  {
    title: 'Appointments',
    icon: 'av-timer',
    address:'华山路',
    phone:'18039859163',
    businiess:'09:00--21:00'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff',
    address:'华山路',
    phone:'18039859163',
    businiess:'09:00--21:00'
  },
  {
    title: 'Appointments',
    icon: 'av-timer',
    address:'华山路',
    phone:'18039859163',
    businiess:'09:00--21:00'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff',
    address:'华山路',
    phone:'18039859163',
    businiess:'09:00--21:00'
  },
  {
    title: 'Appointments',
    icon: 'av-timer',
    address:'华山路',
    phone:'18039859163',
    businiess:'09:00--21:00'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff',
    address:'华山路',
    phone:'18039859163',
    businiess:'09:00--21:00'
  },
  {
    title: 'Appointments',
    icon: 'av-timer',
    address:'华山路',
    phone:'18039859163',
    businiess:'09:00--21:00'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff',
    address:'华山路',
    phone:'18039859163',
    businiess:'09:00--21:00'
  },
  {
    title: 'Appointments',
    icon: 'av-timer',
    address:'华山路',
    phone:'18039859163',
    businiess:'09:00--21:00'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff',
    address:'华山路',
    phone:'18039859163',
    businiess:'09:00--21:00'
  },
  {
    title: 'Appointments',
    icon: 'av-timer',
    address:'华山路',
    phone:'18039859163',
    businiess:'09:00--21:00'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff',
    address:'华山路',
    phone:'18039859163',
    businiess:'09:00--21:00'
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
        key={i}
        title={item.title}
        subtitle={item.address}
        rightTitle={item.phone}
        rightSubtitle={item.businiess}
        leftIcon={{ name: item.icon }}
      />
    ))
  }</View>
  </View>
        </ScrollView>
        </View>)}
}