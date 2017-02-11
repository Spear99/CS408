var mysql      = require("mysql");
var query      = require('./query');          // our defined api calls
var assert     = require('assert');
var async      = require('async');

//To be in DB at all times
var account1 = {"email":"test1@purdue.edu",
		"username":"test1",
		"password":"test1"
	       }

//To be added and removed
var account2 = {"email":"test2@purdue.edu",
		"username":"test2",
		"password":"test2"
	       }


//Valid reservation
var res1 = {"username": "test1",
	    "roomID": 87,
	    "date": "2010-01-01",
	    "startTime":8,
	    "endTime":9,
	    "shareable":1
	   }
    //In order to connect to the database you will need node installed on your machine.
    //Once Node's installed, run command 'npm install' in 'CS408/src/main/webapp/cs408_app' dir.
    //Note: This database can only be accessed through Purdue's network.
    var con = mysql.createConnection({
	host: "mydb.itap.purdue.edu",
	user: "bhuemann",
	password: "ben408",
	database: "bhuemann"
    });
    con.connect(function(err){
	if(err){
	    console.log('Error connecting to Db');
	    return;
	}
	console.log('Connection established');
    });
    /////////////////////
    ///Add reservation
    /////////////////////
    
    //TEST 15 FAIL - startTime must be less than endTime
    query.addReservation(res1.roomID, res1.username, res1.date, 9, 8, res1.shareable, con, function(err, res)
    			 {
    			     assert.ok(err);
    			     assert.equal(err.message, 'startTime must be less than endTime');
    			 });

    //TEST 15 FAIL - startTime must be less than endTime
    query.addReservation(res1.roomID, res1.username, res1.date, 8, 8, res1.shareable, con, function(err, res)
    			 {
    			     assert.ok(err);
    			     assert.equal(err.message, 'startTime must be less than endTime');
    			 });


    //ERR - invalid date
    query.addReservation(res1.roomID, res1.username, "BADDATE", res1.startTime, res1.endTime, res1.shareable, con, function(err, res)
    			 {
    			     assert.ok(err);
    			     assert.equal(err.message, 'invalid date');
     			 });
    con.end(function(err) {
	// The connection is terminated gracefully
	// Ensures all previously enqueued queries are still
	// before sending a COM_QUIT packet to the MySQL server.
	process.exit();
    });
