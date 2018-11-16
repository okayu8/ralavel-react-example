import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = { state: 0 };
    }

    handleChangeState() {
        this.setState({
            state: 1
        })
    }

    handleSubmitReturn(event) {
        event.preventDefault();
        const products = {
            state: this.state.state,
        }
        let uri = "http://localhost:8000/api/done/" + this.props.obj.id
        axios.patch(uri, products).then((response) => {
            location.reload();
        });
    }

    handleSubmitDeletion(event) {
        event.preventDefault();
        let uri = "http://localhost:8000/api/todos/" + this.props.obj.id
        axios.delete(uri);
        //browserHistory.push('/')
        location.reload();
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.id}
                </td>
                <td>
                    <button onClick={this.handleSubmitReturn.bind(this)}
                        type="button" className="btn btn-success" aria-label="Left Align">
                        <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                    </button>
                </td>
                <td>
                    {this.props.obj.title}
                </td>
                <td className="hidden-sm hidden-xs">
                    {this.props.obj.description}
                </td>
                <td className="hidden-xs">
                    {this.props.obj.time}
                </td>
                <td>
                    <Link to={"/todos/" + this.props.obj.id + "/edit"} className="btn btn-primary">
                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </Link>
                </td>
                <td>
                    <button onClick={this.handleSubmitDeletion.bind(this)}
                        type="button" className="btn btn-danger" aria-label="Left Align">
                        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                    </button>
                </td>
            </tr>
        )
    }
}

export default TableRow;