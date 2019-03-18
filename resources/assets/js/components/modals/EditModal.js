import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router';

const customStyles = {
    content: {
        backgroundColor: '#273036'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0, 0.5)'
    }
};

export default class EditModal extends React.Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            title: '',
            description: '',
            time: '',
            limit: ''
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        axios.get("/api/todos/" + this.props.params)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    description: response.data.description,
                    time: response.data.time,
                    limit: response.data.limit,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    handleChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }
    handleChangeDesc(e) {
        this.setState({
            description: e.target.value
        })
    }
    handleChangeTime(e) {
        this.setState({
            time: e.target.value
        })
    }
    handleChangeLimit(e) {
        this.setState({
            limit: e.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const products = {
            title: this.state.title,
            description: this.state.description,
            time: this.state.time,
            limit: this.state.limit,
        }
        let uri = '/api/todos/' + this.props.params
        axios.patch(uri, products).then((response) => {
            location.reload();
        });
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div>
                <button onClick={this.openModal} className="btn" style={openModalStyle}>
                    <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                </button>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Edit Modal"
                    ariaHideApp={false}
                >
                    <div>
                        <div>
                            <button className="pull-right" style={closeStyle} onClick={this.closeModal}>
                                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </button>
                        </div>
                        <br />
                        <h1>Edit ToDo</h1>
                        <div className="row">
                            <div className="col-md-10"></div>
                            <div className="col-md-2">
                                <Link to="/list">&lt;&lt; Back to List</Link>
                            </div>
                        </div>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text"
                                    className="form-control"
                                    value={this.state.title}
                                    onChange={this.handleChangeTitle.bind(this)} />
                            </div>

                            <div className="form-group">
                                <label name="product_price">Description</label>
                                <input type="text" className="form-control"
                                    value={this.state.description}
                                    onChange={this.handleChangeDesc.bind(this)} />
                            </div>

                            <div className="form-group">
                                <label name="product_price">Limit</label>
                                <input type="text" className="form-control"
                                    value={this.state.limit}
                                    onChange={this.handleChangeLimit.bind(this)} />
                            </div>

                            <div className="form-group">
                                <label name="product_price">Time</label>
                                <input type="text" className="form-control"
                                    value={this.state.time}
                                    onChange={this.handleChangeTime.bind(this)} />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}

const closeStyle = {
    fontSize: 20,
    color: '#c3c6c7',
    backgroundColor: '#273036',
    borderColor: '#273036',
    width: 35,
    padding: 0,
};

const openModalStyle = {
    backgroundColor: "#606090",
    color: "#ffffff",
}
