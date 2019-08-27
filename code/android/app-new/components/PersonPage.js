import React,{Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Upload from './Upload'
import { Input,Image,Header,Text,Button,Overlay, Divider } from 'react-native-elements';
import {View,StyleSheet,TouchableOpacity,ImageBackground, NativeModules,Dimensions,DeviceEventEmitter} from'react-native';
var ImagePicker = NativeModules.ImageCropPicker;
const {height, width} = Dimensions.get('window');
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
      uri:"http://192.168.0.100:8080//user/getPhoto?userId="+this.props.userId+"&v=0"
    }
  }
  componentDidMount(){
    this.listener = DeviceEventEmitter.addListener('editPersonPage', () => {
    this.change();
      })
    }
    componentWillUnmount() {
      //移除监听
      if (this.listener) {
        this.listener.remove();
      }
    }
    change(){
        console.log(this.props.userId);
        axios.get('http://192.168.0.100:8080/user/check',{params:{userId:this.props.userId}})
        .then((response)=> {
          var responseData = response.data;
          console.log(responseData);
          this.setState({detail:responseData})
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  componentWillMount(){
    console.log(this.props.userId);
    axios.get('http://192.168.0.100:8080/user/check',{params:{userId:this.props.userId}})
    .then((response)=> {
      var responseData = response.data;
      console.log(responseData);
      this.setState({detail:responseData})
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
  handler(){
    this.setState({isVisible:true})
  }
  handler1(){
    var responseData = this.state.detail;
    axios.post('http://192.168.0.100:8080/user/modify',/*params:{userId:responseData.userId,userName:this.state.username,password:"123456",
    address:this.state.address,
    phone:this.state.phone,
    gender:this.state.sex,
    regDate:responseData.regDate,
    latitude:responseData.latitude,
    longitude:responseData.longitude,
    photo:responseData.photo
  }*/{
	userId:responseData.userId,
	userName:this.state.username,
	password:"123456",
	address:this.state.address,
	gender:this.state.sex,
	regDate:responseData.regDate,
	latitude:responseData.latitude,
	longitude:responseData.longitude,
	phone:this.state.phone
}
    //header:{"Content-Type":'application/json;charset=UTF-8'}
  )
    .then((response)=> {
      responsedata = response.data;
      console.log(responsedata);
      if(responsedata.status==200){
          this.setState({detail:responsedata,uri:"http://192.168.0.100:8080//user/getPhoto?userId="+this.props.userId+"&v=0"+Math.random(),
          isVisible:false})
        }
      else
      Alert.alert("操作失败")
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  pickSingleBase64(cropit) {
    var uri = "http://192.168.0.100:8080/user/getPhoto?userId="+this.props.userId+"&v="+Math.random();
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
    }).then((image) => {
      console.log('received base64 image');
      
      console.log(image.data);
      axios.post("http://192.168.0.100:8080/user/uploadPhoto",{userId:this.props.userId,photoImage:`data:${image.mime};base64,`+ image.data}).then((response)=>{
        tempitem = response.data;
        console.log(tempitem);
      }).catch(function(error){
        console.log(error);
      })
      this.setState({
        uri:uri
      });
      
    }).catch(e => alert(e));
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
        <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>{this.state.detail.userName}</Text></View>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('EditPage',{userId:this.props.userId})}}>
            <View style={{flexDirection:'row-reverse'}}>
              <View style={{marginRight:10}}><Text style={{color:"#585858"}}>修改</Text></View>
            <Icon
          name='edit'
          size={24}
          color='#585858'
        />
            </View></TouchableOpacity>
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
              <View style={{marginLeft:20,marginRight:20,marginTop:10,marginBottom:10}}>
              <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold',color:"#c0c0c0"}}>个人信息</Text>
              <Divider style={{ marginTop:10,backgroundColor: '#f0f0f0',height:0.7,marginBottom:10 }}/>
                <View style={{flexDirection:'row'}}><Icon
                  name='user'
                  size={30}
                  color='#A0A0A0'
                  />
                  <View style={{marginLeft:20}}>
                  <Text style={{fontSize:15,fontWeight:'bold',color:"#c0c0c0"}}>{this.state.detail.userName}</Text>
                  </View>
                  </View>
                  <Divider style={{ marginTop:10,backgroundColor: '#f0f0f0',height:0.7,marginBottom:10 }}/>
                <View style={{flexDirection:'row'}}><Icon
                  name='phone'
                  size={30}
                  color='#A0A0A0'
                  />
                  <View style={{marginLeft:10}}>
                  <Text style={{fontSize:15,fontWeight:'bold',color:"#c0c0c0"}}>{this.state.detail.phone}</Text>
                  </View></View>
                  <Divider style={{ marginTop:10,backgroundColor: '#f0f0f0',height:0.7,marginBottom:10 }}/>
                <View style={{flexDirection:'row'}}>
                <Icon
                  name='home'
                  size={30}
                  color='#A0A0A0'
                  />
                  <View style={{marginLeft:10}}>
                  <Text style={{fontSize:15,fontWeight:'bold',color:"#c0c0c0"}}>{this.state.detail.address}</Text>
                  </View>
                </View>
                <Divider style={{ marginTop:10,backgroundColor: '#f0f0f0',height:0.7,marginBottom:10 }}/>
              </View>
              
            </View>
            </View>
    );
  }
  /*render(){
    console.log(this.state.uri);
    return(
      <View>
      <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: '个 人 主 页', style: { color: '#fff',fontSize:25 } }}
                rightComponent={<Image source={require('../images/shezhi.jpg')}style={{width:30,height:30}}/>}/>
      <View style={{marginTop:30,alignItems:'center'}}>
        <Image source={{uri:this.state.uri}}style={{width:150,height:150}}/>
      </View>
      <View style={{marginTop:10,marginLeft:100,marginRight:100}}>
        <Text style={{textAlign:'center',fontSize:20}}>{this.state.detail.userName}</Text>
        <Button type="outline" style={{marginLeft:50,marginRight:50}} onPress={this.handler.bind(this)}
           icon={
          <Image source={require('../images/bianji.jpg')} style={{width:20,height:20,alignItems:'center'}}/>
           }title="编 辑"
           />
      </View>
      <View style={{backgroundColor:"#f0f0f0",marginTop:10,flexDirection:'row',marginLeft:30,marginRight:30}}>
        <Image source={require('../images/shouji.jpg')}style={{width:30,height:30}}/>
        <Text style={{marginLeft:50,textAlign:'left',fontSize:20,color:"#0080ff"}}>{this.state.detail.phone}</Text>
      </View>
      <View style={{backgroundColor:"#f0f0f0",marginTop:10,flexDirection:'row',marginLeft:30,marginRight:30}}>
        <Image source={require('../images/user.jpg')}style={{width:30,height:30}}/>
        <Text style={{marginLeft:50,textAlign:'left',fontSize:20,color:"#0080ff"}}>{this.state.detail.userName}</Text>
      </View>
      <View>
        <Overlay
  isVisible={this.state.isVisible}
><Text h4 style={{textAlign:'center',
    color:'#0080ff'}}>编辑个人资料</Text>
      <View style={{marginTop:30,alignItems:'center'}}>
      <TouchableOpacity onPress={() => this. pickSingleBase64(false)}>
        <Image source={require('../images/upload.jpg')}style={{width:50,height:50}}/>
        </TouchableOpacity>
      </View>
      <View style={{marginTop:10,marginLeft:100,marginRight:100}}>
        <Text style={{textAlign:'center',fontSize:10}}>请 选 择 头 像</Text>
        </View>
      <View style={{marginLeft:30,marginRight:30}}>
      <Input 
           placeholder='用 户 名' onChangeText={(value) => this.setState({username: value})}
           value={this.state.username}
           leftIcon={
               <Image
                   source={require('../images/user.jpg')}
                  style={{ width: 30, height: 30 }}
            />
           }
           />
           <Input onChangeText={(value) => this.setState({sex: value})}
       value={this.state.sex}
           placeholder='性 别'
           leftIcon={
               <Image
                   source={require('../images/sex.jpg')}
                  style={{ width: 30, height: 30 }}
            />
           }
           />
           <Input onChangeText={(value) => this.setState({phone: value})}
       value={this.state.phone}
           placeholder='手 机'
           leftIcon={
               <Image
                   source={require('../images/shouji.jpg')}
                  style={{ width: 30, height: 30 }}
            />}/>
            <View style={{marginTop:10}}>
            <Button  onPress={this.handler1.bind(this)}
           icon={
          <Image source={require('../images/queding.jpg')} style={{width:20,height:20,alignItems:'center'}}/>
           }title="确 定"
           /></View>
      </View>
      </Overlay>
      </View>
      </View>
      )}*/
      
}
const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    backgroundColor:'rgba(0,0,0,0)'
  }
});