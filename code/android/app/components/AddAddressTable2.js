import React, {Component} from 'react';
import {StyleSheet, View,ScrollView,ToastAndroid,TouchableOpacity,DeviceEventEmitter} from 'react-native';
import {Header,Text,Icon,ListItem, Divider,Button,Input} from 'react-native-elements';
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
import axios from 'axios';
//const {height, width} = Dimensions.get('window');
const buttons = ['先生','女士']
const buttons1 = ['家','学校','公司']
export default class AddAddressTable2 extends Component {
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
       var item = this.props.navigation.state.params.item;
       this.setState({name:item.name,selectedIndex:item.gender,selectedIndex2:item.tag,phone:item.contact,address:item.address});
    }
    submit(){
      Geolocation.geocode("上海",this.state.address).then((data) => {
        var longitude = data.longitude;
        var latitude = data.latitude;
        var item = this.props.navigation.state.params.item;
        var deliveryAddressId = item.deliveryAddressId;
        axios.put("http://192.168.1.59:8080/delivery/address",{address:this.state.address,contact:this.state.phone,deliveryAddressId:deliveryAddressId,
        detailAddress:this.state.address,gender:this.state.selectedIndex,
        latitude:latitude,longitude:longitude,
        name:this.state.name,tag:this.state.selectedIndex2,userId:this.props.navigation.state.params.userId})
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
          console.log(e,'error')
        })
      })
      .catch(e =>{
          console.warn(e, 'error');
      })
    }
  render() {
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
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  }
});