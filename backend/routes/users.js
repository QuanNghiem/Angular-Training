var express = require('express');
var router = express.Router();

// Encrypt Password
var bcrypt = require('bcryptjs');

// Json Web Token
var jwt = require('jsonwebtoken');
var config = require('../util/config');
const secretKey = config.secret;

// Model
var User = require('../models/User');

router.post('/register', function (req, res) {
  var hashedPass = bcrypt.hashSync(req.body.password, 8);

  User.create({
    username: req.body.username,
    password: hashedPass,
    type: req.body.type,
    pNo: req.body.pNo,
    email: req.body.email,
  },
    function (err, user) {
      if (err) {
        return res.send(err);
      }
      else {
        var userToken = jwt.sign(
          {
            id: user._id
          },
          secretKey,
          {
            expiresIn: '1h'
          }
        );
        res.send({ token: userToken, username: user.username });
      }
    });
});

router.post('/login', function (req, res) {
  User.findOne(
    {
      username: req.body.username
    },
    function (err, user) {
      if (err) {
        return res.send(err);
      }
      if (!user) {
        return res.send({ token: null, username: null });
      }
      else {
        let passValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passValid) {
          return res.send({ token: null });
        }
        else {
          var userToken = jwt.sign(
            {
              id: user._id
            },
            secretKey,
            {
              expiresIn: '1h'
            }
          );
          res.send({ token: userToken, username: user.username });
        }
      }
    })
});

router.get('/verify', function (req, res) {
  User.findById(req.user.id, function (err, user) {
    if (err) {
      return res.send({ auth: false });
    }
    if (!user) {
      return res.send({ auth: false });
    }
    else {
      if (user.type === 1) {
        return res.send({ auth: true });
      }
      else {
        return res.send({ auth: false });
      }
    }
  });
});

router.get('/getUsers', function (req, res) {
  User.findById(req.user.id, function (errUser, user) {
    if (errUser) {
      res.status(401).send('Invalid token');
    }
    if (!user) {
      res.status(401).send('Invalid token');
    }
    else {
      if (user.type === 1) {
        User.find({}, function (err, data) {
          if (err) {
            res.json(err);
          }
          else {
            res.json(data);
          }
        })
      }
    }
  });
});

router.put('/updateUser', function (req, res) {
  User.findById(req.user.id, function (errUser, user) {
    if (errUser) {
      res.status(401).send('Invalid token');
    }
    if (!user) {
      res.status(401).send('Invalid token');
    }
    else {
      if (user.type === 1) {
        var hashedPass = bcrypt.hashSync(req.body.password, 8);
        User.findByIdAndUpdate(
          { "_id": req.body._id },
          {
            $set:
            {
              username: req.body.username,
              password: hashedPass,
              type: req.body.type
            }
          },
          { upsert: false },
          function (err, data) {
            if (err) {
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

router.delete('/deleteUser/:id', (req, res) => {
  User.findById(req.user.id, function (errUser, user) {
    if (errUser) {
      res.status(401).send('Invalid token');
    }
    if (!user) {
      res.status(401).send('Invalid token');
    }
    else {
      if (user.type === 1) {
        var id = req.params.id
        User.findByIdAndDelete(id)
          .then(data => res.status(200).send({ status: true }))
          .catch(err => res.status(500).send(err));
      }
    }
  });
});

router.get('/getUser', function (req, res) {
  User.findById(req.user.id, function (errUser, user) {
    if (errUser) {
      res.status(401).send('Invalid token');
    }
    if (!user) {
      res.status(401).send('Invalid token');
    }
    else {
      res.status(200).json(user);
    }
  });
});

module.exports = router;
