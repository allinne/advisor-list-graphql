import mongoose from 'mongoose';
import { MONGODB_URI } from '../db.js';

const env = process.env;
const COLLECTION_NAME = env.DEV ? 'local' : env.COLLECTION_NAME;

mongoose.Promise = global.Promise;
mongoose.connect(`${MONGODB_URI}/${COLLECTION_NAME}`, {
  useNewUrlParser: true
});

const advisorSchema = new mongoose.Schema({
  name: {
    type: String
  },
  status: {
    type: Number
  },
  language: {
    type: String
  },
  reviewNumber: {
    type: Number
  },
});

const Advisor = mongoose.model('Advisor', advisorSchema);

export { Advisor };
