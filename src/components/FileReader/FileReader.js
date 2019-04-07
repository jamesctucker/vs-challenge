import React, { Component } from 'react';
import Papa from 'papaparse';

const file = document.getElementById('file');


class FileReader extends Component {
    papaParse() {
        Papa.parse(file.files[0], {
            delimiter: ',',
            skipEmptyLines: true,
            complete: function (results) {
                console.log("Parsing complete:", results.data);
            },
        });
        file.addEventListener('change', papaParse)
    }



    render() {


        return (
            <div>
                <input id="file" type="file">Upload</input>
            </div>
        )
    }
}

export default FileReader;