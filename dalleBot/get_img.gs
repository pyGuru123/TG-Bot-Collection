function generateImage(prompt) {
    var headers = {
      "Authorization" : "Bearer " + dalleToken
    }

    var payload = {
      "prompt": prompt,
      "n": 1
    }

    var resetOptions = {
      "method": "post",
      "contentType": "application/json",
      "headers": headers,
    }

    var options = {
    "method": "post",
    "contentType": "application/json",
    "headers": headers,
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

    if (ipReset.reset == false) {
        var resetresponse = UrlFetchApp.fetch(gptIPResetEndpoint, resetOptions);
        ipReset.reset = true;
    }
    var response = JSON.parse(UrlFetchApp.fetch(dalleEndpoint, options));
    try {
        return ["url", response["data"][0]["url"]];
    }
    catch (error) {
        UrlFetchApp.fetch(gptIPResetEndpoint, resetOptions);
        var response = JSON.parse(UrlFetchApp.fetch(dalleEndpoint, options));
        try {
          return ["url", response["data"][0]["url"]];
        }
        catch(error) {
          return ["text", response];
        }
    }
}

function test() {
  Logger.log(generateImage("A beautiful girl"))
}
