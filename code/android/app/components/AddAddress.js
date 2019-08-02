import React, {Component} from 'react';
import {StyleSheet, View,ScrollView,DeviceEventEmitter,ToastAndroid} from 'react-native';
import {Header,Text,Icon,ListItem, Divider,Button} from 'react-native-elements';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
//const {height, width} = Dimensions.get('window');
var addressList=[];
export default class AddAddress extends Component {
    constructor(props){
        super(props);
        this.state={
            addressList:[],
        }
    }


     /*********************************** 
    ****          生命周期函数      ****
    ************************************/

    /**
     * @description 设置对'save'信号的监测
     */
    componentDidMount() {
      //收到监听
      this.listener = DeviceEventEmitter.addListener('save',()=>{
          this.change();
      });
  }

   /*********************************** 
    ****          生命周期函数      ****
    ************************************/

    /**
     * @description 在注销页面的时候移除监听
     */
  componentWillUnmount(){
      // 移除监听 
      this.listener.remove();
  }

   /*********************************** 
    ****          事件处理函数      ****
    ************************************/

    /**
     * @description 对‘save’的监听
     */
  change(){
    console.log("change addresslist");
    var userId = this.props.navigation.state.params.userId;
      var url="http://192.168.1.59:8080/delivery/address?userId="+userId;
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

   /*********************************** 
    ****          生命周期函数     ****
    ************************************/

    /**
     * @description 在页面首次刷新的时候请求数据
     */
    componentWillMount(){
      var userId = this.props.navigation.state.params.userId;
      var url="http://192.168.1.59:8080/delivery/address?userId="+userId;
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

     /*********************************** 
    ****          事件处理函数      ****
    ************************************/

    /**
     * @description 删除某一地址
     */
    delete(id,i){
      var url="http://192.168.1.59:8080/delivery/address?deliveryAddressId="+id;
      axios.delete(url).then(response=>{
        if(response.data=='DELETE'){
          ToastAndroid.show("已删除 ",ToastAndroid.SHORT);
          addressList.splice(i,1);
          this.setState({addressList:addressList});
        }
        else{
          ToastAndroid.show("删除失败 ",ToastAndroid.SHORT);
        }
      }).catch(e=>{
        console.log(e);
      })
    }
  render() {
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
        rightTitle={<View style={{flexDirection:"row"}}><TouchableOpacity onPress={()=>{this.props.navigation.navigate('AddAddressTable2',{userId:userId,item:item})}}><Icon name='edit' color='#000'
        /></TouchableOpacity><Icon name='delete' color='#000' onPress={()=>{this.delete(item.deliveryAddressId,i)}}
        /></View>}
      />
      <Divider style={{backgroundColor: 'blue'}}/>
      </View>)
     } )
  }
       </ScrollView>
       <View style={{flex:0.1}}><Button title="新增收货地址"type="outline" onPress={()=>{this.props.navigation.navigate('AddAddressTable',{userId:userId})}}/></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  }
});