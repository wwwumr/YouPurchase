import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Input, Button, Icon, Modal, message, TimePicker, Radio } from 'antd';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import config from '../../config/config';
import moment from 'moment';

class ShopManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shopData: [],
            searchText: '',
            selectedRowKeys: [],
            selectedRows: [],
            shop: Object.assign({}, config.shop.originShop),
            visible: false,
        };
    }

    /**
     * @description 加载全部商店信息
     */
    componentDidMount() {
        axios
            .get(config.url.stores)
            .then((res) => {
                this.setState({
                    shopData: res.data
                })
            })
    }

    
    /**
     * @description antd搜索函数
     * @param  {int} dataIndex
     */
    getColumnSearchProps = (dataIndex) => ({
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

    /**
     * @description antd函数
     * @param  {Array} selectedKeys
     * @param  {func} confirm
     */
    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };
    
    /**
     * @description antd函数
     * @param  {func} clearFilters
     */
    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    /**
     * @description 检查商店是否信息不完整
     * @param  {Shop} shop
     * @returns : 完整 ? true : false
     */ 
    checkShop = (shop) => {
        const attrs = ["storeName", "contact", "startHour", "endHour", "deliveryRange", "deliveryType"];
        let allFilled = true;
        attrs.forEach((elem) => {
            if (shop[elem] === '' || shop[elem] === null) {
                allFilled = false;
            }
        })
        return allFilled;
    }
    
    /**
     * @description 新建商店
     */
    handleOk = () => {
        var shop = this.state.shop;
        /* 检查商店格式 */
        if (this.checkShop(shop)) {
            var shopData = this.state.shopData;
            /* 接收数据 */
            axios
                .post(config.url.stores, this.state.shop)
                .then((res) => {
                    /* 前端更新 */
                    shop.key = res.data.key;
                    shopData.push(shop);
                    this.setState({
                        shopData: shopData,
                        shop: Object.assign({}, config.shop.originShop),
                        visible: false,
                    }, () => {
                        message.success("添加成功");
                    })
                })
                .catch(err => {
                    if (err.response) {
                        console.log(err.message);
                    }
                })
        } else {
            message.error("您还有信息未填写");
        }
    };

    /**
     * @description 处理input的信息变化
     * @param  {event} e
     * @param  {string} info
     */
    handleChange = (e, info) => {
        let shop = this.state.shop;
        shop[info] = e.target.value;
        this.setState({ 
            shop: shop 
        })
    }
    
    /**
     * @description 删除选定商店
     */
    removeShop = () => {
        let shopData = this.state.shopData;
        let count = 0;
        this.state.selectedRows.forEach(element => {
            if(element.dealerId !== null){
                count++;
            }
        });
        if(count > 0){
            message.warn("选中的店铺中存在已经被授权管理的店铺，暂时无法删除")
            return;
        }
        axios
            .delete(config.url.stores,{data:this.state.selectedRowKeys})
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
    };


    render() {

        /* Table 列信息 */
        const columns = [
                {
                    title: '封面',
                    dataIndex: 'coverPicUrl',
                    key: '1',
                    width:"250px",
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
                    dataIndex: 'startHour',
                    key: '5',
                    render: (text, row) => {
                        return row.startHour+" ~ "+row.endHour;
                    }
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
            <div style={{marginLeft: 50, marginRight: 50}}>
                <div style={{ marginBottom: 16, }}>
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
                        <Input addonBefore="店名" style={{marginBottom: "15px"}}
                            value={this.state.shop.storeName} 
                            onChange= {(e) => { this.handleChange(e, "storeName") }}
                        >
                        </Input>
                        <Input  addonBefore="店联系方式" style={{marginBottom:"15px"}}
                            value={this.state.shop.contact}
                            onChange= {(e) => { this.handleChange(e, "contact") }}
                        >
                        </Input> 
                        <span style={{position: "relative", display: "inline-block", width: "30%", marginBottom: 10, padding: 4, backgroundColor: "#fafafa", border: "1px solid #d9d9d9", borderRadius: 4}} >
                        营业时间
                        </span>
                        <TimePicker style={{display: "inline-block", marginBottom: "15px", width: "30%", }}
                            value={ moment(this.state.shop.startHour ? this.state.shop.startHour : "00:00", "HH:mm") }
                            format="HH:mm"
                            onChange = {(t) => {
                                let shop = this.state.shop;
                                shop.startHour = t ? t.format("HH:mm") : "00:00";
                                this.setState({
                                    shop: shop,
                                })
                            }}
                        />
                        <span style={{position: "relative", display: "inline-block", width: "10%", padding: 4, backgroundColor: "#fafafa", border: "1px solid #d9d9d9", borderRadius: 4}} >
                        ~ 
                        </span>
                        <TimePicker style={{display: "inline-block", marginBottom: "15px", width: "30%", }}  
                            value={ moment(this.state.shop.endHour ? this.state.shop.endHour : "00:00", "HH:mm") }
                            format="HH:mm"
                            onChange = {(t) => {
                                var shop = this.state.shop;
                                shop.endHour = t ? t.format("HH:mm") : "00:00";
                                this.setState({
                                    shop: shop,
                                })
                            }}
                        />
                        <Input addonBefore="配送距离(km)" style={{ marginBottom: "15px" }}  
                            min={0} type="number"
                            value = { this.state.shop.deliveryRange } 
                            onChange = {(time) => { this.handleChange(time, "deliveryRange")}}
                        />
                        <Radio.Group buttonStyle="solid"
                            style={{ marginBottom: "15px", }}
                            value={ this.state.shop.deliveryType }
                            onChange={(e) => { this.handleChange(e, "deliveryType") }}
                        >
                            <Radio.Button value={0} >商家配送</Radio.Button>
                            <Radio.Button value={1} >蜂鸟配送</Radio.Button>
                        </Radio.Group>
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