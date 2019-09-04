import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Input, Button, Icon, Modal, Avatar, message, Radio, DatePicker } from 'antd';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import moment from 'moment';
import config from '../../config/config';


const GENDER = ["男", "女"];

class DealerManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dealer: config.dealer.originDealer,
            dealerData: [],
            selectedRowKeys: [],
            selectedRow: [], 
            searchText: '',
            visible: false,
        };
    }

    /*********************************** 
    ****          生命周期函数       ****
    ************************************/

    /**
     * @description 请求经销商数据
     */
    componentWillMount() {
        axios
            .get(config.url.dealers)
                .then((res) => {
                this.setState({
                    dealerData: res.data,
                })
            })
    }


    /*****************************************
    ****             antd  函数           **** 
    *****************************************/
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

    /* handle functions */
    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    /*****************************************
    ****           事件处理 函数           **** 
    *****************************************/
    /**
     * @description 检查合法性并提交新增经销商
     * @param  {event} e
     */
    handleOk = (e) => {
        var dealer = this.state.dealer;
        if (this.checkDealer(dealer)) {
            axios.post(config.url.newdealer, dealer)
                .then((res) => {
                    /* 后端返回数据格式变为{"key" : long, "avatar" : String}这种格式 */
                    if (res.data.key < 0) {
                        message.error("新用户创建失败");
                    } else {
                        dealer.key = res.data.key;
                        var dealerData = this.state.dealerData;
                        dealerData.push(dealer);
                        this.setState({
                            dealerData: dealerData,
                            dealer: Object.assign({}, config.dealer.originDealer),
                            visible: false,
                        });
                        message.success("新用户创建成功");
                    }
                })
                .catch(err => {
                    if (err.response) {
                        console.log(err.message);
                    }
                })
        } else {
            message.info("所填不能为空");
        }
    };

    /**
     * @description 绑定输入框的onChange
     * @param  { event } e
     * @param  { String } info
     */
    handleChange = (e, info) => {
        var dealer = this.state.dealer;
        dealer[info] = e.target.value;
        this.setState({
            dealer: dealer,
        })
    }

    /**
     * @description 删除未绑定店铺的经销商
     */
    removeDealer = () => {
        let dealerData = this.state.dealerData;
        let count = 0;
        this.state.selectedRows.forEach(element => {
            if(element.storeName !== null){
                count++;
            }
        });
        if(count > 0){
            message.warn("选中存在已经被授权经营的经销商，暂时无法删除")
            return;
        } else {
            axios.delete(config.url.dealers, {data:this.state.selectedRowKeys})
            .then((res)=>{
                if(res.data==="DELETE"){
                    message.info("删除成功");
                    this.state.selectedRowKeys.forEach(element => {
                        dealerData = dealerData.filter((elem) => {
                            return elem.key !== element;
                        })
                    });
                    this.setState({ 
                        dealerData: dealerData,
                        selectedRowKeys: [],
                    });
                } else {
                    message.warn("删除中遇到问题，请稍后重试")
                }
            })
            .catch((error)=>{
                message.error(error.message)
            })
        }       
    };
    
    /**
     * @description 检查dealer是否合格
     * @param  {} dealer
     */
    checkDealer = (dealer) => {
        if (dealer.userName !== "" && dealer.gender !== null && dealer.realName !== "" 
            && dealer.contact !== "" && dealer.password !== "" && dealer.birthday !== "") {
            return true;
        }
        return false;
    }

    render() {
        /* Table 列信息 */
        const columns = [
            {
                title: '头像',
                dataIndex: 'avatar',
                key: '0',
                render: text => (<Avatar  size={50} src={config.url.root+text} />)
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
                title: '性别',
                dataIndex: 'gender',
                key: '3',
                render: (text) => { return GENDER[text] }
            },{
                title: '姓名',
                dataIndex: 'realName',
                key: '4',
                ...this.getColumnSearchProps('realName'),
            },{
                title: '出生日期',
                dataIndex: 'birthday',
                key: '5',
            },{
                title: '修改信息',
                dataIndex: 'key',
                key: '6',
                render: text => <Button ><Link to={{pathname: "/dealerManage/dealerMessage/" + text}} >修改</Link>
                </Button>
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
                        <Input addonBefore="用户名" style={{marginBottom:"10px"}}
                            value={this.state.dealer.userName} 
                            onChange = {(e) => { this.handleChange(e, "userName") }}
                        />
                        <Input  addonBefore="姓名" style={{marginBottom: "10px"}}
                            value={this.state.dealer.realName}
                            onChange = {(e) => { this.handleChange(e, "realName") }}
                        />
                        <Input  addonBefore="密码" style={{ marginBottom: "10px"}}
                            value={this.state.dealer.password}
                            onChange = {(e) => { this.handleChange(e, "password") }}
                        />
                        <div style={{ width: "20%", padding: 4, marginBottom: 10, display: "inline-block",
                             backgroundColor: "#fafafa", border: "1px solid #d9d9d9", borderRadius: 4, }} 
                        >
                        性别
                        </div>
                        <Radio.Group value={ this.state.dealer.gender } buttonStyle="solid"
                            style={{ marginBottom : "7px", width: "30%", display: "inlie-block", marginLeft: "50%",}}
                            onChange={ (e) => {this.handleChange(e, "gender") }}
                        >
                            <Radio.Button value={0} style={{ width: "50%",  }}>男</Radio.Button>
                            <Radio.Button value={1} style={{ width: "50%",  }}>女</Radio.Button>
                        </Radio.Group>
                        <div style={{ display: "inline-block", width: "30%", height: 32, padding: 4, marginBottom: 10,
                            backgroundColor: "#fafafa", border: "1px solid #d9d9d9", borderRadius: 4, }} 
                        >
                        出生日期
                        </div>
                        <DatePicker format={"YYYY-MM-DD"} 
                            style = {{ position: "relative", marginBottom: 10, width: '70%', textAlign: "center", display: "inline-block",  }}
                            value={ moment(this.state.dealer.birthday ? this.state.dealer.birthday : moment().format("YYYY-MM-DD"), "YYYY-MM-DD") }
                            onChange = {(e) => {
                                var dealer = this.state.dealer;
                                dealer["birthday"] = e ? e.format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
                                this.setState({
                                    dealer: dealer,
                                })
                            }} 
                        />
                        <Input  addonBefore="联系方式" style={{ marginBottom: "10px" }}
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