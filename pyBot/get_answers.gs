function wolframalpha(query) {
  var query = query.trim().split(" ").join("+");
  var url = wolframAlphaEndpoint + query + "%3f";
  Logger.log(url);
  response = UrlFetchApp.fetch(url)
  return ["text", response.getContentText()];
}