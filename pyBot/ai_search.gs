// GPT Search
function searchGPT(msg) {
  var payload = {
    "model": "gpt-3.5-turbo",
    "max_tokens": 800,
    "messages": [
      {"role": "user", "content": msg}
    ]
  };

  var headers = {
    "Authorization": "Bearer " + gptToken
  };

  var options = {
    "method": "post",
    "contentType": "application/json",
    "headers": headers,
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  var resetOptions = {
    "method": "post",
    "contentType": "application/json",
    "headers": headers,
  }

  if (ipReset.reset == false) {
    var resetresponse = UrlFetchApp.fetch(gptIPResetEndpoint, resetOptions);
    ipReset.reset = true;
  }
  var response = JSON.parse(UrlFetchApp.fetch(gptEndpoint, options));
  return ["text", response["choices"][0]["message"]["content"]];
}


// Claude Search
function searchClaude(msg) {
  var payload = {
    "model": "test-claude+",
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

  var response = JSON.parse(UrlFetchApp.fetch(chimeraEndpoint, options));
  // return response;
  return ["text", response["choices"][0]["message"]["content"]];
}

function testClaude() {
  Logger.log(searchClaude("What is the speed of sound?"))
}


// Bard Search
function searchBard(msg) {
  var payload = {
    "model": "bard",
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

  var response = JSON.parse(UrlFetchApp.fetch(gptEndpoint, options));
  return ["text", response["choices"][0]["message"]["content"]];
}