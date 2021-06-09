const { dynamoose } = require('../services/aws');

dynamoose.setDefaults({ create: false, waitForActive: false });

const { Schema } = dynamoose;

const MoviesSchema = new Schema({
  id: { type: String, require: true, hashkey: true },
  title: { type: String, require: true },
  year: { type: Number, require: true },
  rate: { type: Number, require: true },
});

module.exports = dynamoose.model(`${process.env.SERVICE}-${process.env.STAGE}-movies`, MoviesSchema);
