var LOGMODEL = mongoose.model('LOGMODEL');
var USERMODEL = mongoose.model('USERMODEL');
var CONFIGSMODEL = mongoose.model('CONFIGSMODEL');

exports.saveLog = function (user, method, date, logText, controller, action) {


    CONFIGSMODEL.find(function (err, result) {

        if (result[0].saveLogs) {

            USERMODEL.findOne({_id: user}, function (err, result) {

                if (err) {
                    console.log(err.message);
                }

                var objLog = new LOGMODEL({
                    user: result.user,
                    method: method,
                    logText: logText,
                    date: date,
                    action: action,
                    controller: controller
                });

                objLog.save(function (err, result) {
                    if (err) {

                        console.log(err.message);
                    }
                });

            });
        }
    });


};

exports.findAll = function (req, res) {

    LOGMODEL.find(function (err, result) {

        if (err) res.send(500, err.message);

        res.status(200).jsonp(result);
    });

};



