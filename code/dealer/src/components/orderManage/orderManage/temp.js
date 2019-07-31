import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import axios from 'axios';
import config from '../../config/config';


class OrderManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: null,
            orderList: [],
        }
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
            },{
                title: "顾客",
                dataIndex: 'tarPeople',
                key: '2',
            },{
                title: "送货地址",
                dataIndex: 'tarAddress',
                key: '4',
            },{
                title: "联系方式",
                dataIndex: 'tarPhone',
                key: '5',
            },{
                title: "总价",
                dataIndex: 'totalPrice',
                key: '3',
            }
        ]
        return (
            <Table rowKey="orderInfoId" columns={tags} dataSource={this.state.orderList} />
        );
    }
}