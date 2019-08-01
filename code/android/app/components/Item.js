import React, { Component } from 'react';
import { Text, 
    View, 
    FlatList, 
    Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Item extends Component {
    constructor(props){
        super(props);
        this.state={
          data:this.props.data
        }
    }
    _renderItem({ item, index }) {
        const { 
            containerStyle, 
            lastItemStyle,
            imageStyle, 
            textStyle, 
            counterStyle,
            priceStyle } = styles;

        return (
            <View style={containerStyle}>
                <Image source={item.image} style={imageStyle} />
      
                <View style={textStyle}>
                    <Text style={{ color: '#2e2f30' }}>{item.name}</Text>
                    <View style={priceStyle}>
                        <Text style={{ color: '#2e2f30', fontSize: 12 }}>${item.price}</Text>
                    </View>
                </View>

                <View style={counterStyle}>
                    <Icon.Button 
                        name="ios-remove" 
                        size={25} 
                        color='#fff' 
                        backgroundColor='#fff' 
                        style={{ borderRadius: 15, backgroundColor: '#bbb', height: 30, width: 30 }} 
                        iconStyle={{ marginRight: 0 }}
                    />

                    <Text>{item.amountTaken}</Text>

                    <Icon.Button 
                        name="ios-add" 
                        size={25} 
                        color='#fff' 
                        backgroundColor='#fff' 
                        style={{ borderRadius: 15, backgroundColor: '#bbb', height: 30, width: 30 }} 
                        iconStyle={{ marginRight: 0 }}
                    />

                </View>
            </View>
        );
    }


    render() {
        console.log(this.props.data);
        return (
            <FlatList
                data={this.props.data}
                renderItem={this._renderItem}
                keyExtractor={(item) => item.id}
            />
        );
    }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff'
  },
  lastItemStyle: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff'
  },
  imageStyle: {
    width: 50, 
    height: 50, 
    marginRight: 20
  },
  textStyle: {
    flex: 2,
    justifyContent: 'center'
  },
  priceStyle: {
    backgroundColor: '#ddd',
    width: 40,
    alignItems: 'center',
    marginTop: 3,
    borderRadius: 3
  },
  counterStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
};

export default Item;
