const webhookUrl = "https://script.google.com/macros/s/AKfycbzBM-XUmHPhyAR-2XQGK87oCQvs-.......................................Q/exec";

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

  var response = JSON.parse(UrlFetchApp.fetch(sendPhotoEndpoint, options));
  Logger.log(response);
  return response;
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

function sendMail(content) {
  var message = JSON.stringify(content, null, 4);
  GmailApp.sendEmail(Session.getEffectiveUser().getEmail(), "Telegram Bot Update " + chat_id, message);
}

function reply_to_bot(content) {
  var chat_id = content.message.chat.id;
  var text = content.message.text;
  var reply_id = content.message.message_id;

  if (allowedChats.includes(chat_id)) {
      var response = reply(text, chat_id, reply_id);
      if (response[0] == "text") {
        sendPhoto(chat_id, "https://http.cat/400.jpg", reply_id)
        sendMsg(allowedChats[1], response[1], 31);
      }
      else if (response[0] == "info") {
        sendMsg(chat_id, response[1], reply_id);
      }
      else if (response[0] == "url") {
        sendPhoto(chat_id, response[1], reply_id); 
      }
  }
  else {
    sendMsg(chat_id, "You can only use this bot from @pyGuruDiscussion", reply_id); 
  }
}

function doPost(e) {
  var content = JSON.parse(e.postData.contents);
  reply_to_bot(content); 
}