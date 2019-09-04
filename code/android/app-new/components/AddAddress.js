import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, View,ScrollView,DeviceEventEmitter,ToastAndroid,Dimensions} from 'react-native';
import {Header,Text,ListItem, Divider,Button} from 'react-native-elements';
import axios from 'axios';
import { Tag, WhiteSpace } from '@ant-design/react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//const {height, width} = Dimensions.get('window');
var addressList=[];
const {height, width} = Dimensions.get('window');
export default class AddAddress extends Component {
    constructor(props){
        super(props);
        this.state={
            addressList:[],
        }
    }
    componentDidMount() {
      //收到监听
      this.listener = DeviceEventEmitter.addListener('save',()=>{
          this.change();
      });
  }
  componentWillUnmount(){
      // 移除监听 
      this.listener.remove();
  }
  change(){
    console.log("change addresslist");
    var userId = 2;
      var url="http://192.168.0.100:8080/delivery/address?userId="+userId;
      axios.get(url).then((response)=>{
        list = response.data;
        addressList=[];
        for(var i=0;i<list.length;i++){
          var tempitem = list[i];
          console.log(tempitem);
          if(tempitem.gender==0){
            tempitem.sex = "先生"
          }else{
            tempitem.sex="女士"
          }
          if(tempitem.tag==0){
            tempitem.tagger = "学校";
          }
          if(tempitem.tag==1){
            tempitem.tagger = "家";
          }
          if(tempitem.tag==2){
            tempitem.tagger = "公司";
          }
          addressList.push(tempitem);
        }
        this.setState({addressList:addressList})
    }).catch(function(error){
        console.log(error);
    })
  }
    componentWillMount(){
      var userId = 2;
      var url="http://192.168.0.100:8080/delivery/address?userId="+userId;
      axios.get(url).then((response)=>{
        list = response.data;
        addressList=[];
        for(var i=0;i<list.length;i++){
          var tempitem = list[i];
          console.log(tempitem);
          if(tempitem.gender==0){
            tempitem.sex = "先生"
          }else{
            tempitem.sex="女士"
          }
          if(tempitem.tag==0){
            tempitem.tagger = "学校";
          }
          if(tempitem.tag==1){
            tempitem.tagger = "家";
          }
          if(tempitem.tag==2){
            tempitem.tagger = "公司";
          }
          addressList.push(tempitem);
        }
        this.setState({addressList:addressList})
    }).catch(function(error){
        console.log(error);
    })
    }
  /*render() {
    var userId = this.props.navigation.state.params.userId;
    return (
     <View style={{flex:1}}>
         <View style={{flex:0.2}}>
        <Header
                leftComponent={<Icon name='arrow-back' color='#fff'
                /> }
                centerComponent={{ text: '选择地址', style: { color: '#fff',fontSize:20 } }}
            /></View>
       <ScrollView style={{flex:0.70}}>
       {
    this.state.addressList.map((item, i) => {
      return(
          <View>
      <ListItem 
        key={item.key}
        title={<TouchableOpacity onPress={()=>{
          DeviceEventEmitter.emit('addAddress',item);
          this.props.navigation.goBack();
        }}><View  style={{flexDirection:"row"}}><Text style={{fontSize:15,fontWeight:"bold"}}>{item.name}</Text>
        <Text style={{fontSize:14}}>{item.sex}</Text>
        <View style={{marginLeft:10}}>
        <Text style={{fontSize:14}}>{item.contact}</Text>
        </View>
        </View></TouchableOpacity>}
        subtitle={<TouchableOpacity onPress={()=>{
          DeviceEventEmitter.emit('addAddress',item);
          this.props.navigation.goBack();
        }}><View  style={{flexDirection:"row"}}><Text style={{fontWeight:"bold"}}>{item.tagger}</Text><Text> {item.address}</Text></View></TouchableOpacity>}
        leftAvatar={<TouchableOpacity onPress={()=>{
          DeviceEventEmitter.emit('addAddress',item);
          this.props.navigation.goBack();
        }}><View  style={{width:30,height:30}}></View></TouchableOpacity>}
        rightTitle={<View style={{flexDirection:"row"}}><TouchableOpacity onPress={()=>{this.props.navigation.navigate('AddAddressTable2',{userId:userId,item:item,addressList:this.state.addressList})}}><Icon name='edit' color='#000'
        /></TouchableOpacity><Icon name='delete' color='#000' onPress={()=>{this.delete(item.deliveryAddressId,i)}}
        /></View>}
      />
      <Divider style={{backgroundColor: 'blue'}}/>
      </View>)
     } )
  }
       </ScrollView>
       <View style={{flex:0.1}}><Button title="新增收货地址"type="outline" onPress={()=>{this.props.navigation.navigate('AddAddressTable',{userId:userId,addressList:this.state.addressList})}}/></View>
      </View>
    );
  }*/
  render(){
    return(
      <View style={{backgroundColor:"#f8f8f8",height:height}}>
        <View style={{backgroundColor:"#ffffff",height:height*0.08}}>
          <View style={{flex:1,flexDirection:'row',marginTop:15}}>
            <View style={{flex:0.15,marginLeft:10}}>
            <Icon
              name='chevron-left'
              size={20}
              color='#3399ff'
        />
            </View>
            <Text style={{fontSize:20}}>选择收货地址</Text>
          </View>  
        </View>
        <ScrollView style={{backgroundColor:"#f8f8f8",marginTop:20,marginBottom:50}}>
          <View style={{marginLeft:20,marginRight:20,borderRadius:10,backgroundColor:"#ffffff"}}>
            <View>
        {
    this.state.addressList.map((item, i) => {
      return(
          <View>
      <ListItem
            title={<TouchableOpacity><View style={{flexDirection:'row'}}><Text style={{marginRight:5}}>{item.address}</Text><Tag small={true} selected={true}>{item.tagger}</Tag></View></TouchableOpacity>}
            rightAvatar={<TouchableOpacity onPress={()=>{
              this.props.navigation.navigate('AddAddressTable2',{userId:2,item:item,addressList:this.state.addressList})
            }}><Icon
              name='edit'
              size={24}
              color='#C0C0C0'
            /></TouchableOpacity>}
            subtitle={<TouchableOpacity><View style={{flexDirection:'row'}}><Text style={{marginRight:5,color:"#B0B0B0"}}>{item.name}({item.sex})</Text><Text style={{color:"#B0B0B0"}}>{item.contact}</Text></View></TouchableOpacity>}
      />
      <Divider style={{ marginRight:20,marginLeft:20,backgroundColor: '#f0f0f0',height:0.7 }}/>
      </View>)
     } )
  }</View>
  <ListItem onPress={()=>{this.props.navigation.navigate('AddAddressTable',{userId:2,addressList:this.state.addressList})}}
  title={<Text style={{color:"#3399ff"}}>新增收货地址</Text>}
  rightAvatar={<Icon
    name='chevron-right'
    size={17}
    color='#C0C0C0'
  />}
  />
  </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  }
});