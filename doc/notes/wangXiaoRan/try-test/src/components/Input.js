import React from 'react'

class May extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <button onClick={console.log("谢谢")} />
        );
    }
}


class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            on: "你好"
        }
    }

    render() {
        return (
            <div>
                <input 
                value = { this.state.on} 
                onChange= {
                    () => {
                        var t = this.state.on === "你好" ? "再见" : "你好";
                        this.setState({
                            on: t,
                        })
                    }    
                }>你好</input>
                <May>谢谢</May>
            </div>
        );
    }
}

export default Input;