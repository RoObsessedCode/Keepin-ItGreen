/*
1. Go to Github
2. Fetch list of Github users
3. Retrieve commit history of each user[JSON object]
4. Compile a list of dates -> object with dates as keys. If today's not is not a key return true for that user. True meaning they have not committed and need to be publicly shamed

*/

var https = require('https')
// var usernames = ['alaq', 'alexv', 'michaelromani', 'freshbreadlux', 'solpark']
var usernames = ['alaq', 'alexv']

function checkUser(username) {
  var options = {
    host: 'api.github.com',
    path: '/users/' + username + '/events',
    method: 'GET',
    headers: { 'user-agent': 'node.js' },
    auth: 'username:password' // fill your credentials here
  }

  var request = https.request(options, function(response) {
    var body = ''
    response.on('data', function(chunk) {
      body += chunk.toString('utf8')
    })

    response.on('end', function() {
      var gitUserInfo = JSON.parse(body)[0]
      // if (Array.isArray(gitUserInfo) === 'object') console.log(username)
      var dateCreated = gitUserInfo.created_at
      var parseDateCreated = dateCreated.split('-')
      var createdAtMonth = parseDateCreated[1]
      var createdAtDay = parseDateCreated[2].slice(0, 2)
      var createdAtFinal = parseInt(createdAtMonth + createdAtDay)

      const now = new Date().getTime()
      const nowMinus6 = now - 6 * 60 * 60
      const nowDay = new Date(nowMinus6).getDate()
      const nowMonth = new Date(nowDay).getMonth()

      const commit = new Date(dateCreated).getTime()
      const commitMinus6 = commit - 6 * 60 * 60
      const commitDay = new Date(commitMinus6).getDate()
      const commitMonth = new Date(commitDay).getMonth()

      if (nowDay !== commitDay && nowMonth !== nowDay) console.log(username, 'no commits today!')
      else console.log(username, 'commited today')
    })
  })
  request.on('error', error => {
    console.log('error: ', error)
  })
  request.end()
}

usernames.forEach(user => checkUser(user))
