//Set dependencies 
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mysql = require('mysql');
const router = express.Router();

//Declare configurations for our database
const connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'friendFinder'
});

//Connect to our Database
connection.connect();


//Send home.html when home route is hit
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "app/public/home.html"));
});

//GET Route to /survey which displays the survey page.
router.get("/survey", function(req, res){
	res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

//GET Route to /survey which displays the survey page.
router.get("/results", function(req, res){
	res.sendFile(path.join(__dirname, "app/public/results.html"));
});

// A default USE route that leads to home.html which displays the home page.
//this is in the server.js file!!! 



// ------------------------- apiRoutes.js ------------------------------------------------------------- //


// A GET route with the url /api/friends to display a JSON of all possible friends.
router.get("/api/friends", function(req, res){
	connection.query("SELECT * FROM friends", function(err, data){
		if(err) throw err;
		res.send(data);
	});
});

var currentUser;
var name;
var photo;

// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
router.post('/survey', function(req, res){
	console.log(req.body);

	name = req.body.name;
	photo = req.body.photo;
	let Q1 = parseInt(req.body.Q2);
	let Q2 = parseInt(req.body.Q2);
	let Q3 = parseInt(req.body.Q3);
	let Q4 = parseInt(req.body.Q4);
	let Q5 = parseInt(req.body.Q5);
	let Q6 = parseInt(req.body.Q6);
	let Q7 = parseInt(req.body.Q7);
	let Q8 = parseInt(req.body.Q8);
	let Q9 = parseInt(req.body.Q9);
	let Q10 = parseInt(req.body.Q10);
	

	connection.query('INSERT INTO friends(name, photo, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', [name, photo, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10]);
	res.redirect('/results');
});

module.exports = router;
module.exports.name = name;
module.exports.photo = photo;  