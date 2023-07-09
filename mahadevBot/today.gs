function todaysInfo() {
  var data = JSON.parse(UrlFetchApp.fetch(todayAPI));
  date = data.date;
  sunrise = data.sunrise;
  sunset = data.sunset;
  importance = data.importance;

  var string = `
  *${date}*

  ${sunrise}
  ${sunset}
  ${importance}
  `

  Logger.log(string);

  sendMsg("-1001917826549", string.replace(/[()\[\]~>#\+\-=|{}.!]/g, '\\$&'));
}
