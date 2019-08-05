import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, message, Layout, Menu } from 'antd';
import axios from 'axios';
import config from '../../../config/config';

const { Header, Content } = Layout;
const ORDERSTATUS = ["未支付", "未接单", "配送中", "已送达"]

export default class OrderList extends React.Component {

    state = {
        key: null,
        orderList: [],
        targetList: [],
    }
    
    componentDidMount() {
        axios
            .get(config.url.orderInfo)
            .then(res => {
                this.setState({
                    orderList: res.data,
                    targetList: res.data,
                })
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.message);
                }
            })
    }

    handleAccept = (record) => {
        let orderInfoId = record.orderInfoId;
        let status = record.status;
        axios
            .get(config.url.orderModify.get, {
                params: {
                    orderInfoId: orderInfoId,
                    status: status + 1,
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    message.success("接单成功");
                    let orderList = this.state.orderList.map((elem) => {
                        if (elem.orderInfoId === orderInfoId) {
                            elem.status += 1;
                        }
                        return elem;
                    })
                    this.setState({
                        orderList: orderList,
                    })
                }
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.message);
                }
            })
    }

    handleSelect = (e) => {
        if (this.state.orderList.length > 0) {
            if (e.key === "default") {
                let targetList = this.state.orderList;
                this.setState({
                    targetList: targetList,
                })
            } else {
                let targetList = this.state.orderList.filter((elem) => {
                    return elem.status === parseInt(e.key);
                })
                this.setState({
                    targetList: targetList,
                })
            }
        }
    }

    render() {
        const tags = [
            {
                title: "时间",
                dataIndex: 'createDate',
                key: '1',
                width: "120px",
                sortOrder: 'ascend',
            },{
                title: "顾客",
                dataIndex: 'tarPeople',
                key: '2',
            },{
                title: "订单总价",
                dataIndex: 'totalPrice',
                key: '3',
            },{
                title: "联系方式",
                dataIndex: 'tarPhone',
                key: '4',
            },{
                title: "送货地址",
                dataIndex: 'tarAddress',
                key: '5',
                width: "20%"
            },{
                title: "订单状态",
                dataIndex: 'status',
                key: '6',
                render: (status) => { return ORDERSTATUS[status] }
            },{
                title: "确认接单",
                dataIndex: 'status',
                key: '7',
                render: (status, record) => {
                    return (
                        <Button disabled={ status !== 1 } 
                            onClick={ () => { this.handleAccept(record) }}
                        >
                        接单
                        </Button>
                    );}
            },{
                title: "订单详情",
                dataIndex: 'orderInfoId',
                key: '8',
                render: (text) => <Link to={"/orderManage/orderDetail/" + text}>{"查看详情"}</Link>
            }
        ]
        return (
            <Layout>
                <Header style={{ background: '#fff'}} >
                    <Menu mode="horizontal" theme="light" >
                    <Menu.Item key="default"
                        onClick={ this.handleSelect }
                    >
                    全部订单
                    </Menu.Item>
                    <Menu.Item key="0"
                        onClick={ this.handleSelect }
                    > 
                    {ORDERSTATUS[0]}
                    </Menu.Item>
                    <Menu.Item key="1"
                        onClick={ this.handleSelect }
                    >
                    {ORDERSTATUS[1]}
                    </Menu.Item>
                    <Menu.Item key="2" 
                        onClick={ this.handleSelect }
                    >
                    {ORDERSTATUS[2]}
                    </Menu.Item>
                    <Menu.Item key="3"
                        onClick={ this.handleSelect }
                    >
                    {ORDERSTATUS[3]}
                    </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{background: '#fff'}}>
                    <Table rowKey="orderInfoId" columns={tags} dataSource={this.state.targetList} />
                </Content>
            </Layout>
            
        );
    }
}