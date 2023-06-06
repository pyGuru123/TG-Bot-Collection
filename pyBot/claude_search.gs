function searchClaude(msg) {
  var payload = {
    "model": "claude+",
    "max_tokens": 800,
    "messages": [
      {"role": "user", "content": msg}
    ]
  };

  var headers = {
    "Authorization": "Bearer " + chimeraToken
  };

  var options = {
    "method": "post",
    "contentType": "application/json",
    "headers": headers,
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  var response = JSON.parse(UrlFetchApp.fetch(claudeEndpoint, options));
  return ["text", response["choices"][0]["message"]["content"]];
}

function testClaude() {
  Logger.log(searchClaude("What is the speed of sound?"))
}
