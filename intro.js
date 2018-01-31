const https = require('https')

function message() {
  let text =
    "Privet! I am Stakhanov, stackabot's Russian cousin. In Soviet Russia, I am celebrity. You can read about Stakhanov on Imperialist US website Wikipedia <https://en.wikipedia.org/wiki/Alexey_Stakhanov>. There you can learn about stakhanovist movement. Today and tomorrow I want you all fellows to be stakhanovists... with your commits, for the glory of the people! But dare you forget to commit and make Stakhanov angry, I will publicly shame you, or worse!"

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
