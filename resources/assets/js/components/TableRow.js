import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class TableRow extends Component {
    constructor(props) {
        super(props);

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
                    {this.props.obj.title}
                </td>
                <td>
                    {this.props.obj.description}
                </td>
                <td>
                    <Link to={"/todos/" + this.props.obj.id + "/edit"} className="btn btn-primary">Edit</Link>
                </td>
                <td>
                    <form onSubmit={this.handleSubmitDeletion.bind(this)}>
                        <input type="submit" value="Delete" className="btn btn-danger" />
                    </form>
                </td>
            </tr>
        )
    }
}

export default TableRow;