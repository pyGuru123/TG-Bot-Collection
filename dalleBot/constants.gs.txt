const token = "6191390031:AAFUPXhKxwQ97ibSkql...................."
const sendMsgEndpoint = "https://api.telegram.org/bot" + token + "/sendMessage";
const sendPhotoEndpoint = 'https://api.telegram.org/bot' + token + '/sendPhoto';
const updatesEndpoint = "https://api.telegram.org/bot" + token + "/getUpdates";
const delMsgEndpoint = "https://api.telegram.org/bot" + token + "/deleteMessage";
const setWebhookEndpoint = "https://api.telegram.org/bot" + token + "/setWebhook?url=";
const delWebhookEndpoint = "https://api.telegram.org/bot" + token + "/deleteWebhook";

const dalleToken = "pk-gRxUfawvPQkLeqvXwxDHEXbMRu...................";
const dalleEndpoint = "https://api.pawan.krd/v1/images/generations";
const gptIPResetEndpoint = "https://api.pawan.krd/resetip";

function logConstants() {
  Logger.log(sendMsgEndpoint);
  Logger.log(updatesEndpoint);
  Logger.log(setWebhookEndpoint);
  Logger.log(delWebhookEndpoint)
}