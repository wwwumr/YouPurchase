import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Image,Text } from 'react-native-elements'
import {ScrollView,View,DeviceEventEmitter} from 'react-native';
import ItemMenu from '../components/Menu';
import ShopItem from '../components/ShopItem';
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import axios from 'axios'
var list = [
]
export default class ShopList extends Component{
    constructor(props){
        super(props);
        state={
            text:'',
            itemlist:list,
            center:{},
            tempvalue:'',
            yes:''
        }
    }
    /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 按照距离排序
     */
    change1(){
        list.sort(function(item1,item2){
            return item1.distance-item2.distance;
        })
        this.setState({itemlist:list})
    }
    /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 按照销量排序
     */
    change2(){
        list.sort(function(item1,item2){
            return item2.sales-item1.sales;
        })
        this.setState({itemlist:list})
    }
    /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 按照评分排序
     */
    change3(){
        list.sort(function(item1,item2){
            return item2.score-item1.score;
        })
        this.setState({itemlist:list})
    }
    /*********************************** 
    ****          事件处理函数    ****
    ************************************/

    /**
     * @description 跳转到商店的商品列表
     */
    handler(){
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Goodslist' })
            ],
        }))
    }
    /*********************************** 
    ****          生命周期函数    ****
    ************************************/

    /**
     * @description 获得商店列表
     */
    componentWillMount(){
        var tempcenter={};
        var url = "http://192.168.1.59:9000/stores/sort";
        Geolocation.getCurrentPosition()
        .then(data => {
            console.log(data)
            tempcenter['longitude']=parseFloat(data.longitude);
            tempcenter['latitude'] = parseFloat(data.latitude);
            console.log(tempcenter.longitude);
            console.log(tempcenter.latitude);
            url+=("?longitude="+tempcenter.longitude+"&latitude="+tempcenter.latitude);
            axios.get(url).then((response)=>{
                list = response.data;
                console.log(this.state.itemlist);
                this.setState({itemlist:list,center:tempcenter});
            }).catch(function(error){
                console.log(error);
            })
            this.setState({itemlist:list,center:tempcenter});
        })
        .catch(e =>{
            console.warn(e, 'error');
        })
      
        this.setState({itemlist:list,center:tempcenter});
      
    }
    /*********************************** 
    ****          生命周期函数    ****
    ************************************/

    /**
     * @description 当yes改变是刷新页面
     */
    componentWillReceiveProps(){
        var tempcenter={};
        var url = "http://192.168.1.59:9000/stores/sort";
        Geolocation.getCurrentPosition()
        .then(data => {
            console.log(data)
            tempcenter['longitude']=parseFloat(data.longitude);
            tempcenter['latitude'] = parseFloat(data.latitude);
            console.log(tempcenter.longitude);
            console.log(tempcenter.latitude);
            url+=("?longitude="+tempcenter.longitude+"&latitude="+tempcenter.latitude);
            axios.get(url).then((response)=>{
                list = response.data;
                console.log(this.state.itemlist);
                this.setState({itemlist:list,center:tempcenter});
            }).catch(function(error){
                console.log(error);
            })
            this.setState({itemlist:list,center:tempcenter});
        })
        .catch(e =>{
            console.warn(e, 'error');
        })
      
        this.setState({itemlist:list,center:tempcenter});
        var yes = this.props.yes+"123";
        this.setState({itemlist:list,yes:yes});
    }
     /*********************************** 
    ****          生命周期函数    ****
    ************************************/

    /**
     * @description 注册change1,chang2,change3的监听
     */
    componentDidMount(){
        this.listener = DeviceEventEmitter.addListener('change1', () => {
            this.change1();
        })
        this.listener = DeviceEventEmitter.addListener('change2', () => {
            this.change2();
        })
        this.listener = DeviceEventEmitter.addListener('change3', () => {
            this.change3()
        })
    }
    componentWillUnmount() {
      //移除监听
        if (this.listener) {
            this.listener.remove();
        }
    }
    render(){
        console.log(this.props.userId);
            return(
                <View>
                    <Header
                        leftComponent={<ItemMenu change1={this.change1}
                            change2={this.change2}
                            change3={this.change3}
                        />}
                        centerComponent={{ text: '商 店 列 表', style: { color: '#fff',fontSize:20 } }}
                        rightComponent={{icon:'home',color:"#fff"}}/>  
                        <SearchBar round={true}
                            placeholder="商 店 名"
                        />
          
                        <ScrollView style={{marginBottom:150}}>
                            <View>
                                <Text  style={{marginTop:10,
                                    textAlign:'center',
                                    fontSize:20,
                                    color:'#0080ff'}}
                                >-- 推荐商家 --
                                </Text>
                            <View>
                            {
                            this.state.itemlist.map((item, i) => (
                            <ShopItem 
                                storeId={item.storeDTO.key}
                                userId={this.props.userId}
                                info={item.storeDTO}
                                key={item.storeDTO.key}
                                storeName={item.storeDTO.storeName}
                                address={item.storeDTO.address}
                                contact={item.storeDTO.contact}
                                distance={item.distance.toFixed(2)}
                                sales={item.sales}
                                score={item.score}
                                navigation={this.props.navigation}
                            />
                            ))
                            }
                            </View>
                            </View>
                        </ScrollView>
                </View>
            )
    }
}