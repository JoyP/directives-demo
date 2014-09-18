'use strict';

var  Mongo  = require('mongodb');

function Movie(o, user){
  this.title              = o.title;
  this.poster             = o.poster;
  this.year               = o.year;
  this.mpaa_rating        = o.mpaa_rating;
  this.runtime            = o.runtime;
  this.ratings            = o.movie.ratings.critics_rating;
  this.userId             = user._id;
}

Object.defineProperty(Movie, 'collection', {
  get: function(){return global.mongodb.collection('movies');}
});

Movie.create = function(o,user,cb){
  var m = new Movie(o, user);
  Movie.collection.save(m, cb);
};

Movie.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Movie.collection.findOne({_id:_id}, cb);
};

Movie.findAll = function(user, cb){
  Movie.collection.find({userId:user._id}).toArray(cb);
};

Movie.addMovie = function(movie, cb){
  Movie.collection.save(movie);
};

Movie.delMovie = function(movie, cb){
  Movie.collection.splice(movie);
};

module.exports = Movie;

