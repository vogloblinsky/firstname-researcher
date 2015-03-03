var phantom  = require('phantom'),
    fs       = require('fs'),
    _baseUrl = 'http://dataaddict.fr/prenoms/',
    _outputDir = './data-from-dataaddict-fr/',
    _outputFirstNamesFemaleFilename = _outputDir + 'female.json',
    _outputFirstNamesMaleFilename = _outputDir + 'male.json',
    _timeOut = 3000;

phantom.create(function(ph) {
    return ph.createPage(function(page) {
        return page.open(_baseUrl, function(status) {

            console.log('Page loaded');

            setTimeout(function() {
                return page.evaluate(function() {

                    var femalesAr = [],
                        malesAr = [];

                    $('#prenoms_list_container').find('li.f').each(function() {
                        femalesAr.push($(this).html());
                    });

                    $('#prenoms_list_container').find('li.h').each(function() {
                        malesAr.push($(this).html());
                    });

                    return {
                        females: femalesAr,
                        males: malesAr
                    };
                }, function(result) {
                    console.log(result);

                    fs.writeFile(_outputFirstNamesFemaleFilename, JSON.stringify(result.females, null, 4), function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('JSON saved to ' + _outputFirstNamesMaleFilename);
                        }
                    });

                    fs.writeFile(_outputFirstNamesMaleFilename, JSON.stringify(result.males, null, 4), function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('JSON saved to ' + _outputFirstNamesMaleFilename);
                        }
                    });

                    ph.exit();
                });
            }, _timeOut);
        });
    });
});
