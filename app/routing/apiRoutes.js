var path = require("path");

var friends = require('../data/friends');


module.exports = function (app) {
    // GET method (for getting array of friends in friends.js file)
    app.get("/api/friends", function(req, res) {
        res.json(friends);
        console.log(friends)
    });
    // POST method (for new user survey responses)
    app.post("/api/friends", function(req, res) {

        var userSurveyAnswers = req.body;

        userSurveyAnswers.name = userSurveyAnswers.name.replace(/\s+/g, "");

        userSurveyAnswers.photo = userSurveyAnswers.photo.replace(/\s+/g, "");

        convertStringToInt(userSurveyAnswers.scores);

       
        var userScore = userSurveyAnswers.scores;
        // variables for storing 'new friend' name and image
        var matchName = '';
        var matchImage = '';

        // just a number to start off with
        var totalDifference = 10000;

        // Logic for comparing friend and newUser scores to find the 'new best friend'
        for (var i = 0; i < friends.length; i++) {
            var diff = 0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                // determining the absolute value of friends score and new user's score
                // then subtracting the user score from the friend score and updating the variable called `diff` to store the new difference
                diff += Math.abs(friends[i].scores[j] - userScore[j]);
            }
            if (diff < totalDifference) {
                totalDifference = diff;
                // creating a new best friend...
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }

        // Add user's inputs into the friends array
        friends.push(userSurveyAnswers);

        // Respond with json of name and photo of the matched friend
        res.json({
            status: 'OK',
            matchName: matchName,
            matchImage: matchImage
        });


    });

}


function convertStringToInt(userSurveyAnswers) {
    for (var i = 0; i < userSurveyAnswers.length; i++) {
        userSurveyAnswers[i] = parseInt(userSurveyAnswers[i]);
    }
}

