var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


  router.get('/', function(req, res) {

     /* var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: 'hveitia86@gmail.com', // Your email id
              pass: '' // Your password
          }
      });

      var mailOptions = {
          from: 'hveitia86@gmail.com', // sender address
          to: 'hveitia86@icloud.com', // list of receivers
          subject: 'Email From REST API..', // Subject line
          text: "Hello from REST API.."
      };

      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              console.log(error);
              res.json({yo: 'error'});
          }else{
              console.log('Message sent: ' + info.response);
              res.json({yo: info.response});
          };
      });*/

     res.send("REST API BASE!");
  });


module.exports = router;

