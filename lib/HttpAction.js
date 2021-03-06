'use strict';

var querystring = require('querystring');
var Response = require('./Response/Abstract');
var http = require('http');
var https = require('https');

exports.runAction = function( post_options, post_data, https_action, callback){

	var abstractResponse = function(res){
		res.setEncoding('utf8');
		res.on('data', function (String_chunk) {
			var JSON_chunk = JSON.parse(String_chunk);
			var response = new Response(JSON_chunk, String_chunk);
		    callback(response);
		});
	};
	if (https_action !== true) {
		post_options.port = 80;
		var post_req = http.request(post_options, function(res) {
			abstractResponse(res);
		});
	} else {
		post_options.port = 443;
		var post_req = https.request(post_options, function(res) {
			abstractResponse(res);
		});
	}
	post_req.write(post_data);
	post_req.end();
};