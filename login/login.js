var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "isawsuits2@",
  database: "community"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log('You are now connected with mysql database...');
  });

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

var server = app.listen(3000, "127.0.0.1", function () {

	var host = server.address().address
	var port = server.address().port
  
	console.log("Example app listening at http://%s:%s", host, port)
 });

// //rest api to get all customers
app.get('/users', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	connection.query('select * from user', function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	   console.log(results)
	 });
 });
 app.get('/services', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	connection.query('select * from services', function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	   console.log(results)
	 });
 });

 app.get('/provider', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	connection.query('select * from provider', function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	   console.log(results)
	 });
 });

app.get('/users/:UserName/:Password', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	var username = req.params.UserName;
	var password = req.params.Password;
	console.log(req.params);
	console.log(username);
	if (username && password) {
		connection.query('SELECT * FROM user WHERE UserName = ? AND Password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				res.send('Welcome '+username);
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

