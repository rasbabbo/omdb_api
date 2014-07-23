var express = require("express");
var request = require("request");

var app = express();

//homepage - just sittin there listening:
app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/search', function(req, res) {
  //req.query is the EXPRESS term to query the url
  var query = req.query.searchTerm;
  // res.send("search page: " + query);
  var url = "http://www.omdbapi.com/?s=" + query;
  request(url, function(error, response, body) {
  	if (!error) {
  		var data = JSON.parse(body);
  		res.render("results.ejs", {movieList: data.Search || [] })
  	}
  });
});

app.get('/movie', function(req, res) {
  //req.query is the EXPRESS term to query the url
  var query = req.query.searchTerm;
  // res.send("search page: " + query);
  var url = "http://www.omdbapi.com/?i=" + query;
  request(url, function(error, response, body) {
    if (!error) {
      var data = JSON.parse(body);
      res.render("movie.ejs", {movieList: data.Search || [] })
    }
  });
});




app.listen(3000);
