var path = require("path");

module.exports = function(app) {
      app.get('/', function (req, res) {
          res.sendFile(path.join(__dirname, '/../public/home.html'));
      });
      // sends user to the survey page
      app.get('/survey', function (req, res) {
          res.sendFile(path.join(__dirname, '/../public/survey.html'));
      });
    
      // default that leads to home.html
      app.use(function (req, res) {
          res.sendFile(path.join(__dirname + '/../public/home.html'));
      });
    };