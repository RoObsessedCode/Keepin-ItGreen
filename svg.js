/*
1. Go to Github
2. Fetch list of Github users
3. Retrieve commit history of each user[JSON object]
4. Compile a list of dates -> object with dates as keys. If today's not is not a key return true for that user. True meaning they have not committed and need to be publicly shamed

*/

const https = require('https')

var usernames = [
  { github: 'alaq', slack: 'U70HAMX6C' },
  { github: 'alexv', slack: 'U715C1DH9' }
  // { github: 'michaelromani', slack: 'U70JBEN2U' },
  // { github: 'roobsessedcode', slack: 'U71BS7YA1' },
  // { github: 'freshbreadlux', slack: 'U71BSAE05' },
  // { github: 'solpark', slack: 'U724CU230' },
  // { github: 'xifengjin88', slack: 'U6NDS7020' },
  // { github: 'walejegs', slack: 'U6NFWHF61' },
  // { github: 'gtelljohann', slack: 'U02T807LT' }
]
let guiltyPeople = []
let processed = 0

function checkUser(username) {
  const options = {
    host: 'github.com',
    path: '/users/' + username + '/contributions',
    method: 'GET',
    headers: { 'user-agent': 'node.js' }
  }

  const request = https.request(options, function(response) {
    var body = ''
    response.on('data', function(chunk) {
      body += chunk.toString('utf8')
    })

    response.on('end', function() {
      const date = '2018-03-09'
      const index = body.indexOf(date)
      let slice = body.slice(index - 150, index + 150)
      slice = slice.split('\n')
      let line
      for (let i = 0; i < slice.length; i++) {
        if (slice[i].indexOf(date) !== -1) line = slice[i]
      }

      line = line.split(/=|"| /)
      const dataCount = line[line.indexOf('data-count') + 2]
      console.log(dataCount)
      // const json = JSON.parse(body)
      // let commitIndex = 0
      // while (json[commitIndex].type !== 'PushEvent') commitIndex++
      // const dateCreated = json[0].created_at
      // const now = new Date(new Date().getTime() - 6 * 60 * 60)
      // const commit = new Date(new Date(dateCreated).getTime() - 6 * 60 * 60)
      // const nowDay = now.getDate()
      // const commitDay = commit.getDate()
      // const nowMonth = new Date(nowDay).getMonth()
      // const commitMonth = new Date(commitDay).getMonth()
      // if (nowDay !== commitDay || nowMonth !== commitMonth) {
      //   console.log(username + " didn't commit today")
      //   guiltyPeople.push(githubToSlackUsernames(username))
      // }
      // processed++
      // if (processed === usernames.length) {
      //   shamePeople()
      // }
    })
  })

  request.on('error', error => {
    console.log('error: ', error)
  })
  request.end()
}

// function shamePeople() {
//   const now2 = new Date(new Date().getTime() - 6 * 60 * 60)
//   const day = now2.getDay()
//   console.log(day)
//   let text = ''
//   // let's go through the three cases, no one, or someome, or many have not commited
//   if (!guiltyPeople.length) {
//     text = 'Privet! Everyone has commited today! I am proud of my comrades!'
//   } else if (day === 0 || day === 6) {
//     text +=
//       "It's the week end! And still, " +
//       usernames
//         .map(usernameObj => '<@' + usernameObj.slack + '>')
//         .filter(slack => !guiltyPeople.includes(slack))
//         .join(', ') +
//       ' have commited! Stakhanov is proud!'
//   } else {
//     // random intro
//     text = 'Shame! '
//     // Adding the name of the people
//     text += guiltyPeople.join(', ')

//     // has or have
//     if (guiltyPeople.length === 1) text += ' has'
//     else text += ' have'

//     // ramdom outro
//     text += ' not commited today! This makes Stakhanov angry!'
//   }

//   const postData =
//     'payload=' +
//     JSON.stringify({
//       text: text
//     })
//   // channel: '#1801-fsa-ny-fellows'

//   var options = {
//     host: 'hooks.slack.com',
//     method: 'POST',
//     path: '/services/T024FPYBQ/B90GRC1T7/kqPucPHf49hBl0tEY8KWzbQS',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Content-Length': postData.length
//     }
//   }

//   var req = https.request(options, function(res) {
//     var result = ''
//     res.on('data', function(chunk) {
//       result += chunk
//     })
//     res.on('end', function() {
//       console.log(result)
//     })
//     res.on('error', function(err) {
//       console.log(err)
//     })
//   })

//   req.on('error', function(err) {
//     console.log(err)
//   })

//   req.write(postData)
//   req.end()
// }

// function githubToSlackUsernames(githubUser) {
//   return (
//     '<@' +
//     usernames.filter(person => person.github === githubUser)[0].slack +
//     '>'
//   )
// }

function makeDate() {
  const now = new Date(new Date().getTime() - 6 * 60 * 60)
  const month = ('0' + (now.getMonth() + 1)).slice(-2)
  const day = ('0' + now.getDate()).slice(-2)
  return now.getFullYear() + '-' + month + '-' + now.getDate()
}

for (let i = 0; i < usernames.length; i++) {
  checkUser(usernames[i].github)
}
