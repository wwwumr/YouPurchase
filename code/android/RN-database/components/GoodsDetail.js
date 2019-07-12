import React,{Component} from 'react';
import {View,TouchableOpacity} from 'react-native';
import {Image,Header,Text,Divider,Icon} from 'react-native-elements';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import DeviceStorage from './Store';
export default class GoodsDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            item:{},
            id:-1
        }
    }
    componentWillMount(){
        var id =  this.props.navigation.state.params.goodsId;
        var url='http://192.168.1.19:9000//commodities/'+id;
        axios.get(url).then((response)=>{
        tempitem = response.data;
        this.setState({item:tempitem,id:id});
        console.log(this.state.item);
      }).catch(function(error){
        console.log(error);
      })
    }
    render(){
        
        return(
            <View>
                <Header
                leftComponent={<Icon name='arrow-back' color='#fff'
                onPress={() => this.props.navigation.goBack()}/> }
                centerComponent={{ text: '商 品 详 情', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{icon:'home',color:"#fff"}}/>
                <ScrollView>
                    <View>
                <View style={{alignItems:'center',marginTop:20}}>
                <Image source={{uri:this.state.item.commodityCoverPicUrl}} style={{width:200,height:200}}/>  
                </View>
                <Divider style={{ backgroundColor: 'blue' }}/>
                <Text style={{marginLeft:20}}h2>{this.state.item.commodityInfo}</Text>
                <Divider style={{ backgroundColor: 'blue' }}/>
                <View style={{flexDirection:'row'}}>
                <Text h3 style={{color:'#DC143C',marginLeft:20}}>¥ {this.state.item.price}</Text>
                <Text h4 style={{marginLeft:200}}>{this.state.item.onShelves ?"有货":"无货" }</Text></View>
                <Divider style={{ backgroundColor: 'blue' }}/>
                </View>
                </ScrollView>
                <View    borderStyle="solid"borderColor="#0000"style={{flexDirection:'row',marginTop:225,alignItems:'flex-end'}}>
                <TouchableOpacity
                onPress={()=>{
                    DeviceStorage.delete('goodsid');
                }}
                ><Text style={{marginRight:50 ,borderStyle:'solid',borderColor:"#000000",color:"#000000",backgroundColor:'#ffffff',fontSize:30}}>加入购物车</Text></TouchableOpacity>
                <TouchableOpacity><Image source={require('../images/cart1.jpg')} style={{width:30,height:30}}/></TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    DeviceStorage.get('goodsid').then((value)=>{
                        var id =  this.props.navigation.state.params.goodsId;
                        console.log(value);
                        if(value==null) {
                            var temp=""+id;
                            DeviceStorage.save('goodsid',temp)}
                        else{
                            var temp=value+=" "+id
                             DeviceStorage.update('goodsid',temp)
                        }
                    })
                }}><Text style={{marginLeft:60,color:"#ffffff",backgroundColor:'#DC143C',fontSize:30}}>立即购买</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}