import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router';
import moment from 'moment';

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
            limit: '',
            year: 0,
            month: '',
            day: '',
            notSet: '',
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        axios.get("/api/todos/" + this.props.params)
            .then(response => {
                var date_time_fmt = moment(response.data.date_time).format('YYYY');
                var year;
                var month;
                var day;
                var notSet = '';
                if (date_time_fmt === 'Invalid date' || date_time_fmt === '0000') {
                    var nowDate = new Date();
                    year = Number(moment(nowDate).format('YYYY'));
                    month = moment(nowDate).format('MM');
                    day = moment(nowDate).format('DD');
                    notSet = '(Not Set)';
                } else {
                    year = Number(moment(response.data.date_time).format('YYYY'));
                    month = moment(response.data.date_time).format('MM');
                    day = moment(response.data.date_time).format('DD');
                }
                this.setState({
                    title: response.data.title,
                    description: response.data.description,
                    time: response.data.time,
                    limit: response.data.date_time,
                    year: year,
                    month: month,
                    day: day,
                    notSet: notSet,
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
    handleChangeYear(e) {
        this.setState({
            year: Number(e.target.value)
        })
    }
    handleChangeMonth(e) {
        this.setState({
            month: e.target.value
        })
    }
    handleChangeDay(e) {
        this.setState({
            day: e.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        var selectYear = String(this.state.year) === '0' ? '0000' : String(this.state.year);
        var selectMonth = this.state.month;
        var selectDay = this.state.day;
        var selectLimit = selectYear + '-' + selectMonth + '-' + selectDay + ' 00:00:00';
        const products = {
            title: this.state.title,
            description: this.state.description,
            time: this.state.time,
            limit: selectLimit,
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
        var years = [];
        for (var yearI = 0; yearI < 10; yearI++) {
            years[yearI] = String(this.state.year + yearI - 4);
        }
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
                                <textarea type="text" className="form-control"
                                    value={this.state.description}
                                    onChange={this.handleChangeDesc.bind(this)} />
                            </div>

                            <div className="form-group">
                                <label name="product_price">Limit {this.state.notSet}</label>
                                <div className="form-inline">
                                    <select name="datetime" className="form-control"
                                        defaultValue={this.state.notSet !== '' ? '0' : this.state.year} style={{ marginRight: 10 }}
                                        onChange={this.handleChangeYear.bind(this)} >
                                        {years.map(d => <option key={d} value={d}>{d}</option>)}
                                        <option key='notSet' value='0'>----</option>
                                    </select>
                                    <select name="datetime" className="form-control"
                                        defaultValue={this.state.notSet !== '' ? '00' : this.state.month} style={{ marginRight: 10 }}
                                        onChange={this.handleChangeMonth.bind(this)} >
                                        {allMonth.map(d => <option key={d} value={d}>{d}</option>)}
                                        <option key='notSet' value='00'>--</option>
                                    </select>
                                    <select name="datetime" className="form-control"
                                        defaultValue={this.state.notSet !== '' ? '00' : this.state.day} style={{ marginRight: 10 }}
                                        onChange={this.handleChangeDay.bind(this)} >
                                        {allDay.map(d => <option key={d} value={d}>{d}</option>)}
                                        <option key='notSet' value='00'>--</option>
                                    </select>
                                </div>

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
const allMonth = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12",
]

const allDay = [
    "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
    "31",
]

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
