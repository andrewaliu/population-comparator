var http = require('http');
var fs = require('fs');
var request = require('request');

var server = http.createServer(function(req, res) {

  request('http://api.population.io/1.0/countries', function (error, response, body) {
    if (error || response.statusCode != 200) {
      console.error(error.message);
      res.end();
    }
    var countries = JSON.parse(body).countries;

    var options = '';
    for (var i = 0; i < countries.length; i++) {
      var country = countries[i];
      options += '<option>' + country + '</option>\n';
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    var html = fs.readFileSync('main.html', 'utf-8');
    html = html.replace('{{options1}}', options);
    html = html.replace('{{options2}}', options);
    res.write(html);

    res.end();
  });

}).listen(8080);