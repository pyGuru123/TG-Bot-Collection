const ipReset = {
  reset : false
}

const requests = {}

const allowedChats = [-1001439600000, 704640000];

function processCommand(text, command) {
  var processedText = text.substring(command.length).trim();
  if (processedText.includes("/@pygurutBot")) {
      var processedText = processedText.substring('/@pygurutBot'.length).trim();
  }
  return processedText
}

function reply(text){
  if (text.startsWith('/gpt')) {
    text = processCommand(text, '/gpt');
    if (text.replace(/\s/g, '') == "") {
      return ["text", "Enter prompt to search ChatGPT. Ex:\n/gpt tell me a cat joke"]
    }
    try{
      return searchGPT(text);
    }
    catch (error) {
      return ["text", "Failed. Try asking the same question again."]
    }
  }

  else if (text.startsWith('/claude')) {
    text = processCommand(text, '/claude');
    if (text.replace(/\s/g, '') == "") {
      return ["text", "Enter prompt to search Claude. Ex:\n/claude write a 4 line poem in cat language"]
    }
    try{
      return searchClaude(text);
    }
    catch (error) {
      return ["text", "Failed. Try asking this question to gpt."]
    }
  }

  else if (text.startsWith('/bard')) {
    text = processCommand(text, '/bard');
    if (text.replace(/\s/g, '') == "") {
      return ["text", "Enter prompt to search Bard. Ex:\n/bard write a short story on a cat."]
    }
    try{
      return searchBard(text);
    }
    catch (error) {
      Logger.log(error);
      return ["text", "Failed. Try asking this question to gpt."]
    }
  }

  else if (text.startsWith('/q')) {
    text = processCommand(text, '/q');
    if (text.replace(/\s/g, '') == "") {
      return ["text", "Ask a question. Ex:\n/q How many moons solar system have?"]
    }
    try {
      return wolframalpha(text);
    }
    catch (error) {
      return ["text", "Ask this question to gpt instead!"]
    }
    
  }

  else if (text.startsWith('/runpy')) {
    var processedText = text.substring('/runpy'.length).trim();
    var input = processedText.replace(/\u00A0/g, ' ');
    return execute_python(input.trim("\n"));
  }

  else if (text.startsWith('/cat')){
    return getCatImage()
  }

  else if (text.startsWith('/about')) {
    return ["text", "pyBot is the official bot for @pyguru channel and is created by @itspyguru."]
  }
}