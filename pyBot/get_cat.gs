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
