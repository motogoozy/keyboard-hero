require('dotenv').config();
const express = require('express');
const massive = require('massive');

const { SERVER_PORT, CONNECTION_STRING } = process.env;

// SERVER
const app = express();

// app.use( express.static( `${__dirname}/../build` ) );

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
app.get(`/api/paragraph/:paragraphId`, async (req, res) => {
   const { paragraphId } = req.params;
   const db = req.app.get('db');
   const paragraphText = await db.get_paragraph({ paragraph_id: paragraphId });
   res.status(200).send(paragraphText);
})