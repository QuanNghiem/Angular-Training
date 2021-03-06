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
                        eventDate: req.body.eventDate,
                        imageURL: req.body.imageURL,
                        price: req.body.price
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

router.post('/getEvent', function (req, res) {
    Event.findById(
        req.body.eventID,
        function (err, data) {
            if (err) {
                res.status(500).json(err);
            }
            else {
                res.status(200).send(data);
            }
        }
    );
});

router.get('/getEvents', function (req, res) {
    Event.find(
        {}
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

router.delete('/deleteEvent/:id', (req, res) => {
    User.findById(req.user.id, function (errUser, user) {
        if (errUser) {
            res.status(401).send('Invalid token');
        }
        if (!user) {
            res.status(401).send('Invalid token');
        }
        else {
            if (user.type === 1) {
                var id = req.params.id;
                Event.findByIdAndDelete(id,
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

router.put('/updateEvent', function (req, res) {
    User.findById(req.user.id, function (errUser, user) {
        if (errUser) {
            res.status(401).send('Invalid token');
        }
        if (!user) {
            res.status(401).send('Invalid token');
        }
        else {
            if (user.type === 1) {
                Event.findByIdAndUpdate(
                    { "_id": req.body._id },
                    {
                        $set:
                        {
                            name: req.body.name,
                            description: req.body.description,
                            location: req.body.location,
                            eventDate: req.body.eventDate,
                            imageURL: req.body.imageURL,
                            price: req.body.price
                        }
                    },
                    { upsert: false },
                    function (err, data) {
                        if (err) {
                            res.status(500).send(err);
                        }
                        else {
                            res.send({ status: true });
                        }
                    }
                )
            }
        }
    });
});

module.exports = router;