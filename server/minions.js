const express = require('express');
const { getAllFromDatabase, getFromDatabaseById } = require('./db');
const router = express.Router();

// GET all minions
router.get('/', (req, res) => {
  const minions = getAllFromDatabase('minions');
  res.status(200).send(minions);
});

// GET a single minion by id
router.get('/:minionId', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if (minion) {
      res.status(200).send(minion);
    } else {
      res.status(404).send();
    }
  });
  
module.exports = router;


