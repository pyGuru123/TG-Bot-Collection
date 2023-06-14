function getCatImage() {
  headers = {
    'Content-Type': 'application/json',
    'x-api-key': catApiToken
  }

  options = {
    "method": "get",
    "headers": headers
  }
  
  response = UrlFetchApp.fetch(catApiEndpoint, options)
  data = JSON.parse(response.getContentText());
  return ["url", data[0]["url"]];
}


function wolframalpha(query) {
  var query = query.trim().split(" ").join("+");
  var url = wolframAlphaEndpoint + query + "%3f";
  Logger.log(url);
  response = UrlFetchApp.fetch(url)
  return ["text", response.getContentText()];
}
