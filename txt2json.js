#!/usr/bin/env node

const fs = require('fs');
const LineByLineReader = require('line-by-line');
const argv = require('minimist')(process.argv.slice(2));
const inputFile = argv._[0];
const outputFile = argv._[1];
const lr = new LineByLineReader(inputFile);
let doc = {}
let pageIndex = 1;
let page = ''
lr.on('error', function (err) {
    console.log(err);
});

let paragraph = '';
let paragraphs = [];

lr.on('line', function (line) {
    if (line.indexOf('----') > -1) {
        if (paragraphs.length > 0) {
            doc['Página-' + pageIndex] = paragraphs;
        } else if (paragraphs.length === 0) {
            doc['Página-' + pageIndex] = [paragraph];
        }
        pageIndex++;
        paragraphs = [];
        paragraph = '';
    } else {
        line = line.replace(/ +(?= )/g, '');
        page = page + line;
        let point = line.substr(line.length - 2)
        point = point.replace(/\s/g, '');
        if (point === '.') {
            paragraph = paragraph + line;
            paragraphs.push(paragraph);
            paragraph = '';
        } else {
            paragraph = paragraph + line;
        }
    }
});

lr.on('end', function () {
    fs.writeFile(outputFile, JSON.stringify(doc));
});