const https = require('https');
const AWS = require('aws-sdk');
const dynamoose = require('dynamoose');

const sslAgent = new https.Agent({ keepAlive: true, rejectUnauthorized: true });

AWS.config.update({ region: process.env.REGION, httpOptions: { agent: sslAgent } });

dynamoose.setDDB(new AWS.DynamoDB());
dynamoose.setDefaults({ create: false, waitForActive: false });
dynamoose.AWS.config.update({ region: process.env.REGION, httpOptions: { agent: sslAgent } });

module.exports = { dynamoose };
