import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import NavBar from "./components/Navigation";
import api from "./apis/apis";
import MainPage from "./components/MainPage";
import LoginForm from "./components/Login";
import DefaultRoute from "../src/components/DefaultRoute";
import MyProfile from "./components/MyProfile";

function App() {

  /***
   * courses: contains all the courses in the system
   * loggedIn: is the user logged?
   * message: welcome / log out message
   * profile: profile of the logged in user
   * supportMessage: gives information about add and delete functionalities of the temporary study plan
   * confirmationPlanMessage: gives information about credits compability with already selected courses 
   * committedPlanMessage: gives information about the committing phase of the temporary study plan
   * temporaryStudyPlan: temporary study plan stored only in the front end
   * temporaryCredits credits of the temporary study plan
   * temporaryPlanType: subscription type of the temporary study plan
   */

  const [courses, setCourses] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState({});
  const [supportMessage, setSupportMessage] = useState("");
  const [confirmationPlanMessage, setConfirmationPlanMessage] = useState("");
  const [committedPlanMessage, setCommittedPlanMessage] = useState("");
  const [temporaryStudyPlan, setTemporaryStudyPlan] = useState([]);
  const [temporaryCredits, setTemporaryCredits] = useState(0);
  const [temporaryPlanType, setTemporaryPlanType] = useState(0);

  /*** USE EFFECTS */

  useEffect(() => {
    getCourses();
  }, [loggedIn]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const profile = await api.getUserInfo();
        //profile.courses = JSON.parse(profile.courses)
        //profile.finalPlan = JSON.parse(profile.finalPlan)
        setProfile(profile);
        setLoggedIn(true);
      } catch (error) {
        console.log(error);
      }
    };
    checkAuth();
  }, []);

  /*** COURSE METHODS */

  //get all courses
  const getCourses = async () => {
    const courses = await api.getCourses();
    const sortedCourses = courses.sort((e1, e2) => {
      return String(e1.name).localeCompare(String(e2.name));
    });
    setCourses(sortedCourses);
  };

  /*** USER METHODS */

  //get student profile
  const getProfile = async () => {
    const updatedProfile = await api.getProfile(profile.id);
    setProfile(updatedProfile);
  };

  //commit the temporary plan to final plan
  const commitPlan = async (temporaryPlan, userId, temporaryPlanType) => {
    try {
      if (temporaryPlanType === false) {
        if (temporaryCredits < 20) {
          setConfirmationPlanMessage(
            "You need to reach a minimum of 20 credits to confirm yout study plan"
          );
        } else {
          await api.commitPlan(temporaryPlan, userId, temporaryPlanType);
          const updatedProfile = await api.getProfile(userId);
          setProfile(updatedProfile);
          setCommittedPlanMessage("Plan correctly committed");
          getCourses();
        }
      } else {
        if (temporaryCredits < 40) {
          setConfirmationPlanMessage(
            "You need to reach a minimum of 60 credits to confirm yout study plan"
          );
        } else {
          await api.commitPlan(temporaryPlan, userId, temporaryPlanType);
          const updatedProfile = await api.getProfile(userId);
          setProfile(updatedProfile);
          setCommittedPlanMessage("Plan correctly committed");
          getCourses();
        }
      }
    } catch (error) {
      const message = JSON.parse(error.message);
      setSupportMessage(message.error);
      console.log(error);
    }
  };

  //delete committed plan
  const deleteCommittedPlan = async (userId) => {
    try {
      await api.deleteCommittedPlan(userId);
      setSupportMessage(`The entire plan has been deleted.`);
      getCourses();
      getProfile();
    } catch (error) {
      setMessage(error.message);
    }
  };

  //delete both the committed and the temporary plans
  const deleteEntirePlans = async (userId) => {
    try {
      await api.deleteCommittedPlan(userId);
      setTemporaryStudyPlan([]);
      setTemporaryCredits(0);
      setTemporaryPlanType(0)
      setSupportMessage(`Both plans has been deleted.`);
      getCourses();
      getProfile();
    } catch (error) {
      console.log(error);
    }
  };

  /** TEMPORARY STUDY PLAN FUNCTIONALITIES */

  //add a course to the temporary plan - OK
  const addCourse = (course) => {
    const myTempPlan = temporaryStudyPlan;
    const myTempCredits = temporaryCredits;
    const courseToCheck = course;

    const validate = [];

    //check if the course accepts other students
    if (courseToCheck.maxStudents !== null) {
      if (!(courseToCheck.maxStudents > courseToCheck.enrolled)) {
        if(validate[1] === 0 || validate[1] === undefined){
          validate[0] = 1;
          validate[1] = 1
        }
         
      }
    }
    //check if the course is already in the temporary study plan
    if (myTempPlan.length > 0) {
      const codes = myTempPlan.map((e) => {
        return e.code;
      });

      if (codes.indexOf(courseToCheck.code) !== -1) {
    
        if(validate[1] === 0 || validate[1] === undefined){
          validate[0] = 2;
          validate[1] = 1
        }
        
      }
    }

    //check if the number of credits of the course is compatible with the type of subscription
    if (temporaryPlanType === false && myTempCredits + courseToCheck.credits > 40) {
      if(validate[1] === 0 || validate[1] === undefined){
        validate[0] = 3;
        validate[1] = 1
      }
      
    } else if (temporaryPlanType === true && myTempCredits + courseToCheck.credits > 80) {
      if(validate[1] === 0 || validate[1] === undefined){
        validate[0] = 4;
        validate[1] = 1
      }
      
    }

    //check if there are some preparatory courses
    const preparatoryCoursesToInsert = [];
    if (courseToCheck.preparatoryCourse.length > 0) {
      const myTempPlanCodes = myTempPlan.map((e) => {
        return e.code;
      });
      courseToCheck.preparatoryCourse.forEach((e) => {
        if (myTempPlanCodes.indexOf(e) === -1) {
          preparatoryCoursesToInsert.push(e);
        }
      });
      if (preparatoryCoursesToInsert.length > 0) {
        if(validate[1] === 0 || validate[1] === undefined){
          validate[0] = 5;
          validate[1] = 1
        }
      }
    }

    //check if there are some incompatible courses
    const incompatibleCoursesToRemove = [];
    if (courseToCheck.incompatibleWith.length > 0) {
      const myTempPlanCodes = myTempPlan.map((e) => {
        return e.code;
      });
      courseToCheck.incompatibleWith.forEach((e) => {
        if (myTempPlanCodes.indexOf(e) >= 0) {
          incompatibleCoursesToRemove.push(e);
        }
      });
      if (incompatibleCoursesToRemove.length > 0) {
        if(validate[1] === 0 || validate[1] === undefined){
          validate[0] = 6;
          validate[1] = 1
        }
        
      }
    }


    switch (validate[0]) {
      case 1:
        setSupportMessage(`The course ${course.code} doesn't accept other students`);

        break;
      case 2:
        setSupportMessage(`The course ${course.code} is already in your temporary study plan`);

        break;
      case 3:
        setSupportMessage(`The course ${course.code} exceeds of ${ myTempCredits + courseToCheck.credits - 40} credit(s)`);

        break;
      case 4:
        setSupportMessage(`The course ${course.code} exceeds of ${myTempCredits + courseToCheck.credits - 80} credit(s)`);

        break;
      case 5:
        setSupportMessage(`You must insert the following ${preparatoryCoursesToInsert.length} preparatory course(s) before the insertion of the course ${course.code}: ${preparatoryCoursesToInsert}`);

        break;
      case 6:
        setSupportMessage(`You must remove the following ${incompatibleCoursesToRemove.length} incompatible course(s) before the insertion of the course ${course.code}: ${incompatibleCoursesToRemove}`);

        break;
      default:
        setSupportMessage(`Course ${course.code} correctly added in your temporary study plan`);
        const updatedTemporaryStudyPlan = Array.from(temporaryStudyPlan);
        updatedTemporaryStudyPlan.push(course);
        setTemporaryStudyPlan(updatedTemporaryStudyPlan);
        setTemporaryCredits(temporaryCredits + course.credits);
        break;
    }
  };

  //remove a course from the temporary plan
  const removeCourse = (course) => {
    //take only the courses which has un the dependencies the course i want to remove from the temporary study plan
    const coursesWithDependency = [];
    temporaryStudyPlan.forEach((e) => {
      if (e.preparatoryCourse.indexOf(course.code) !== -1) {
        coursesWithDependency.push(e);
      }
    });

    const codes = [];
    if (coursesWithDependency.length !== 0) {
      coursesWithDependency.forEach((e) => {
        codes.push(e.code);
      });
    }

    if (codes.length > 0) {
      setSupportMessage(
        `Remove first ${coursesWithDependency.length} course(s) with code ${codes}`
      );
    } else {
      const temporaryPlan = Array.from(temporaryStudyPlan);
      const updatedTemporaryStudyPlan = temporaryPlan.filter((e) => {
        if (e.code === course.code) {
          return 0;
        }

        return 1;
      });
      setTemporaryStudyPlan(updatedTemporaryStudyPlan);
      setTemporaryCredits(temporaryCredits - course.credits);
      setSupportMessage(
        `Course ${course.code} correctly removed from your temporary study plan`
      );
    }
  };

  //function used to mark courses as incompatible and compatible with the current study plan - OK
  const validate = (course) => {
    const myTempPlan = temporaryStudyPlan;
    const myTempCredits = temporaryCredits;
    const courseToCheck = course;

    //check if the course accepts other students
    if (courseToCheck.maxStudents !== null) {
      if (!(courseToCheck.maxStudents > courseToCheck.enrolled)) {
        return false;
      }
    }

    //check if the course is already in the temporary study plan
    if (myTempPlan.length > 0) {
      const codes = myTempPlan.map((e) => {
        return e.code;
      });

      if (codes.indexOf(courseToCheck.code) !== -1) {
        return false;
      }
    }

    //check if the number of credits of the course is compatible with the type of subscription
    if (
      temporaryPlanType === false &&
      myTempCredits + courseToCheck.credits > 40
    ) {
      return false;
    } else if (
      temporaryPlanType === true &&
      myTempCredits + courseToCheck.credits > 80
    ) {
      return false;
    }

    //check if there are some preparatory courses
    const preparatoryCoursesToInsert = [];
    if (courseToCheck.preparatoryCourse.length > 0) {
      const myTempPlanCodes = myTempPlan.map((e) => {
        return e.code;
      });
      courseToCheck.preparatoryCourse.forEach((e) => {
        if (myTempPlanCodes.indexOf(e) === -1) {
          preparatoryCoursesToInsert.push(e);
        }
      });
      if (preparatoryCoursesToInsert.length > 0) {
        return false;
      }
    }

    //check if there are some incompatible courses
    const incompatibleCoursesToRemove = [];
    if (courseToCheck.incompatibleWith.length > 0) {
      const myTempPlanCodes = myTempPlan.map((e) => {
        return e.code;
      });
      courseToCheck.incompatibleWith.forEach((e) => {
        if (myTempPlanCodes.indexOf(e) >= 0) {
          incompatibleCoursesToRemove.push(e);
        }
      });
      if (incompatibleCoursesToRemove.length > 0) {
        return false;
      }
    }

    //all tests passed
    return true;
  };

  //function used to edit the previously committed study plan
  const editFinalPlan = () => {
    //rebuild all the informations of the course
    const myFullCourses = courses.filter((e) => {
      return profile.finalPlan.indexOf(e.code) !== -1;
    });
    setTemporaryStudyPlan(myFullCourses);
    setTemporaryCredits(profile.finalPlanCredits);
    profile.fullTime===1 ? setTemporaryPlanType(true) : setTemporaryPlanType(false);
  };

  //delete temporary plan - OK
  const deleteTemporaryPlan = () => {
    setTemporaryStudyPlan([]);
    setTemporaryCredits(0);
    setTemporaryPlanType(0);
    setSupportMessage(`The entire plan has been deleted.`);
  };

  /*** AUTHENTICATION FUNCTIONALITIES */

  //function to manage login - OK
  const handleLogin = async (credentials) => {
    try {
      const user = await api.logIn(credentials);
      setLoggedIn(true);
      setProfile(user);
      setMessage({ msg: `Welcome, ${user.name}!`, type: "success" });
    } catch (err) {
      console.log(err);
      setMessage({ msg: err, type: "danger" });
    }
  };

  //function to manage logout - OK
  const handleLogout = async () => {
    await api.logOut();
    // clean up everything
    setLoggedIn(false);
    setCourses([]);
    setMessage({ msg: `Logout successful`, type: "success" });
    setProfile({});
    setSupportMessage("");
    setConfirmationPlanMessage("");
    setTemporaryStudyPlan([]);
    setTemporaryCredits(0);
    setCommittedPlanMessage("");
    setTemporaryPlanType(0);
  };

  return (
    <Container fluid className="App p-0">
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <NavBar
                loggedIn={loggedIn}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
              />
            }
          >
            <Route
              path="/"
              element={
                !loggedIn ? (
                  <Navigate replace={true} to={"/main"} />
                ) : (
                  <Navigate replace={true} to={"/myplan"} />
                )
              }
            />

            <Route
              path={"/main"}
              element={
                !loggedIn ? (
                  <MainPage courses={courses} loggedIn={loggedIn} />
                ) : (
                  <Navigate replace={true} to={"/myplan"} />
                )
              }
            />

            <Route
              path={"/login"}
              element={
                !loggedIn ? (
                  <LoginForm
                    handleLogin={handleLogin}
                    setMessage={setMessage}
                    message={message}
                  />
                ) : (
                  <Navigate replace={true} to={"/myplan"} />
                )
              }
            />

            <Route
              path={"/myplan"}
              element={
                loggedIn ? (
                  <MyProfile
                    //utils functionalities
                    supportMessage={supportMessage}
                    setSupportMessage={setSupportMessage}
                    confirmationPlanMessage={confirmationPlanMessage}
                    setConfirmationPlanMessage={setConfirmationPlanMessage}
                    message={message}
                    setMessage={setMessage}
                    committedPlanMessage={committedPlanMessage}
                    setCommittedPlanMessage={setCommittedPlanMessage}
                    //profile functionalities
                    profile={profile}
                    courses={courses}
                    loggedIn={loggedIn}
                    toggleConfirmPlan={commitPlan}
                    //final plan functionalities
                    deleteEntirePlans={deleteEntirePlans}
                    deleteCommittedPlan={deleteCommittedPlan}
                    editFinalPlan={editFinalPlan}
                    //temporary plan functionalities
                    temporaryStudyPlan={temporaryStudyPlan}
                    temporaryCredits={temporaryCredits}
                    deleteTemporaryPlan={deleteTemporaryPlan}
                    addCourse={addCourse}
                    removeCourse={removeCourse}
                    validate={validate}
                    temporaryPlanType={temporaryPlanType}
                    setTemporaryPlanType={setTemporaryPlanType}
                  />
                ) : (
                  <Navigate replace={true} to={"/login"} />
                )
              }
            />

            <Route path="*" element={<DefaultRoute />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
