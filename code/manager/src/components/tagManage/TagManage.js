import React from 'react';
import { Tag, Input, Tooltip, Icon } from 'antd';
import axios from 'axios';
import config from '../../config/config';

const TAGLENGTH = 10;

export default class TagManage extends React.Component {
    
    state = {
        tags: [],
        inputVisible: false,
        inputValue: '',
    };

    componentDidMount = () => {
        axios
            .get(config.url.comodityClass.get)
            .then((res) => {
                this.setState({
                    tags: res.data,
                })
            })
                
    }

    handleClose = removedTag => {
        axios
            .delete(config.url.comodityClass.delete, {
                data: removedTag.commodityClassId,
                headers: {
                    'Content-Type':'application/json'
                }
            })
            .then(() => {
                const tags = this.state.tags.filter(tag => tag.classInfo !== removedTag.classInfo);
                this.setState({ 
                    tags: tags,
                });
            })
    };

    showInput = () => {
        this.setState({ 
            inputVisible: true 
        }, () => {
            this.input.focus()
        });
    };

    handleInputChange = e => {
        this.setState({ 
            inputValue: e.target.value 
        });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && !tags.find((tag) => { return tag.classInfo === inputValue })) {
            axios
                .post(config.url.comodityClass.post, inputValue, {headers:{'Content-Type':'application/json'}})
                .then((res) => {
                    let tag = {
                        commodityClassId: parseInt(res.data),
                        classInfo: inputValue,
                    };
                    tags.push(tag);
                    this.setState({
                        tags: tags,
                        inputVisible: false,
                        inputValue: '',
                    })
                })
        }
    };

    saveInputRef = input => (this.input = input);

    render() {
        const { tags, inputVisible, inputValue } = this.state;
        return (
            
            <div style={{ position: "relative", width: 800, left: 200, textAlign: "center" }}>
                <h1 style={{ marginBottom: 30 }}>设置标签</h1>
                {tags.map((tag) => {
                    const isLongTag = tag.length > TAGLENGTH;
                    const tagElem = (
                        <Tag key={tag.commodityClassId.toString()} closable={true} 
                            onClose={() => this.handleClose(tag)}
                            style={{ width: 100, height: 30, padding: 3, textAlign: "center"
                                , marginBottom: 20, }}
                        >
                            {isLongTag ? `${tag.classInfo.slice(0, TAGLENGTH)}...` : tag.classInfo}
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag.classInfo} key={tag.commodityClassId.toString()} 
                            style={{marginBottom: 20}}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        style={{ width: 100, height: 30, padding: 3, }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag onClick={this.showInput} 
                        style={{ background: '#fff', borderStyle: 'dashed', width: 100, height: 30, 
                            textAlign: "center", padding: 3,  }}>
                        <Icon type="plus" /> 新建类别
                    </Tag>
                )}
            </div>
        );
    }
}