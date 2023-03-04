const express = require('express');
const { 
    getAllFromDatabase, 
    getFromDatabaseById, 
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId, 
} = require('./db');
const minionsRouter = express.Router();

// GET all minions
minionsRouter.get('/', (req, res) => {
  const minions = getAllFromDatabase('minions');
  res.status(200).send(minions);
});

// GET a single minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if (minion) {
      res.status(200).send(minion);
    } else {
      res.status(404).send();
    }
  });

// POST /api/minions to create a new minion and save it to the database
minionsRouter.post('/', (req, res) => {
  const newMinion = req.body;
  const minion = addToDatabase('minions', newMinion);
  res.status(201).send(minion);
});

// PUT /api/minions/:minionId to update a single minion by id
minionsRouter.put('/:minionId', (req, res) => {
    const minionId = req.params.minionId;
    const updatedMinion = req.body;
    const minions = getAllFromDatabase('minions');
  
    // Find the minion to update
    const minionIndex = minions.findIndex((minion) => minion.id === minionId);
    if (minionIndex === -1) {
      // Minion not found
      res.status(404).send();
      return;
    }
    // Update the minion
    const newMinion = { ...minions[minionIndex], ...updatedMinion };
    updateInstanceInDatabase('minions', newMinion);
    res.status(200).send(newMinion);
  });

// DELETE /api/minions/:minionId to delete a single minion by id
minionsRouter.delete('/:minionId', (req, res) => {
    const minionId = req.params.minionId;
    const success = deleteFromDatabasebyId('minions', minionId);
    if (success) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }

})

module.exports = minionsRouter;


