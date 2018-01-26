/*
1. Go to Github
2. Fetch list of Github users
3. Retrieve commit history of each user[JSON object]
4. Compile a list of dates -> object with dates as keys. If today's not is not a key return true for that user. True meaning they have not committed and need to be publicly shamed

*/

var https = require("https");
var username = "alaq";

var options = {
  host: "api.github.com",
  path: "/users/" + username + "/events",
  method: "GET",
  headers: { "user-agent": "node.js" }
};

var request = https.request(options, function(response) {
  var body = "";
  response.on("data", function(chunk) {
    body += chunk.toString("utf8");
  });

  response.on("end", function() {
    var gitUserInfo = JSON.parse(body)[0];
    var dateCreated = gitUserInfo.created_at;
    var parseDateCreated = dateCreated.split("-");
    var createdAtMonth = parseDateCreated[1];
    var createdAtDay = parseDateCreated[2].slice(0, 2);
    var createdAtFinal = parseInt(createdAtMonth + createdAtDay);


    var monthsInYear = {
      Jan: "1",
      Feb: "2",
      Mar: "3",
      Apr: "4",
      May: "5",
      Jun: "6",
      Jul: "7",
      Aug: "8",
      Sep: "9",
      Oct: "10",
      Nov: "11",
      Dec: "12"
    };

    var time = new Date().getTime();
    var date = new Date(time);
    var todayDate = date.toString();
    var todayParse = todayDate.split(" ");
    var currentDay = todayParse[2];
    var currentMonthWord = todayParse[1];
    var currentMonthNum = monthsInYear[currentMonthWord];
    var currentMonthFinal = currentMonthWord + currentDay;
    var currentDateFinal = parseInt(currentMonthNum + currentDay);

    var latestCommitDateMatchesTodaysDate = currentDateFinal === createdAtFinal;



    console.log("moment of trrrruubaby: ", latestCommitDateMatchesTodaysDate );
  });
});

request.end();
