const { getDb } = require("../util/database-util");
const { ObjectId } = require("mongodb");

module.exports = class Favourite {
  constructor(homeId) {
    this.homeId = homeId;
  }

  save() {
    const db = getDb();
    return db.collection("favourites").insertOne(this);
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("favourites").find().toArray();
  }

  static deleteById(homeId) {
     const db = getDb();
     return db.collection("favourites").deleteOne({homeId});
  }
}
