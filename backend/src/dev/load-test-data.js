import { db, connectToDb, disconnectFromDb } from '../db.js';
import { faker } from '@faker-js/faker';

const LANGUAGES = ['English', 'German', 'Spanish'];

async function main() {

  await db.collection("advisors").deleteMany({});

  const list = [];
  for (let i = 0; i < 200; i++) {
    list.push({
      id: faker.database.mongodbObjectId(),
      name: faker.person.fullName(),
      status: faker.number.int({ min: 1, max: 2}),
      language: LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)],
      reviewNumber: faker.number.int({ min: 10, max: 1000})
    })
  }

  const resp = await db.collection("advisors").insertMany(list);

  console.info("Inserted advisors:", resp.insertedCount);

  disconnectFromDb();
}

connectToDb(() => {
  console.log('Successfully connected to database!');
  main();
});
