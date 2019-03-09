import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addText, clearText } from '../actions/AppActions';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            user_id: null,
            user_name: null,
        }
    }

    componentDidMount() {
        axios.get('/api/date')
            .then(response => {
                console.log('date:' + JSON.stringify(response.data))
                this.setState({ date: response.data })
            })
            .catch(function (error) {
                console.log(error)
            })

        axios.get('/users')
            .then(response => {
                this.setState({
                    user_id: response.data.id,
                    user_name: response.data.name,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    logout() {
        axios.defaults.headers['X-CSRF-TOKEN'] = $('meta[name=csrf-token]').attr('content')
        axios.get("/logout")
            .then(response => {
                console.log('SUCCESS LOGOUT')
                location.href = '/';
            })

        /* axios.defaults.headers['X-CSRF-TOKEN'] = $('meta[name=csrf-token]').attr('content')
        axios.post("/logout", {
            withCredentials: true
        }) */

    }

    render() {
        const lineColor = {
            backgroundColor: "#c3c6c7"
        }
        return (
            <div className="container">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" style={{ color: "#000000" }} href="/">Quick Todo</a>
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#defaultNavbar1"
                                style={{
                                    backgroundColor: "#273036",
                                    borderColor: "#273036",
                                }}>
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar" style={lineColor}></span>
                                <span className="icon-bar" style={lineColor}></span>
                                <span className="icon-bar" style={lineColor}></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="defaultNavbar1" >
                            <ul className="nav navbar-nav" >
                                <li className="active"><a href="#" style={{ color: "#ffffff" }}>Home</a></li>
                                <li><Link to="create" style={{ color: "#4f0d0d" }}>Create</Link></li>
                                <li><Link to="list" style={{ color: "#791313" }}>Todo</Link></li>
                                <li><Link to="done" style={{ color: "#961818" }}>Done</Link></li>
                                {/* <li><Link to="time" style={{ color: "#af1c1c" }}>Time</Link></li> */}
                                <li><button onClick={() => { this.logout() }}>Logout</button></li>
                            </ul>
                            <div className="collapse navbar-collapse navbar-right">
                                <p className="navbar-brand"
                                    style={{
                                        color: "#ffffff",
                                        marginBottom: 0,
                                    }}>{this.state.user_name}</p>
                            </div>
                            <div className="collapse navbar-collapse navbar-right">
                                <p className="navbar-brand"
                                    style={{
                                        color: "#ffffff",
                                        marginBottom: 0,
                                    }}>{this.state.date}</p>
                            </div>
                        </div>
                    </div>
                </nav>
                <div>

                    {this.props.children}
                </div>
            </div >
        )
    }

    onAddBtnClicked(e) {
        let input = this.refs.input
        let text = input.value.trim()
        if (!text) return alert('何かテキストを入力してください。')
        input.value = ''
        // Appコンポーネントが connect() メソッドでラップされていることによって、dispatchメソッドを呼び出すことが可能になる
        // dispatch() メソッドで ActionCreator である addText() メソッドをラップして呼び出すことによってデータの変更を伝播する
        this.props.dispatch(addText(text))
    }

    //Clear ボタンをクリックした時に呼び出される
    onClearBtnClicked(e) {
        // dispatchメソッドで ActionCreator であるclearText() メソッドをラップして呼び出すことによってデータの変更を伝播する
        this.props.dispatch(clearText())
    }

}

let selector = (state) => {
    // [storedText]というキー名はreducer.jsの最下部で設定している Store のキー名
    console.log(state.store);
    return {
        state: state // Key名とvalue名が同じなので return {state} でも可: Object Literal Shorthand
    }
}

export default connect(selector)(Main)

