import React, { Component } from 'react';
import { Page, Toolbar, Button, ToolbarButton, Icon } from 'react-onsenui';

const formattedSeconds = (sec) =>
    Math.floor(sec / 60) +
    ': ' +
    ('0' + (sec % 60).toFixed(2)).slice(-5)

class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsElapsed: 0,
        };
        this.incrementer = null;
        this.isCounting = false;
    }
    handleStartClick() {
        if (!this.isCounting) {
            this.incrementer = setInterval(() =>
                this.setState({
                    secondsElapsed: this.state.secondsElapsed + 0.01
                })
                , 10);
            this.isCounting = true;
        }
    }

    handleStopClick() {
        clearInterval(this.incrementer);
        this.isCounting = false;
    }

    handleResetClick() {
        clearInterval(this.incrementer);
        this.setState({
            secondsElapsed: 0,
        });
        this.isCounting = false;
    }

    render() {
        return (
            <Page contentStyle={{ backgroundColor: '#efeff5' }}>
                <Toolbar>
                    <div className='enter'>ストップウォッチ</div>
                    <div className='right'>
                        <ToolbarButton>
                            <Icon icon='ion-navicon, material:md-menu'></Icon>
                        </ToolbarButton>
                    </div >
                </Toolbar >
                <div style={{ marginTop: '50%', textAlign: 'center' }}>
                    <h1 className='stopwatch-timer'>{formattedSeconds(this.state.secondsElapsed)}</h1>
                </div >
                <div className='stopwatch'>
                    <Button className='start-btn' onClick={this.handleStartClick.bind(this)}>start</Button>
                    <Button className='stop-btn' onClick={this.handleStopClick.bind(this)}>stop</Button>
                    <Button onClick={this.handleResetClick.bind(this)}>reset</Button>
                </div >
            </Page >
        );
    }
}

/* class Time extends Component {



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">Example Component</div>

                            <div className="panel-body">
                                This is Time Counter!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} */
export default Time;