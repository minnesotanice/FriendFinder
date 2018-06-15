// file should contain two routes

// * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
// * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 

// REQUIREMENTS
var bodyParser = require("body-parser");
var path = require("path");
var friends = require("../data/friends.js");


module.exports = function(app) {

    // A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function(req, res) {
        // console.log(friends);
        return res.json(friends);
    });

    // CALCULATE COMPATABILITY
    function findNewFriend(user) {
        var userScores = user.scores;
        //the max difference in score between two users for each question is 4 - 10 questions total
        var maxDiff = 4 * 10;
        var newFriend;
        //loop through each friend
        for (var i = 0; i < friends.length; i++) {
            var friendScores = friends[i].scores;
            var totalDifference = 0;
            //loop through each score array separately
            for (var j = 0; j < friendScores.length; j++) {
                totalDifference = totalDifference + Math.abs(userScores[j] - friendScores[j]);
            }
            if (totalDifference <= maxDiff) {
                newFriend = friends[i];
                maxDiff = totalDifference;
            }
        }
        return newFriend;
    }

    // A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    app.post("/api/friends", function(req, res) {
        // console.log("we hit the route!");

        // get data from survey
        var friendSeeker = req.body;

        // compare survey answers and array friend answers
        var oneNewFriend = findNewFriend(friendSeeker);

        // respond with result of survey comparison
        res.json(oneNewFriend);

        // add survey taker to friends array
        friends.push(friendSeeker);

        // console.log("oneNewFriend is", oneNewFriend);
        


    });

}