var LOGMODEL = mongoose.model('LOGMODEL');
var USERMODEL = mongoose.model('USERMODEL');
var CONFIGSMODEL = mongoose.model('CONFIGSMODEL');

exports.saveLog = function (user, method, date, logText, controller, action) {

    CONFIGSMODEL.find(function (err, result) {

        if (result &&  result.length > 0 && result[0].saveLogs != undefined && result[0].saveLogs == true) {

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

//OPTIONS Allow CORS to DELETE
exports.options = function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    next();
};

exports.clearLogs = function(req, res){
    LOGMODEL.remove(function (err) {

        if (err) return res.status(500).send(err.message);

        res.status(200).jsonp('OK');
    });
};



