const webhookUrl = "https://script.google.com/macros/s/AKfycbwIegP_jzPaNLbM62k1HWgynzvjsE5wVgeOHS8aE9krT0FFacgajPTVJuzjm4_9PnzS4g/exec";

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

function sendKeyboard(keyboard, text, chat_id, reply_id) {
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify({
      "chat_id": chat_id,
      "reply_markup": {"inline_keyboard": keyboard},
      "reply_to_message_id": reply_id,
      "text": `Search Result For : ${text}`
    }),
  };

  Logger.log(options);

  var response = UrlFetchApp.fetch(sendMsgEndpoint, options);
  Logger.log(response.getContentText());
}

function forward_message(chat_id, msg_id) {
  var payload = {
  method: "post",
  contentType: "application/json",
  payload: JSON.stringify({
      chat_id: chat_id,
      from_chat_id: moviesHubChatId,
      message_id: msg_id
    })
  };

  var response = UrlFetchApp.fetch(forwardEndpoint, payload);
  Logger.log(response.getContentText());
}

function reply_to_bot(content) {
  var chat_id = content.message.chat.id;
  var text = content.message.text;
  var reply_id = content.message.message_id;

  if (text == "/start") {
    sendMsg(chat_id, "Send movie name to search", -1)
  }
  // else if
  else if (chat_id.toString().startsWith("-100") == false) {
    var movies_found = fetch_movies(text);
    var keyboard = create_keyboard(movies_found);
    if (keyboard.length > 0) {
      sendKeyboard(keyboard, text, chat_id, reply_id);
    }
    else {
      sendMsg(chat_id, "No Movie Found", reply_id);
    }
  }
}

function reply_with_movie(content) {
  var msg_id = content.callback_query.data;
  var chat_id = content.callback_query.message.chat.id;
  forward_message(chat_id, parseInt(msg_id));
}

function doPost(e) {
  var content = JSON.parse(e.postData.contents);
  if (content.callback_query) {
    reply_with_movie(content);
  }
  else {
    reply_to_bot(content);
  }
}