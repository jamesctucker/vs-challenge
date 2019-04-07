import React, { Component } from 'react';
import axios from 'axios';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';
import Datetime from 'react-datetime'
import './Chart.css';



class ChartComponent extends Component {
    state = {
        readings: [],
        isLoading: true,
        errors: null,
    }

    componentDidMount() {
        axios
            .get("https://api.jsonbin.io/b/5ca971e985438b0272f0189b")
            .then(response => console.log(response))
            .catch(error => this.setState({ error, isLoading: false }));
    }



    render() {
        const MSEC_DAILY = 86400000;
        const timestamp = new Date().getTime();

        return (
            <div>
                <h1>Chart Component</h1>
                <div id="start-date">
                    <Datetime />
                </div>
                <div id="end-date">
                    <Datetime />
                </div>
                <XYPlot
                    xType="time"
                    width={300}
                    height={300}>
                    <HorizontalGridLines />
                    <LineSeries
                        color="red"
                        data={[
                            { x: timestamp + MSEC_DAILY, y: 3 },
                            { x: timestamp + MSEC_DAILY * 2, y: 5 },
                            { x: timestamp + MSEC_DAILY * 3, y: 15 },
                            { x: timestamp + MSEC_DAILY * 4, y: 12 }
                        ]}
                    />
                    <LineSeries data={null} />
                    <LineSeries
                        data={[
                            { x: timestamp + MSEC_DAILY, y: 10 },
                            { x: timestamp + MSEC_DAILY * 2, y: 4 },
                            { x: timestamp + MSEC_DAILY * 3, y: 2 },
                            { x: timestamp + MSEC_DAILY * 4, y: 15 }
                        ]}
                    />
                    <XAxis />
                    <YAxis />
                </XYPlot>
            </div>
        )
    }
}

export default ChartComponent;