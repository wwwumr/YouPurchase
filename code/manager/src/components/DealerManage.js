import React from 'react';
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import dealerMock from '../mock/dealerMock'

class DealerManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        };
    }

    componentDidMount() {
        document.getElementById("background").style.backgroundImage="none";
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

    render() {
        const columns = [
                {
                    title: '账户id',
                    dataIndex: 'key',
                    key: '0',
                },{
                    title: '用户名',
                    dataIndex: 'userName',
                    key: '1',
                    width: '10%',
                    ...this.getColumnSearchProps('userName'),
                },{
                    title: '密码',
                    dataIndex: 'password',
                    key: '2',
                    width: '20%',
                },{
                    title: '姓名',
                    dataIndex: 'realName',
                    key: '3',
                    ...this.getColumnSearchProps('realName'),
                },{
                    title: '地址',
                    dataIndex: 'address',
                    key: '4',
                    ...this.getColumnSearchProps('address'),
                },{
                    title: '店名',
                    dataIndex: 'storeName',
                    key: '5',
                    ...this.getColumnSearchProps('storeName'),
                },{
                    title: '联系方式',
                    dataIndex: 'contact',
                    key: '6',
                }
            ];
        return (
            <div>
                <Table columns={columns} dataSource={dealerMock} />
            </div>
        );
    }
}

export default DealerManage;