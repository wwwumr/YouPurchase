import React, {Component} from 'react'
import { ListItem,SearchBar,Header,Text,Image,Icon,Button, Divider,Rating} from 'react-native-elements'
import {ScrollView,View,Dimensions,StyleSheet,DeviceEventEmitter} from 'react-native'
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'
import SideMenu from 'react-native-side-menu'
import LeftMenu from './test/Test1'
import styles from 'react-native-side-menu/build/styles';
import GradeItem from './GradeItem';
import { List } from '@ant-design/react-native';
import config from '../components/config/config';
let {width,height} = Dimensions.get('window');
const style1 = StyleSheet.create({
  container: {
      backgroundColor: '#F8F8F8',
      height:height
  },

});
var list2=[];
var list=[];
/**
 * @description StoreGradeShow
 * @constructor
 */
export default class StoreGradeShow extends Component{
  constructor(props){
    super(props);

    this.state={
        isOpen:false,
        text:'',
        storeId:-1,
        itemlist:list,
        classlist:list2,
    }    
  }
  /**
   * @description 生命周期函数
   */
  componentWillMount(){
    var storeId = this.props.navigation.state.params.storeId;
    var url=config.url+"grade/show?storeId="+storeId;
    axios.get(url).then((response)=>{
      list = response.data;
      this.setState({itemlist:list});
    }).catch((e)=>{
      console.log(e);
    })
  }
  render() {
    var storeName= this.props.navigation.state.params.storeName;
    var address = this.props.navigation.state.params.address;
    var contact = this.props.navigation.state.params.contact;
    var score = this.props.navigation.state.params.score;
    var uri = this.props.navigation.state.params.coverPicUrl;
    return (    
      <View style={style1.container}>
        <View style={{width:width,height:height*0.09}}>
          <View style={{flexDirection:"row",marginLeft:20,marginTop:15}}>
            <View style={{marginRight:20}}>
            <TouchableOpacity onPress={()=>{
              this.props.navigation.goBack();
            }}>
            <Icon
              name='chevron-left'
              size={30}
              color='#3399ff'
            />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{fontSize:20}}>商店评价</Text>
          </View>
        </View>
      </View>
      <ScrollView style={{marginBottom:50}}>
        <View>
          <View style={{marginLeft:15,
            marginRight:15,
            backgroundColor:'#ffffff',
            borderColor:'#ffffff',
            borderRadius:10,
            borderWidth:1}}
          >
            <ListItem
              leftAvatar={<Image source={{uri:config.url2+uri}} style={{width:60,height:60}}/>}
              title={storeName}
              subtitle={<View style={{flexDirection:'row'}}>
                <Rating readonly imageSize={15} startingValue={score}/>
                <Text style={{fontSize:13}}> {score}</Text>
              </View>}
            />
          </View>
          <View style={{marginLeft:15,marginRight:15}}>
            <List renderHeader={'评价列表'}>
            {
              this.state.itemlist.map((item, i) => {
                return(
                  <GradeItem item={item} index={i} key={i}/>
                )
              } )
            }
            </List>
          </View>
        </View>
      </ScrollView>  
    </View>      
    );
  }
}

