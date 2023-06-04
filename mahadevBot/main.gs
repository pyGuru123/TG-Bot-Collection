function random_group() {
  var GROUP = ["edited", "mahadev", "shivlinga"];
  return GROUP[Math.floor(Math.random() * GROUP.length)];
}

function random_int(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random_pic() {
  var MAX_INT = 150;
  var group = random_group();
  var index = random_int(1, MAX_INT);
  var pic = `https://raw.githubusercontent.com/pyGuru123/The-Mahadev-Api/main/assets/imgs/${group}${index}.jpg`;
  return pic;
}

function post_image() {
  var imageUrl = random_pic();
  var botToken = "6290082613:AAGV48uxncvbpnYpMg......................";
  var apiUrl = 'https://api.telegram.org/bot' + botToken + '/sendPhoto';

  
  var chatIDS = ["-1001932250000", "-1001439600000"];
  for (var i=0; i <chatIDS.length; i++) {
    var chatId = chatIDS[i];

    var payload = {
    'chat_id': chatId,
    'photo': imageUrl,
    'caption' : "Har Har Mahadev 🕉️"
    };

    var options = {
      'method': 'POST',
      'payload': payload,
    };

    Logger.log(options);
    
    var response = UrlFetchApp.fetch(apiUrl, options);
    var responseData = JSON.parse(response.getContentText());

    if (responseData.ok) {
      Logger.log('Image sent successfully!');
    } else {
      Logger.log('Failed to send image. Error:', responseData.description);
    }
  }
}
