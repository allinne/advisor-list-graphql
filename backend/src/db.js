import { MongoClient } from 'mongodb';
import 'dotenv/config';

const env = process.env;

const localMongoDbUri = 'mongodb://localhost:27017';

let db;
let connectedClient;
const DATABASE_NAME = env.DEV ? 'local' : env.DATABASE_NAME;
export const MONGODB_URI =
  env.DEV ?
    localMongoDbUri :
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@advisors.rhodgks.mongodb.net`;

async function connectToDb(cb) {
  if (connectedClient) {
    cb();
    return;
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  connectedClient = client;
  db = client.db(DATABASE_NAME);
  cb();
}

const disconnectFromDb = async () => {
  await connectedClient.close();
};

export {
    db,
    connectToDb,
    disconnectFromDb
};
