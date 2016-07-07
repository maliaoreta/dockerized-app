'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const pgp = require('pg-promise')();
const DB_CONN = process.env.DB_CONN || 'postgres://malia:password@localhost:5432/demo_app_server';

var db = pgp(DB_CONN);


app.get('/api/counters', (req, res) => 
  db.many('select * from counter')
    .then( data => res.json(data) )
    .catch( err => res.send(err) )
  );

app.get('/api/counter/:id', (req, res) => 
  db.one(`select * from counter where id = ${parseInt(req.params.id)}`)
    .then( data => res.json(data) )
    .catch( err => res.send(err) )
  );

app.get('/api/counter/:id/increment', (req, res) =>
  db.one(`select * from counter where id = ${parseInt(req.params.id)}`)
    .then( data => db.query(`update counter SET value = ${data.value + 1} where id = ${data.id}`) )
    .then( data => res.json({ updated: 1 }) )
    .catch( err => res.send(err) )
  );

app.get('/api/counter/:id/decrement', (req, res) =>
  db.one(`select * from counter where id = ${parseInt(req.params.id)}`)
    .then( data => db.query(`update counter SET value = ${data.value - 1} where id = ${data.id}`) )
    .then( data => res.json({ updated: 1 }) )
    .catch( err => res.send(err) )
  );

app.listen ( PORT );
