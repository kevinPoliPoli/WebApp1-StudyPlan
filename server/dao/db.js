class DB {
  sqlite = require("sqlite3");

  constructor() {
    this.db = new this.sqlite.Database("studyplan.sqlite", (err) => {
      if (err) throw err;
    });
  }
}

const db = new DB();
module.exports = db;
