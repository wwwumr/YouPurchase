import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,DeviceEventEmitter
} from 'react-native';
import{ListItem} from 'react-native-elements';
const list = [
    {
      name: '苹果'
    },
    {
      name: '香蕉',
      
    },
    {
        name: '桃子',
        
      },
      {
        name: '西瓜',
        
      },
  ];
export default class LeftMenu extends Component {
    constructor(props){
        super(props);

        this.selectSideMenu = this.selectSideMenu.bind(this);
    }


    //函数回调
    selectSideMenu(){
        this.props.onSelectMenuItem();
    }

    render() {
        return (
            <View>
            <View style={{height:80,backgroundColor:"#0399d3"}}>
                <Text  style={{color:"#ffffff",marginTop:40,
        textAlign:'center',fontSize:20}}>品类</Text>
            </View>
            <View >
{
    this.props.classlist.map((l, i) => (
      <ListItem
        key={i}
        id={l.commodityClassId}
        title={l.classInfo}
        onPress={()=>{
          DeviceEventEmitter.emit("getClass",l.commodityClassId);
          this.selectSideMenu();
        }}
      />
    ))
  }
</View>
</View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff000f',
        justifyContent:'center',
        alignItems:'center',
    },

});
