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
export default class AddAddressTable extends Component {
    constructor(props){
        super(props);
        this.state={
            addressList:[],
            name:"",
            selectedIndex: 0,
            phone:"",
            address:"",
            selectedIndex2:0
        }
    }
    componentWillMount(){
       
    }
    submit(){
      var addressList = this.props.navigation.state.params.addressList;
      var address = this.state.address;
      var contact = this.state.phone;
      var gender = this.state.selectedIndex;
      var tag = this.state.selectedIndex2;
      var name = this.state.name;
      for(var i=0;i<addressList.length;i++){
        var tempitem = addressList[i];
        if(tempitem.contact == contact && 
          tempitem.address == address 
          &&tempitem.gender == gender 
          && tempitem.tag == tag
          && tempitem.name== name) {
            ToastAndroid.show("已存在该地址",ToastAndroid.SHORT);
            return;
          }
      }
      Geolocation.geocode("上海",this.state.address).then((data) => {
        var longitude = data.longitude;
        var latitude = data.latitude;
        axios.post("http://192.168.0.100:8080/delivery/address",{address:this.state.address,contact:this.state.phone,deliveryAddressId:0,
        detailAddress:this.state.address,gender:this.state.selectedIndex,
        latitude:latitude,longitude:longitude,
        name:this.state.name,tag:this.state.selectedIndex2,userId:this.props.navigation.state.params.userId})
        .then((response)=> {
          DeviceEventEmitter.emit('save');
            if(response.data=='SAVED'){
              console.log("Save the address");
              ToastAndroid.show("已保存 ",ToastAndroid.SHORT);

              this.props.navigation.goBack();
            }
            else{
              ToastAndroid.show("保存失败 ",ToastAndroid.SHORT);
            }
        }).catch(e=>{
          console.log(e,'error')
        })
      })
      .catch(e =>{
          console.warn(e, 'error');
      })
    }
  /*render() {
    return (
     <View >
        <Header
                leftComponent={<Icon name='arrow-back' color='#fff'
                /> }
                centerComponent={{ text: '选择地址', style: { color: '#fff',fontSize:20 } }}
            />
            <ScrollView>
                <View>
      <ListItem
      leftAvatar={<View style={{width:30,height:20}}><Text style={{fontWeight:"bold"}}>{"姓名"}</Text></View>}
      title={<Input onChangeText={(value) => this.setState({name: value})}
      value={this.state.name}/>}
      />
      <ListItem
      leftAvatar={<View style={{width:30,height:20}}><Text style={{fontWeight:"bold"}}>{"性别"}</Text></View>}
      title={<View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>{ this.setState({selectedIndex:0}) }}>
        <Button disabled={this.state.selectedIndex!=0}  type="outline"title="先生"/></TouchableOpacity>
        <View style={{marginLeft:20}}><TouchableOpacity  onPress={()=>{ this.setState({selectedIndex:1}) }}><Button disabled={this.state.selectedIndex!=1}type="outline"title="女士"/></TouchableOpacity></View></View>}
      />
     <Divider style={{backgroundColor: 'blue'}}/>
       <ListItem
      leftAvatar={<View style={{width:30,height:20}}><Text style={{fontWeight:"bold"}}>{"电话"}</Text></View>}
      title={<Input onChangeText={(value) => this.setState({phone: value})}
      value={this.state.phone}/>}
      />
      <ListItem
      leftAvatar={<View style={{width:30,height:20}}><Text style={{fontWeight:"bold"}}>{"地址"}</Text></View>}
      title={<Input onChangeText={(value) => this.setState({address: value})}
      value={this.state.address} placeholder='小区/写字楼等'/>}
      />
      <ListItem
      leftAvatar={<View style={{width:30,height:20}}><Text style={{fontWeight:"bold"}}>{"标签"}</Text></View>}
      title={<View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>{ this.setState({selectedIndex2:0}) }}>
        <Button disabled={this.state.selectedIndex2!=0} type="outline"title="学校"/></TouchableOpacity>
        <View style={{marginLeft:20}}>
          <TouchableOpacity onPress={()=>{ this.setState({selectedIndex2:1}) }}>
          <Button disabled={this.state.selectedIndex2!=1}type="outline"title="家"/></TouchableOpacity>
          </View><View style={{marginLeft:20}}>
            <TouchableOpacity onPress={()=>{ this.setState({selectedIndex2:2}) }}>
            <Button disabled={this.state.selectedIndex2!=2}type="outline"title="公司"/>
          </TouchableOpacity>
          </View></View>}
      />
      </View></ScrollView>
      <View style={{marginLeft:15,marginRight:15}}>
      <Button onPress={this.submit.bind(this)} title="保存"/>
      </View>
      </View>
    );
  }*/
  render(){
    return(
      <View>
        <View style={{backgroundColor:"#ffffff",height:height*0.1,flexDirection:'row',marginTop:15}}>
            <View style={{marginLeft:10}}>
              <TouchableOpacity>
            <Icon
              name='chevron-left'
              size={30}
              color='#3399ff'
        /></TouchableOpacity>
            </View>
            <View style={{marginLeft:15}}>
            <Text style={{fontSize:20}}>新增地址</Text></View>
        </View>
        <View style={{marginBottom:20,marginLeft:5,marginRight:15}}>
        <List>        
          <InputItem
            value={this.state.value}
            onChange={value => {
              this.setState({
                name:value,
              });
            }}
            placeholder="姓名"
          >联系人</InputItem>
          <View style={{flexDirection:'row',marginTop:10}}>
          <View style={{marginLeft:100,marginRight:20}}><Tag>男</Tag></View><Tag>女</Tag></View>
            <Divider style={{ marginRight:20,marginLeft:100,marginTop:10, backgroundColor: '#f0f0f0',height:0.7 }}/>
          <InputItem
            value={this.state.value}
            onChange={value => {
              this.setState({
                phone:value,
              });
            }}
            placeholder="手机号码"
          >电话  </InputItem>
          <InputItem
            value={this.state.value}
            onChange={value => {
              this.setState({
                address:value,
              });
            }}
            placeholder="收货地址"
          >地址  </InputItem>
          <View style={{flexDirection:"row",marginTop:10,marginBottom:10,marginLeft:15}}>
            <Text style={{fontSize:17}}>标签</Text>
            <View style={{marginLeft:50,marginRight:20}}><Tag>学校</Tag></View><View style={{marginRight:20}}><Tag>家</Tag></View><Tag>公司</Tag></View>
            </List>
            <View style={{marginRight:30,marginLeft:30,marginTop:10,height:20}}><Button type="primary">保存</Button></View>
            
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