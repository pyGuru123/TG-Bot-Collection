const token = "5830914299:AAEyaoz_yGrTz..............."
const sendMsgEndpoint = "https://api.telegram.org/bot" + token + "/sendMessage";
const sendPhotoEndpoint = 'https://api.telegram.org/bot' + token + '/sendPhoto';
const updatesEndpoint = "https://api.telegram.org/bot" + token + "/getUpdates";
const setWebhookEndpoint = "https://api.telegram.org/bot" + token + "/setWebhook?url=";
const delWebhookEndpoint = "https://api.telegram.org/bot" + token + "/deleteWebhook";

const gptToken = "pk-PqVKRIqQYqRDcsFfhTTqYAqT.....................";
const dalleToken = "pk-gRxUfawvPQkLeqvXwxDHE.......................";
const gptEndpoint = "https://api.pawan.krd/v1/chat/completions";
const dalleEndpoint = "https://api.pawan.krd/v1/images/generations";
const gptIPResetEndpoint = "https://api.pawan.krd/resetip";

const pythonAnywhereToken = "73ebf44a1d2952c0b.............................";
const pythonAnywhereUsername = 'ppa....35';
const codeInputEndpoint = `https://www.pythonanywhere.com/api/v0/user/${pythonAnywhereUsername}/consoles/2888...../send_input/`;
const codeOutputEndpoint = `https://www.pythonanywhere.com/api/v0/user/${pythonAnywhereUsername}/consoles/2888...../get_latest_output/`;

const hackerEarthClientId = "e83b36d8e4e80410240d21...................8d2155.api.hackerearth.com";
const hackerEarthSecretKey = "40179a25734e578532a.................498e81";

const catApiToken = "live_15wFdj6RcUJfHgJj8II8dTC5RejdX1cPO.....................9u5itfkkG";
const catApiEndpoint = "https://api.thecatapi.com/v1/images/search?format=json";

const wolframAlphaToken = "LJ47VE-8YE4.....HX";
const wolframAlphaEndpoint = `http://api.wolframalpha.com/v1/result?appid=${wolframAlphaToken}&i=`

function logConstants() {
  Logger.log(sendMsgEndpoint);
  Logger.log(updatesEndpoint);
  Logger.log(setWebhookEndpoint);
  Logger.log(delWebhookEndpoint)
}