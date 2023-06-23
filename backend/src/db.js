import { MongoClient } from 'mongodb';
const env = process.env;

let db;
let connectedClient;
const DATABASE_NAME = env.DATABASE_NAME ?? "local";
export const MONGODB_URI =
  env.MONGODB_URI ?? "mongodb://localhost:27017";

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
