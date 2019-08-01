import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Text,Image,Icon,Button, Divider,Rating} from 'react-native-elements'
import {ScrollView,View,Dimensions,StyleSheet,DeviceEventEmitter} from 'react-native'
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
import SideMenu from 'react-native-side-menu'
import LeftMenu from './test/Test1'
import styles from 'react-native-side-menu/build/styles';
let {width,height} = Dimensions.get('window');
const style1 = StyleSheet.create({
  container: {
      backgroundColor: '#F5FCFF',
  },

});
var list2=[];
var list=[];
export default class StoreGradeShow extends Component{
  constructor(props){
    super(props);

    this.state={
        isOpen:false,
        text:'',
        storeId:-1,
        itemlist:list,
        classlist:list2,
    }

    
}
componentWillMount(){
   var storeId = this.props.navigation.state.params.storeId;
   var url="http://192.168.1.59:8080/grade/show?storeId="+storeId;
   axios.get(url).then((response)=>{
       list = response.data;
       this.setState({itemlist:list});
   }).catch((e)=>{
       console.log(e);
   })
}
render() {
  var storeName= this.props.navigation.state.params.storeName;
  var address = this.props.navigation.state.params.address;
  var contact = this.props.navigation.state.params.contact;
    return (
      
          <View style={style1.container}>
          <Header
          backgroundColor={"#0399d3"}
                leftComponent={<Icon name='arrow-back' color='#fff'
                onPress={() => this.props.navigation.goBack()}/>}
                centerComponent={{ text: '商 店 评 价', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{icon:'home',color:"#fff"}}/>  

          <ScrollView style={{marginBottom:100,marginTop:20}}>
    <View>
    <View style={{alignItems:"center"}}>
            <Image source={require('../images/dianpu.jpg')} style={{width:80,height:80}}/>
            <Text  style={{textAlign:'center',fontSize:25,
    color:'#000000'}}>{storeName}</Text></View>
    <Text  style={{textAlign:'center',fontSize:20,
    color:'#000000'}}>{address}</Text>
    <View style={{marginLeft:40,marginRight:40,flexDirection:'row'}}>
        <Text style={{fontSize:15}}>手机 {contact}</Text>
        <Text style={{fontSize:15,marginLeft:30}}>营业 09:00-21:00</Text>
    </View>
<Text  style={{marginTop:10,textAlign:'center',fontSize:20,
    color:'#0080ff'}}>评价列表</Text>
    <View>
  {
    this.state.itemlist.map((item, i) => {
      return(
        <View >
      <ListItem 
        key={item.key}
        title={item.userName}
        subtitle={<View style={{flexDirection:"row"}}><Rating readonly imageSize={15} startingValue={item.score}/><Text style={{fontSize:13}}> {item.score}</Text></View>}
        rightTitle={<Text style={{fontSize:13}}>{item.createDate.substring(0,10)}</Text>}
        rightSubtitle={<Text style={{fontSize:13}}>{item.content}</Text>}
        leftIcon={<Image source={require('../images/touxiang1.jpg')} style={{width:30,height:30}}/>}
      />
      <Divider style={{backgroundColor:"blue",marginLeft:10,marginRight:10}}/>
      </View>)
     } )
  }</View>
  </View>
        </ScrollView>
        
        </View>
        
    );
}
    
}

