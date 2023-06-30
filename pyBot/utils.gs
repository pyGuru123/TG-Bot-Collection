const ipReset = {
  reset : false
}

const requests = {}

const allowedChats = [-1001439600000, 704600000];

function processCommand(text, command) {
  var processedText = text.substring(command.length).trim();
  if (processedText.includes("@pygurutBot")) {
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
      var response = searchGPT(text);
      if (response.includes("python") && response.includes("```")) {
        return ["code", response[1]];
      }

      return response;
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
    if (text.replace(/\s/g, '') == "") {
      return ["text", "Enter prompt to search Bard. Ex:\n/bard why does cats meow?"]
    }

    try{
      return searchBard(text);
    }
    catch (error) {
      Logger.log(error);
      return ["text", "Failed. Try asking this question to gpt."]
    }
  }

  else if (text.startsWith('/runpy')) {
    var text = processCommand(text, '/runpy');
    if (text.replace(/\s/g, '') == "") {
      return ["text", "write some python code to execute"]
    }
    var text = text.replace(/\u00A0/g, ' ');
    return ["output", `${execute(text)}`];
  }

  else if (text.startsWith('/plot')) {
    var text = processCommand(text, '/plot');
    if (text.replace(/\s/g, '') == "") {
      return ["text", "write some graph code (numpy&matplotlib) to plot"]
    }
    var text = text.replace(/\u00A0/g, ' ');
    var response =  plot_graph(text);
    return response;
  }

  if (text.startsWith("/render")) {
    text = processCommand(text, "/render");
    if (text.replace(/\s/g, '') == "") {
      return ["text", "Write some python code to render. Ex:\n/render print('hello world')"]
    }

    var regex = /--\S+/g;
    var match = regex.exec(text) 
    if (match) {
        var theme = match[0];
        var code = text.replace(theme, "");
    }
    else {
        var theme = "dark-plus";
        var code = text;
    }
    
    return render_code(code, theme.replace("--",""));
  }

  else if (text.startsWith('/themes')){
    return get_themes();
  }

  else if (text.startsWith('/cat')){
    return getCatImage()
  }

  else if (text.startsWith('/about')) {
    return ["text", about_text]
  }

  return ["", ""];
}
