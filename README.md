# VergeSense Coding Challenge - James Tucker

### Installing

Steps to get the development environment running:

1. Fork and clone this repository.

```bash
npm install 
npm run server
npm run client
```

### ERD/Table Schema
Located as a .png in the project's data folder

### Utilizing CSV Reader/Converter

1. Run the server. 
2. CSV file is already sourced into the program in the 'data' folder.
3. Node.js automatically converts CSV to JSON when server runs.
4. JSON is written to a JSON file in the 'data' folder.

### Notes On CSV Data
1. Highest sensor count was 999999999 for sensor three. However, this broke the data chart, so I went into the CSV file and edited that count.
2. High sensor counts: Sensor One - 4; Sensor Two - 8; Sensor Three - 9


### Built With

* React.js
* Express.js
* Node.js
* React-Vis
* React-DateTime
* Moment
* CsvToJson
* Axios
* Material-UI
* (a full list of dependencies can be found in `package.json`)

