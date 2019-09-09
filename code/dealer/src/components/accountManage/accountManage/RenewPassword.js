import React from 'react';
import { Modal, Input, message } from 'antd';
import { checkLength, checkJsonNotNull } from '../../../lib/format/checkFormat';
import axios from 'axios';
import config from '../../../config/config';

/**
 * props: visible setDisvisible()
 */
export default class RenewPassword extends React.Component {

    state = {
        oldPassword: "",
        newPassword: "",
        oneMorePassword: "",
    }

    /**
     * @description 绑定输入框的onChange
     * @param  { event } e
     * @param  { String } info
     */
     handleChange = (e, info) => {
        let val = {};
        val[info] = e.target.value;
        this.setState(val);
    }

    handleOk = () => {
        let { oldPassword, newPassword, oneMorePassword} = this.state;
        let passwords = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            oneMorePassword: oneMorePassword,
        }
        let infos = ["oldPassword", "newPassword", "oneMorePassword"]
        if (!checkJsonNotNull(passwords, infos)) {
            message.error("请将表格填写完整");
        } else if (!checkLength("password", newPassword)) {
            message.error("新密码不要超过20位");
        } else if (newPassword !== oneMorePassword) {
            message.error('两次密码填写不一致');
        } else if (oldPassword === newPassword) {
            message.error("密码未更改");
        }
        else {
            axios
                .get(config.url.renewPassword.post, {
                    params: {
                        oldpassword: oldPassword,
                        newpassword: newPassword,
                    }
                })
                .then((res) => {
                    if (res.data === 200) {
                        message.success("修改成功");
                        this.props.setDisvisible();
                        this.setState({
                            oldPassword: "",
                            newPassword: "",
                            oneMorePassword: "",
                        })
                    } else {
                        message.error("原密码输入错误");
                    }
                })
        }
    }

    render() {
        return (
            <Modal okText="确认更改" cancelText="取消" title="更改密码"
                visible={this.props.visible}
                onCancel={this.props.setDisvisible}
                onOk = {this.handleOk}
            >
            <div style={{ width: "60%", marginLeft: "20%" }}>
                <Input.Password addonBefore="旧密码" style={{ marginBottom: 20 }}
                    value={ this.state.oldPassword }
                    onChange={ (e) => { this.handleChange(e, "oldPassword") } }
                />
                <Input.Password addonBefore="新密码" style={{ marginBottom: 20 }}
                    value={ this.state.newPassword }
                    onChange={ (e) => { this.handleChange(e, "newPassword") } }
                />
                <Input.Password  addonBefore="重新输入" style={{ marginBottom: 20 }}
                    value={ this.state.oneMorePassword }
                    onChange={ (e) => { this.handleChange(e, "oneMorePassword") } }
                />
            </div>
            </Modal>
        );
    }
}