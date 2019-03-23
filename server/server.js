require('dotenv').config();
const express = require('express');
const massive = require('massive');

const { SERVER_PORT, CONNECTION_STRING } = process.env;

// SERVER
const app = express();

app.use( express.static( `${__dirname}/../build` ) );

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
app.get(`/api/paragraph/:paragraph_id`, async (req, res) => {
   const { paragraph_id } = req.params;
   const db = req.app.get('db');
   const paragraphText = await db.get_paragraph({ paragraph_id });
   res.status(200).send(paragraphText);
})