import React,{Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Upload from './Upload'
import { Input,Image,Header,Text,Button,Overlay, Divider } from 'react-native-elements';
import {View,StyleSheet,TouchableOpacity,ImageBackground, NativeModules,Dimensions,DeviceEventEmitter,ToastAndroid} from'react-native';
var ImagePicker = NativeModules.ImageCropPicker;
const {height, width} = Dimensions.get('window');
/**
 * @description PersonPage
 * @constructor
 */
export default class PersonPage extends Component{
  constructor(props){
    super(props);
    this.state={
      isVisible:false,
      phone:'',
      username:'',
      address:'上海交通大学',
      sex:'',
      detail:{},
      image: null,
      uri:'http://192.168.1.19:8080/user/getPhoto?userId='+this.props.userId+"&v="+Math.random()
    }
  }
  /**
   * @description 加载时注册editPersonPage的监听
   */
  componentDidMount(){
    this.listener = DeviceEventEmitter.addListener('editPersonPage', () => {
      this.change();
    })
  }
  /**
   * @description 页面销毁时移除监听
   */
  componentWillUnmount() {
      //移除监听
    if (this.listener) {
      this.listener.remove();
    }    
  }
  /**
   * @description editPersonPage响应函数
   */
  change(){
    console.log(this.props.userId);
    axios.get('http://192.168.1.19:8080/user/check',{params:{userId:this.props.userId}})
    .then((response)=> {
      var responseData = response.data;
      console.log(responseData);
      this.setState({detail:responseData,uri:'http://192.168.1.19:8080/user/getPhoto?userId='+this.props.userId+"&v="+Math.random()})
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
    console.log(this.props.userId);
    axios.get('http://192.168.1.19:8080/user/check',{params:{userId:this.props.userId}})
    .then((response)=> {
      var responseData = response.data;
      console.log(responseData);
      this.setState({detail:responseData})
    })
    .catch(function (error) {
      ToastAndroid.show('网络异常',ToastAndroid.SHORT);
      console.log(error);
    });
    
  }
  render(){
    return(
      <View>
      <ImageBackground
        style={{width:width,height:height*0.4}}
        source={require('../images/pagebeijing.jpg')}
      >
      <View style={{marginTop:30,alignItems:'center'}}>
        <Image source={{uri:this.state.uri}}style={{width:120,height:120,borderRadius:60}}/>
      </View>
      <View style={{marginTop:30,marginLeft:100,marginRight:100}}>
        <Text style={{textAlign:'center',
          fontSize:20,
          fontWeight:'bold'}}>{this.state.detail.userName}
        </Text>
      </View>
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('EditPage',{userId:this.props.userId})}}>
        <View style={{flexDirection:'row-reverse'}}>
          <View style={{marginRight:10}}>
            <Text style={{color:"#585858"}}>修改</Text>
          </View>
          <Icon
            name='edit'
            size={24}
            color='#585858'
          />
        </View>
      </TouchableOpacity>
      </ImageBackground>
      <View
        style={{marginLeft:20,
          marginRight:20,
          borderRadius: 10,
          marginTop:10,
          shadowColor:'green',
          shadowOffset:{h:5,w:5},
          shadowRadius:10,
          elevation: 4,
          shadowOpacity:0.5}}
      >
        <View style={{marginLeft:20,
          marginRight:20,
          marginTop:10,
          marginBottom:10}}
        >
          <Text style={{textAlign:'center',
            fontSize:25,
            fontWeight:'bold',
            color:"#c0c0c0"}}>个人信息
          </Text>
          <Divider style={{ marginTop:10,
            backgroundColor: '#f0f0f0',
            height:0.7,
            marginBottom:10 }}
          />
          <View style={{flexDirection:'row'}}>
            <Icon
              name='user'
              size={30}
              color='#A0A0A0'
            />
            <View style={{marginLeft:20}}>
              <Text style={{fontSize:15,
                fontWeight:'bold',
                color:"#c0c0c0"}}>{this.state.detail.userName}
              </Text>
            </View>
          </View>
          <Divider style={{ marginTop:10,
            backgroundColor: '#f0f0f0',
            height:0.7,
            marginBottom:10 }}
          />
          <View style={{flexDirection:'row'}}>
            <Icon
              name='intersex'
              size={30}
              color='#A0A0A0'
            />
            <View style={{marginLeft:10}}>
              <Text style={{fontSize:15,
                fontWeight:'bold',
                color:"#c0c0c0"}}>{this.state.detail.gender}
              </Text>
            </View>
          </View>
          <Divider style={{ marginTop:10,
            backgroundColor: '#f0f0f0',
            height:0.7,
            marginBottom:10 }}
          />
          <View style={{flexDirection:'row'}}>
            <Icon
              name='phone'
              size={30}
              color='#A0A0A0'
            />
            <View style={{marginLeft:10}}>
              <Text style={{fontSize:15,
                fontWeight:'bold',
                color:"#c0c0c0"}}>{this.state.detail.phone}
              </Text>
            </View>
          </View>
          <Divider style={{ marginTop:10,
            backgroundColor: '#f0f0f0',
            height:0.7,
            marginBottom:10 }}
          />
        </View>
              
      </View>
    </View>
    );
  }
      
}
const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    backgroundColor:'rgba(0,0,0,0)'
  }
});