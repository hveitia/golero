var mongoose = require('mongoose');
var USERMODEL = mongoose.model('USERMODEL');


exports.findAll = function(req, res) {

  //var token = req.headers.authorization.split(" ")[1];
  //res.json({ message: "Estás autenticado correctamente y tu _id es: " + req.user });

  USERMODEL.find(function(err, result) {

    if (err) {
      res.send(500, err.message);
    }

    res.status(200).jsonp(result);
  });
};

exports.add = function(req, res) {

  USERMODEL.findOne({
    user: req.body.user
  }, function(err, user) {
    if (err) {
      res.send(500, err.message);
    }

    if (!user) {

      USERMODEL.findOne({
        email: req.body.email
      }, function(err, userEmail) {
        if (err) {
          res.send(500, err.message);
        }
        if (!userEmail) {
          var obj = new USERMODEL({
            user: req.body.user,
            pass: req.body.pass,
            email: req.body.email,
            points: 0,
            state: 'CREATED'
          });
          obj.save(function(err, result) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(result);
          });
        } else {
          res.json({
            success: false,
            message: '0002'
          });
        }
      });
    } else {
      res.json({
        success: false,
        message: '0001'
      });

    }
  });

};
