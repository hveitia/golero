var mongoose = require('mongoose');
var service = require('../service');
var crypto = require('crypto');
var USERMODEL = mongoose.model('USERMODEL');

exports.authenticate = function(req, res) {

  USERMODEL.findOne({
    user: req.body.user
  }, function(err, user) {

    if (err) res.send(500, err.message);

    if (!user) {

      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else {

      if (user) {

        var md5sum = crypto.createHash('md5');
        md5sum.update(user.pass);
        var encryptedPass = md5sum.digest('hex');

        if (encryptedPass != req.body.pass) {

          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
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
  });
};
