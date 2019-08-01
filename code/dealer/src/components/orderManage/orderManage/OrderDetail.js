import React from 'react';
import { Table } from 'antd';
import axios from 'axios';
import config from '../../../config/config';


const ORDERSTATUS = ["未支付", "未接单", "配送中", "已送达"];
const columns = [
    {
        title: "创建日期",
        dataIndex: "createDate",
        key: '1',
    },{
        title: "订单状态",
        dataIndex: "status",
        key: '2',
        render: (status) => { return ORDERSTATUS[status]; }
    },{
        title: "配送地址",
        dataIndex: "tarAddress",
        key: '3',
    },{
        title: "订单用户",
        dataIndex: "tarPeople",
        key: '4',
    },{
        title: "联系方式",
        dataIndex: "tarPhone",
        key: '5',
    },{
        title: "订单总价￥",
        dataIndex: "totalPrice",
        key: '6',
    },
]
const itemColumns = [
    {
        title: "商品图片",
        dataIndex: "commodityCoverPicUrl",
        key: '1',
        render: (text) => {
            return (
                <img src={config.url.root + text} alt="商品图片" 
                    style={{width: 100, height: 100, }}
                />
            );
        }
    },{
        title: "商品信息",
        dataIndex: "commodityInfo",
        key: '2',
    },{
        title: "商品价格",
        dataIndex: "price",
        key: '3',
    },{
        title: "购买数量",
        dataIndex: "amount",
        key: '4',
    },
]

export default class OrderDetail extends React.Component {

    state = {
        order: {},
    }

    componentDidMount() {
        axios
            .get(config.url.orderDetail.get, {
                params: {
                    orderInfoId: this.props.match.params.orderInfoId,
                }
            })
            .then((res) => {
                this.setState({
                    order: res.data,
                })
            })
    }

    render() {
        return (
        <div>
            <Table rowKey={"orderInfoId"} columns={columns} dataSource={[this.state.order]} pagination={false} />
            <Table rowKey={"commodityId"} columns={itemColumns} dataSource={this.state.order.orderItemList} />
        </div>
        );
    }
}