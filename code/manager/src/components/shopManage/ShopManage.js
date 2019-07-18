import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Input, Button, Icon, Modal, message } from 'antd';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
//import shopMock from '../../mock/shopMock'
import config from '../../config/config';

class ShopManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shopData: [],
            searchText: '',
            selectedRowKeys: [], // Check here to configure the default column
            selectedRows: [],
            shop: config.shop.originShop,
            visible: false,
        };
    }

    componentDidMount() {
        /* axios */
        axios.get(config.url.stores)
            .then((res) => {
                this.setState({
                    shopData: res.data
                })
            })
        /* 
        this.setState({
            shopData: shopMock
        })*/
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              addonBefore={`搜索`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              搜索
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              清空
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };


    checkShop = (shop) => {
        if (shop.address !== "" && shop.contact !== "" && shop.coverPicUrl !== "" 
            && shop.hours !== [] && shop.storeName !== ""){
            return true;
        }
        return false;
    }

    handleOk = e => {

        var shop = this.state.shop;
        /* 检查商店格式 */
        if (this.checkShop(shop)) {
            var shopData = this.state.shopData;
            /* 接收数据 */
            axios.post(config.url.stores, this.state.shop)
                .then((res) => {
                    /* 前端更新 */
                    shop.key = res.data.key;
                    shopData.push(shop);
                    this.setState({
                        shopData: shopData,
                        shop: config.shop.originShop,
                        visible: false,
                    })
                })
        } else {
            message.error("所填不能为空");
        }
    };

    removeShop = () => {
        let shopData = this.state.shopData;
        var tmpArray = new Array();
        this.state.selectedRows.forEach(element => {
            if(element.dealerId !== null){
                tmpArray.push(element);
            }
        });
        if(tmpArray.length > 0){
            message.warn("选中的店铺中存在已经被授权管理的店铺，暂时无法删除")
            return;
        } else {
            axios.delete(config.url.stores,{data:this.state.selectedRowKeys})
            .then((res)=>{
                if(res.data==="DELETE"){
                    this.state.selectedRowKeys.forEach(element => {
                        shopData = shopData.filter((elem) => {
                            return elem.key !== element;
                        })
                    });
                    this.setState({ 
                        shopData: shopData,
                        selectedRowKeys: [],
                    });
                    message.info("删除成功")
                }
            })
            .catch((error)=>{
                console.log(error);
                message.error("删除失败，请稍后重试");
            })
        }  
    };


    render() {

        /* Table 列信息 */
        const columns = [
                {
                    title: '封面',
                    dataIndex: 'coverPicUrl',
                    key: '1',
                    width:"300px",
                    render: text => (<img style={{height:"120px", width:"150px"}} src={config.url.root + text} alt="店面图片" />)
                },{
                    title: '店名',
                    dataIndex: 'storeName',
                    key: '2',
                    ...this.getColumnSearchProps('storeName'),
                },{
                    title: '地址',
                    dataIndex: 'address',
                    key: '3',
                    ...this.getColumnSearchProps('address'),
                },{
                    title: '联系电话',
                    dataIndex: 'contact',
                    key: '4',
                },{
                    title: '营业时间',
                    dataIndex: 'hours',
                    key: '5',
                    render: text => <p>{text[0]+" ~ "+text[1]}</p>
                },{
                    title: "修改信息",
                    dataIndex: "key",
                    key: "6",
                    render: text => <Button ><Link to={{pathname: "/shopManage/shopDetail/"+text}} >修改</Link></Button>
                }
            ];

        /* 复选框的处理 */
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRowKeys, selectedRows });
            },
        };
        const hasSelected = selectedRowKeys.length > 0;

        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    {/* 删除和增加的按钮 */}
                    <Button type="primary" style={{marginLeft:"20px"}} onClick={this.removeShop} disabled={!hasSelected} >
                    删除
                    </Button>
                    <Button type="primary" style={{marginLeft:"20px", marginRight: "20px"}}
                        onClick={() => {
                            this.setState({
                                visible: true,
                            });
                        }} 
                    >
                    增加
                    </Button>
                    {/* 弹出的表单 */}
                    <Modal title="新增输入框"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={() => {this.setState({ visible:false })}}
                        cancelText="取消" okText="确认"
                    >
                    <div style={{position: "relative", width: "60%", left: "20%", textAlign:"center"}}>
                        <h1>店面信息</h1>
                        {/* 选项按钮 */}
                        <Input addonBefore="店名" style={{margin:"10px"}}
                            value={this.state.shop.storeName} 
                            onChange= {(e) => {
                                let shop = this.state.shop;
                                shop.storeName = e.target.value;
                                this.setState({ shop: shop })
                            }}>
                        </Input>
                        <Input  addonBefore="店地址" style={{margin:"10px"}}
                            value={this.state.shop.address}
                            onChange= {(e) => {
                                let shop = this.state.shop;
                                shop.address = e.target.value;
                                this.setState({ shop: shop })
                            }}>
                        </Input>
                        <Input  addonBefore="店联系方式" style={{margin:"10px"}}
                            value={this.state.shop.contact}
                            onChange= {(e) => {
                                let shop = this.state.shop;
                                shop.contact = e.target.value;
                                this.setState({ shop: shop })
                            }}>
                        </Input> 
                        <Input  addonBefore="营业开始时间" style={{margin:"10px"}}
                            value={this.state.shop.hours[0]}
                            onChange= {(e) => {
                                let shop = this.state.shop;
                                shop.hours[0] = e.target.value;
                                this.setState({ shop: shop })
                            }}>
                        </Input>
                        <Input  addonBefore="营业结束时间" style={{margin:"10px"}}
                            value={this.state.shop.hours[1]}
                            onChange= {(e) => {
                                let shop = this.state.shop;
                                shop.hours[1] = e.target.value;
                                this.setState({ shop: shop })
                            }}>
                        </Input>
                    </div>
                    </Modal>
                    {/* 选中条目 */}
                    <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `选中 ${selectedRowKeys.length} 个条目` : ''}
                    </span>
                </div>
                {/* 数据展示表格 */}
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.shopData} />
            </div>
        );
    }
}

export default ShopManage;