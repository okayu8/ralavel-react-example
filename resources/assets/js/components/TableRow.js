import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import EditModal from './modals/EditModal';

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = { state: 0 };
    }

    handleSubmitReturn(event) {
        event.preventDefault();
        const products = {
            state: 1,
        }
        let uri = "/api/done/" + this.props.obj.id
        axios.patch(uri, products).then((response) => {
            location.reload();
        });
    }

    handleSubmitDeletion(event) {
        event.preventDefault();
        let uri = "/api/todos/" + this.props.obj.id
        axios.delete(uri);
        //browserHistory.push('/')
        location.reload();
    }

    render() {
        return (
            <tr>
                <td style={{ width: 35 }}>
                    {this.props.obj.id}
                </td>
                <td style={{ width: 60 }}>
                    <button onClick={this.handleSubmitReturn.bind(this)}
                        type="button" className="btn" aria-label="Left Align" style={{ backgroundColor: "#609060", color: "#ffffff" }}>
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
                <td style={{ width: 65 }}>
                    <EditModal params={this.props.obj.id} />
                </td>
                <td style={{ width: 65 }}>
                    <button onClick={this.handleSubmitDeletion.bind(this)}
                        type="button" className="btn" style={{ backgroundColor: "#906060", color: "#ffffff" }} aria-label="Left Align">
                        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                    </button>
                </td>
            </tr>
        )
    }
}

export default TableRow;