'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const pgp = require('pg-promise')();
const DB_CONN = process.env.DB_CONN || 'postgres://malia:password@localhost:5432/demo_app_server';

var db = pgp(DB_CONN);

db.many('select * from counter')
  .then( (data) => console.log(data) )
  .catch( (err) => console.error(err) );


let counter = { count: 0 };

app.get('/api/counter', (req, res) => res.json(counter) );
app.get('/api/counter/increment', (req, res) => { counter.count++; res.json(counter); } );
app.get('/api/counter/decrement', (req, res) => { counter.count--; res.json(counter); } );

app.listen ( PORT );
