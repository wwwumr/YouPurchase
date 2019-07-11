import React,{Component} from 'react';
import {View,TouchableOpacity} from 'react-native';
import {Image,Header,Text,Divider} from 'react-native-elements';
export default class GoodsDetail extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View>
                <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: '商 品 详 情', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{icon:'home',color:"#fff"}}/>
                <View style={{alignItems:'center',marginTop:20}}>
                <Image source={require('../images/fruit/apple_pic.png')} style={{width:200,height:200}}/>  
                </View>
                <Divider style={{ backgroundColor: 'blue' }}/>
                <Text style={{marginLeft:20}}h2>苹果</Text>
                <Divider style={{ backgroundColor: 'blue' }}/>
                <View style={{flexDirection:'row'}}>
                <Text h3 style={{color:'#DC143C',marginLeft:20}}>¥ 2</Text>
                <Text h4 style={{marginLeft:200}}>有货</Text></View>
                <Divider style={{ backgroundColor: 'blue' }}/>
                <View style={{flexDirection:'row',marginTop:225}}>
                <TouchableOpacity style={{borderColor:"#000000"} }><Text style={{color:"#000000",backgroundColor:'#ffffff',fontSize:30}}>店铺</Text></TouchableOpacity>
                <TouchableOpacity><Image source={require('../images/cart1.jpg')} style={{width:30,height:30}}/></TouchableOpacity>
                <TouchableOpacity><Text style={{borderStyle:'solid',borderColor:"#000000",color:"#000000",backgroundColor:'#ffffff',fontSize:30}}>加入购物车</Text></TouchableOpacity>
                <TouchableOpacity><Text style={{color:"#ffffff",backgroundColor:'#DC143C',fontSize:30}}>立即购买</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}