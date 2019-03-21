import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import TableRow from './TableRow';
import { connect } from 'react-redux';
import { clearText, addTodo } from '../actions/AppActions';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            page: 0,
            nextUrl: null,
            prevUrl: null,
            offset: false,
            sortMode: '',
        }
    }

    componentDidMount() {
        axios.get('/api/todos')
            .then(response => {
                console.log('todos_list')
                console.log('data:' + JSON.stringify(response.data))
                this.setState({
                    data: response.data.data,
                    nextUrl: response.data.next_page_url,
                    prevUrl: response.data.prev_page_url,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    nextPage() {
        axios.get(this.state.nextUrl)
            .then(response => {
                console.log('todos_list')
                console.log('data:' + JSON.stringify(response.data))
                this.setState({
                    data: response.data.data,
                    nextUrl: response.data.next_page_url,
                    prevUrl: response.data.prev_page_url,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    prevPage() {
        axios.get(this.state.prevUrl)
            .then(response => {
                console.log('todos_list')
                console.log('data:' + JSON.stringify(response.data))
                this.setState({
                    data: response.data.data,
                    nextUrl: response.data.next_page_url,
                    prevUrl: response.data.prev_page_url,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    offSetFunc() {
        this.setState({ offset: !this.state.offset })
    }

    tabRow() {
        if (this.state.data instanceof Array) {
            return this.state.data.map(function (object, i) {
                return <TableRow
                    obj={object} key={i} />
            })
        }
    }

    changeSortMode() {
        this.setState({ sortMode: this.state.sortMode === 'nearLimit' ? '' : 'nearLimit' });
        console.log(this.state.sortMode);
        const sortMode = {
            sortMode: 'nearLimit',
        }
        axios.post('/api/todos/sort', sortMode)
            .then((response) => {
                console.log(JSON.stringify(response));
                location.reload();
                console.log("success");
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        //isLogin();
        const leftButtonStyle = {
            borderRadius: 4,
            backgroundColor: "#586066",
            float: "left",
        }
        const rightButtonStyle = {
            borderRadius: 4,
            backgroundColor: "#586066",
            float: "right",
        }
        return (
            <div>
                <h1>ToDo List</h1>

                <div className="input-group">
                    <input type='text' ref='input' className="form-control col-sm-2" style={{ zIndex: 0 }} placeholder="Todo" /><br />
                    <label className="input-group-btn">
                        <button className="btn" style={{ backgroundColor: "#606090", zIndex: 0 }} onClick={(e) => this.onAddBtnClicked(e)}   >Add</button>
                    </label>
                </div>

                {/* 以下テスト */}
                <button onClick={() => { this.changeSortMode() }}>{this.state.sortMode}</button>

                {/* <ul>
                    {
                        //state中のオブジェクトをループさせて<li>要素を描画。stateは selector() メソッドで指定しているものがpropsとして渡ってくる
                        this.props.state.store.map((obj) =>
                            <li key={obj.id} >
                                {obj.text}
                            </li>
                        )
                    }
                </ul> */}

                <div className="row">
                    <div className="col-md-10"></div>
                    <div className="col-md-2">
                        <Link to="/create" style={{ color: "#c3c6c7" }}>+ New ToDo</Link>
                    </div>
                </div>
                <br />
                <ul className="pager">
                    <li className="previous">
                        <button
                            onClick={() => { this.prevPage() }}
                            style={leftButtonStyle}>
                            <span className="glyphicon glyphicon-fast-backward" aria-hidden="true"></span>
                        </button>
                    </li>
                    <li className="next">
                        <button
                            onClick={() => { this.nextPage() }}
                            style={rightButtonStyle}>
                            <span className="glyphicon glyphicon-fast-forward" aria-hidden="true"></span>
                        </button>
                    </li>
                </ul>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Check</td>
                            <td>Title</td>
                            <td className="hidden-sm hidden-xs">Description</td>
                            <td className="hidden-xs">Limit</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
                <ul className="pager">
                    <li className="previous">
                        <button
                            onClick={() => { this.prevPage() }}
                            style={leftButtonStyle}>
                            <span className="glyphicon glyphicon-fast-backward" aria-hidden="true"></span>
                        </button></li>
                    <li className="next"><button
                        onClick={() => { this.nextPage() }}
                        style={rightButtonStyle}>
                        <span className="glyphicon glyphicon-fast-forward" aria-hidden="true"></span>
                    </button>
                    </li>
                </ul>
            </div>
        )
    }
    // onAddBtnClicked(e) {
    //     let input = this.refs.input
    //     let text = input.value.trim()
    //     if (!text) return alert('何かテキストを入力してください。')
    //     input.value = ''
    //     // Appコンポーネントが connect() メソッドでラップされていることによって、dispatchメソッドを呼び出すことが可能になる
    //     // dispatch() メソッドで ActionCreator である addText() メソッドをラップして呼び出すことによってデータの変更を伝播する
    //     this.props.dispatch(addText(text))
    // }
    onAddBtnClicked(e) {
        let input = this.refs.input
        let text = input.value.trim()
        if (!text) return alert('何かテキストを入力してください。')
        input.value = ''
        // Appコンポーネントが connect() メソッドでラップされていることによって、dispatchメソッドを呼び出すことが可能になる
        // dispatch() メソッドで ActionCreator である addText() メソッドをラップして呼び出すことによってデータの変更を伝播する
        this.props.dispatch(addTodo(text))
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

export default connect(selector)(List)