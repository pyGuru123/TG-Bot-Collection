function fetch_movies(movie) {
  var data = JSON.stringify({
    "collection":"Movies",
    "database":"movieshub",
    "dataSource":"movieshub",
    "filter": { 
      "caption": {"$regex": `${movie}`, "$options": "i"}
      }
  });

  var options = {
    "method": 'post',
    "headers": {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': apikey,
    },
    "payload": data
  };

  var result = JSON.parse(UrlFetchApp.fetch(endpoint, options));
  return result.documents || [];
}

function test(){
  var movies_found = fetch_movies("bholaa");
  Logger.log(create_keyboard(movies_found));
}