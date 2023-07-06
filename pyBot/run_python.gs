function execute(code) {
  var payload = {
    "code" : code,
  };

  var inputOptions = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  var response = JSON.parse(UrlFetchApp.fetch(coderunnerEndpoint, inputOptions));
  Logger.log(response);
  try {
      return response.output;
  }
  catch(e) {
     return response.error;
  }
}

function plot_graph(code) {
  var payload = {
    "code" : code,
  };

  var inputOptions = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  var response = UrlFetchApp.fetch(graphplotEndpoint, inputOptions);
  try {
      jsonResponse = JSON.parse(response);
      return ["text", jsonResponse.error];
  }
  catch(e) {
    try{
        return ["binary", response.getBlob()];
    }
    catch(e) {
      return ["text", e]
    }
  }
}


function paste_code(code, title) {
  var payload = {
    "code" : code,
    "title": title
  };

  var inputOptions = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  Logger.log(inputOptions);

  var response = JSON.parse(UrlFetchApp.fetch(pasteEndpoint, inputOptions));
  try {
    return ["paste", response.output];
  }
  catch(e) {
    return ["text", str(e)];
  }
}


function render_code(code, theme) {
  var payload = {
    "code" : code,
    "theme": theme
  };

  var inputOptions = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  var response = UrlFetchApp.fetch(renderEndpoint, inputOptions);
  if (response.getResponseCode() == 200) {
    return ["binary", response.getBlob()];
  }
  else {
    response = JSON.parse(response);
    return ["text", response.detail];
  }
}

function get_themes(){
  try{
      var response = JSON.parse(UrlFetchApp.fetch(renderThemeEndpoint));
      return ["output", response];
  }
  catch(e) {
      return ["text", e];
  }
}

function testCode() {
  var python_code = `
# Your Python code goes here
x = [1,2,3]
y = [1, 4, 9]
plt.plot(x, y)`
  Logger.log(plot_graph(python_code))
}


function extractCodeFromBackticks(str) {
  const regex = /```([\s\S]+?)```/g;
  const matches = str.match(regex);

  if (matches) {
    const codeBlocks = matches.map(match => match.replace(/```/g, ''));
    return codeBlocks;
  }

  return [];
}
