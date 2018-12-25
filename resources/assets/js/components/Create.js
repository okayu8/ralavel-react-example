import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Create extends Component {
    constructor(props) {
        super(props)
        this.state = { title: '', description: '' }
    }
    handleChangeTitle(e) {
        this.setState({ title: e.target.value })
    }
    handleChangeDesc(e) {
        this.setState({ description: e.target.value })
    }
    handleSubmit(e) {
        e.preventDefault()
        const todo = {
            title: this.state.title,
            description: this.state.description
        }
        let uri = '/api/todos'
        axios.post(uri, todo).then((response) => {
            browserHistory.push('/list')
            console.log("success")
        })
    }
    render() {
        return (
            <div>
                <h1>Create a ToDo</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Title:</label>
                                <input type="text" className="form-control" onChange={this.handleChangeTitle.bind(this)} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Description:</label>
                                <input type="text" className="form-control col-md-6" onChange={this.handleChangeDesc.bind(this)} />
                            </div>
                        </div>
                    </div><br />
                    <div className="form-group">
                        <button className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default Create;