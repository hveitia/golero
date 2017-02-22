var mongoose = require('mongoose');
var service = require('../service');
var USERMODEL = mongoose.model('USERMODEL');

exports.authenticate = function(req, res) {

  USERMODEL.findOne({
    user: req.body.user
  }, function(err, user) {

    if (err) res.send(500, err.message);

    if (!user) {

      res.json({
        success: false,
        message: '0003'
      });
    }else {
      if (user.state != 'ACTIVE') {
        res.json({
          success: false,
          message: '0004'
        });
      }
      else {

        if (user) {
          if (user.pass != req.body.pass) {

            res.json({
              success: false,
              message: '0003'
            });
          } else {

            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Login Success!',
              token: service.createToken(user)
            });
          }
        }
      }
    }
  });
};
