var express = require('express');
var router = express.Router();

// Model
var Event = require('../models/Event');
var User = require('../models/User');

router.post('/addEvent', function (req, res) {
    User.findById(req.user.id, function (errUser, user) {
        if (errUser) {
            res.status(401).send('Invalid token');
        }
        if (!user) {
            res.status(401).send('Invalid token');
        }
        else {
            if (user.type === 1) {
                Event.create(
                    {
                        name: req.body.name,
                        description: req.body.description,
                        location: req.body.location,
                        registStart: req.body.registStart,
                        registEnd: req.body.registEnd,
                        eventDate: req.body.eventDate,
                        imageURL: req.body.imageURL
                    },
                    function (err, data) {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        else {
                            return res.status(200).send(data);
                        }
                    }
                );
            }
        }
    });
});

router.get('/getEvent', function (req, res) {
    User.findById(req.user.id, function (errUser, user) {
        if (errUser) {
            res.status(401).send('Invalid token');
        }
        if (!user) {
            res.status(401).send('Invalid token');
        }
        else {
            if (user.type === 1) {
                Event.findById(
                    req.body.eventId,
                    function (err, data) {
                        if (err) {
                            res.status(500).json(err);
                        }
                        else {
                            res.status(200).json(data);
                        }
                    }
                );
            }
        }
    });
});

router.get('/getEvents', function (req, res) {
    Event.find(
        {}
    ).sort(
        {
            eventDate: 'descending'
        }
    ).exec(
        function (err, data) {
            if (err) {
                res.status(500).json(err);
            }
            else {
                res.status(200).json(data);
            }
        }
    );
});

router.get('/getUpcomingEvents', function (req, res) {
    Event.find(
        {
            eventDate: { $gte: new Date() }
        }
    ).sort(
        {
            eventDate: 'ascending'
        }
    ).exec(
        function (err, data) {
            if (err) {
                res.status(500).json(err);
            }
            else {
                res.status(200).json(data);
            }
        }
    );
});

module.exports = router;