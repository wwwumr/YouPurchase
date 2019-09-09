import React, {Component} from 'react';
import {StyleSheet, View,ScrollView,ToastAndroid,TouchableOpacity,DeviceEventEmitter,Dimensions} from 'react-native';
import {Header,Text,Icon,ListItem, Divider,Input} from 'react-native-elements';
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
import axios from 'axios';
import { Tag, InputItem, List,Button } from '@ant-design/react-native';
const {height, width} = Dimensions.get('window');
//const {height, width} = Dimensions.get('window');
const buttons = ['先生','女士']
const buttons1 = ['家','学校','公司']
/**
 * @constructor
 * @description AddAddressTable2
 */
export default class AddAddressTable2 extends Component {
  constructor(props){
    super(props);
    this.state={
      addressList:[],
      name:"",
      selectedIndex: 0,
      phone:"",
      address:"",
      selectedIndex2:0,
      index:0,
      index2:0,
      longitude:-1,
      latitude:-1,
    }
  }
  componentDidMount(){
    this.listener = DeviceEventEmitter.addListener('selectedAddress', (item) => {
      console.log('selectedAddress');
      this.setState({address:item.address,longitude:item.longitude,latitude:item.latitude});
    })
  }
  componentWillUnmount() {
    //移除监听
    if (this.listener) {
      this.listener.remove();
    }
  }
  /**
   * @description 生命周期函数
   */
  componentWillMount(){
    var item = this.props.navigation.state.params.item;
    this.setState({name:item.name,
      index:item.gender,
      index2:item.tag,
      selectedIndex:item.gender,
      selectedIndex2:item.tag,
      phone:item.contact,
      address:item.address,
      longitude:item.longitude,
      latitude:item.latitude
    });
  }
  /**
   * 
   * @param {string} contact 手机号
   * @description 判断手机号是否合法
   */
  phoneNumber(contact) {
    if (contact.length!=11)
      return '-1';
    else if(contact == '') {
      return '-1';
    }
    else if(!/^\d+$/.test(contact))
      return '-1';
    else
      return contact;
  }
  /**
   * @description 删除特定的id的地址
   */
  delete(){
    var item = this.props.navigation.state.params.item;
    var url="http://192.168.1.19:8080/delivery/address?deliveryAddressId="+item.deliveryAddressId;
    axios.delete(url).then(response=>{
      if(response.data=='DELETE'){
        ToastAndroid.show("已删除 ",ToastAndroid.SHORT);
        DeviceEventEmitter.emit('save');
        this.props.navigation.goBack();
      }
      else{
        ToastAndroid.show("删除失败 ",ToastAndroid.SHORT);
      }
    }).catch(e=>{
      ToastAndroid.show("删除失败 ",ToastAndroid.SHORT);
      console.log(e);
    })
  }
  /**
   * @description 提交修改
   */
  submit(){
    var addressList = this.props.navigation.state.params.addressList;
    var item = this.props.navigation.state.params.item;
    var address = this.state.address;
    var gender = this.state.index;
    var tag = this.state.index2;
    var name = this.state.name;
    var longitude = this.state.longitude;
    var latitude = this.state.latitude;
    var deliveryAddressId = item.deliveryAddressId;
    if(gender == -1){
      ToastAndroid.show('请选择性别',ToastAndroid.SHORT);
      return;
    }
    if(tag == -1){
      ToastAndroid.show('请选择地址标签',ToastAndroid.SHORT);
      return;
    }
    if(address == ''||address == null||address == undefined||longitude == -1||latitude == -1){
      ToastAndroid.show('请输入地址',ToastAndroid.SHORT);
      return;
    }
    if(name == ''||name == null||name == undefined){
      ToastAndroid.show('请输入联系人姓名',ToastAndroid.SHORT);
      return;
    }
    if(this.state.phone == ''||this.state.phone == null || this.state.phone == undefined){
      ToastAndroid.show('请输入手机号',ToastAndroid.SHORT);
      return;
    }
    var contact = this.phoneNumber(this.state.phone);      
    if(contact == '-1'){
      ToastAndroid.show('输入的手机号不合法',ToastAndroid.SHORT);
      return;
    }
    for(var i=0;i<addressList.length;i++){
      var tempitem = addressList[i];
      if(tempitem.contact == contact 
        && tempitem.address == address 
        && tempitem.gender == gender 
        && tempitem.tag == tag
        && tempitem.name == name
        && item.deliveryAddressId != tempitem.deliveryAddressId) {
          ToastAndroid.show("已存在该地址",ToastAndroid.SHORT);
          return;
      }
    }
    axios.put("http://192.168.1.19:8080/delivery/address",{address:this.state.address,
    contact:this.state.phone,
    deliveryAddressId:deliveryAddressId,
    detailAddress:this.state.address,
    gender:this.state.index,
    latitude:latitude,
    longitude:longitude,
    name:this.state.name,
    tag:this.state.index2,
    userId:this.props.navigation.state.params.userId})
  .then((response)=> {
    DeviceEventEmitter.emit('save');
    if(response.data=='UPDATE'){
      console.log("Save the address");
      ToastAndroid.show("已保存 ",ToastAndroid.SHORT);
      this.props.navigation.goBack();
    }
    else{
      ToastAndroid.show("保存失败 ",ToastAndroid.SHORT);
    }
  }).catch(e=>{
    ToastAndroid.show("保存失败 ",ToastAndroid.SHORT);
    console.log(e,'error')
  })
  }
  render(){
    return(
      <View>
        <View style={{backgroundColor:"#ffffff",height:height*0.1,flexDirection:'row',marginTop:15}}>
            <View style={{marginLeft:10}}>
              <TouchableOpacity
              onPress={()=>{
                this.props.navigation.goBack();
              }}>
              <Icon
                name='chevron-left'
                size={30}
                color='#3399ff'
              />
              </TouchableOpacity>
            </View>
            <View style={{marginLeft:15}}>
              <Text style={{fontSize:20}}>修改地址</Text>
            </View>
        </View>
        <View style={{marginBottom:20,marginLeft:5,marginRight:15}}>
        <List>        
          <InputItem
            value={this.state.name}
            onChange={value => {
              this.setState({
                name:value,
              });
            }}
            placeholder="姓名"
          >联系人</InputItem>
          <View style={{flexDirection:'row',marginTop:10}}>
          <View style={{marginLeft:100,marginRight:20}}><Tag
            selected={0 ==this.state.selectedIndex}
            onChange={()=>{
              if(0 == this.state.index)
                this.setState({selectedIndex:0,index:-1});
              else
                this.setState({selectedIndex:0,index:0});
            }}
          >男</Tag></View><Tag
            selected={1 ==this.state.selectedIndex}
            onChange={()=>{
              if(1 == this.state.index)
                this.setState({selectedIndex:1,index:-1});
              else
                this.setState({selectedIndex:1,index:1});
            }}
          >女</Tag></View>
          <Divider style={{ marginRight:20,marginLeft:100,marginTop:10, backgroundColor: '#f0f0f0',height:0.7 }}/>
          <InputItem
            value={this.state.phone}
            onChange={value => {
              this.setState({
                phone:value,
              });
            }}
            placeholder="手机号码"
          >电话  </InputItem>
          <View style={{flexDirection:'row'}}>
          <View style={{width:width*0.20}}>
          <Text style={{fontSize:17,marginLeft:15,marginTop:10,color:'#3399ff'}}>地址</Text></View>
          <View style={{width:width*0.8-15}}>
          <List.Item wrap onPress={()=>{this.props.navigation.navigate('SelectAddress',{flag:2})}}
          >
            
{this.state.address}
          </List.Item></View></View>
          <View style={{flexDirection:"row",marginTop:10,marginBottom:10,marginLeft:15}}>
            <Text style={{fontSize:17}}>标签</Text>
            <View style={{marginLeft:50,marginRight:20}}><Tag
              selected={0 ==this.state.selectedIndex2}
              onChange={()=>{
                if(0 == this.state.index2)
                  this.setState({selectedIndex2:0,index2:-1});
                else
                  this.setState({selectedIndex2:0,index2:0});
              }}
            >学校</Tag></View><View style={{marginRight:20}}><Tag
              selected={1 ==this.state.selectedIndex2}
              onChange={()=>{
                if(1 == this.state.index2)
                  this.setState({selectedIndex2:1,index2:-1});
                else
                  this.setState({selectedIndex2:1,index2:1});
              }}
            >家</Tag></View><Tag
              selected={2 ==this.state.selectedIndex2}
              onChange={()=>{
                if(2 == this.state.index2)
                  this.setState({selectedIndex2:2,index2:-1});
                else
                  this.setState({selectedIndex2:2,index2:2});
              }}
            >公司</Tag></View>
            </List>
            <View style={{marginRight:30,marginLeft:30,marginTop:10,flexDirection:'row'}}>
              <View style={{marginRight:20,width:width*0.4}}><Button onPress={this.delete.bind(this)}>删除</Button>
              </View>
              <View style={{width:width*0.4}}><Button type="primary" onPress={this.submit.bind(this)}>保存</Button></View></View> 
           </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  }
});