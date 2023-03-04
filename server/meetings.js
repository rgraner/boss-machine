const express = require('express');
const { 
    getAllFromDatabase, 
    addToDatabase,
    createMeeting,
    deleteFromDatabasebyId, 
} = require('./db');
const meetingsRouter = express.Router();

// GET all meetings
meetingsRouter.get('/', (req, res) => {
  const meetings = getAllFromDatabase('meetings');
  res.status(200).send(meetings);
});

// POST /api/meetings to create a new meeting and save it to the database
meetingsRouter.post('/', (req, res) => {
  const newMeeting = createMeeting();
  addToDatabase('meetings', newMeeting);
  res.status(201).send(newMeeting);
});

// DELETE /api/meetings/:meetingId to delete a single meeting by id
meetingsRouter.delete('/:meetingId', (req, res) => {
    const meetingId = req.params.meetingId;
    const success = deleteFromDatabasebyId('meetings', meetingId);
    if (success) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }

})

module.exports = meetingsRouter;


