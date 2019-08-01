import React from 'react';
import { HashRouter, Route, Switch, Link, } from 'react-router-dom';
import { hashHistory } from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import StoreMessage from './shopDetail/storeMessage';
import StoreImg from './shopDetail/StoreImg';
import StoreMap from './shopDetail/StoreMap';

const {  Content, Sider } = Layout;


export default class ShopMessage extends React.Component {

    storeId= this.props.match.params.key;

    render() {
        
        return(
        <HashRouter history= {hashHistory} >
        <Layout >
            <Layout style={{background: '#fff'}}>
                <Sider theme="light" style={{marginLeft: 100, marginTop: 64, overflow: "auto", }}>
                    <Menu theme="light" mode="inline" >
                        <Menu.Item key="1">
                        <Link to={"/shopManage/shopDetail/" + this.storeId} >店铺信息</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                        <Link to={"/shopManage/shopDetail/storeImg/" + this.storeId} >封面图片</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                        <Link to={"/shopManage/shopDetail/storeMap/" + this.storeId} >位置设置</Link> 
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content style={{  marginTop: 64,}}>
                <div  style={{ marginLeft: 24, width: 800, height: 450, textAlign: "center"}} >
                    <Switch>
                        <Route exact path="/shopManage/shopDetail/:storeId" 
                            render = {(props) => <StoreMessage {...props}/>} 
                        >
                        </Route>
                        <Route exact path="/shopManage/shopDetail/storeImg/:storeId" 
                            render = {(props) => <StoreImg {...props} />} 
                        >
                        </Route>
                        <Route exact path="/shopManage/shopDetail/storeMap/:storeId" 
                            render = {(props) => <StoreMap {...props} />} 
                        >
                        </Route>
                    </Switch>
                </div>
                </Content>
            </Layout>
        </Layout>
        </HashRouter>
        );
    }
}