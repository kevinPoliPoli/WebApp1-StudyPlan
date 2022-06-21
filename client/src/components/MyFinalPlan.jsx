import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import CourseRow from "./CourseRow";

function MyFinalPlan(props) {

  const myCourses = props.profile.finalPlan

  const myCoursesFull = []
  props.courses.forEach(e => {
    if (myCourses.indexOf(e.code) !== -1) {
      myCoursesFull.push(e)
    }
  })

  if (myCoursesFull.length !== 0) {
    return (
      <Container >
        <h1>Commited Plan</h1>
        {props.committedPlanMessage ? <Alert variant={"success"} onClose={() => props.setCommittedPlanMessage('')} dismissible>{props.committedPlanMessage}</Alert> : ""}
        <br></br>
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
            </tr>
          </thead>
          <tbody>
            {myCoursesFull.map((course) => { return <CourseRow key={course.code} profile={props.profile} course={course} loggedIn={props.loggedIn} removeCourse={props.removeCourse} addOrRemove={0} finalPlan={1} check={0} temporaryPlanType={props.temporaryPlanType} /> })}
          </tbody>
        </Table>
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <h4>Credits: {props.profile.finalPlanCredits}</h4>
            </Col>
            <Col>
              <Button variant="danger" onClick={() => { props.deleteCommittedPlan(props.profile.id) }}>Delete committed plan</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="danger" onClick={() => { props.deleteEntirePlans(props.profile.id) }}>Delete both plans</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="warning" onClick={() => { props.editFinalPlan(props.profile.id) }}>Edit plan</Button>
            </Col>
          </Row>
        </Container>
      </Container>
    )
  } else {
    return (
      <Container>
        <h1>Commited Plan</h1>
        <br></br>
        <Row><Alert variant={"dark"}>You have not confirmed any study plan. Define a plan and commit it.</Alert></Row>
      </Container>
    );
  }
}

export default MyFinalPlan;
