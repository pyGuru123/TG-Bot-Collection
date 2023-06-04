function execute_python(code) {
  lines = code.split("\n")
  if (lines[lines.length-1].startsWith("  ")) {
      code = code + "\n"
  }

  var payload = {
    "input" : code + "\n"
  };

  var headers = {
    "Authorization": "Token " + pythonAnywhereToken
  };

  var inputOptions = {
    "method": "post",
    "contentType": "application/json",
    "headers": headers,
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  Logger.log(inputOptions);

  var outputOptions = {
    "method": "get",
    "headers": headers,
    "muteHttpExceptions": true
  }

  var input = JSON.parse(UrlFetchApp.fetch(codeInputEndpoint, inputOptions));
  var outputResponse = JSON.parse(UrlFetchApp.fetch(codeOutputEndpoint, outputOptions));
  var output = outputResponse["output"].split(">>>")
  var output = output[output.length-2]
  return ["text", output.trimStart()];
}

function testCode() {
  var python_code = `
# Your Python code goes here
print("hello world")`
  execute_python(python_code)
}
