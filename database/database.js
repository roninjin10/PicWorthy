const mongoose = require('mongoose');
const Promise = require('bluebird');
const bcrypt = require('bcrypt-nodejs');

const schemas = require('./schemas.js');
const models = require('./models.js');

// just allows mongoose functions to return promises
mongoose.promise = Promise;
Promise.promisifyAll(bcrypt);

// set up database
const DB_URL = 'mongodb://localhost/PicWorthy';
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on('error', () => console.log('error connecting to database!'));
db.once('open', () => console.log('connection successful!'));

// database functions
// we are just attatching them to the db object for convenience
db.fetchUser = (username) =>  models.Users.findOne({username: username});

// saves a user to the database
db.saveUser = (obj) => {
  return fetchUser(obj.username)
  .then((user) => {
    if (user === null) {
      const saltRounds = 10;
      return bcrypt.genSaltAsync(saltRounds)
      .then ((salt) => {
        return bcrypt.hashAsync(obj.password, salt, null)
        .then ((hash) => {
          obj.password = hash;
          return models.Users.create({
            firstName: obj.firstName,
            lastName: obj.lastName,
            username: obj.username,
            password: obj.password
          }, (err) => {
            console.log(err);
          });
        })
        .catch((err) => 
          console.log(err)
        )
    }) 
    } else {
      return 'Username already exists';
    }
  })
};

module.exports = db;