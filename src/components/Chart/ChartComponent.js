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
                    width={300}
                    height={300}>
                    <HorizontalGridLines />
                    <LineSeries
                        data={[
                            { x: 1, y: 13 },
                            { x: 2, y: 5 },
                            { x: 3, y: 15 }
                        ]} />
                    <XAxis />
                    <YAxis />
                </XYPlot>
            </div>
        )
    }
}

export default ChartComponent;