import React from 'react';
import { Table, Input, Button, Icon, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import shopMock from '../mock/shopMock'

class ShopManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shopData: [],
            searchText: '',
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            shop: {
                key: null, 
                storeName: '', 
                address: '', 
                coverPicUrl: '', 
                contact: '', 
                hours: []
            },
            visible: false,
        };
    }

    componentDidMount() {
        this.setState({
            shopData: shopMock
        })
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`搜索`}
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

    handleOk = e => {
        console.log(this.state.shop);
        this.setState({
            visible: false,
        });
    };

    removeShop = () => {
        let shopData = this.state.shopData;
        this.state.selectedRowKeys.forEach(element => {
            shopData = shopData.filter((elem) => {
                return elem.key !== element;
            })
        });
        this.setState({ 
            shopData: shopData,
            selectedRowKeys: [],
        });
    };

    addShop = () => {
        let shopData = this.state.shopData;
        var shop = {
            key: shopData.length + 1, 
            storeName: '', 
            address: '', 
            coverPicUrl: '', 
            contact: '', 
            hours: []
        }
    };

    render() {

        const columns = [
                {
                    title: '封面',
                    dataIndex: 'coverPicUrl',
                    key: '1',
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
                }
            ];
        const loading = this.state.loading;

        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            selectedRowKeys,
            onChange: selectedRowKeys => {
                this.setState({ selectedRowKeys });
            },
        };
        const hasSelected = selectedRowKeys.length > 0;

        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    {/* 删除和增加的按钮 */}
                    <Button type="primary" onClick={this.removeShop} disabled={!hasSelected} loading={loading}>
                    删除
                    </Button>
                    <Button type="primary" 
                        onClick={() => {
                            this.setState({
                                visible: true,
                            });
                        }} 
                        loading={loading}
                    >
                    增加
                    </Button>
                    {/* 弹出的表单 */}
                    <Modal title="新增输入框"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={() => {this.setState({ visible:false })}}
                    >
                        <Input placeholder="店名" 
                            value={this.state.shop.storeName} 
                            onChange= {(e) => {
                                let shop = this.state.shop;
                                shop.storeName = e.target.value;
                                this.setState({ shop: shop })
                            }}>
                        </Input>
                        <Input value={this.state.shop.address} placeholder="店地址"></Input>
                        <Input value={this.state.shop.contact} placeholder="店联系方式"></Input>
                        <Input value={this.state.shop.coverPicUrl} placeholder="图片地址"></Input>
                        <Input value={this.state.shop.hours[0]} placeholder="店开始营业时间"></Input>
                        <Input value={this.state.shop.hours[1]} placeholder="店结束营业时间"></Input>
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