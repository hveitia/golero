var LOGMODEL = mongoose.model('LOGMODEL');
var USERMODEL = mongoose.model('USERMODEL');

exports.saveLog = function(user, method, date, logText, controller, action) {

    USERMODEL.findOne({_id: user},function(err, result) {

        if (err) {

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
            }
        });

    });
};

exports.findAll = function(req, res){

    LOGMODEL.find(function(err, result) {

        if (err) res.send(500, err.message);

        res.status(200).jsonp(result);
    });

};



