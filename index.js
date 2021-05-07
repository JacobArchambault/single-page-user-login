/*    sessions    */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

session = require('express-session');  
app.use(session({secret: 'random text', resave: true, saveUninitialized: true}))

app.use(express.static('public'))  // serve static file

var User = require('./modules/User.js');


app.post('/login', function(req, res){  
	   
	username = req.body.username;   
	pw = req.body.password;
	
	User.findOne( {username: username, password: pw}, function(err, user) {  // test username & pw
		if (err) {
		    res.send(err);
		}
		else if (!user) {
		    res.send("No user with these credentials. Please log in.");
		}
		else {                                  // user is in database 
		    req.session.username = username;
			req.session.preference = user.preference;
    		res.send("Login Successful"); 
		}
    });   
	
});


app.get('/getUser', function(req, res) {   // Retrieve all
                           
    if(req.session.username) {
	    info = {username: req.session.username, preference: req.session.preference}
		res.send(info)
	}
	else
		res.send('Not logged in')
})


app.post('/updateFlavor', function(req, res){  
	   
	username = req.body.username
	newFlavor = req.body.flavor
	
	User.findOneAndUpdate({ username : username }, {$set:{preference: newFlavor}}, function(err, doc){
    	if(err){
        	res.send(err);
    	}
		else if (!doc) {
		    res.send("No user with these credentials. Please log in.");
		}
		else
    		res.send("Flavor updated")
	});								  

});


app.use(function (req, res) {
  res.status(404).send("Sorry, no such page!")
});

app.listen(3000,  function() {
	console.log('Listening on port 3000, ctrl-c to quit');
    });
