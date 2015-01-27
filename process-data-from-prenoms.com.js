var fs                  = require('fs'),
    _sourceDataAddict   = './data-from-dataaddict-fr/',
    _outputFileName     = _sourceDataAddict + 'male-with-averageAge-',
    _output0To20        = [],
    _output20To40       = [],
    _output40To60       = [],
    _output60To80       = [];


var groupAge = function(data) {
    if(data.averageAge > 0 && data.averageAge <= 20) {
        _output0To20.push(data);
    } else if (data.averageAge > 20 && data.averageAge <= 40) {
        _output20To40.push(data);
    } else if (data.averageAge > 40 && data.averageAge <= 60) {
        _output40To60.push(data);
    } else if (data.averageAge > 60 && data.averageAge <= 80) {
        _output60To80.push(data);
    }
};

var printToFile = function(arr, endFileName) {

    var _str = '',
        i = 0,
        len = arr.length;

    for (i; i<len; i++) {
        _str += arr[i].firstName + ' : ' + arr[i].averageAge + '\r\n';
    }

    fs.writeFile(_outputFileName + endFileName, _str, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Printed to file');
        }
    });
};

fs.readFile(_sourceDataAddict + 'male-with-averageAge.json', 'utf8', function(err, data) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }

    data = JSON.parse(data);

    var i = 0,
        len = data.length;

    for (i; i<len; i++) {
        groupAge(data[i]);
    }

    console.log(_output0To20.length, _output20To40.length, _output40To60.length, _output60To80.length);

    printToFile(_output0To20, '0-20.txt');
    printToFile(_output20To40, '20-40.txt');
    printToFile(_output40To60, '40-60.txt');
    printToFile(_output60To80, '60-80.txt');

});