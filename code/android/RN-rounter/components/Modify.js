import React,{Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Image,Header,Text,Button } from 'react-native-elements';
import {View,StyleSheet,TouchableOpacity,ImageBackground} from'react-native';
export default class Modify extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View>
        <Overlay
  isVisible={this.state.isVisible}
  onBackdropPress={() => this.setState({ isVisible: false })}
>
      <View style={{marginTop:30,alignItems:'center'}}>
          <TouchableOpacity>
        <Image source={require('./images/upload.jpg')}style={{width:100,height:100}}/>
        </TouchableOpacity>
      </View>
      <View style={{marginTop:10,margin:100,marginRight:100}}>
        <Text style={{textAlign:'center',fontSize:20}}>请 选 择 头 像</Text>
        </View>
      <View style={{marginLeft:30,marginRight:30}}>
      <Input 
           placeholder='用 户 名'
           leftIcon={
               <Image
                   source={require('./images/user.jpg')}
                  style={{ width: 30, height: 30 }}
            />
           }
           />
           <Input 
           placeholder='手 机'
           leftIcon={
               <Image
                   source={require('./images/shouji.jpg')}
                  style={{ width: 30, height: 30 }}
            />}/>
            <Input 
           placeholder='住 址'
           leftIcon={
               <Image
                   source={require('./images/fangzi.jpg')}
                  style={{ width: 30, height: 30 }}
            />}/>
            <View style={{marginTop:10}}>
            <Button  
           icon={
          <Image source={require('./images/queding.jpg')} style={{width:20,height:20,alignItems:'center'}}/>
           }title="确 定"
           /></View>
      </View>
      </Overlay>
      </View>
      )}
}
const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    backgroundColor:'rgba(0,0,0,0)'
  }
});