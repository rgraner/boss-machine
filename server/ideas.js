const express = require('express');
const { 
    getAllFromDatabase, 
    getFromDatabaseById, 
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId, 
} = require('./db');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');


// GET all ideas
ideasRouter.get('/', (req, res) => {
  const ideas = getAllFromDatabase('ideas');
  res.status(200).send(ideas);
});

// GET a single idea by id
ideasRouter.get('/:ideaId', (req, res) => {
    const idea = getFromDatabaseById('ideas', req.params.ideaId);
    if (idea) {
      res.status(200).send(idea);
    } else {
      res.status(404).send();
    }
  });

// POST /api/ideas to create a new idea and save it to the database
ideasRouter.post('/', checkMillionDollarIdea, (req, res) => {
  const newIdea = req.body;
  const idea = addToDatabase('ideas', newIdea);
  res.status(201).send(idea);
});

// PUT /api/ideas/:ideaId to update a single idea by id
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res) => {
    const ideaId = req.params.ideaId;
    
    const updatedIdea = req.body;
    const ideas = getAllFromDatabase('ideas');
  
    // Find the idea to update
    const ideaIndex = ideas.findIndex((idea) => idea.id === ideaId);
    if (ideaIndex === -1) {
      // Idea not found
      res.status(404).send();
      return;
    }
    // Update the idea
    const newIdea = { ...ideas[ideaIndex], ...updatedIdea };
    updateInstanceInDatabase('ideas', newIdea);
    res.status(200).send(newIdea);
  });

  ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res) => {
    const ideaId = req.params.ideaId;
  
    if (!Number.isInteger(Number(ideaId))) {
      // Idea ID is not numeric
      res.status(404).send();
      return;
    }
  
    const updatedIdea = req.body;
    const ideas = getAllFromDatabase('ideas');
  
    // Find the idea to update
    const ideaIndex = ideas.findIndex((idea) => idea.id === Number(ideaId));
    if (ideaIndex === -1) {
      // Idea not found
      res.status(404).send();
      return;
    }
  
    // Update the idea
    const newIdea = { ...ideas[ideaIndex], ...updatedIdea };
    updateInstanceInDatabase('ideas', newIdea);
    res.status(200).send(newIdea);
  });
  
// DELETE /api/ideas/:ideaId to delete a single idea by id
ideasRouter.delete('/:ideaId', (req, res) => {
    const ideaId = req.params.ideaId;
    const success = deleteFromDatabasebyId('ideas', ideaId);
    if (success) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }

})

module.exports = ideasRouter;

