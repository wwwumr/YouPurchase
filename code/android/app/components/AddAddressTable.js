import React, {Component} from 'react';
import {StyleSheet, View,ScrollView} from 'react-native';
import {Header,Text,Icon,ListItem, Divider,Button,Input,ButtonGroup} from 'react-native-elements';
//const {height, width} = Dimensions.get('window');
const buttons = ['先生','女士']
const buttons1 = ['家','学校','公司']
export default class AddAddressTable extends Component {
    constructor(props){
        super(props);
        this.state={
            addressList:[],
            name:"王志远",
            selectedIndex: 0,
            phone:"15201979195",
            address:"",
            selectedIndex2:0
        }
        this.updateIndex = this.updateIndex.bind(this)
        this.updateIndex2 = this.updateIndex2.bind(this)
    }
    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
      }
      updateIndex2 (selectedIndex2) {
        this.setState({selectedIndex2})
      }
    componentWillMount(){
       
    }
  render() {
    const { selectedIndex,selectedIndex2 } = this.state
    return (
     <View >
        <Header
                leftComponent={<Icon name='arrow-back' color='#fff'
                /> }
                centerComponent={{ text: '选择地址', style: { color: '#fff',fontSize:20 } }}
            />
            <ScrollView>
                <View>
      <ListItem
      leftAvatar={<View style={{width:30,height:20}}><Text style={{fontWeight:"bold"}}>{"姓名"}</Text></View>}
      title={<Input onChangeText={(value) => this.setState({name: value})}
      value={this.state.name}/>}
      />
      <ListItem
      leftAvatar={<View style={{width:30,height:20}}><Text style={{fontWeight:"bold"}}>{"性别"}</Text></View>}
      title={<View style={{flexDirection:'row'}}><Button type="outline"title="先生"/><View style={{marginLeft:20}}><Button type="outline"title="女士"/></View></View>}
      />
     <Divider style={{backgroundColor: 'blue'}}/>
       <ListItem
      leftAvatar={<View style={{width:30,height:20}}><Text style={{fontWeight:"bold"}}>{"电话"}</Text></View>}
      title={<Input onChangeText={(value) => this.setState({phone: value})}
      value={this.state.phone}/>}
      />
      <ListItem
      leftAvatar={<View style={{width:30,height:20}}><Text style={{fontWeight:"bold"}}>{"地址"}</Text></View>}
      title={<Input onChangeText={(value) => this.setState({address: value})}
      value={this.state.address} placeholder='小区/写字楼等'/>}
      />
      <ListItem
      leftAvatar={<View style={{width:30,height:20}}><Text style={{fontWeight:"bold"}}>{"标签"}</Text></View>}
      title={<View style={{flexDirection:'row'}}><Button type="outline"title="学校"/><View style={{marginLeft:20}}><Button type="outline"title="家"/></View><View style={{marginLeft:20}}><Button type="outline"title="公司"/></View></View>}
      />
      </View></ScrollView>
      <View style={{marginLeft:15,marginRight:15}}>
      <Button title="保存"/>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  }
});