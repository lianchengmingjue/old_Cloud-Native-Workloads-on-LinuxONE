var Fmbf = require('./models/fmbf');

function getFmbfs(res) {
    Fmbf.find(function (err, fmbfs) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(fmbfs); // return all todos in JSON format
    });
};


module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/fmbfs', function (req, res) {
        // use mongoose to get all todos in the database
        getFmbfs(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/fmbfs', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Fmbf.create({
            client_id: req.body.client_id,
            name:req.body.name,
            type: req.body.type,
            interest_rate: req.body.interest_rate,
            interest: req.body.interest,
            begin_date: req.body.begin_date,
            store_time: req.body.store_time,
            balance: req.body.balance,

            done: false
        }, function (err, fmbf) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getFmbfs(res);
        });

    });

    // delete a todo
    app.delete('/api/fmbfs/:fmbf_id', function (req, res) {
        Fmbf.remove({
            _id: req.params.fmbf_id
        }, function (err, fmbf) {
            if (err)
                res.send(err);

            getFmbfs(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'+'/public/index_2.html'); // load the single view file (angular will handle the page changes on the front-end)

    });
};