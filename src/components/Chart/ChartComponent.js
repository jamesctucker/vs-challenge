import React, { Component } from 'react';
import axios from 'axios';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';
import Datetime from 'react-datetime';
import moment from 'moment';
import './Chart.css';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import StopIcon from '@material-ui/icons/Stop';

// this component fetches api data and builds out the timeseries chart
class ChartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readings: [],
            start_date: '2019-01-01T05:00:00.000Z',
            end_date: '2019-04-01T05:00:00.000Z',
            errors: null,
        }
    }

    // this pulls in json array from api
    componentDidMount() {
        axios
            .get('https://api.jsonbin.io/b/5caac4fe85438b0272f11548')
            .then(response => {
                this.setState({
                    readings: response.data,
                });
                console.log(response.data);
            })
            // If we catch any errors connecting, let's update accordingly
            .catch(error => this.setState({ error }));
    }

    // this transforms sensor names into objects that can be sorted/filtered
    filterUniqueSensors = (sensors) => {
        let uniqueObject = {};
        for (let name of sensors) {
            uniqueObject[name.sensor] = 1;
        }
        let uniqueArray = [];
        for (let id in uniqueObject) {
            uniqueArray.push(id);
        }
        return uniqueArray;
    }

    // this takes the sensors and groups them by name, e.g. Sensor One, Sensor Two, etc.
    buildData = () => {
        let sensorNames = this.filterUniqueSensors(this.state.readings);
        let groupedSensors = []
        let filteredSensorsArray;
        for (let name of sensorNames) {
            filteredSensorsArray = this.state.readings.filter(eachSensor => {
                return eachSensor.sensor === name

            })

            groupedSensors.push(filteredSensorsArray)
        }
        let currentData = []
        groupedSensors.map(batch => {
            batch.map(thisIteration => {
                currentData.push(thisIteration)
            })
        })

        return currentData;
    }

    // a series of functions that filter sensors for chart based on name and timestamp
    sensorOne = () => {
        let dataSet = []
        //  console.log(this.buildData().length);
        this.buildData().filter(z => {
            // timestamp is sourced from state. state can be updated by user selecting timestamp from datetime calendar dropdown
            if (z.sensor === 'Sensor 1' && z.timestamp >= this.state.start_date && z.timestamp <= this.state.end_date) {
                dataSet.push({ x: new Date(z.timestamp).getTime() + 86400000, y: z.people })
            }
        })
        return dataSet
    }
    sensorTwo = () => {
        let dataSet = []
        this.buildData().filter(z => {
            if (z.sensor === 'Sensor 2' && z.timestamp >= this.state.start_date && z.timestamp <= this.state.end_date) {
                dataSet.push({ x: new Date(z.timestamp).getTime() + 86400000, y: z.people })
            }
        })
        return dataSet
    }
    sensorThree = () => {
        let dataSet = []
        this.buildData().filter(z => {
            if (z.sensor === 'Sensor 3' && z.timestamp >= this.state.start_date && z.timestamp <= this.state.end_date) {
                dataSet.push({ x: new Date(z.timestamp).getTime() + 86400000, y: z.people })
            }
        })

        return dataSet

    }


    render() {
        // this prevents users from selecting specific dates
        let valid = function (moment) {
            return moment.isBetween('2018-12-31', '2019-04-01')
        }
        return (
            <div>
                {/* {JSON.stringify(this.state.start_date)} */}
                <h1>Chart Component</h1>
                {/* inputs for selecting date/time to sort chart data by */}
                <div id='start-date'>
                    <Datetime
                        isValidDate={valid} onChange={(e) => { this.setState({ start_date: moment(e).toJSON() }) }}
                    />
                </div>
                <div id='end-date'>
                    <Datetime
                        isValidDate={valid} onChange={(e) => { this.setState({ end_date: moment(e).toJSON() }) }}
                    />
                </div>
                <Grid container spacing={24}>
                    <Grid item xl>
                        <Card id='key-card'>
                            <h3>Key</h3>
                            <Divider />
                            <StopIcon id='red-icon' /><p>Sensor 1</p>
                            <Divider />
                            <StopIcon id='blue-icon' /><p>Sensor 2</p>
                            <Divider />
                            <StopIcon id='green-icon' /><p>Sensor 3</p>
                        </Card>
                    </Grid>
                    {/* react-vis chart component */}
                    <Grid item xl>
                        <Card id='chart-card'>
                            <XYPlot
                                id='chart'
                                xType='time'
                                width={1200}
                                height={400}>
                                <HorizontalGridLines />
                                <LineSeries
                                    data={this.sensorOne()}
                                    style={{ stroke: 'red', strokeWidth: 3 }}
                                />
                                <LineSeries
                                    data={this.sensorTwo()}
                                    style={{ stroke: 'blue', strokeWidth: 3 }}
                                />
                                <LineSeries
                                    data={this.sensorThree()}
                                    style={{ stroke: 'green', strokeWidth: 3 }}
                                />
                                <XAxis title='Date/Time' />
                                <YAxis title='People Detected' />
                            </XYPlot>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default ChartComponent;