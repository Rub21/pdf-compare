#!/usr/bin/env node
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const PDFParser = require("pdf2json");
const inputFile = argv._[0];
const outputFile = argv._[1];
const pdfParser = new PDFParser(this, 1);
pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFile(outputFile, pdfParser.getRawTextContent());
});
pdfParser.loadPDF(inputFile);

