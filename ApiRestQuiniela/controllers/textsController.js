var TEXTSMODEL = mongoose.model('TEXTSMODEL');


//OPTIONS Allow CORS to DELETE
exports.options = function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    next();
};

exports.saveText = function(req, res){

    TEXTSMODEL.find({key: req.body.key}, function (err, obj) {

        if (err) res.status(500).send(err.message);

        if(obj.length > 0){
            res.status(200).send('DUPLICATE_KEY');
        }else{

            var obj = new TEXTSMODEL({
                key: req.body.key,
                text: req.body.text,
                title: req.body.title
            });

            obj.save(function (err, result) {
                if (err) res.status(500).send(err.message);

                res.status(200).jsonp(result);
            });
        }
    });
};

exports.updateText = function(req, res){

    TEXTSMODEL.findOne({key: req.body.key}, function (err, obj) {

        if (err) res.status(500).send(err.message);

        if(obj){

            obj.text = req.body.text;
            obj.title = req.body.title;

            obj.save(function (err, result) {
                if (err) res.status(500).send(err.message);

                res.status(200).jsonp(result);
            });

        }else{
            res.status(404).send('404');
        }

    });
};

exports.findByKey = function(req, res){

    TEXTSMODEL.find({key: req.params.key}, function (err, obj) {

        if (err) res.status(500).send(err.message);

        if(obj){

            res.status(200).jsonp(obj);

        }else{
            res.status(404).send('404');
        }

    });
};

exports.find = function(req, res){

    TEXTSMODEL.find(function (err, obj) {

        if (err) res.status(500).send(err.message);

        if(obj){

            res.status(200).jsonp(obj);

        }else{
            res.status(404).send('404');
        }

    });
};
