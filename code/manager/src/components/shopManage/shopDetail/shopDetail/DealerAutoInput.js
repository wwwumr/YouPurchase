import React from 'react';
import { Icon, Button, Input, AutoComplete } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import dealerMock from '../../../../mock/dealerMock';
import config from '../../../../config/config';

const { Option } = AutoComplete;


function renderOption(item) {
    return (
        <Option key={item.userName} text={item.userName}>
        
        <div className="global-search-item">
            <span style={{marginLeft: "20px"}} >
                <img style={{height: "40px"}} 
                    src={config.url.root+item.avatar} 
                    alt={"头像"} 
                />
            </span>
            <span className="global-search-item-desc" style={{marginLeft: "30px"}}>
            {item.realName}
            </span>
            <span className="global-search-item-desc" style={{marginLeft: "30px"}}>
            {item.userName}
            </span>
            <span className="global-search-item-desc" style={{margin: "10px",  float: "right",}}>
            <Link to={{
                pathname: "/dealerManage/dealerMessage/"+item.key, 
            }}>
            查看信息
            </Link>
            </span>
        </div>
        </Option>
    );
}

class DealerAutoInput extends React.Component {
    state = {
        dataSource: [],
        dealerData: [],
    };

    componentWillMount() {
        axios.get(config.url.unbindDealers)
            .then((res) => {
                this.setState({
                    dealerData: res.data,
                })
            })
        /*
        this.setState({
            dealerData: dealerMock,
        })
        */
    }

    handleSearch = value => {
        if (value === "") {
            const dealerData = this.state.dealerData;
            this.setState({
                dataSource: dealerData,
            })
            return;
        }
        const dataSource = this.state.dealerData.filter((elem) => {
            return elem.realName.slice(0, value.length) === value 
                    || elem.userName.slice(0, value.length) === value ;
        })
        this.setState({
            dataSource: dataSource,
        })
    };

    handleSelect = (name) => {
        const dealer = this.state.dealerData.find((elem) => {
            return elem.userName === name;
        })
        this.props.setDealer(dealer.key, dealer.userName);
    }

    render() {
        const { dataSource } = this.state;
        return (
        <div className="global-search-wrapper" style={{ width: "100%" }}>
            <AutoComplete
                className="global-search"
                size="large"
                placeholder="修改经销商"
                optionLabelProp="text"
                style={{ width: '100%', marginBottom: this.props.marginBottom}}
                dataSource={dataSource.map(renderOption)}
                onSelect={ this.handleSelect }
                onSearch={ this.handleSearch }
                disabled={this.props.disableFlag}
            >
                <Input
                    suffix={
                        <Button type="primary" size="large" className="search-btn"
                            style={{ marginRight: -12 }}
                        >
                            <Icon type="search" />
                        </Button>
                    }
                />
            </AutoComplete>
        
        </div>
        );
    }
}

export default DealerAutoInput;