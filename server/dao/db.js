const sqlite = require("sqlite3");

class DB {

  constructor() {
    this.db = new sqlite.Database("studyplan.sqlite", (err) => {
      if (err) throw err;
    });
  }
}

const db = new DB();
module.exports = db;
