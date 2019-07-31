import React, { Component } from 'react';
import { View } from 'react-native';
import BasketContainer from './BasketComponent';
import Footer from './Footer';
import {Header} from 'react-native-elements';
import Item from './Item';
import DeviceStorage from './Store';
var ss=[];
const image1 = require('../images/fruit/apple_pic.png');
const image2 = require('../images/fruit/banana_pic.png');
const image3 = require('../images/fruit/cherry_pic.png');
const image4 = require('../images/fruit/grape_pic.png');
const image5 = require('../images/fruit/mango_pic.png');
const image6 = require('../images/fruit/orange_pic.png');
const image7 = require('../images/fruit/pear_pic.png');
const image8 = require('../images/fruit/pineapple_pic.png');
const image9 = require('../images/fruit/strawberry_pic.png');
const image10 = require('../images/fruit/watermelon_pic.png');
const data = [
{
  id: 1,
  image: image1,
  name: '苹果',
  price: 2,
  amountTaken: 1
}, {
  id: 2,
  image: image2,
  name: '香蕉',
  price: 3,
  amountTaken: 1
}, {
  id: 3,
  image: image3,
  name: '樱桃',
  price: 4,
  amountTaken: 1
}, {
  id: 4,
  image: image4,
  name: '葡萄',
  price: 5,
  amountTaken: 1
}, {
  id: 5,
  image: image5,
  name: '芒果',
  price: 6,
  amountTaken: 1
}, {
    id: 6,
    image: image6,
    name: '橙子',
    price: 7,
    amountTaken: 1
  } ,{
    id: 7,
    image: image7,
    name: '香梨',
    price: 8,
    amountTaken: 1
  }, {
      id: 8,
      image: image8,
      name: '菠萝',
      price: 9,
      amountTaken: 1
    } ,{
        id: 8,
        image: image9,
        name: '草莓',
        price: 9,
        amountTaken: 1
      },{
        id: 10,
        image: image10,
        name: '西瓜',
        price: 10,
        amountTaken: 1
      }
];

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state={
            itemdata:[]
        }
    }
    componentWillMount(){
        DeviceStorage.get('goodsid').then((value)=>{
            console.log("Yes!");
            console.log(value);
            console.log("Yes!");
            ss = value.split(' ');
            templist=[];
            for(var i=0;i<ss.length;i++){
                var temp = parseInt(ss[i])-1;
                templist.push(data[temp]);
            }
            this.setState({itemdata:templist})
            console.log(ss);
        })
        
    }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
                leftComponent={{icon: 'menu', color: '#fff'}}
                centerComponent={{ text: ' 我 的 购 物 车', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{icon:'home',color:"#fff"}}/>
        <View style={styles.containterStyle}>
        <Item data={this.state.itemdata}/>
      </View>
        <BasketContainer />
        <Footer />
      </View>
      
    );
  }
}
const styles = {
    containterStyle: {
      flex: 4,
      backgroundColor: '#DCDCDC'
    }
  };

