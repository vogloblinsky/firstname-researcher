'use strict';

var fs          = require('fs'),
    readline    = require('readline'),
    stream      = require('stream'),
    _           = require('lodash'),

    _processedFirstNamesMale = [],
    _outputFirstNamesMaleFilename = './data-lexique-org/male.json',
    _processedFirstNamesFemale = [],
    _outputFirstNamesFemaleFilename = './data-lexique-org/female.json',

    instream = fs.createReadStream('./data-lexique-org/prenoms.txt'),
    outstream = new stream;

outstream.readable = true;
outstream.writable = true;

var rl = readline.createInterface({
    input: instream,
    output: outstream,
    terminal: false
});

rl.on('line', function(line) {
    var _infos      = line.split('\t'),
        _firstName  = _infos[0],
        _gender     = _infos[1],
        _languages  = _infos[2].split(', ');

    if ((_.indexOf(_languages, 'french') !== -1 && _.indexOf(_languages, 'english') !== -1) ||
        (_.indexOf(_languages, 'french') !== -1 && _.indexOf(_languages, 'spanish') !== -1)) {

        if (_gender === 'f') {
            _processedFirstNamesFemale.push(_firstName);
        } else {
            _processedFirstNamesMale.push(_firstName);
        }
    }
});

rl.on('close', function() {
    _processedFirstNamesFemale = _.sortBy(_processedFirstNamesFemale, 'label');
    //console.log(_processedFirstNamesFemale);
    //console.log(_processedFirstNamesFemale.length);

    fs.writeFile(_outputFirstNamesFemaleFilename, JSON.stringify(_processedFirstNamesFemale, null, 4), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('JSON saved to ' + _outputFirstNamesMaleFilename);
        }
    });

    _processedFirstNamesMale = _.sortBy(_processedFirstNamesMale, 'label');
    //console.log(_processedFirstNamesMale);
    //console.log(_processedFirstNamesMale.length);

    fs.writeFile(_outputFirstNamesMaleFilename, JSON.stringify(_processedFirstNamesMale, null, 4), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('JSON saved to ' + _outputFirstNamesMaleFilename);
        }
    });
});
