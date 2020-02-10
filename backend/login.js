var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
const cors = require('cors');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
var Buffer = require('buffer').Buffer;
var zlib = require('zlib');
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  })
);
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
///////////////////encrypt
 function encrypt(text) {
	let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
   }
///////////////////decrypt
 function decrypt(P_iv,data,key_d) {
	let iv_decrypt = Buffer.from(P_iv, 'hex');
	let encryptedText = Buffer.from(data, 'hex');
	let decipher = crypto.createDecipheriv(algorithm,Buffer.from(key_d), iv_decrypt);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
   }


// //rest api to get all customers
app.get('/users', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	connection.query('select * from user', function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	   //console.log(results)
	 });
 });
 app.get('/services', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	connection.query('select * from services', function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	   //console.log(results)
	 });
 });

 app.get('/provider', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	connection.query('select * from provider', function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	   //console.log(results)
	 });
 });

 app.get('/cities', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	connection.query('select * from cities', function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	   //console.log(results)
	 });
 });

 app.get('/counties', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	connection.query('select * from counties', function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	  // console.log(results)
	 });
 });
 app.get('/cities', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	connection.query('select * from cities', function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	  // console.log(results)
	 });
 });
 app.get('/cities/:county_name', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	var county_name = req.params.county_name;
	//console.log(county_name);
	if(county_name){
		connection.query('select * from cities  WHERE county_name = ?', [county_name], function (error, results, fields) {
		if (error) throw error;
		res.end(JSON.stringify(results));
		//console.log(results)
		});
	}
 });
 
   
app.get('/users/:UserName/:Password', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	var username = req.params.UserName;
	var password = req.params.Password;
	if (username && password) {
		connection.query('SELECT * FROM user WHERE UserName = ? ', [username], function(error, results, fields) {
			if (results.length > 0) {
				console.log(results[0].PasswordIV);
				console.log(results[0].PasswordData);
				var kd=JSON.parse(zlib.unzipSync(Buffer.from(results[0].Key,'base64')));
				console.log(kd.data);
				var decrypt_pass=decrypt(results[0].PasswordIV,results[0].PasswordData,kd);
				console.log(decrypt_pass);
				if(password==decrypt_pass)
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
	app.post('/register', function(req, res) {
		var encrypted=encrypt(req.body.password);
		var k = zlib.gzipSync(JSON.stringify(key)).toString('base64');
		const newUser = {
		UserName: req.body.userName,
		PasswordIV: encrypted.iv , 
		PasswordData: encrypted.encryptedData,
		Key: k ,
		FirstName: req.body.firstName, 
		LastName: req.body.lastName, 
		Email: req.body.email,
		Phone: req.body.phone,
		City: req.body.city,
		Region: req.body.region,
		Birthdate: req.body.birthdate
		};
		console.log(newUser);
		connection.query('INSERT INTO user SET ?', newUser, function (error, results, fields) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		  });
	});

