import React,{Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Upload from './Upload';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
import { Input,Image,Header,Text,Overlay, Divider,ListItem } from 'react-native-elements';
import {View,StyleSheet,TouchableOpacity,ImageBackground, NativeModules,Dimensions,DeviceEventEmitter} from'react-native';
import { List,Button,Modal,
    WhiteSpace,
    WingBlank,
    Provider,Radio,Toast } from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;
const RadioItem = Radio.RadioItem;
var ImagePicker = NativeModules.ImageCropPicker;
const {height, width} = Dimensions.get('window');
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
  handler1(){
    var userId = this.props.navigation.state.params.userId;
    axios.post('http://192.168.0.100:8080/user/modify',{
	userId:userId,
	userName:this.state.username,
	password:"123456",
	address:this.state.address,
	gender:this.state.sex,
	regDate:this.state.regDate,
	latitude:0,
	longitude:0,
	phone:this.state.phone
}
    //header:{"Content-Type":'application/json;charset=UTF-8'}
  )
    .then((response)=> {
      responsedata = response.data;
      console.log(responsedata);
      if(responsedata.status==200){
        DeviceEventEmitter.emit('editPersonPage');
        Toast.success('修改成功', 1); 
        }
      else
      Toast.fail('修改失败');
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  componentWillMount(){
    var userId = this.props.navigation.state.params.userId
    axios.get('http://192.168.0.100:8080/user/check',{params:{userId:userId}})
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
      console.log(error);
    });
    }

   onButtonPhone ()  {
    Modal.prompt(
      '电话',
      '',
      (password) => {this.setState({phone:password});
      this.handler1();
    },
      'default',
      null,
      ['请输入电话号码']
    );
  };
  onButtonName ()  {
    Modal.prompt(
      '昵称',
      '',
      (password) => {this.setState({username:password})
    this.handler1()},
      'default',
      null,
      ['请输入昵称']
    );
  };
  onButtonAddress ()  {
    Modal.prompt(
      '住址',
      '',
      (password) => {this.setState({address:password})
    this.handler1()},
      'default',
      null,
      ['请输入住址']
    );
  };
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
                <Icon
                            name='chevron-left'
                            size={17}
                            color='#ffffff'
                          /></View><View><Text style={{color:"#ffffff",fontSize:18}}>编辑资料</Text></View>
                </View>
            </ImageBackground>
            <View style={{backgroundColor:'#f0f0f0'}}>
                <View style={{marginTop:20,backgroundColor:"#ffffff"}}>
                    <View >
                        <ListItem
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
                        <ListItem onPress={this.onButtonAddress.bind(this)}
                        leftAvatar={<Text style={{fontSize:17}}>住址</Text>}
                        rightAvatar={<Icon
                            name='chevron-right'
                            size={17}
                            color='#C0C0C0'
                          />}
                          title={<Text  style={{fontSize:17,marginLeft:20}}>{this.state.address}</Text>}
                        />
                    </View>
                </View>
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
                    this.handler1();
                }}>
                <Text style={{ textAlign: 'center',fontSize:17 }}>男</Text></TouchableOpacity>
                <Divider style={{ marginRight:20,marginLeft:20,backgroundColor: '#f0f0f0',height:0.7,marginTop:10,marginBottom:10 }}/>
                <TouchableOpacity onPress={()=>{
                    this.setState({sex:'女',isVisable2:false});
                    this.handler1();
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