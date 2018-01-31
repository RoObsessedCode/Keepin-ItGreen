/*
1. Go to Github
2. Fetch list of Github users
3. Retrieve commit history of each user[JSON object]
4. Compile a list of dates -> object with dates as keys. If today's not is not a key return true for that user. True meaning they have not committed and need to be publicly shamed

*/

const https = require('https')

// Username archive
// var usernames = [
//   'alaq',
//   'alexv',
//   'michaelromani',
//   'freshbreadlux',
//   'solpark',
//   'walejegs',
//   'roobsessedcode',
//   'xifengjin88'
// ]

var usernames = [
  { github: 'alaq', slack: 'Adrien Lacquemant' },
  { github: 'alexv', slack: 'Alex Villarreal' },
  { github: 'michaelromani', slack: 'Mike Romani' }
]
let guiltyPeople = []
let processed = 0

function checkUser(username) {
  const options = {
    host: 'api.github.com',
    path: '/users/' + username + '/events',
    method: 'GET',
    headers: { 'user-agent': 'node.js' }
    // auth: 'username:password' // fill your credentials here, if you've hit the limit
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

      processed++
      if (processed === usernames.length - 1) {
        shamePeople()
      }
    })
  })

  request.on('error', error => {
    console.log('error: ', error)
  })
  request.end()
}

function shamePeople() {
  console.log('shame', guiltyPeople)

  const postData =
    'payload=' +
    JSON.stringify({
      text: 'hello there',
      username: 'stakhanov'
    })

  var options = {
    host: 'hooks.slack.com',
    method: 'POST',
    path: '/services/T024FPYBQ/B90GRC1T7/kqPucPHf49hBl0tEY8KWzbQS',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  }

  var req = https.request(options, function(res) {
    var result = ''
    res.on('data', function(chunk) {
      result += chunk
    })
    res.on('end', function() {
      console.log(result)
    })
    res.on('error', function(err) {
      console.log(err)
    })
  })

  req.on('error', function(err) {
    console.log(err)
  })

  req.write(postData)
  req.end()
}

function githubToSlackUsernames(githubUser) {
  return usernames.filter(person => person.github === githubUser)[0].slack
}

for (let i = 0; i < usernames.length; i++) {
  checkUser(usernames[i].github)
// }
