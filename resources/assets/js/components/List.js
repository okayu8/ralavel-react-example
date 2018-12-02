import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import TableRow from './TableRow';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            page: 0,
            nextUrl: null,
            prevUrl: null,
            offset: false,
        }
    }
    componentDidMount() {
        axios.get('http://localhost:8000/api/todos')
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

    render() {
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

                <div className="row">
                    <div className="col-md-10"></div>
                    <div className="col-md-2">
                        <Link to="/create">+ New ToDo</Link>
                    </div>
                </div><br />
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
                            <td className="hidden-xs">Time(h)</td>
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
}
export default List;