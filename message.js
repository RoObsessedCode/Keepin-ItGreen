const https = require('https')

function message() {
  let text =
    'I have added you to our kolkhoz, comrade <@U02T807LT>. Junior FSA fellows are already enlisted. Anyone else feeling the spirit of the Revolution can just reply to this thread! To read about kolkhoz: <https://en.wikipedia.org/wiki/Kolkhoz>'

  const postData =
    'payload=' +
    JSON.stringify({
      text: text,
      channel: '#1801-fsa-ny-fellows'
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

message()
