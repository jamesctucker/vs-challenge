const express = require('express');
const router = express.Router();
const fs = require('fs');
//require the csvtojson converter class
const csvFilePath = 'server/routes/data.csv'
const csv = require('csvtojson')

csv({
    noheader: false,
    headers: ['timestamp', 'sensor', 'people'],
    colParser: {
        'people': 'number',
    },
    checkType: true
})
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        console.log(jsonObj);
        fs.writeFile('data/data.json', JSON.stringify(jsonObj), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("the file was saved!");
        });
    })

// const jsonArray = await csv().fromFile(csvFilePath);






module.exports = router;