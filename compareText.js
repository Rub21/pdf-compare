#!/usr/bin/env node
const stringSimilarity = require('string-similarity');
const fs = require('fs');
const _ = require('underscore');
const argv = require('minimist')(process.argv.slice(2));
const file1 = argv._[0];
const file2 = argv._[1];
var doc1 = JSON.parse(fs.readFileSync(file1).toString());
var doc2 = JSON.parse(fs.readFileSync(file2).toString());
_.each(doc1, function (v1, k1) {
    for (let i = 0; i < v1.length; i++) {
        const paragraph1 = v1[i];
        _.each(doc2, function (v2, k2) {
            for (let j = 0; j < v2.length; j++) {
                const paragraph2 = v2[j];
                let similarity = stringSimilarity.compareTwoStrings(paragraph1, paragraph2);
                if (similarity > 0.7) {
                    console.log(`A:(${k1}): ${paragraph1}`);
                    console.log(`B:(${k2}): ${paragraph2}`);
                    console.log('====================================================');
                    console.log('');
                }
            }
        });
    }
});

