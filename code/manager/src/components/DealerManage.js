import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Input, Button, Icon, Modal, Avatar } from 'antd';
import Highlighter from 'react-highlight-words';
import dealerMock from '../mock/dealerMock'
import config from '../config/config';

class DealerManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dealer: config.dealer.originDealer,
            dealerData: [],
            selectedRowKeys: [], 
            searchText: '',
            visible: false,
        };
    }

    componentDidMount() {
        document.getElementById("background").style.backgroundImage="none";
        this.setState({
            dealerData: dealerMock,
        })
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

    /* 检查dealer是否合格 */
    checkDealer = (dealer) => {
        if (dealer.userName !== "" && dealer.address !== "" && dealer.realName !== "" 
            && dealer.contact !== "" && dealer.password !== "" && dealer.avatar !== "") {
            return true;
        }
        return false;
    }

    handleOk = e => {
        /* 检查经销商账户合法性 */
        var dealer = this.state.dealer;
        dealer.key = this.state.dealerData.length + 1;
        if (this.checkDealer(dealer)) {
            /* 发送后端并更新前端 */
            var dealerData = this.state.dealerData;
            dealerData.push(dealer);
            this.setState({
                dealerData: dealerData,
                dealer: config.dealer.originDealer,
                visible: false,
            });
        } else {
            alert("所填不能为空");
            console.log(this.state.dealer);
        }
    };

    removeDealer = () => {
        let dealerData = this.state.dealerData;
        this.state.selectedRowKeys.forEach(element => {
            dealerData = dealerData.filter((elem) => {
                return elem.key !== element;
            })
        });
        this.setState({ 
            dealerData: dealerData,
            selectedRowKeys: [],
        });
    };


    render() {

        /* Table 列信息 */
        const columns = [
            {
                title: '头像',
                dataIndex: 'avatar',
                key: '0',
                render: text => (<Avatar  size={50} src={text} />)
            },{
                title: '账户id',
                dataIndex: 'key',
                key: '1',
            },{
                title: '用户名',
                dataIndex: 'userName',
                key: '2',
                ...this.getColumnSearchProps('userName'),
            },{
                title: '密码',
                dataIndex: 'password',
                key: '3',
                width: '20%',
            },{
                title: '姓名',
                dataIndex: 'realName',
                key: '4',
                ...this.getColumnSearchProps('realName'),
            },{
                title: '修改信息',
                dataIndex: 'key',
                key: '5',
                render: text => <Button ><Link to={{pathname: "/dealerManage/dealerMessage/", dealerKey: text}} >修改</Link></Button>
            }
        ];

        /* 复选框的处理 */
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
                    <Button type="primary" style={{marginLeft:"20px"}} onClick={this.removeDealer} disabled={!hasSelected} >
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
                        <h1>经销商信息</h1>
                        {/* 选项按钮 */}
                        <Input  addonBefore="姓名" style={{margin:"10px"}}
                            value={this.state.dealer.realName}
                            onChange= {(e) => {
                                let dealer = this.state.dealer;
                                dealer.realName = e.target.value;
                                this.setState({ dealer: dealer })
                            }}>
                        </Input>
                        <Input addonBefore="用户名" style={{margin:"10px"}}
                            value={this.state.dealer.userName} 
                            onChange= {(e) => {
                                let dealer = this.state.dealer;
                                dealer.userName = e.target.value;
                                this.setState({ dealer: dealer })
                            }}>
                        </Input>
                        <Input  addonBefore="密码" style={{margin:"10px"}}
                            value={this.state.dealer.password}
                            onChange= {(e) => {
                                let dealer = this.state.dealer;
                                dealer.password = e.target.value;
                                this.setState({ dealer: dealer })
                            }}>
                        </Input>
                        <Input  addonBefore="地址" style={{margin:"10px"}}
                            value={this.state.dealer.address}
                            onChange= {(e) => {
                                let dealer = this.state.dealer;
                                dealer.address = e.target.value;
                                this.setState({ dealer: dealer })
                            }}>
                        </Input>
                        <Input  addonBefore="联系方式" style={{margin:"10px"}}
                            value={this.state.dealer.contact}
                            onChange= {(e) => {
                                let dealer = this.state.dealer;
                                dealer.contact = e.target.value;
                                this.setState({ dealer: dealer })
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
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.dealerData} />
            </div>
        );
    }
}
export default DealerManage;