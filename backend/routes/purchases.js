var express = require('express');
var router = express.Router();

// Model
var Event = require('../models/Event');
var User = require('../models/User');
var Purchase = require('../models/Purchase');

router.post('/buyTicket', function (req, res) {
    User.findById(req.user.id, function (errUser, user) {
        if (errUser) {
            res.status(401).send('Please login to purchase tickets!');
        }
        if (!user) {
            res.status(401).send('Please login to purchase tickets!');
        }

        Event.findById(req.body.eventID, function (errEvent, event) {
            if (errEvent) {
                res.status(401).send('No event found!');
            }
            if (!event) {
                res.status(401).send('No event found!');
            }

            Purchase.create(
                {
                    userID: user._id,
                    userName: user.username,
                    pNo: user.pNo,
                    email: user.email,
                    eventID: event._id,
                    eventName: event.name,
                    location: event.location,
                    eventDate: event.eventDate,
                    ticketAmount: req.body.amount,
                    ticketPrice: event.price,
                    purchaseDate: new Date()
                },
                function (err, purchase) {
                    if (err) {
                        return res.status(500).send('Purchase error!');
                    }
                    else {
                        return res.status(200).send(purchase);
                    }
                }
            );
        });
    });
});

router.get('/getPurchasesHistory', function (req, res) {
    Purchase.find(
        {
            userID: req.user.id
        }
    ).sort(
        {
            purchaseDate: 'descending'
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

router.post('/getSales', function (req, res) {
    Purchase.find(
        {
            eventID: req.body.eventID
        }
    ).sort(
        {
            purchaseDate: 'descending'
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

router.delete('/deleteByUser/:id', (req, res) => {
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
                Purchase.deleteMany(
                    {
                        userID: id
                    },
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

router.delete('/deleteByEvent/:id', (req, res) => {
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
                Purchase.deleteMany(
                    {
                        eventID: id
                    },
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

module.exports = router;