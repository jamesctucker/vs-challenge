import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';


class FileReader extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }

    handleReadCSV = (res) => {
        console.log(res.data);
    }

    handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
    }

    handleImportOffer = () => {
        this.fileInput.current.click();
    }



    render() {


        return (
            <div>
                <CSVReader
                    onFileLoaded={this.handleReadCSV}
                    inputRef={this.fileInput}
                    style={{ display: 'none' }}
                    onError={this.handleOnError}
                />
                <button onClick={this.handleImportOffer}>Import</button>
            </div>
        )
    }
}

export default FileReader;