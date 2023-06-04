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

  // Logger.log(options);
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

function testGPT() {
  // Logger.log(searchGPT("Hello how are you ?"));
  if (ipReset.reset == false) {
    ipReset.reset = true;
  }
  Logger.log(ipReset)
}