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
    `mongodb+srv://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${env.MONGO_INSTANCE}`;

async function connectToDb(cb) {
  if (connectedClient) {
    cb();
    return;
  }

  const client = new MongoClient(MONGODB_URI);
  console.log(MONGODB_URI)
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
