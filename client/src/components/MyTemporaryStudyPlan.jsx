import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import CourseRow from "./CourseRow";

function MyTemporaryStudyPlan(props) {

  const myCourses = props.temporaryStudyPlan

  const swapButton = () => {
    if (props.temporaryPlanType === true && props.temporaryStudyPlan.length > 0) {
      return <td>Delete the temproary plan to unlock this feature</td>
    } else if (props.temporaryPlanType === true && props.temporaryStudyPlan.length === 0) {
      return <td><Button size="sm" variant="outline-primary" onClick={() => { props.setTemporaryPlanType(!props.temporaryPlanType) }}>switch to part-time</Button>&nbsp;<Button size="sm" variant={"danger"} onClick={() => { props.setTemporaryPlanType(0) }}>Cancel</Button></td>
    }
    else if (props.temporaryPlanType === false && props.temporaryStudyPlan.length > 0) {
      return <td>Delete the temproary plan to unlock this feature</td>
    } else if (props.temporaryPlanType === false && props.temporaryStudyPlan.length === 0) {
      return <td><Button size="sm" variant="outline-primary" onClick={() => { props.setTemporaryPlanType(!props.temporaryPlanType) }}>switch to full-time</Button>&nbsp;<Button size="sm" variant={"danger"} onClick={() => { props.setTemporaryPlanType(0) }}>Cancel</Button></td>
    } else {
      return <td><Button size="sm" variant={"outline-primary"} onClick={() => { props.setTemporaryPlanType(true) }}>Full-time</Button>&nbsp;<Button size="sm" variant={"outline-primary"} onClick={() => { props.setTemporaryPlanType(false) }}>Part-time</Button></td> 
    }
  }

  if (myCourses.length !== 0) {
    return (
      <Container >
        <h1>Temporary study plan</h1>
        {props.confirmationPlanMessage ? <Alert variant={"warning"} onClose={() => props.setConfirmationPlanMessage('')} dismissible>{props.confirmationPlanMessage}</Alert> : ""}
        <br></br>
        <Table hover responsive>
          <thead>
            <tr>
              <th>Subscription type</th>
              <th>Min allowed credits</th>
              <th>Max allowed credits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{props.temporaryPlanType === true ? "full-time" : "part-time"}</td>
              <td>{props.temporaryPlanType === true ? "60" : "20"}</td>
              <td>{props.temporaryPlanType === true ? "80" : "40"}</td>
            </tr>

          </tbody>
        </Table>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Credits</th>
              <th>Maximum students</th>
              <th>Enrolled students</th>
              <th>Incompatible courses</th>
              <th>Preparatory courses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myCourses.map((course) => { return <CourseRow key={course.code} profile={props.profile} course={course} loggedIn={props.loggedIn} removeCourse={props.removeCourse} temporaryStudyPlan={props.temporaryStudyPlan} temporaryCredits={props.temporaryCredits} addOrRemove={0} finalPlan={0} check={0} /> })}
          </tbody>
        </Table>
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <h4>Credits: {props.temporaryCredits}</h4>
            </Col>
            <Col>
              <Button variant="success" onClick={() => { props.toggleConfirmPlan(props.temporaryStudyPlan, props.profile.id, props.temporaryPlanType) }}>Confirm temporary plan</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="outline-danger" onClick={() => { props.deleteTemporaryPlan() }}>Delete temporary plan</Button>
            </Col>
          </Row>
        </Container>



      </Container>
    )
  } else if(props.temporaryPlanType===0){
    return (
      <Container>
        <h1>Temporary study plan</h1>
        <br></br>
        <Table hover responsive>
          <thead>
            <tr>

              <th>Select subscription type</th>
            </tr>
          </thead>
          <tbody>
            <tr>

              {swapButton()}
            </tr>

          </tbody>
        </Table>
        <Row><Alert variant={"dark"}>To start the definition of a temporary study plan select a subscriprion type and add a course from table below</Alert></Row>

      </Container>
    );
  }else{
    return (
      <Container>
        <h1>Temporary study plan</h1>
        <br></br>
        <Table hover responsive>
          <thead>
            <tr>
              <th>Subsciption type</th>
              <th>Min Credits</th>
              <th>Max Credits</th>
              <th>Select subscription type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{props.temporaryPlanType === true ? "full-time" : "part-time"}</td>
              <td>{props.temporaryPlanType === true ? "60" : "20"}</td>
              <td>{props.temporaryPlanType === true ? "80" : "40"}</td>
              {swapButton()}
            </tr>

          </tbody>
        </Table>
        <Row><Alert variant={"dark"}>No courses in your temporary study plan. To start the definition of a temporary study plan add a course from table below</Alert></Row>

      </Container>
    );
  }
}

export default MyTemporaryStudyPlan;
