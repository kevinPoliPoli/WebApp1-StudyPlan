class courseDao {
  
  constructor(db) {
    this.db = db;
  }

  async getAllCourses() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM courses";
      this.db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        if (rows !== undefined) {
          const courses = rows.map((e) => ({
            code: e.code,
            name: e.name,
            credits: e.credits,
            maxStudents: e.maxStudents,
            enrolled: e.enrolled,
            incompatibleWith: JSON.parse(e.incompatibleWith),
            preparatoryCourse: JSON.parse(e.preparatoryCourse),
          }));
       

          resolve(courses);
        } else {
          const courses = "";
          resolve(courses);
        }
      });
    });
  }

  async getCourseByCode(code) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM courses WHERE code = ?";
      this.db.all(sql, [code], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        if (rows.length) {
            const courses = rows.map((e) => ({
                code: e.code,
                name: e.name,
                credits: e.credits,
                maxStudents: e.maxStudents,
                enrolled: e.enrolled,
                incompatibleWith: JSON.parse(e.incompatibleWith),
                preparatoryCourse: JSON.parse(e.preparatoryCourse),
              }));
              resolve(courses[0]);
        } else {
          reject("course not found");
        }
      });
    });
  }

  async addStudentToCourse(code){
    const sql = "UPDATE courses SET enrolled=enrolled+1 WHERE code=?"
    const list = [code]
    return new Promise((resolve, reject) => {
      this.db.run(sql, list, function(err){
        if(err){
          reject(err)
        }else{
          resolve(1)
        }
      })
    })
  }

  async removeStudentFromCourse(code){
    const sql = "UPDATE courses SET enrolled=enrolled-1 WHERE code=?"
    const list = [code]
    return new Promise((resolve, reject) => {
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

module.exports = courseDao
