import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';

export default class DoneTableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: 1,
            hover: false,
        };
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    handleSubmitReturn(event) {
        event.preventDefault();
        const products = {
            state: 0,
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
        return (
            <tr onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={trStyle}>
                <td>
                    {this.props.obj.id}
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
                    <button onClick={this.handleSubmitReturn.bind(this)}
                        type="button" className="btn" style={{ backgroundColor: "#808060", color: "#ffffff" }} aria-label="Left Align">
                        <span className="glyphicon glyphicon-circle-arrow-left" aria-hidden="true"></span>
                    </button>
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
