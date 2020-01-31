const fs = require('fs');
const xml2js = require('xml2js');
const xml = require('xml-reader');

const reader = xml.create();
reader.on('done', (data) => {
    console.log(data);
});

var parser = new xml2js.Parser();

fs.readFile(__dirname + '/design.xml', 'utf8',function(err, data) {
    reader.parse(data);
});