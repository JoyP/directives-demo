'use strict';

var Movie = require('../models/movie');

exports.index = function(req, res){
  Movie.findAll(req.user, function(err, movies){
    res.send({movies:movies});
  });
};

exports.addMovie = function(req, res){
  Movie.create(req.body, req.user, function(err, movie){
    res.send({movie:movie});
  });
};

exports.delMovie = function(req, res){
//  Movie.findById(id, function(err, movie){
//    Movie.delMovie(movie);
//  });
};
