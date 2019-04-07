import React, { Component } from 'react';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';

class ChartComponent extends Component {



    render() {

        return (
            <div>
                <h1>Chart Component</h1>
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