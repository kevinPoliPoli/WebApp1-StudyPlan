function userApi(UserDao, CourseDao) {

  /*** FINAL PLAN FUNCTIONALITIES */

  const commitPlan = async (req, res) => {
    //set the final plan equal to the temporary plan
    //body validation
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      return res.status(422).json({ error: "params validation error" });
    }
    const body = req.body;
    if (Object.keys(body).length === 0) {
      return res.status(422).json({ error: "empty body request" });
    }

    try {

      /*** get the student */
      const student = await UserDao.getUserById(userId);
      const temporaryPlan = [...body.plan];
      const subscription = body.subscription
      
      /*** map the temporary plan to only codes */
      const temporaryPlanCodes = temporaryPlan.map(e=>{
        return e.code
      })

      /*** build the number of selected credits */
      const temporaryCredits = temporaryPlan.map(e=>{
        return e.credits
      }).reduce((a,b)=>{
        return a+b
      })

      /*** check if the number of credits is consistent */
      if(student.fullTime===0 && temporaryCredits>40){
        return res.status(409).json({error: "The number of credits is not coherent with your type of subscription."})
      }else if(student.fullTime===1 && temporaryCredits>80){
        return res.status(409).json({error: "The number of credits is not coherent with your type of subscription."})
      }


      /*** check if the course is already in the temporary study plan */
      var flag = 0
      temporaryPlanCodes.forEach(a=>{
        var sum = 0 
        temporaryPlanCodes.forEach(b=>{
          if(a===b){
            sum++
          }
        })
        if(sum>1){
          flag = 1
        }
      })
      if(flag===1){
        return res.status(409).json({error: "Duplicated course in your study plan."})
      }
   

      /*** check if there are some preparatory courses */
      var flag = 0
      temporaryPlan.forEach(e=>{
        if(e.preparatoryCourse!=[]){
          preparatoryCoursesToInsert = []
          e.preparatoryCourse.map(e2=>{
            if(temporaryPlanCodes.indexOf(e2)===-1){
            }
          })
          
        }
      })
      if(flag===1){
        return res.status(409).json({error: "One or more preparatory courses are missing."})
      }
    
      /*** check if there are some incompatible courses */
      var flag = 0
      temporaryPlan.forEach(e=>{
        if(e.incompatibleWith!=[]){
          e.incompatibleWith.map((e2)=>{
            if(temporaryPlanCodes.indexOf(e2)!==-1){
              flag = 1
            }
          })
        }
      })
      if(flag===1){
        return res.status(409).json({error: "One or more preparatory courses are missing."})
      }
      
   

      /*** check if all the courses are open to new subscriptions */
      const addedCourses = [];
      temporaryPlan.forEach((c) => {
        //check if the course accepts other students
        if (c.maxStudents === null) {
          addedCourses.push(c.code);
        } else {
          if (c.maxStudents > c.enrolled) {
            addedCourses.push(c.code);
          }
        }
      });


      if (addedCourses.length === temporaryPlanCodes.length) {

        //unsubscribe from each course
        if(student.finalPlan.length>0){
          student.finalPlan.forEach(async (e)=>{
            await CourseDao.removeStudentFromCourse(e)
          })
        }

        //update the final plan of the student
        await UserDao.commitPlan(userId, temporaryPlanCodes, subscription);

        //update the number of credits
        await UserDao.updateCommittedPlanCredits(userId, temporaryCredits);

        //update the subscription for each course
        temporaryPlanCodes.forEach(async (e) => {
          await CourseDao.addStudentToCourse(e);
        });

        return res.status(200).end();
      }else{
        return res.status(503).json({error: "A problem occurred. Try deleting and redefining the plan again."})
      }


    } catch (error) {

      res.status(503).json({ error: error });
    }
  };

  const deleteCommittedPlan = async (req, res) => {
    //delete the final plan

    /*** params validation */
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      return res.status(422).json({ error: "params validation error" });
    }

    try {

      /*** get the profile */
      const profile = await UserDao.getUserById(userId)
      
      /*** take the courses of the final plan */
      const finalPlanToUnsubscribe = [...profile.finalPlan]

      /*** unsubscribe the student from each course */
      finalPlanToUnsubscribe.forEach(async (e)=>{
        await CourseDao.removeStudentFromCourse(e)
      })

      /*** delete the final final plan from the student */
      await UserDao.deleteCommittedPlan(userId)

      /*** reset the number of credits of the final plan of the student */
      await UserDao.setFinalPlannedCreditsToZero(userId)

      

      return res.status(200).end();

    } catch (error) {
      return res.status(503).json({error: error})
    }
  };

  /** USER FUNCTIONALITY */

  const getMyProfile = async (req, res) => {
    /*** params validation */
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      return res.status(422).json({ error: "params validation error" });
    }

    await UserDao.getUserById(userId)
      .then((profile) => {
        return res.status(200).json(profile);
      })
      .catch((err) => {
        return res.status(503).json({ err: err });
      });
  };

  return {
    getMyProfile: getMyProfile,
    commitPlan: commitPlan,
    deleteCommittedPlan: deleteCommittedPlan,
  };
}

module.exports = userApi;
