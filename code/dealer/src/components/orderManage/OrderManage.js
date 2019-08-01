import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import OrderList from './orderManage/OrderList';
import OrderDetail from './orderManage/OrderDetail';
import OrderStatistics from './orderManage/OrderStatistics';

const { Sider, Content } = Layout;

class OrderManage extends React.Component {

    render() {
        return (
            <Layout style={{ background: '#fff'}}>
                <Sider theme="light" style={{ height: 50, background: "#fff", marginTop: 50, width: 150}}>
                    <Menu theme="light" style={{ width: 150 }}>
                        <Menu.Item key="0" >
                        <Link to="/orderManage/" >订单查看</Link>
                        </Menu.Item>
                        <Menu.Item key="1" >
                        <Link to="/orderManage/orderStatistics/" >订单统计</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout >
                    <Content style={{background: '#fff'}}>
                    <div style={{marginTop: 50, marginRight: 50}}>
                        <Switch>
                            <Route exact path={"/orderManage/"} component={ OrderList } />
                            <Route exact path={"/orderManage/orderDetail/:orderInfoId"} component={ OrderDetail } />
                            <Route exact path={"/orderManage/orderStatistics/"} component={OrderStatistics} ></Route>
                        </Switch>
                    </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default OrderManage;