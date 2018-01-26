/*
1. Go to Github
2. Fetch list of Github users
3. Retrieve commit history of each user[JSON object]
4. Compile a list of dates -> object with dates as keys. If today's not is not a key return true for that user. True meaning they have not committed and need to be publicly shamed

*/

var https = require("https");
var username = 'jquery';

var options = {
    host: 'api.github.com',
    path: '/users/' + username + '/events',
    method: 'GET',
    headers: {'user-agent': 'node.js'}
};

var request = https.request(options, function(response){
var body = '';
response.on("data", function(chunk){
    body += chunk.toString('utf8');
});

response.on("end", function(){
    var obj = JSON.parse(body)[0];
    console.log('adrien', obj)
    var arrKeys = Object.keys(obj);
    //console.log('!!!!!!!!!!!', arrKeys)
    //console.log("Body: ", JSON.parse(body)[0]);
    });
});

request.end();
