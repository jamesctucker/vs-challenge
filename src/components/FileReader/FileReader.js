import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';

class FileReader extends Component {
    render() {
        return (
            <div>
                <h1>File Reader</h1>
                <ReactFileReader><button>Upload</button></ReactFileReader>
            </div>
        )
    }
}

export default FileReader;