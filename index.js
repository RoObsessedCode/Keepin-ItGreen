/*
1. Go to Github
2. Fetch list of Github users
3. Retrieve commit history of each user[JSON object]
4. Compile a list of dates -> object with dates as keys. If today's not is not a key return true for that user. True meaning they have not committed and need to be publicly shamed

*/

var https = require('https')
var usernames = ['alaq', 'alexv', 'michaelromani', 'freshbreadlux', 'solpark', 'walejegs', 'roobsessedcode', 'xifengjin88']
let guiltyPeople = ['']

function checkUser(username) {
  const options = {
    host: 'api.github.com',
    path: '/users/' + username + '/events',
    method: 'GET',
    headers: { 'user-agent': 'node.js' },
    auth: 'alaq:silver3' // fill your credentials here, if you've hit the limit
  }

  const request = https.request(options, function(response) {
    var body = ''
    response.on('data', function(chunk) {
      body += chunk.toString('utf8')
    })

    response.on('end', function() {
      const dateCreated = JSON.parse(body)[0].created_at

      const now = new Date(new Date().getTime() - 6 * 60 * 60)
      const commit = new Date(new Date(dateCreated).getTime() - 6 * 60 * 60)
      const nowDay = now.getDate()
      const commitDay = commit.getDate()
      const nowMonth = new Date(nowDay).getMonth()
      const commitMonth = new Date(commitDay).getMonth()

      if (nowDay !== commitDay || nowMonth !== commitMonth) {
        console.log(username)
        guiltyPeople.push(username)
      }
    })
  })

  request.on('error', error => {
    console.log('error: ', error)
  })
  request.end()
}

for (let i = 0; i < usernames.length; i++) {
  checkUser(usernames[i])
}

console.log(guiltyPeople)
