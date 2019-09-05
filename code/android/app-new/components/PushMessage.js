import JPushModule from 'jpush-react-native';
import React,{Component} from 'react';
import{View,Text,Linking,ToastAndroid}from'react-native'; 
export default class PushMessage extends Component{
 
componentDidMount() {
    // 新版本必需写回调函数
    // JPushModule.notifyJSDidLoad();
    JPushModule.notifyJSDidLoad((resultCode) => {
          if (resultCode === 0) {}
    });
 
    // 接收自定义消息
    JPushModule.addReceiveCustomMsgListener((message) => {
      this.setState({pushMsg: message});
    });
    // 接收推送通知
    JPushModule.addReceiveNotificationListener((message) => {
      console.log("receive notification: " + message);
    });
    // 打开通知
    JPushModule.addReceiveOpenNotificationListener((map) => {
      
      console.log("Opening notification!");
      console.log("map.extra: " + map.extras);
      Linking.canOpenURL("http://baidu.com").then(() => {
          return Linking.openURL("http://baidu.com");
      }).catch(error => ToastAndroid.show('网络异常',ToastAndroid.SHORT))
    });
  }
 
  componentWillUnmount() {
    JPushModule.removeReceiveCustomMsgListener();
    JPushModule.removeReceiveNotificationListener();
  }
  render(){
      return null;
  }
}