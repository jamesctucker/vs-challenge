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
            errors: null,
        }
    }
    componentDidMount() {
        axios
            .get("https://api.jsonbin.io/b/5caac4fe85438b0272f11548")
            .then(response => {
                this.setState({
                    readings: response.data,
                });
            })
            // If we catch any errors connecting, let's update accordingly
            .catch(error => this.setState({ error }));
    }

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
    buildData = () => {
        let sensorNames = this.filterUniqueSensors(this.state.readings);
        let groupedSensors = []
        let fitleredSensorsArray;
        for (let name of sensorNames) {
            fitleredSensorsArray = this.state.readings.filter(eachSensor => {
                return eachSensor.sensor === name

            })

            groupedSensors.push(fitleredSensorsArray)
        }
        let currentData = []
        groupedSensors.map(batch => {
            batch.map(thisIteration => {
                currentData.push(thisIteration)
            })
        })

        return currentData;
    }
    sensorOne = () => {
        let dataSet = []
        //  console.log(this.buildData().length);
        this.buildData().filter(z => {
            if (z.sensor === "Sensor 1") {
                dataSet.push({ x: new Date(z.timestamp).getTime() + 86400000, y: z.people })
            }
        })
        return dataSet
    }
    sensorTwo = () => {
        let dataSet = []
        this.buildData().filter(z => {
            if (z.sensor === "Sensor 2") {
                dataSet.push({ x: new Date(z.timestamp).getTime() + 86400000, y: z.people })
            }
        })
        return dataSet
    }
    sensorThree = () => {
        let dataSet = []
        this.buildData().filter(z => {
            if (z.sensor === "Sensor 3") {
                dataSet.push({ x: new Date(z.timestamp).getTime() + 86400000, y: z.people })
            }
        })

        return dataSet

    }
    render() {
        // this.buildData()
        // this.sensorOne()
        // function buildLineSeries() {
        //     return <LineSeries
        //         color="red"
        //     // data={this.buildData()}
        //     />
        // }
        // const timestamp = new Date().getTime();
        // // console.log('date', timestamp);

        return (
            <div>
                {/* need to filter data into 3 separate datasets arranged by sensor name */}
                {/* {JSON.stringify(this.state.readings)} */}
                <h1>Chart Component</h1>
                {/* need to enable user to sort data according to user-selected dates/times */}
                <div id="start-date">
                    <Datetime />
                </div>
                <div id="end-date">
                    <Datetime />
                </div>
                <h3>Key</h3>
                <ul>
                    <li>Red: Sensor 1</li>
                    <li>Blue: Sensor 2</li>
                    <li>Green: Sensor 3</li>
                </ul>
                <XYPlot
                    id="chart"
                    xType="time"
                    width={1200}
                    height={400}>
                    <HorizontalGridLines />
                    {/* need to map through sensor 1 data */}
                    <LineSeries
                        color="red"
                        data={this.sensorOne()}
                    />
                    {/* need to map through sensor 2 data */}
                    <LineSeries
                        color="blue"
                        data={this.sensorTwo()}
                    />
                    {/* need to map through sensor 3 data */}
                    <LineSeries
                        color="green"
                        data={this.sensorThree()}
                    />
                    <XAxis title="Timestamp" />
                    <YAxis title="People Detected" />
                </XYPlot>

            </div>
        )
    }
}
export default ChartComponent;