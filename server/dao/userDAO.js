const crypto = require("crypto");

class userDao {
  
  constructor(db) {
    this.db = db;
  }

  /*** USER INFORMATION FUNCTIONALITIES */

  async getUser(email, password) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE email = ?";
      this.db.get(sql, [email], (err, row) => {
        if (err) {
          reject(err);
        } else if (row === undefined) {
          resolve(false);
        } else {
          const user = {
            id: row.id,
            email: row.email,
            name: row.name,
            surname: row.surname,
            fullTime: row.fullTime,
            finalPlan: JSON.parse(row.finalPlan),
            finalPlanCredits: row.finalPlanCredits,
          };

          crypto.scrypt(password, row.salt, 32, function (err, hashedPassword) {
            if (err) reject(err);
            if (
              !crypto.timingSafeEqual(
                Buffer.from(row.password, "hex"),
                hashedPassword
              )
            )
              resolve(false);
            else resolve(user);
          });
        }
      });
    });
  }

  async getUserById(id) {
    const sql = `SELECT * FROM users WHERE id=${id}`;
    return new Promise((resolve, reject) => {
      this.db.all(sql, [], function (err, rows) {
        if (err) {
          reject(err);
        } else {
          if (rows[0] !== undefined) {
            const users = rows.map((e) => ({
              id: e.id,
              name: e.name,
              surname: e.surname,
              fullTime: e.fullTime,
              email: e.email,
              finalPlan: JSON.parse(e.finalPlan),
              finalPlanCredits: e.finalPlanCredits,
            }));
            resolve(users[0]);
          }
          reject(0);
        }
      });
    });
  }

  /*** TOGGLEs */

  async commitPlan(userId, courses, subscription) {
    // used both to set and reset the final plan
    const sql = "UPDATE users SET finalPlan=?, fullTime=? WHERE id=?";
    const list = [JSON.stringify(courses), subscription, userId];
    return new Promise((resolve, reject) => {
      this.db.run(sql, list, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(1);
        }
      });
    });
  }

  async deleteCommittedPlan(userId){
    const sql = "UPDATE users SET finalPlanCredits=0, finalPlan=?, fullTime=? WHERE id=?"
    const list = [JSON.stringify([]), null, userId]
    return new Promise((resolve, reject)=>{
      this.db.run(sql, list, function(err){
        if(err){
          reject(err)
        }else{
          resolve(1)
        }
      })
    })
  }

  async updateCommittedPlanCredits(userId, finalPlanCredits){
    const sql = "UPDATE users SET finalPlanCredits=? WHERE id=?"
    const list = [finalPlanCredits, userId]
    return new Promise((resolve, reject)=>{
      this.db.run(sql, list, function(err){
        if(err){
          reject(err)
        }else{
          resolve(1)
        }
      })
    })
  }

  async setFinalPlannedCreditsToZero(userId){
    const sql = "UPDATE users SET finalPlanCredits=0 WHERE id=?"
    const list = [userId]
    return new Promise((resolve, reject)=>{
      this.db.run(sql, list, function(err){
        if(err){
          reject(err)
        }else{
          resolve(1)
        }
      })
    })
  }
}

module.exports = userDao;
