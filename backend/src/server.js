import path from 'path';
import express from 'express';
// import 'dotenv/config';
import { db, connectToDb } from './db.js';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
// app.use(express.static(path.join(__dirname, '../build')));

// app.get(/^(?!\/api).+/, (req, res) => {
//     res.sendFile(path.join(__dirname, '../build/index.html'));
// })

app.get('/api/advisors', async (req, res) => {
    const articles = await db.collection('advisors')
      .find()
      .project({
        id: 1,
        name: 1,
        status: 1,
        language: 1,
        reviewNumber: 1,
      })
      .toArray();

    if (articles) {
        res.json(articles);
    } else {
      return res.sendStatus(400);
    }
});

const PORT = process.env.PORT || 8000;

connectToDb(() => {
    console.log('Successfully connected to database!');
    app.listen(PORT, () => {
        console.log('Server is listening on port ' + PORT);
    });
})