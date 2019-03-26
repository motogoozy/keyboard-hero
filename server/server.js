require('dotenv').config();
const express = require('express');
const massive = require('massive');

const { SERVER_PORT, CONNECTION_STRING } = process.env;

// SERVER
const app = express();

app.use( express.static( `${__dirname}/../build` ) ); //pointing server to front end static files

// MIDDLEWARE
app.use(express.json());

// DATABASE CONNECTION
massive(CONNECTION_STRING).then(db => {
   app.set('db', db)
      console.log(('Connected to database'))
   app.listen(SERVER_PORT, () => {
      console.log(`Listening on port: ${SERVER_PORT}`)
   })
})

// ENDPOINTS

// Get paragraph
app.get(`/api/paragraph/:paragraph_id`, async (req, res) => {
   const { paragraph_id } = req.params;
   const db = req.app.get('db');
   const paragraphText = await db.get_paragraph({ paragraph_id });
   res.status(200).send(paragraphText);
})

// Add score
app.post(`/api/score`, async (req, res) => {
   const { name, score } = req.body;
   const db = req.app.get('db');
   const added = await db.add_score({ name, score });
   res.status(200).send({ message: 'score added' })
})

// Get all scores
app.get('/api/score', async (req, res) => {
   const db = req.app.get('db');
   const scores = await db.get_scores();
   res.status(200).send(scores)
})