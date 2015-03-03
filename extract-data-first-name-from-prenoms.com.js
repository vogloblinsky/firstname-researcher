var phantom             = require('phantom'),
    fs                  = require('fs'),
    Q                   = require('q'),
    moment              = require('moment'),
    _sourceDataAddict   = './data-from-dataaddict-fr/',

    _outputFirstNamesFemaleFilenameJson = _sourceDataAddict + 'female-with-averageAge.json',

    _outputFirstNamesMaleFilenameJson = _sourceDataAddict + 'male-with-averageAge.json',

    _baseUrlPart1       = 'http://www.prenoms.com/prenom/',
    _baseUrlPart2       = '-50ans.html',

    _processedFirstNamesFemales = [],
    _processedFirstNamesMales = [],

    _maxFemaleAverageAge = 0,
    _minFemaleAverageAge = 0,

    _timeOut = 500,
    _startTime = 0;

var sansAccent = function(input) {
    var accent = [
    /[\300-\306]/g, /[\340-\346]/g,
    /[\310-\313]/g, /[\350-\353]/g,
    /[\314-\317]/g, /[\354-\357]/g,
    /[\322-\330]/g, /[\362-\370]/g,
    /[\331-\334]/g, /[\371-\374]/g,
    /[\321]/g, /[\361]/g,
    /[\307]/g, /[\347]/g
    ],
    noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

    var str = input,
        i = 0,
        len = accent.length;
    for (i; i < len; i++) {
        str = str.replace(accent[i], noaccent[i]);
    }

    return str;
};

var crawlData = function(firstName) {
    var _baseUrl = _baseUrlPart1 + sansAccent(firstName) + _baseUrlPart2,
        deferred = Q.defer();

    phantom.create(function(ph) {
        return ph.createPage(function(page) {
            return page.open(_baseUrl, function(status) {

                console.log('Page loaded: ', status);

                if (status === 'success') {
                    //Wait ajax call
                    setTimeout(function() {
                        return page.evaluate(function() {
                            var average = parseInt($($('.chiffres')[1]).find('p').html().split('</strong>')[3].replace(' ', '').replace(' ans.', ''));
                            return average;
                        }, function(result) {
                            deferred.resolve(result);
                            ph.exit();
                        });
                    }, _timeOut);
                } else {
                    deferred.reject();
                }
            });
        });
    }, {
        'load-images': false
    });

    return deferred.promise;
};

var jsonToTxt = function(_array) {

    var _str = '',
        i = 0,
        len = _array.length;

    for (i; i < len; i++) {
        _str += _array[i]['firstName'] + ' ' + _array[i]['averageAge'] + '\r\n';
    }

    return _str;

};

fs.readFile(_sourceDataAddict + 'male.json', 'utf8', function(err, data) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }

    data = JSON.parse(data);

    console.log('Length: ' + data.length);

    var i = 0,
        len = data.length,

    injectLoop = function() {

        console.log('i: ' + i + ' | ' + data[i]);
        console.log('');

        if (i < len) {
            crawlData(data[i]).then(function(averageAge) {
                console.log(data[i], averageAge);
                console.log('');
                _processedFirstNamesMales.push({
                    firstName: data[i],
                    averageAge: averageAge
                });

                _minFemaleAverageAge = averageAge;

                if (averageAge > _maxFemaleAverageAge) {
                    _maxFemaleAverageAge = averageAge;
                }
                if (averageAge < _minFemaleAverageAge) {
                    _minFemaleAverageAge = averageAge;
                }

                fs.writeFile(_outputFirstNamesMaleFilenameJson, JSON.stringify(_processedFirstNamesMales), function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Data saved to ' + _outputFirstNamesMaleFilenameJson);
                        i++;
                        injectLoop();
                    }
                });
            });
        } else {
            var _endTime = moment();

            console.log('Processing time: ' + moment(_endTime.diff(_startTime)).format('hh:mm:ss'));

            console.log('_minFemaleAverageAge: ' + _minFemaleAverageAge + ' _maxFemaleAverageAge: ' + _maxFemaleAverageAge);
        }
    };

    _startTime = moment();

    injectLoop();

});
