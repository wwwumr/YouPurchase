import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import axios from 'axios';
import config from '../../../config/config';

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
                    .post(config.url.orderInfo, {
                        id: res.data.key,
                        status: 0,
                    })
                    .then(resp => {
                        this.setState({
                            orderList: resp.data,
                        })
                    })
                    .catch((err) => {
                        if (err.response) {
                            console.log(err.message);
                        }
                    })
            })
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
                title: "送货地址",
                dataIndex: 'tarAddress',
                key: '3',
            },{
                title: "联系方式",
                dataIndex: 'tarPhone',
                key: '4',
            },{
                title: "总价",
                dataIndex: 'totalPrice',
                key: '5',
            },{
                title: "订单状态",
                dataIndex: 'status',
                key: '6',
                render: (status) => {
                    switch(status){
                        case 0: return "未支付";
                        case 1: return "未发货"; 
                        case 2: return "配送中"; 
                        case 3: return "已完成"; 
                        default: return "异常状态";
                    }
                }
            },{
                title: "总价",
                dataIndex: 'totalPrice',
                key: '5',
            }
        ]
        return (
            <Table rowKey="orderInfoId" columns={tags} dataSource={this.state.orderList} />
        );
    }
}