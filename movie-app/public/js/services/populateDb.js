'use strict';

//DROP collections

/*var collections = ['users', 'products'];
async.each(collections, function(c, done){
 db.collection(c).drop(done);
});*/

var movies = db.get('movies');

movies.insert({ title : "Interstellar", description:"A team of explorers travel through a wormhole in an attempt to ensure humanity's survival."})