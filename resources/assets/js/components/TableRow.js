import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';
import EditModal from './modals/EditModal';
import moment from 'moment';

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: 0,
            hover: false,
        };
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
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

    onMouseEnter() {
        this.setState({ hover: true })
    }
    onMouseLeave() {
        this.setState({ hover: false })
    }

    render() {
        const trStyle = this.state.hover === true ? { backgroundColor: 'rgb(88, 96, 102)' } : { backgroundColor: '#273036' }
        var limit = moment(this.props.obj.date_time).format('YYYY-MM-DD');
        if (limit === 'Invalid date') {
            limit = 'Not Set'
        }
        return (
            <tr onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={trStyle}>
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
                    {limit}
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