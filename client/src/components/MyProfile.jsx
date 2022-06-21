import CoursesTable from "./CoursesTable";
import MyTemporaryStudyPlan from "./MyTemporaryStudyPlan";
import MyInformations from "./MyInformations";
import MyFinalPlan from "./MyFinalPlan";

import { Alert, Row } from "react-bootstrap";

function MyProfile(props) {

  const profile = props.profile;
  const courses = props.courses;

  return (

    <div>
      {props.message && <Row><Alert variant={props.message.type} onClose={() => props.setMessage('')} dismissible>{props.message.msg}</Alert></Row>}

      <MyInformations
        profile={profile}
        temporaryStudyPlan={props.temporaryStudyPlan} />
      <br></br>
      <MyFinalPlan
        removeCourse={props.removeCourse}
        profile={profile}
        toggleConfirmPlan={props.toggleConfirmPlan}
        loggedIn={props.loggedIn}
        courses={courses}
        deleteEntirePlan={props.deleteEntirePlan}
        confirmationPlanMessage={props.confirmationPlanMessage}
        setConfirmationPlanMessage={props.setConfirmationPlanMessage}
        deleteCommittedPlan={props.deleteCommittedPlan}
        deleteEntirePlans={props.deleteEntirePlans}
        committedPlanMessage={props.committedPlanMessage}
        setCommittedPlanMessage={props.setCommittedPlanMessage}
        editFinalPlan={props.editFinalPlan}
        temporaryPlanType={props.temporaryPlanType} 
        />
      <br></br>
      <MyTemporaryStudyPlan
        removeCourse={props.removeCourse}
        profile={profile}
        toggleConfirmPlan={props.toggleConfirmPlan}
        loggedIn={props.loggedIn}
        courses={courses}
        deleteEntirePlan={props.deleteEntirePlan}
        confirmationPlanMessage={props.confirmationPlanMessage}
        setConfirmationPlanMessage={props.setConfirmationPlanMessage}
        deleteTemporaryPlan={props.deleteTemporaryPlan}
        temporaryStudyPlan={props.temporaryStudyPlan}
        temporaryCredits={props.temporaryCredits}
        temporaryPlanType={props.temporaryPlanType}
        setTemporaryPlanType={props.setTemporaryPlanType} />
      <br></br>
      <CoursesTable
        supportMessage={props.supportMessage}
        setSupportMessage={props.setSupportMessage}
        courses={courses}
        loggedIn={props.loggedIn}
        addCourse={props.addCourse}
        profile={profile}
        temporaryStudyPlan={props.temporaryStudyPlan}
        temporaryCredits={props.temporaryCredits}
        temporaryPlanType={props.temporaryPlanType}
        check={1}
        validate={props.validate} 
        />
      <br></br>
    </div>
  );
}

export default MyProfile;
