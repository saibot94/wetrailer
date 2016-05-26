/**
 * Created by chris on 21.05.2015.
 */
var monk = require('monk');
var db = monk('localhost:27017/movieApp');


console.log('Populate db service... started!');



var templateMovie =
{
    name: '',
    description: '',
    image: '',
    trailerUrl: 'https://www.youtube.com/embed/',
    imdbRating: 0,
    synopsis: ''
};

var templatePost = {
    movieId: "",
    userEmail: "",
    userName: "",
    text: ""
};


var templateUser = {
    email: 'chris@wetrailer.it',
    password: 'chris123',
    name: 'chris',
    isAdmin: true
};


var users = db.get('users');
var movies = db.get('movies');
var posts = db.get('posts');
var ratings = db.get('ratings');
var watchlist = db.get('watchlist');

users.remove({});
movies.remove({});
posts.remove({});
ratings.remove({});
watchlist.remove({});

function populateDb(){
    populateUsers();

}


function populateUsers(){
    var usersToInsert = [
        {
            email: 'admin@wetrailer.it',
            password: 'admin',
            name: 'admin',
            isAdmin: true
        },
        {
            email: 'chris@wetrailer.it',
            password: 'chris123',
            name: 'chris',
            isAdmin: true
        }
    ];
    var watchlistToInsert = [
        {
            email: 'admin@wetrailer.it',
            list: []
        },
        {
            email: 'chris@wetrailer.it',
            list: []
        }
    ];

    users.insert(usersToInsert, function () {
        watchlist.insert(watchlistToInsert, function () {
            populateMovies();
        });
    });
}



function populatePosts (movie) {
    var postsToSet  = [
        {
            movieId: movies.id(movie)._id,
            userEmail: "admin@wetrailer.it",
            userName: "admin",
            text: "One of the best movies this year, recommended for all sci-fi enthusiasts and more!"
        },
        {
            movieId: movies.id(movie)._id,
            userEmail: "chris@wetrailer.it",
            userName: "chris",
            text: "The past 100 movies i could barely even finish, but this one... Mr Nolan you are a master of your craft   Not only that he got hans zimmer to score the movie, the guy proves he is a magician   This film i gave it 10/10 because it was just so amazing and i haven't seen a film like this in a long long time, and im glad i finally watched this film. "
        }
    ];

    var ratingsToSet = [
        {
            movieId: movies.id(movie)._id,
            userEmail: "admin@wetrailer.it",
            rating: '5'
        },
        {
            movieId: movies.id(movie)._id,
            userEmail: "chris@wetrailer.it",
            rating: '3 and a half'
        }
    ];

    posts.insert(postsToSet, function () {
        ratings.insert(ratingsToSet, function () {
            db.close(function () {
                console.log('Populate db service... done!');
            });
        });
    });
}

