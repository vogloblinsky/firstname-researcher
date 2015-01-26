var phantom  = require('phantom'),
    fs       = require('fs'),
    _baseUrlPart1 = 'http://www.prenoms.com/prenom/',
    _baseUrlPart2 = '-50ans.html',
    
    _timeOut = 3000;

var _baseUrl = _baseUrlPart1 + 'anna' + _baseUrlPart2;

phantom.create(function(ph) {
    return ph.createPage(function(page) {
        return page.open(_baseUrl, function(status) {

            console.log('Page loaded');

            setTimeout(function() {
                return page.evaluate(function() {

                    var average = parseInt($($('.chiffres')[1]).find('p').html().split('</strong>')[3].replace(' ','').replace(' ans.',''));

                    return average;
                }, function(result) {
                    console.log(result);

                    ph.exit();
                });
            }, _timeOut);
        });
    });
});
