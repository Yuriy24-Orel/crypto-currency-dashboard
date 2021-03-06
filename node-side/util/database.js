const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect("mongodb://localhost:27017")
    .then((client) => {
      console.log("Connected");
      _db = client.db('Currency');
      callback();
    })
    .catch((err) => console.log(err));
};

const getDb = () => {
  if(_db) {
    return _db;
  }
  throw 'No database found or url for database is incorrect!';
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;
