import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/date')
            .then(response => {
                console.log('date:' + JSON.stringify(response.data))
                this.setState({ date: response.data })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" style={{ color: "#000000" }} href="/">ToDoList</a>
                        </div>

                        <ul className="nav navbar-nav" >
                            <li className="active"><a href="#" style={{ color: "#ffffff" }}>Home</a></li>
                            <li><Link to="create" style={{ color: "#4f0d0d" }}>Create</Link></li>
                            <li><Link to="list" style={{ color: "#791313" }}>List</Link></li>
                            <li><Link to="time" style={{ color: "#961818" }}>Time</Link></li>
                            <li></li>
                        </ul>
                        <div className="collapse navbar-collapse navbar-right">
                            <p className="navbar-brand"
                                style={{
                                    color: "#ffffff",
                                    marginBottom: 0,
                                }}>{this.state.date}</p>
                        </div>
                    </div>
                </nav>
                <div>
                    {this.props.children}
                </div>
            </div >
        )
    }

}
export default Main;