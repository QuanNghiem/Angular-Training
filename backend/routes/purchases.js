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
                    purchaseDate: new Date(),
                    updatedOn: new Date(),
                    updatedBy: user.username,
                    deleteFlag: false
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

router.put('/markForDelete', function (req, res) {
    User.findById(req.user.id, function (errUser, user) {
        if (errUser) {
            res.status(401).send('Invalid token');
        }
        if (!user) {
            res.status(401).send('Invalid token');
        }
        else {
            if (user.type === 1) {
                Purchase.findByIdAndUpdate(
                    req.body._id,
                    {
                        $set:
                        {
                            updatedOn: new Date(),
                            updatedBy: user.username,
                            deleteFlag: true
                        }
                    },
                    { upsert: true },
                    function (err, data) {
                        if (err) {
                            console.log(err);
                            res.status(500).send(err);
                        }
                        if (!data) {
                            res.status(500).send({ status: false });
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

router.put('/removeMarkForDelete', function (req, res) {
    User.findById(req.user.id, function (errUser, user) {
        if (errUser) {
            res.status(401).send('Invalid token');
        }
        if (!user) {
            res.status(401).send('Invalid token');
        }
        else {
            if (user.type === 1) {
                Purchase.findByIdAndUpdate(
                    req.body.eventID,
                    {
                        $set:
                        {
                            updatedOn: new Date(),
                            updatedBy: user.username,
                            deleteFlag: false
                        }
                    },
                    { upsert: true },
                    function (err, data) {
                        if (err) {
                            console.log(err);
                            res.status(500).send(err);
                        }
                        if (!data) {
                            res.status(500).send({ status: false });
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

// router.put('/markForDeleteEvent', function (req, res) {
//     User.findById(req.user.id, function (errUser, user) {
//         if (errUser) {
//             res.status(401).send('Invalid token');
//         }
//         if (!user) {
//             res.status(401).send('Invalid token');
//         }
//         else {
//             if (user.type === 1) {
//                 Purchase.updateMany(
//                     { "eventID": req.body.eventID },
//                     {
//                         $set:
//                         {
//                             updatedOn: new Date(),
//                             updatedBy: user.username,
//                             deleteFlag: true
//                         }
//                     },
//                     { upsert: true },
//                     function (err, data) {
//                         if (err) {
//                             console.log(err);
//                             res.status(500).send(err);
//                         }
//                         if (!data) {
//                             res.status(500).send({ status: false });
//                         }
//                         else {
//                             res.send({ status: true });
//                         }
//                     }
//                 )
//             }
//         }
//     });
// });

// router.put('/markForDeleteUser', function (req, res) {
//     User.findById(req.user.id, function (errUser, user) {
//         if (errUser) {
//             res.status(401).send('Invalid token');
//         }
//         if (!user) {
//             res.status(401).send('Invalid token');
//         }
//         else {
//             if (user.type === 1) {
//                 Purchase.updateMany(
//                     { "userID": req.body.userID },
//                     {
//                         $set:
//                         {
//                             updatedOn: new Date(),
//                             updatedBy: user.username,
//                             deleteFlag: true
//                         }
//                     },
//                     { upsert: true },
//                     function (err, data) {
//                         if (err) {
//                             res.status(500).send(err);
//                         }
//                         if (!data) {
//                             res.status(500).send({ status: false });
//                         }
//                         else {
//                             res.send({ status: true });
//                         }
//                     }
//                 )
//             }
//         }
//     });
// });

module.exports = router;