import React, {Component} from 'react';
import {StyleSheet, View,ScrollView} from 'react-native';
import {Header,Text,Icon,ListItem, Divider,Button} from 'react-native-elements';
//const {height, width} = Dimensions.get('window');
const list=[
{
    name:"王志远",
    sex:"先生",
    phone:"15201979195",
    address:"上海交通大学闵行校区",
    tag:"学校"
},
{
    name:"王志远1",
    sex:"先生",
    phone:"15201979195",
    address:"上海交通大学闵行校区",
    tag:"学校"
},
{
    name:"王志远2",
    sex:"先生",
    phone:"15201979195",
    address:"上海交通大学闵行校区",
    tag:"学校"
},
{
    name:"王志远3",
    sex:"先生",
    phone:"15201979195",
    address:"上海交通大学闵行校区",
    tag:"学校"
}
];
export default class AddAddress extends Component {
    constructor(props){
        super(props);
        this.state={
            addressList:[],
        }
    }
    componentWillMount(){
       this.setState({addressList:list});
    }
  render() {

    return (
     <View style={{flex:1}}>
         <View style={{flex:0.2}}>
        <Header
                leftComponent={<Icon name='arrow-back' color='#fff'
                /> }
                centerComponent={{ text: '选择地址', style: { color: '#fff',fontSize:20 } }}
            /></View>
       <ScrollView style={{flex:0.70}}>
       {
    this.state.addressList.map((item, i) => {
      return(
          <View>
      <ListItem
        key={item.key}
        title={<View style={{flexDirection:"row"}}><Text style={{fontSize:15,fontWeight:"bold"}}>{item.name}</Text>
        <Text style={{fontSize:14}}>{item.sex}</Text>
        <View style={{marginLeft:10}}>
        <Text style={{fontSize:14}}>{item.phone}</Text>
        </View>
        </View>}
        subtitle={<View style={{flexDirection:"row"}}><Text style={{fontWeight:"bold"}}>{item.tag}</Text><Text> {item.address}</Text></View>}
        leftAvatar={<View style={{width:30,height:30}}/>}
      />
      <Divider style={{backgroundColor: 'blue'}}/>
      </View>)
     } )
  }
       </ScrollView>
       <View style={{flex:0.1}}><Button title="新增收货地址"type="outline" onPress={()=>{this.props.navigation.navigate('AddAddressTable',{})}}/></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  }
});