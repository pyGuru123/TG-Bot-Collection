const token = "6290082613:AAGV48uxncvhgfghdgfdgfdoDAeFy8g"
const sendMsgEndpoint = "https://api.telegram.org/bot" + token + "/sendMessage";
const sendPhotoEndpoint = 'https://api.telegram.org/bot' + token + '/sendPhoto';
const updatesEndpoint = "https://api.telegram.org/bot" + token + "/getUpdates";
var forwardEndpoint = "https://api.telegram.org/bot" + token + "/copyMessage";
const delMsgEndpoint = "https://api.telegram.org/bot" + token + "/deleteMessage";
const isMemberEndpoint = 'https://api.telegram.org/bot' + token + '/getChatMember?';
const setWebhookEndpoint = "https://api.telegram.org/bot" + token + "/setWebhook?url=";
const delWebhookEndpoint = "https://api.telegram.org/bot" + token + "/deleteWebhook";


const restrictedChats = [-1001439604894, 704647574];
const moviesHubChatId = -1001986840647;

const endpoint = "https://ap-south-1.aws.data.mongodb-api.com/app/data-jalma/endpoint/data/v1/action/find";
var updateEndpoint = "https://ap-south-1.aws.data.mongodb-api.com/app/data-dhuwo/endpoint/data/v1/action/updateOne"
const apikey = "AgMVGmgU5xh6ontZO3HvWOlegfgdgfdfsfdsdsadsadsanYRG1FMqjva";

const connection_string = "mongodb+srv://movieshubm:hgfghfhgfhgfghfhgfhgfhgfgfdfsfdsdsd=true&w=majority"
const database = "movieshub"
const collection = "Movies"

function logConstants() {
  Logger.log(sendMsgEndpoint);
  Logger.log(updatesEndpoint);
  Logger.log(setWebhookEndpoint);
  Logger.log(delWebhookEndpoint)
}