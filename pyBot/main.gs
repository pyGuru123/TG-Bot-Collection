const webhookUrl = "https://script.google.com/macros/s/AKfycbyiJJc7fKK............................................nav44Ip5dd6aQ/exec";

function setTelegramWebhook() {
  var url = setWebhookEndpoint + webhookUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function deleteTelegramWebhook() {
  var response = UrlFetchApp.fetch(delWebhookEndpoint);
  Logger.log(response.getContentText());
}

function doGet(e) {
  Logger.log(e);
  return HtmlService.createHtmlOutput("Hello" + JSON.stringify(e));
};

function sendMsg(chat_id, msg, reply_id) {
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify({
      "chat_id": chat_id,
      "text": msg,
      "reply_to_message_id": reply_id,
      "parse_mode": "MarkdownV2"
    }),
  };

  var response = UrlFetchApp.fetch(sendMsgEndpoint, options);
  Logger.log(response.getContentText());
}

function sendOutput(chat_id, msg, reply_id) {
    var options = {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify({
        "chat_id": chat_id,
        "text": msg,
        "reply_to_message_id": reply_id
      }),
    };

    var response = UrlFetchApp.fetch(sendMsgEndpoint, options);
    Logger.log(response.getContentText());
}

function sendPhoto(chat_id, url, reply_id) {
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify({
      "chat_id": chat_id,
      'photo': url,
      "reply_to_message_id": reply_id,
    }),
  };

  var response = UrlFetchApp.fetch(sendPhotoEndpoint, options);
  Logger.log(response.getContentText());
}

function sendBinaryPhoto(chat_id, photo, reply_id) {
  // photo =  response.getBlob();
  var options = {
    "method": "post",
    "muteHttpExceptions": true,
    "payload": {
      "chat_id": `${chat_id}`,
      'photo':photo,
      "reply_to_message_id": reply_id,
   }
  };

    var response = UrlFetchApp.fetch(sendPhotoEndpoint, options);
    Logger.log(response.getContentText())
}

function sendMail(content) {
  var message = JSON.stringify(content, null, 4);
  GmailApp.sendEmail(Session.getEffectiveUser().getEmail(), "Telegram Bot Update " + chat_id, message);
}

function reply_to_bot(content) {
  var chat_id = content.message.chat.id;
  var text = content.message.text;
  var reply_id = content.message.message_id;
  var request_id = content.message.update_id;

  if (allowedChats.includes(chat_id)) {
      var response = reply(text);
      if (response[0] == "text") {
        sendMsg(chat_id, response[1], reply_id); 
      }
      else if (response[0] == "output") {
        sendOutput(chat_id, response[1], reply_id); 
      }
      else if (response[0] == "url") {
        sendPhoto(chat_id, response[1], reply_id); 
      }
      else if (response[0] == "binary") {
        sendBinaryPhoto(chat_id, response[1], reply_id);
      }
      else if (response[1] == "code") {
        
      }
  }
  else {
    sendMsg(chat_id, "You can only use this bot from @pyGuruDiscussion", reply_id); 
  }
}

function update_id(update_id){
  url = deleteUpdatesEndpoint + update_id.toString();
  response = JSON.parse(UrlFetchApp.fetch(deleteUpdatesEndpoint));
  return response;
}

var last_3_commands = [];

function doPost(e) {
  try {
    var content = JSON.parse(e.postData.contents);
    last_3_commands.push(content.message.text);

    if (last_3_commands.length > 3) {
      last_3_commands.shift();
    }

    if (last_3_commands.every(element => element === last_3_commands[0])) {
      deleteTelegramWebhook();
      Logger.log(update_id(content.update_id + 1));
      setTelegramWebhook();
    }

    reply_to_bot(content);
  }
  catch(e) {
    sendMsg(allowedChats[1], JSON.stringify(e), -1);
  }
}
