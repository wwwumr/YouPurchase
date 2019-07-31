import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, message, Layout, Menu } from 'antd';
import axios from 'axios';
import config from '../../../config/config';

const { Header, Content } = Layout;
const ORDERSTATUS = ["未支付", "未接单", "配送中", "已送达"]
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
                    onClick={ () => { this.handleAccept(record)} }
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
export default class OrderList extends React.Component {

    state = {
        key: null,
        orderList: [],
    }
    
    componentDidMount() {
        axios
            .get(config.url.store)
            .then(res => {
                this.setState({
                    key: res.data.key,
                })
                axios
                    .get(config.url.orderInfo)
                    .then(resp => {
                        this.setState({
                            orderList: resp.data,
                        })
                        console.log(resp.data)
                    })
                    .catch((err) => {
                        if (err.response) {
                            console.log(err.message);
                        }
                    })
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

    render() {
        
        return (
            <Layout>
                <Header>
                    <Menu mode="horizontal" theme="light" >
                    <Menu.Item>
                    未配送
                    </Menu.Item>
                    <Menu.Item>
                    未接单
                    </Menu.Item>
                    <Menu.Item>
                    配送中
                    </Menu.Item>
                    <Menu.Item>
                    已完成
                    </Menu.Item>
                    </Menu>
                </Header>
                <Content>
                    <Table rowKey="orderInfoId" columns={tags} dataSource={this.state.orderList} />
                </Content>
            </Layout>
            
        );
    }
}