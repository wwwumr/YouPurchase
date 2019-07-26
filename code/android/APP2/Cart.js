/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import ItemsContainer from './components/ItemsContainer';
import BasketContainer from './components/BasketComponent';
import Footer from './components/Footer';
import {Header} from 'react-native-elements';

export default class Cart extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
                leftComponent={{icon: 'menu', color: '#fff'}}
                centerComponent={{ text: ' 我 的 购 物 车', style: { color: '#fff',fontSize:20 } }}
                rightComponent={{icon:'home',color:"#fff"}}/>
        <ItemsContainer />
        <BasketContainer />
        <Footer />
      </View>
      
    );
  }
}

