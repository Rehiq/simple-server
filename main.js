/**
 * @fileoverview Provides the main entry point for the static server.
 *
 * The server is configurable in the sense that you can define custom
 * proxy functions for local serving of your files and remote proxying based
 * on a url matching.
 *
 * @author regardingscot@gmail.com (PeterStJ)
 */

const fs = require('fs');
const http = require('http');
const https = require('https');
const minimist = require('minimist');
const util = require('util');
const url = require('url');
const randomstring = require("randomstring");
const connect = require('connect');
const logger = require('morgan');

var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'FontUser',
  password : '?is8affraidof7',
  database : 'FontUser'
});
conn.connect();


/**
 * The root directory to start serving from.
 * @type {!string}
 */
var WEB_ROOT = '../';


/**
 * The port to start the server on.
 *
 * We expect it to be defined in the enviroment as a variable. This assures
 * support in hosted environments like cloud9.
 *
 * @type {number|string}
 */
var WEB_PORT =
    process.env.PORT || 3000


    /**
     * The IP/host to listen on.
     *
     * By default we use the environment variable IP to be compatible with cloud
     * based test environments.
     *
     * @type {string}
     */
    var WEB_HOST = process.env.IP || '0.0.0.0'


                   /**
                    * @type {!Object<string, *>}
                    */
                   var args = minimist(process.argv.slice(2));


/**
 * The URL of the file to use as config.
 * @type {string}
 */

var webroot = (args['root']) ? args['root'] : WEB_ROOT;
var port = (args['port']) ? (parseInt(args['port'], 10)) : WEB_PORT;
var host = (args['host']) ? args['host'] : WEB_HOST;


var secret = [];
secret.push(randomstring.generate(32));
secret.push(randomstring.generate(32));


var app = connect();

//logger
app.use(logger('combined'))

// gzip/deflate outgoing responses
const compression = require('compression');
app.use(compression());

// store session state in browser cookie
const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'FontSession',
    keys: secret,
    maxAge: 15 * 60 * 1000 //(1* 60 * 1000)one minute
}));

// parse urlencoded request bodies into req.body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//create static server
const serveStatic = require('serve-static')
app.use(serveStatic(__dirname + '/public'))

// The actual server implmentation.
http.createServer(app).listen(port, host);

//respond to /forge
app.use('/forge',function (req, res, next) {
  console.log("forege");
  // 1/ generate random string
  // 2./Write down in db aliong with timeofcreation
  var entry = {
    id: null,
    hash: randomstring.generate(32)
  };
  conn.query("INSERT INTO `urlHashes` SET ?", entry, function (error, results, fields) {
    console.log(error, results, fields);
  })
  // 3. onece written in db -> return to client

  // var Url = url.parse(req.url);
  // console.log(Url);
  // req.session.url = "abv.bg"
  res.end("From FOrge!\n");
  // console.log("forge");
  // next();
});


// respond to all requests
app.use(function(req, res) {
  // 1.) Parse url from request
  var Url = url.parse(req.url);
  console.log(Url);
  // 2.retrieve record from db optional and check for time passes
  // 3./ if time is not passed -> request and return content
  // 4../ else notify to recreate uuid
  // console.log(randomstring.generate(32));
  console.log();
  res.end('Hello from Connect!\n');
});

if (port != process.env.PORT || host != process.env.IP) {
  console.log('Listening on ' + host + ':' + port);
}
