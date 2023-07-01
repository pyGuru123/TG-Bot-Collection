const webhookUrl = "https://script.google.com/macros/s/AKfycbwgElODk************************************/exec";

function setTelegramWebhook() {
  var url = setWebhookEndpoint + webhookUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function deleteTelegramWebhook() {
  var response = UrlFetchApp.fetch(delWebhookEndpoint);
  Logger.log(response.getContentText());
}

function sendMsg(chat_id, msg, reply_id) {
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify({
      "chat_id": chat_id,
      "text": msg,
      "reply_to_message_id": reply_id,
    }),
  };

  var response = UrlFetchApp.fetch(sendMsgEndpoint, options);
  Logger.log(response.getContentText());
}

function sendImaginePhoto(chat_id, photo, reply_id, caption="") {
  var options = {
    "method": "post",
    "muteHttpExceptions": true,
    "payload": {
      "chat_id": `${chat_id}`,
      'photo':photo,
      "reply_to_message_id": reply_id,
      "caption": caption
   }
  };

    var response = UrlFetchApp.fetch(sendPhotoEndpoint, options);
    Logger.log(response.getContentText())
}

function sendPhoto(chat_id, url, reply_id, caption="") {
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify({
      "chat_id": chat_id,
      'photo': url,
      "reply_to_message_id": reply_id,
      "caption": caption
    }),
  };

  var response = JSON.parse(UrlFetchApp.fetch(sendPhotoEndpoint, options));
  return response
}

function deleteMsg(chat_id, msg_id) {
  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      chat_id: chat_id,
      message_id: msg_id
    })
  };

  UrlFetchApp.fetch(delMsgEndpoint, options);
}

function reply_to_bot(content) {
  var chat_id = content.message.chat.id;
  var text = content.message.text;
  var reply_id = content.message.message_id;

  if (allowedChats.includes(chat_id)) {
      var response = reply(text, chat_id, reply_id);

      if (response[0] == "text") {
        // sendPhoto(chat_id, "https://http.cat/400.jpg", reply_id, caption=response[1])
        sendMsg(chat_id, response[1], reply_id);
      }
      else if (response[0] == "url") {
        sendPhoto(chat_id, response[1], reply_id); 
      }
      else if (response[0] == "content") {
        sendImaginePhoto(chat_id, response[1], reply_id)
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

function doPost(e) {

  try {
    var content = JSON.parse(e.postData.contents);
    Logger.log(update_id(content.update_id + 1));
    reply_to_bot(content);
  }
  catch(e) {
    Logger.log("Error: " + error);
    Logger.log(update_id(content.update_id + 1));
    sendMsg(allowedChats[1], JSON.stringify(e), -1);
  }
}