function populateMovies(){
    var moviesToInsert = [
        {
            name: 'Interstellar',
            description: 'A team of explorers travel through a wormhole in an attempt to ensure humanity\'s survival',
            image: 'http://posterposse.com/wp-content/uploads/2014/10/interstellar-poster.jpg',
            trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
            synopsis: 'In the near future around the American Midwest, Cooper an ex-science engineer and pilot, is tied to his farming land with his daughter Murph and son Tom. As devastating sandstorms ravage earths crops, the people of Earth realize their life here is coming to an end as food ' + 'begins to run out. Eventually stumbling upon a NASA base near Cooper\'s home, he is asked to go on a daring mission with a few other scientists into a wormhole because of Cooper\'s scientific intellect and ability to pilot aircraft unlike the other crew members. In order to find a new home while' + 'Earth decays, Cooper must decide to either stay, or risk never seeing his children again in order to save the human race by finding another habitable planet.'
        },
        // add more
        {
            name: 'The Theory of Everything',
            description: 'A look at the relationship between the famous physicist Stephen Hawking and his wife',
            image: 'http://ia.media-imdb.com/images/M/MV5BMTAwMTU4MDA3NDNeQTJeQWpwZ15BbWU4MDk4NTMxNTIx._V1_SX214_AL_.jpg',
            trailerUrl: 'https://www.youtube.com/embed/LUayjO_KgsQ',
            synopsis: "The Theory of Everything is the story of the most brilliant and celebrated physicist of our time, Stephen Hawking, and Jane Wilde the arts student he fell in love with whilst studying at Cambridge in the 1960s. Little was expected from Stephen Hawking, a bright but shiftless student of cosmology, given just two years to live following the diagnosis of a fatal illness at 21 years of age. He became galvanized, however, by the love of fellow Cambridge student, Jane Wilde, and he went on to be called the successor to Einstein, as well as a husband and father to their three children. Over the course of their marriage as Stephen's body collapsed and his academic renown soared, fault lines were exposed that tested the lineaments of their relationship and dramatically altered the course of both of their lives."
        },
        {
            name: 'The Strain',
            description: 'A thriller that tells the story of Dr. Ephraim Goodweather, the head of the Center for Disease Control Canary Team in New York City. He and his team are called upon to investigate a mysterious viral outbreak with hallmarks of an ancient and evil strain of vampirism. As the strain spreads, Eph, his team, and an assembly of everyday New Yorkers, wage war for the fate of humanity itself.',
            image: 'http://ia.media-imdb.com/images/M/MV5BMjEyNjQ0MDU5MF5BMl5BanBnXkFtZTgwMTg4MzY3NTE@._V1_SY317_CR12,0,214,317_AL_.jpg',
            trailerUrl: 'https://www.youtube.com/embed/DqcuyXeN8O8',
            synopsis: "A Boeing 767 arrives at JFK and is on its way across the tarmac, when it suddenly stops dead. All window shades are pulled down. All lights are out. All communication channels have gone quiet. Crews on the ground are lost for answers, but an alert goes out to the CDC. Dr. Ephraim 'Eph' Goodweather, head of their Canary project, a rapid-response team that investigates biological threats, gets the call and boards the plane. What he finds makes his blood run cold. In a pawnshop in Spanish Harlem, a former professor and survivor of the Holocaust named Abraham Setrakian knows something is happening. And he knows the time has come, that a war is brewing. So begins a battle of mammoth proportions as the vampiric virus that has infected New York begins to spill out into the streets. Eph, who is joined by Setrakian and a motley crew of fighters, must now find a way to stop the contagion and save his city - a city that includes his wife and son - before it is too late."
        },
        {
            name: 'The Imitation Game',
            description: 'During World War II, mathematician Alan Turing tries to crack the enigma code with help from fellow mathematicians',
            image: 'http://ia.media-imdb.com/images/M/MV5BNDkwNTEyMzkzNl5BMl5BanBnXkFtZTgwNTAwNzk3MjE@._V1_SY317_CR0,0,214,317_AL_.jpg',
            trailerUrl: 'https://www.youtube.com/embed/nuPZUUED5uk',
            synopsis: "Based on the real life story of legendary cryptanalyst Alan Turing, the film portrays the nail-biting race against time by Turing and his brilliant team of code-breakers at Britain's top-secret Government Code and Cypher School at Bletchley Park, during the darkest days of World War II."
        },
        {
            name: 'Mr. Nobody',
            description: 'A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn\'t choose, anything is possible',
            image: 'http://ia.media-imdb.com/images/M/MV5BMTg4ODkzMDQ3Nl5BMl5BanBnXkFtZTgwNTEwMTkxMDE@._V1_SY317_CR0,0,214,317_AL_.jpg',
            trailerUrl: 'https://www.youtube.com/embed/mpi0qsp3v_w',
            synopsis: "In a utopian future, Nemo is the oldest and last man to ever have the choice of immortality. The film explores Nemo as a young boy faced with an impossible decision: should he stay with his father or leave with his mother? The film is based around all of his possible lives that could occur, of which are all dependent on his one decision."
        },
        {
            name: 'The Dark Knight',
            description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.',
            image: 'http://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY317_CR0,0,214,317_AL_.jpg',
            trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
            synopsis: "Batman raises the stakes in his war on crime. With the help of Lieutenant Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the city streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as The Joker."
        },
        {
            name: 'Fight Club',
            description: 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more',
            image: 'http://ia.media-imdb.com/images/M/MV5BMjIwNTYzMzE1M15BMl5BanBnXkFtZTcwOTE5Mzg3OA@@._V1_SX214_AL_.jpg',
            trailerUrl: 'https://www.youtube.com/embed/SUXWAEX2jlg',
            synopsis: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground 'fight clubs' forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion."
        },
        {
            name: 'Apocalypto',
            description: 'As the Mayan kingdom faces its decline, the rulers insist the key to prosperity is to build more temples and offer human sacrifices. Jaguar Paw, a young man captured for sacrifice, flees to avoid his fate',
            image: 'http://ia.media-imdb.com/images/M/MV5BNTM1NjYyNTY5OV5BMl5BanBnXkFtZTcwMjgwNTMzMQ@@._V1_SY317_CR0,0,214,317_AL_.jpg',
            trailerUrl: 'https://www.youtube.com/embed/ngWBddVNVZs',
            synopsis: "Set in the Mayan civilization, when a man's idyllic presence is brutally disrupted by a violent invading force, he is taken on a perilous journey to a world ruled by fear and oppression where a harrowing end awaits him. Through a twist of fate and spurred by the power of his love for his woman and his family he will make a desperate break to return home and to ultimately save his way of life."
        },
        {
            name: 'Braveheart',
            description: 'When his secret bride is executed for assaulting an English soldier who tried to rape her, William Wallace begins a revolt and leads Scottish warriors against the cruel English tyrant who rules Scotland with an iron fist',
            image: 'http://ia.media-imdb.com/images/M/MV5BNjA4ODYxMDU3Nl5BMl5BanBnXkFtZTcwMzkzMTk3OA@@._V1_SX214_AL_.jpg',
            trailerUrl: 'https://www.youtube.com/embed/wj0I8xVTV18',
            imdbRating: 8.4,
            synopsis: "In 14th Century Scotland, William Wallace leads his people in a rebellion against the tyranny of the English King, who has given English nobility the 'Prima Nocta' - a right to take all new brides for the first night. The Scots are none too pleased with the brutal English invaders, but they lack leadership to fight back. Wallace creates a legend of himself, with his courageous defence of his people and attacks on the English."
        },
        {
            name: 'The Lord of the Rings: The Two Towers',
            description: 'While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron\'s new ally, Saruman, and his hordes of Isengard',
            image: 'http://ia.media-imdb.com/images/M/MV5BMTAyNDU0NjY4NTheQTJeQWpwZ15BbWU2MDk4MTY2Nw@@._V1_SY317_CR1,0,214,317_AL_.jpg',
            trailerUrl: 'https://www.youtube.com/embed/LbfMDwc4azU',
            imdbRating: 8.7,
            synopsis: "Sauron's forces increase. His allies grow. The Ringwraiths return in an even more frightening form. Saruman's army of Uruk Hai is ready to launch an assault against Aragorn and the people of Rohan. Yet, the Fellowship is broken and Boromir is dead. For the little hope that is left, Frodo and Sam march on into Mordor, unprotected. A number of new allies join with Aragorn, Gimli, Legolas, Pippin and Merry. And they must defend Rohan and attack Isengard. Yet, while all this is going on, Sauron's troops mass toward the City of Gondor, for the War of the Ring is about to begin."
        },
        {
            name: 'The Matrix',
            description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers',
            image: 'http://ia.media-imdb.com/images/M/MV5BMTkxNDYxOTA4M15BMl5BanBnXkFtZTgwNTk0NzQxMTE@._V1_SX214_AL_.jpg',
            trailerUrl: 'https://www.youtube.com/embed/m8e-FF8MsqU',
            imdbRating: 8.7,
            synopsis: "During the year 1999, a man named Thomas Anderson (also known as Neo), lives an ordinary life. A software techie by day and a computer hacker by night, he sits alone at home by his monitor, waiting for a sign, a signal - from what or whom he doesn't know - until one night, a mysterious woman named Trinity seeks him out and introduces him to that faceless character he has been waiting for: Morpheus. A messiah of sorts, Morpheus presents Neo with the truth about his world by shedding light on the dark secrets that have troubled him for so long."
        }
    ];
    movies.insert(moviesToInsert, function (params, mv) {
        populatePosts(mv[0]);
    });
}


populateDb();

