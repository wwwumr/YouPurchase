import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Text,Image,Icon,Button, Divider} from 'react-native-elements'
import {ScrollView,View,Dimensions,StyleSheet,DeviceEventEmitter,Linking} from 'react-native'
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
import SideMenu from 'react-native-side-menu'
import LeftMenu from './test/Test1';
import { Card,List,Provider,Modal,InputItem } from '@ant-design/react-native';
import ClassMenu from './Menu2';
import styles from 'react-native-side-menu/build/styles';
let {width,height} = Dimensions.get('window');
const style1 = StyleSheet.create({
  container: {
      backgroundColor: '#F5FCFF',
  },

});
var list=[];
var list2=[];
/**
 * @constructor
 * @description 商品列表
 */
export default class Goodslist extends Component{
  constructor(props){
    super(props);

    this.state={
        isOpen:false,
        text:'',
        storeId:-1,
        itemlist:list,
        classlist:list2,
        classInfo:'全部'
    }

    this.SelectMenuItemCallBack = this.SelectMenuItemCallBack.bind(this);
}


//点击侧边栏的按钮，回调此函数，关闭menu
  SelectMenuItemCallBack(){
    this.setState({
        isOpen:!this.state.isOpen,
        
    })
  }
/**
 * 
 * @param {int} commodityClassId 类型的id
 * @param {string} classInfo 类型的名称
 * @description 筛选相应的物品
 */
  getClass(classInfo){
    if(classInfo == '全部') 
      this.setState({itemlist:list,classInfo:'全部'});
    else{
      var templist=[];
      for(var i=0;i<list.length;i++){
        if(list[i].classInfo==classInfo){
          templist.push(list[i]);
        }
      }
      this.setState({itemlist:templist,classInfo:classInfo});
    }    
  }
  /**
   * @description 生命周期函数设置对getClass的信号的监听
   */
  componentDidMount(){
    this.listener = DeviceEventEmitter.addListener('getClass', (classInfo) => {
      this.getClass(classInfo);  
    })
  }
  /**
   * @description 销毁页面的时候移除监听
   * */
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
    var id =  this.props.navigation.state.params.storeId;
    //var id=1;
    var url='http://192.168.1.19:9000/stores/'+id+'/commodities';
    var url2="http://192.168.1.19:9000/api/u/commodities/classes?storeId="+id;
    axios.get(url).then((response)=>{
      list = response.data;
      axios.get(url2).then((response)=>{
        list2 = response.data;
        console.log(list2);
        this.setState({classlist:list2})
      }).catch(function(error){
      console.log(error);
    })
    this.setState({itemlist:list,storeId:id});
      console.log(list);
    //console.log(this.state.itemlist[0].commodityPicUrls[0]);
    }).catch(function(error){
      console.log(error);
    })
    this.setState({itemlist:list});
  }
  handler(){
    var text = this.state.text;
    var templist = list.filter((item)=> {
      return item.commodityInfo.toString().toLowerCase().indexOf(text) > -1;
    });
    this.setState({itemlist:templist});
  }
  /**
   * @description 跳转到商店评价页面
   */
  handler1(){
    var info =  this.props.navigation.state.params.info;
    var storeId =  this.props.navigation.state.params.storeId;

    this.props.navigation.navigate('StoreGradeShow',{storeId:storeId,
      contact:info.contact,
      address:info.address,
      storeName:info.storeName});
  }
  /**
   * @description 点击联系商家
   */
  phone(){
    var info =  this.props.navigation.state.params.info;
    var phone = info.contact;
    let tel = 'tel:'+phone// 目标电话
    Modal.alert('联系商家', '电话：'+phone,
      [ { text: '取消', onPress: () => { console.log('取消') } },
        { text: '确定',
          onPress: () => {
            Linking.canOpenURL(tel).then((supported) => {
              if (!supported) {
                console.log('Can not handle tel:' + tel)
              } else {
                return Linking.openURL(tel)
              }
            }).catch(error => console.log('tel error', error))
          } }])
  }
  render() {

    var info =  this.props.navigation.state.params.info;
    var storeId =  this.props.navigation.state.params.storeId;
    var storeName= this.props.navigation.state.params.info.storeName
    const menu=<LeftMenu onSelectMenuItem={this.SelectMenuItemCallBack} classlist={this.state.classlist}/>;
    var coverPicUrl =  this.props.navigation.state.params.coverPicUrl;
    return(
      <Provider>
      <View style={{backgroundColor:'#f8f8f8',height:height}}>
        <View style={{width:width,height:height*0.09}}>
          <View style={{flexDirection:"row",marginLeft:20,marginTop:15}}>
            <View style={{marginRight:20}}>
            <TouchableOpacity onPress={()=>{
              this.props.navigation.goBack();
            }}>
            <Icon
              name='chevron-left'
              size={30}
              color='#3399ff'
            />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{fontSize:20}}>商品列表</Text>
          </View>
        </View>
        </View>
        <View style={{width:width,backgroundColor:'#F8F8F8',flexDirection:'row'}}>
        <View style={{marginLeft:10,
          marginRight:5,
          width:width*0.8,
          backgroundColor:'#ffffff',
          borderRadius:20}}
        >
          <InputItem
            clear
            type="text"
            value={this.state.text}
              onChange={value => {
                this.setState({
                  text: value,
                });
              }}
            placeholder="商品名"
          >
            <Icon
              name="search"
              color={"#D0D0D0"}
              size={40}
            />
          </InputItem>
        </View>
        <TouchableOpacity onPress={this.handler.bind(this)}>
          <View style={{borderRadius:5,
            backgroundColor:'#ffffff', 
            borderColor:"#D0D0D0",
            borderWidth:1}}
          >
            <Icon
              name="search"
              color={'#D0D0D0'}
              size={40}
            />
          </View>
        </TouchableOpacity>    
        </View>
        <View style={{marginLeft:20,flexDirection:'row'}}>
          <ClassMenu classlist={this.state.classlist}/>
          <View style={{marginTop:6}}>
            <Icon
              name='chevron-right'
              size={20}
              color={"#000000"}
            />
          </View>
          <Text style={{fontSize:15,marginLeft:5,marginTop:5}}>{this.state.classInfo}</Text> 
        </View>
        <ScrollView style={{marginBottom:40}}>
        <View style={{backgroundColor:'#ffffff',marginLeft:10,marginRight:10,marginTop:10}}>
          <Card>
            <Card.Header
              title={<View style={{marginLeft:5}}><Text style={{fontSize:18}}>{storeName}</Text></View>}
              thumbStyle={{ width: 40, height: 40 }}
              thumb={<Image source={{uri:coverPicUrl}} style={{width:40,height:40}}/>}
            />
            <Card.Body>
              <View style={{ height: 110}}>
                <View >
                  <List>
                  <List.Item
                  onPress={this.phone.bind(this)} 
                  extra={<Icon
              name='phone'
              size={30}
              color='#D0D0D0'
            />}>
                  <Text style={{fontSize:15}}>电话:       {info.contact}</Text>
                  </List.Item>
                  <List.Item>
                    <Text style={{fontSize:15}}>
                  营业时间: {info.startHour}-{info.endHour}</Text>
                  </List.Item>
                  <List.Item>
                  <Text style={{fontSize:15}}>地址: {info.address}</Text>
                  </List.Item>
                  </List>
                  </View>
              </View>
            </Card.Body>
            <Card.Footer
              content=""
              extra=""
            />
          </Card></View>
          <Text  style={{marginTop:15,textAlign:'center',fontSize:20,
    color:'#585858'}}>-- 商品列表 --</Text>
    <View style={{marginTop:10,marginLeft:10,marginRight:10,borderColor:'#ffffff',backgroundColor:'#ffffff',borderRadius:10,borderWidth:1}}>
  {
    this.state.itemlist.map((item, i) => {
      var name = item.commodityCoverPicUrl;
      return(
        <View >
      <ListItem onPress={() => {
        this.props.navigation.navigate('GoodsDetail', {
          goodsId:item.key,
          storeId:this.state.storeId,
          storeName:storeName,
          userId:this.props.navigation.state.params.userId
        });
      }}
        key={item.key}
        title={<Text>{item.commodityInfo}</Text>}
        subtitle={<Text>{item.price}¥</Text>}
        rightTitle={item.onShelves?"有货":"无货"}
        leftIcon={<Image source={{uri:name}}style={{width: 50, height: 50}}/>}
      />
      <Divider style={{backgroundColor:"#C0C0C0",marginLeft:10,marginRight:10}}/>
      </View>)
     } )
  }</View>
          </ScrollView>
        
      </View></Provider>


    );
}
    
}

