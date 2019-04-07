import React, { Component } from 'react';
import axios from 'axios';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';
import Datetime from 'react-datetime'
import './Chart.css';



class ChartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readings: [],
            isLoading: true,
            errors: null,
        }
    }

    componentDidMount() {
        axios
            .get("https://api.jsonbin.io/b/5ca971e985438b0272f0189b")
            .then(response => {
                this.setState({
                    readings: response.data,
                    isLoading: false
                });
                console.log(this.state.readings);
            })
            // If we catch any errors connecting, let's update accordingly
            .catch(error => this.setState({ error, isLoading: false }));
    }

    // isSensorOne(state) {
    //     return state.readings.sensor === 'Sensor 1';
    // }

    //     .then(response =>
    //         response.data.filter((reading) => {
    //             return reading.sensor === "Sensor 3";
    //         }))
    //     .then(readings => {
    //         this.setState({
    //             readings,
    //             isLoading: false
    //         });
    //         console.log(this.state.readings);
    //     })
    //     // If we catch any errors connecting, let's update accordingly
    //     .catch(error => this.setState({ error, isLoading: false }));

    // }





    render() {
        const MSEC_DAILY = 86400000;
        const timestamp = new Date().getTime();


        return (
            <div>
                {/* need to filter data into 3 separate datasets arranged by sensor name */}
                {JSON.stringify(this.state.readings)}
                <h1>Chart Component</h1>
                {/* need to enable user to sort data according to user-selected dates/times */}
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
                    {/* need to map through sensor 1 data */}
                    <LineSeries
                        color="red"
                        data={[
                            { x: timestamp + MSEC_DAILY, y: 3 },
                            { x: timestamp + MSEC_DAILY * 2, y: 5 },
                            { x: timestamp + MSEC_DAILY * 3, y: 15 },
                            { x: timestamp + MSEC_DAILY * 4, y: 12 }
                        ]}
                    />
                    {/* need to map through sensor 2 data */}
                    <LineSeries
                        data={[
                            { x: timestamp + MSEC_DAILY, y: 10 },
                            { x: timestamp + MSEC_DAILY * 2, y: 4 },
                            { x: timestamp + MSEC_DAILY * 3, y: 2 },
                            { x: timestamp + MSEC_DAILY * 4, y: 15 }
                        ]}
                    />
                    {/* need to map through sensor 3 data */}
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