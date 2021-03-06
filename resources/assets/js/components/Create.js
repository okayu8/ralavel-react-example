import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Create extends Component {
    constructor(props) {
        super(props)
        this.state = { title: '', description: '', limit: '', }
    }
    handleChangeTitle(e) {
        this.setState({ title: e.target.value })
    }
    handleChangeDesc(e) {
        this.setState({ description: e.target.value })
    }
    handleChangeLimit(e) {
        this.setState({ limit: e.target.value })
    }
    handleSubmit(e) {
        e.preventDefault()
        const todo = {
            title: this.state.title,
            description: this.state.description,
            limit: this.state.limit,
        }
        let uri = '/api/todos'
        axios.post(uri, todo).then((response) => {
            console.log(JSON.stringify(response));
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
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Limit:</label>
                                <input type="text" className="form-control col-md-6" onChange={this.handleChangeLimit.bind(this)} />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <button className="btn" style={{
                            backgroundColor: "#606090",
                            color: "#ffffff",
                        }}>Create</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default Create;