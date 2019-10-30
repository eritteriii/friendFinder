var users = require('../app/data/friends.js');

module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        res.json(users.friends);
    });

    app.post('/api/friends', function (req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        var userData = req.body;
        var userScores = userData.scores;

        var totalDifference = 0;

        for (var i = 0; i < users.friends.length - 1; i++) {
            console.log(users.friends[i].name);
            totalDifference = 0;

            for (var j = 0; j < 10; j++) {
                if (userScores[j] && users.friends[i].scores)
                    totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(users.friends[i].scores[j]));
                    if (totalDifference <= bestMatch.friendDifference) {
                        bestMatch.name = users.friends[i].name;
                        bestMatch.photo = users.friends[i].photo;
                        bestMatch.friendDifference = totalDifference;
                }
            }
        }

        
        users.friends.push(userData);
        console.log(users)
        res.json(bestMatch);
    });
};