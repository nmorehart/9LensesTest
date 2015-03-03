/* Module dependencies */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan')
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var io = require('socket.io')(http);
//var forever = require('forever-monitor');

//var child = new (forever.Monitor)('server.js', {
//    max: 3,
//    silent: true,
//    options: []
//});

//child.on('exit', function () {
//    console.log('server.js has exited after 3 restarts');
//});

//child.start();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//socketIO
io.on('connection', function (socket) {
    socket.on('total points', function (msg) {
        io.emit('total points', msg);
        console.log('msg: ', msg);
    });
});

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(methodOverride());

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

/* database */
var mysql = require('mysql');

function getConnection() {
    return mysql.createConnection({
        host     : 'nmorehart-dbs.chavqmaht5ao.us-west-2.rds.amazonaws.com',
        port     : 3306,
        user     : 'nmorehart',
        password : 'bR2qtHwsUnad',
        database : 'ebdb',
    });
}

var router = express.Router();
router.get('/api', function (req, res) {
    var connection = getConnection();
    connection.connect();
    var query = connection.query('SELECT * FROM DataPoints', function (err, rows) {
        if (err) {
            console.log(err);
            res.status(500).end();
        }
        else
            res.json(rows[0]);
        connection.end();
    });
});
router.put('/api', function (req, res) {
    var connection = getConnection();
    connection.connect();
    var query = connection.query('UPDATE DataPoints SET TotalDataPoints = ? ', req.body.TotalDataPoints, function (err, rows) {
        if (err) {
            console.log(err);
            res.status(500).end();
        }
        else
            res.status(200).end();
        connection.end();
    });
});
app.use(router);

http.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});