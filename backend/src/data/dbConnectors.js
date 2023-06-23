import mongoose from 'mongoose';
import { MONGODB_URI } from '../db.js';

mongoose.Promise = global.Promise;
mongoose.connect(`${MONGODB_URI}/local`, {
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

const Advisors = mongoose.model('Advisors', advisorSchema);

export { Advisors };
