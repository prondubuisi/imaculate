const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Event = require('../models/event');
const checkAuth = require('../middleware/check-auth');
const Event_controller = require('../controllers/events')

router.get('/', checkAuth, Event_controller.get_events);

router.post('/', checkAuth, Event_controller.post_event );

router.get('/:eventId', checkAuth, (req, res, next) => {
    const id = req.params.eventId;
    Event.findById(id)
    .select("title description price date creator _id")
    .exec()
    .then(doc => {
        if (doc) {
            res.status(200).json({
                event: doc,
                request: {
                    type: "PATCH, DELETE",
                    url: "http://localhost:4000/events/" + doc._id
                }
            });
        } else {
            res.status(404)
            .json({
                message: "No valid entry found for Event"
            });
        }
    })
    .catch(err => {
        res.status(500).json({ error: err});
    });
        
});

router.patch('/:eventId', checkAuth, (req, res, next) => {
    const id = req.params.eventId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Event.update({ _id: id}, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Event updated successfully',
                request: {
                    type: "GET, PATCH, DELETE",
                    url: "http://localhost:4000/events/" + id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:eventId', checkAuth, (req, res, next) => {
    const id = req.params.eventId;
    Event.remove({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Event deleted successfully',
                request: {
                    type: "POST",
                    url: "http://localhost:4000/events/",
                    body: {
                        title: 'String',
                        description: 'String',
                        price: 'String',
                        date: 'String',
                        creator: 'String'}
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;