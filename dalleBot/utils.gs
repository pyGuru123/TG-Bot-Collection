const ipReset = {
  reset : false
}

const allowedChats = [-1001439600000, 704640000];

function processCommand(text, command) {
  var processedText = text.substring(command.length).trim();
  if (processedText.includes("@pyguruttBot")) {
      var processedText = processedText.substring('/@pygurutBot'.length).trim();
  }
  return processedText
}

function reply(text, chat_id, reply_id){
  if (text.startsWith('/dalle')) {
    text = processCommand(text, "/dalle");
    if (text.replace(/\s/g, '') == "") {
      return ["info", "Enter a prompt for image generation. Ex:\n/dalle Imagine lush green forest, fern trees, orange leaves, autumn."]
    }
    var catRes = sendPhoto(chat_id, "https://http.cat/102.jpg", reply_id);
    var response = generateImage(text);
    deleteMsg(chat_id, catRes.result.message_id);
    return response;
  }

  else if (text.startsWith('/about@pyguruttBot')) {
    return ["text", "pyBot is the official bot for @pyguru channel and is created by @itspyguru."]
  }
}