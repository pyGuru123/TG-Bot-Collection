const ipReset = {
  reset : false
}

const allowedChats = [-1001439600000, 704600000];

function processCommand(text, command) {
  var processedText = text.substring(command.length).trim();
  if (processedText.includes("@pyguruttBot")) {
      var processedText = processedText.substring('/@pyguruttBot'.length).trim();
  }
  return processedText
}

function reply(text, chat_id, reply_id){

  if (text.startsWith("/imagine")) {
    text = processCommand(text, "/imagine");
    if (text.replace(/\s/g, '') == "") {
      return ["text", "Enter a prompt for image generation. Ex:\n/imagine lush green forest, fern trees, orange leaves, autumn."]
    }
    var catRes = sendPhoto(chat_id, "https://http.cat/102.jpg", reply_id);
    
    var regex = /#\w+/;
    var match = text.match(regex);
    if (match) {
        var style = match[0];
        var prompt = text.replace(style, "");
    }
    else {
        var style = "original";
        var prompt = text;
    }
    var response = imagine(prompt, style.replace("#",""));
    deleteMsg(chat_id, catRes.result.message_id);
    return response;
  }

  else if (text.startsWith("/styles")) {
    all_styles = styles()
    return ["text", all_styles.styles]
  }

  else if (text.startsWith('/about@pyguruttBot')) {
    return ["text", "pyBot is the official bot for @pyguru channel and is created by @itspyguru."]
  }

  return ["", ""];
}

function log_error(error) {
  sendMsg("704647574", error, -1)
}
