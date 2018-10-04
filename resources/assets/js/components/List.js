import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import TableRow from './TableRow';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = { data: '' }
    }
    componentDidMount() {
        axios.get('http://localhost:8000/api/todos')
            .then(response => {
                console.log('todos_list')
                console.log('data:' + JSON.stringify(response.data))
                this.setState({ data: response.data })
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    tabRow() {
        if (this.state.data instanceof Array) {
            return this.state.data.map(function (object, i) {
                return <TableRow obj={object} key={i} />
            })
        }
    }

    render() {
        return (
            <div>
                <h1>ToDo List</h1>

                <div className="row">
                    <div className="col-md-10"></div>
                    <div className="col-md-2">
                        <Link to="/create">+ New ToDo</Link>
                    </div>
                </div><br />

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Title</td>
                            <td>Description</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default List;