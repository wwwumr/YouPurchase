import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';

let {width,height} = Dimensions.get('window');

//npm install react-native-side-menu --save
//https://github.com/react-native-community/react-native-side-menu


import SideMenu from 'react-native-side-menu'
import LeftMenu from './Test1'

export default class LeftSideMenu extends Component {
    constructor(props){
        super(props);

        this.state={
            isOpen:false,
        }

        this.SelectMenuItemCallBack = this.SelectMenuItemCallBack.bind(this);
    }


    //点击侧边栏的按钮，回调此函数，关闭menu
    SelectMenuItemCallBack(){
        this.setState({
            isOpen:!this.state.isOpen,
        })
    }

    //点击打开侧边栏
    SelectToOpenLeftSideMenu(){
        this.setState({
            isOpen:true,
        })
    }


    render() {

        //初始化menu，传递回调函数
        const menu=<LeftMenu onSelectMenuItem={this.SelectMenuItemCallBack}/>;

        return (
            <SideMenu
            menu={menu}
            //menu={<Menu onSelectMenuItem={this.SelectMenuItemCallBack}/>}//这样写也可以
            isOpen={this.state.isOpen}
            onChange={(isOpen)=>{
                this.setState({
                    isOpen:isOpen,
                })
            }}
            menuPosition={'left'}//侧边栏是左边还是右边
            openMenuOffset={0.25*width}//侧边栏的宽度
            edgeHitWidth={200}//手指拖动可以打开侧边栏的距离（距离侧边栏）

            >

                <View style={styles.container}>
                    <Text>
                        Welcome to React Native!
                    </Text>


                    <TouchableOpacity onPress={() => this.SelectToOpenLeftSideMenu() } >
                        <Text>点击打开侧边栏</Text>
                    </TouchableOpacity>


                </View>



            </SideMenu>



        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

});
