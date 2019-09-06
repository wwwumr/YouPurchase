import React,{Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Upload from './Upload';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
import { Input,Image,Header,Text,Overlay, Divider,ListItem } from 'react-native-elements';
import {View,StyleSheet,TouchableOpacity,ImageBackground, NativeModules,Dimensions,DeviceEventEmitter,ToastAndroid,BackHandler} from'react-native';
import { List,Button,Modal,
    WhiteSpace,
    WingBlank,
    Provider,Radio,Toast } from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;
const RadioItem = Radio.RadioItem;
var ImagePicker = NativeModules.ImageCropPicker;
const {height, width} = Dimensions.get('window');
import SQLite from './UserSqlite';
var sqLite = new SQLite();
var db;
export default class EditPage extends Component{
  constructor(props){
    super(props);
    this.state={
      isVisable:false,
      isVisable2:false,
      isVisable3:false,
      isVisable4:false,
      username:"",
      sex:'',
      phone:'',
      address:'',
      part1Value: 1,
      part2Value: 1,
      regDate:''
    }
  }
  componentDidMount(){
    this.listener = DeviceEventEmitter.addListener('editPage', () => {
      this.change();
    })
  }
  compennetDidUnmount(){
    sqLite.close();
    if (this.listener) {
      this.listener.remove();
    } 
  }
  /**
   * @description 判断输入的手机号是否合法
   * @param {string} phone 手机号字符串
   */
  phoneNumber(phone) {
    if (phone.length!=11)
      return '-1';
    else if(phone == '') {
      return '-1';
    }
    else if(!/^\d+$/.test(phone))
      return '-1';
    else
      return phone;
  }
  /**
   * 
   * @description 修改个人信息函数
   * @param {string} password 修改的信息
   * @param {int} flag 类型
   */
  handler1(password,flag){
    var userId = this.props.navigation.state.params.userId;
    var userName = this.state.username;
    var address = this.state.address;
    var phone =this.state.phone;
    var sex = this.state.sex;
    if(flag == 1)
      phone = password;
    else if(flag ==2)
      userName = password;
    else if(flag == 3)
      address = password;
    else if(flag == 4){
      sex = password;
    }
    console.log(address);
    console.log(userName);
    console.log(phone);
    if(userName==null && flag == 2){
      ToastAndroid.show('用户名不能为空',ToastAndroid.SHORT);
      return;
    }
    
    if(address==null && flag == 3){
      ToastAndroid.show('地址不能为空',ToastAndroid.SHORT);
      return;
    }
    if(phone ==null && flag == 1){
      ToastAndroid.show('手机号不合法',ToastAndroid.SHORT);
      return;
    }
    phone = this.phoneNumber(phone);
    if(phone =='-1' && flag == 1){
      ToastAndroid.show('手机号不合法',ToastAndroid.SHORT);
      return;
    }
    axios.post('http://192.168.1.19:8080/user/modify',{
	    userId:userId,
	    userName:userName,
	    address:address,
	    gender:sex,
	    regDate:this.state.regDate,
	    latitude:0,
	    longitude:0
    }
    //header:{"Content-Type":'application/json;charset=UTF-8'}
    )
    .then((response)=> {
      responsedata = response.data;
      console.log(responsedata);
      if(responsedata.status==200){
        DeviceEventEmitter.emit('editPersonPage');
        this.setState({address:responsedata.address,
          sex:responsedata.gender,
          regDate:responsedata.regDate,
          username:responsedata.userName,
          phone:responsedata.phone
        })
        ToastAndroid.show('修改成功',ToastAndroid.SHORT); 
      }
      else
        ToastAndroid.show('修改失败',ToastAndroid.SHORT);   
    })
    .catch(function (error) {
      console.log(error);
      ToastAndroid.show('网络异常',ToastAndroid.SHORT);
    });
  }
  /**
   * @description 修改用户头像
   * @param {boolean} cropit 是否可以剪切 
   */
  pickSingleBase64(cropit) {
    var uri = "http://192.168.1.19:8080/user/getPhoto?userId="+this.props.userId+"&v="+Math.random();
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
    }).then((image) => {
      console.log('received base64 image');
      
      console.log(image.data);
      axios.post("http://192.168.1.19:8080/user/uploadPhoto",{userId:this.props.userId,photoImage:`data:${image.mime};base64,`+ image.data}).then((response)=>{
        tempitem = response.data;
        console.log(tempitem);
        DeviceEventEmitter.emit('editPersonPage');
        ToastAndroid.show('修改成功',ToastAndroid.SHORT);
      }).catch(function(error){
        console.log(error);
        ToastAndroid.show('修改失败',ToastAndroid.SHORT);
      })
      this.setState({
        uri:uri
      });
      
    }).catch(e => alert(e));
  }
  /**
   * @description 刷新页面
   */
  change(){
    var userId = this.props.navigation.state.params.userId
    axios.get('http://192.168.1.19:8080/user/check',{params:{userId:userId}})
    .then((response)=> {
      var responseData = response.data;
      console.log(responseData);
      this.setState({address:responseData.address,
        sex:responseData.gender,
        regDate:responseData.regDate,
        username:responseData.userName,
        phone:responseData.phone
        });
        DeviceEventEmitter.emit('editPersonPage');
    })
    .catch(function (error) {
      ToastAndroid.show('网络异常',ToastAndroid.SHORT);
      console.log(error);
    });
  }
  /**
   * @description 生命周期函数
   */
  componentWillMount(){
    if(!db){
      db = sqLite.open();
    }
    sqLite.createTable();
    var userId = this.props.navigation.state.params.userId
    axios.get('http://192.168.1.19:8080/user/check',{params:{userId:userId}})
    .then((response)=> {
      var responseData = response.data;
      console.log(responseData);
      this.setState({address:responseData.address,
        sex:responseData.gender,
        regDate:responseData.regDate,
        username:responseData.userName,
        phone:responseData.phone
        })
    })
    .catch(function (error) {
      ToastAndroid.show('网络异常',ToastAndroid.SHORT);
      console.log(error);
    });
    }
     /**
   * @description 修改电话按钮事件
   */ 
  onButtonPhone ()  {
    var userId = this.props.navigation.state.params.userId
    this.props.navigation.navigate('EditPhone',{userId:userId,phone:this.state.phone})  
  };
  /**
   * @description 修改电话按钮事件
   */ 
  /*
   onButtonPhone ()  {
    Modal.prompt(
      '电话',
      '',
      (password) => {
      this.handler1(password,1);
    },
      'default',
      null,
      ['请输入电话号码']
    );
  };*/
  /**
   * @description 修改昵称事件
   */
  onButtonName ()  {
    Modal.prompt(
      '昵称',
      '',
      (password) => {
        if(password.length>9){
          ToastAndroid.show('昵称长度应该小于10',ToastAndroid.SHORT);
          return;
        }
    this.handler1(password,2)},
      'default',
      null,
      ['请输入昵称']
    );
  };
  /**
   * @description 修改密码事件
   */
  onButtonPassword ()  {
    var userId = this.props.navigation.state.params.userId;
    this.props.navigation.navigate('EditPassword',{userId:userId,phone:this.state.phone})
  };
  /**
   * @description 关闭popup事件
   */
  onClose2(){
      this.setState({isVisable2:false});
  }
  render(){
    var back = "<";
    var front = ">";
    return(
      <Provider>
      <View>  
        <ImageBackground
          style={{width:width,height:height*0.10}}
          source={require('../images/edit.jpg')}
        >
        <View style={{flexDirection:"row",marginLeft:20,flex:1,marginTop:25}}>
          <View style={{flex:0.45}}>
          <TouchableOpacity onPress={()=>{
            this.props.navigation.goBack();
          }}>
          <Icon
            name='chevron-left'
            size={17}
            color='#ffffff'
          />
          </TouchableOpacity>
          </View>
          <View>
            <Text style={{color:"#ffffff",fontSize:18}}>编辑资料</Text>
          </View>
          </View>
        </ImageBackground>
        <View style={{backgroundColor:'#f0f0f0'}}>
          <View style={{marginTop:20,backgroundColor:"#ffffff"}}>
            <View >
              <ListItem onPress={() => this.pickSingleBase64(false)}
                leftAvatar={<Text style={{fontSize:17}}>头像</Text>}
                rightAvatar={<Icon
                  name='chevron-right'
                  size={17}
                  color='#C0C0C0'
                />}
              />
              <Divider style={{ marginRight:20,marginLeft:20,backgroundColor: '#f0f0f0',height:0.7 }}/>
              <ListItem onPress={this.onButtonName.bind(this)}
                leftAvatar={<Text style={{fontSize:17}}>昵称</Text>}
                rightAvatar={<Icon
                  name='chevron-right'
                  size={17}
                  color='#C0C0C0'
                />}
                title={<Text  style={{fontSize:17,marginLeft:20}}>{this.state.username}</Text>}
              />
            </View>
          </View>
          <View style={{marginTop:20,backgroundColor:"#ffffff"}}>
            <View >
              <ListItem onPress={()=>{this.setState({isVisable2:true})}}
                leftAvatar={<Text style={{fontSize:17}}>性别</Text>}
                rightAvatar={<Icon
                  name='chevron-right'
                  size={17}
                  color='#C0C0C0'
                />}
                title={<Text  style={{fontSize:17,marginLeft:20}}>{this.state.sex}</Text>}
              />
              <Divider style={{ marginRight:20,marginLeft:20,backgroundColor: '#f0f0f0',height:0.7 }}/>
              <ListItem onPress={this.onButtonPhone.bind(this)}
                leftAvatar={<Text style={{fontSize:17}}>电话</Text>}
                rightAvatar={<Icon
                  name='chevron-right'
                  size={17}
                  color='#C0C0C0'
                />}
                title={<Text  style={{fontSize:17,marginLeft:20}}>{this.state.phone}</Text>}
              />
              <Divider style={{ marginRight:20,marginLeft:20,backgroundColor: '#f0f0f0',height:0.7 }}/>
              <ListItem onPress={this.onButtonPassword.bind(this)}
                leftAvatar={<Text style={{fontSize:17,color:'#3399ff'}}>修改密码</Text>}
                rightAvatar={<Icon
                  name='chevron-right'
                  size={17}
                  color='#C0C0C0'
                />}
                title={<Text></Text>}
              />
            </View>
          </View>
          
        </View>
        <View style={{backgroundColor:'#ffffff',marginLeft:30,marginRight:30,marginTop:30}}>
            <Button type="primary" onPress={()=>{
              sqLite.deleteData();
              BackHandler.exitApp();
            }}>退出登录
          </Button>
        </View>
        <Modal
          popup
          visible={this.state.isVisable2}
          animationType="slide-up"
          onClose={this.onClose2}
        >
        <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={()=>{
            this.setState({sex:'男',isVisable2:false});
            this.handler1('男',4);
          }}>
          <Text style={{ textAlign: 'center',fontSize:17 }}>男</Text></TouchableOpacity>
          <Divider style={{ marginRight:20,marginLeft:20,backgroundColor: '#f0f0f0',height:0.7,marginTop:10,marginBottom:10 }}/>
          <TouchableOpacity onPress={()=>{
            this.setState({isVisable2:false});
            this.handler1('女',4);
          }}>
          <Text style={{ textAlign: 'center',fontSize:17 }}>女</Text></TouchableOpacity>
          <Divider style={{ marginRight:20,marginLeft:20,backgroundColor: '#f0f0f0',height:0.7,marginTop:10,marginBottom:10 }}/>
          </View>
        </Modal>
        
      </View>
    </Provider>
  );
  }
}