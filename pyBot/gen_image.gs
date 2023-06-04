function generateImage(prompt) {
    var headers = {
      "Authorization" : "Bearer " + chimeraToken
    }

    var payload = {
      "prompt": prompt,
      "n": 1,
      "model": "dalle"
    }

    var options = {
    "method": "post",
    "contentType": "application/json",
    "headers": headers,
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

    var response = JSON.parse(UrlFetchApp.fetch(chimeraImageEndpoint, options));
    return ["url", response["data"][0]["url"]];
}

// function test() {
//   Logger.log(generateImage("A beautiful girl"))
// }
