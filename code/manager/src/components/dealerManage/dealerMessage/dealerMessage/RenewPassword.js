import React from 'react';
import { Modal, Input, message } from 'antd';
import { checkLength } from '../../../../lib/format/checkFormat';

export default class RenewPassword extends React.Component {

    state = {
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
        let newPassword = this.state.newPassword;
        let oneMorePassword = this.state.oneMorePassword;
        if (checkLength("password", newPassword) && newPassword === oneMorePassword) {
            /* axios here */
            message.success("修改密码成功");
            this.props.setDisvisible();
        } else {
            message.error("两次输入密码不一致");
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