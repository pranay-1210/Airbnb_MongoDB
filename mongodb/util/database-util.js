const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const url = "mongodb+srv://pranaypraveen1210:a4b3c2d1%3F%3F@airbnb.ngu7mqb.mongodb.net/?appName=Airbnb";

let _db;

const mongoConnect = (callback) => {
MongoClient.connect(url)
.then((client) => {
    console.log(client);
    _db = client.db("Airbnb");
    callback();
})
.catch(error => {
    console.log("Error while connecting to mongodb", error);
});
};

const getDb = () => {
    if (!_db) {
        throw new Error("Database not connected");
    }
    return _db;

}
    

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
