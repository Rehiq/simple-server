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
const crypto = require('crypto-js');
const url = require('url');
const NodeSession = require('node-session');
const randomstring = require("randomstring");


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
// var configFile = (args['config']) ? args['config'] : 'config/example.json';

var webroot = (args['root']) ? args['root'] : WEB_ROOT;
var port = (args['port']) ? (parseInt(args['port'], 10)) : WEB_PORT;
var host = (args['host']) ? args['host'] : WEB_HOST;

// var config = fs.readFileSync(configFile, 'utf8');
// var json = JSON.parse(config);
// var file = new nodestatic.Server(
//     webroot, {cache: 600, headers: {'X-Powered-By': 'node-static'}});

var HashPuppies = new Map();
var secret = randomstring.generate(32);
var session = new NodeSession({secret: secret, 'lifetime': 10000});

var normalizeSite = function (url) {
  //do shit
  console.log(url);
  return decodeURIComponent(url);
}

var app = function(req, res) {

  var Url = url.parse(req.url);

  if (Url.pathname === "/forge") {
    console.log("forge");
    var site = normalizeSite(Url.query.split('url=')[2]);
    session.startSession(req, res, function(session) {
      var hush = randomstring.generate(32);
      req.session.put('hush', hush);
      HashPuppies.set('hush', hush);
      res.end('success');
    });
  } else {
    session.startSession(req, res, function() {
      console.log('ko?', req.session.get('hush'));
      res.end('ok');
    });
  }
};

// The atual server implmentation.
http.createServer(app).listen(port, host);

if (port != process.env.PORT || host != process.env.IP) {
  console.log('Listening on ' + host + ':' + port);
}
