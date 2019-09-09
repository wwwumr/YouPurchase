import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, View,ScrollView,DeviceEventEmitter,ToastAndroid,Dimensions,Text} from 'react-native';
import {Header,ListItem, Divider,Button} from 'react-native-elements';
import axios from 'axios';
import { Tag, WhiteSpace, List } from '@ant-design/react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import config from '../components/config/config';
//const {height, width} = Dimensions.get('window');
var addressList=[];
const {height, width} = Dimensions.get('window');
/**
 * @constructor
 * @description AddAddress 选择地址列表
 */
export default class AddAddress extends Component {
    constructor(props){
        super(props);
        this.state={
            addressList:[],
        }
    }
    /**
     * @description 生命周期函数--监听对save信号的接听
     */
    componentDidMount() {
      //收到监听
      this.listener = DeviceEventEmitter.addListener('save',()=>{
          this.change();
      });
  }
  /**
   * @description 生命周期函数--当销毁页面时销毁监听
   */
  componentWillUnmount(){
      // 移除监听 
      this.listener.remove();
  }
  /**
   * @description 监听响应函数刷新页面
   */
  change(){
    console.log("change addresslist");
    var userId = this.props.navigation.state.params.userId;
      var url=config.url+'delivery/address?userId='+userId;
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
  /**
   * @description 生命周期函数
   */
    componentWillMount(){
      var userId = this.props.navigation.state.params.userId;
      var url=config.url+"delivery/address?userId="+userId;
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
  render(){
    return(
      <View style={{backgroundColor:"#f8f8f8",height:height}}>
        <View style={{backgroundColor:"#ffffff",height:height*0.08}}>
          <View style={{flex:1,flexDirection:'row',marginTop:15}}>
          <View style={{flex:0.15,marginLeft:10}}>
            <TouchableOpacity onPress={()=>{
              this.props.navigation.goBack();
            }}>
            
            <Icon
              name='chevron-left'
              size={20}
              color='#3399ff'
        />
            </TouchableOpacity></View>
            <Text style={{fontSize:20}}>选择收货地址</Text>
          </View>  
        </View>
        <ScrollView style={{backgroundColor:"#f8f8f8",marginTop:20,marginBottom:50}}>
          <View style={{marginLeft:20,marginRight:20,borderRadius:10,backgroundColor:"#ffffff"}}>
            <View>
        {
    this.state.addressList.map((item, i) => {
      var lines=1;
      if(item.address.length>16)
      lines=2;
      return(
          <View>
      <ListItem
            title={<TouchableOpacity  onPress={()=>{
              DeviceEventEmitter.emit('addAddress',item);
              this.props.navigation.goBack();}}><Text numberOfLines={lines} style={{marginRight:5}}>{item.address}</Text></TouchableOpacity>}
            rightAvatar={<TouchableOpacity onPress={()=>{
              this.props.navigation.navigate('AddAddressTable2',{userId:this.props.navigation.state.params.userId,item:item,addressList:this.state.addressList})
            }}><Icon
              name='edit'
              size={24}
              color='#C0C0C0'
            /></TouchableOpacity>}
            subtitle={<TouchableOpacity onPress={()=>{
              DeviceEventEmitter.emit('addAddress',item);
              this.props.navigation.goBack();}}><View style={{flexDirection:'row'}}><View style={{marginRight:5,marginTop:2}}><Tag small={true} selected={true}>{item.tagger}</Tag></View><Text style={{marginRight:10,color:"#B0B0B0"}}>{item.name}({item.sex})</Text><Text style={{color:"#B0B0B0"}}>{item.contact}</Text></View></TouchableOpacity>}
      />
      <Divider style={{ marginRight:20,marginLeft:20,backgroundColor: '#f0f0f0',height:0.7 }}/>
      </View>)
     } )
  }</View>
  <ListItem onPress={()=>{this.props.navigation.navigate('AddAddressTable',{userId:this.props.navigation.state.params.userId,addressList:this.state.addressList})}}
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