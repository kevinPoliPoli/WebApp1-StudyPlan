import { Alert, Container, Row, Table } from "react-bootstrap"
import CourseRow from "./CourseRow"

function CoursesTable(props) {

  // eslint-disable-next-line
  const course = props.course

  return (
    <Container>
      <br></br>
      <h1>Available courses</h1>
      <br></br>
      {props.supportMessage && <Row><Alert variant={"warning"} onClose={() => props.setSupportMessage('')} dismissible>{props.supportMessage}</Alert></Row>}
      <br></br>

      <Table striped bordered hover responsive >
        <thead>
          {props.loggedIn ? <tr><th>Code</th><th>Name</th><th>Credits</th><th>Maximum students</th><th>Enrolled students</th><th>Incompatible courses</th><th>Preparatory courses</th><th>Actions</th></tr> : <tr><th>Code</th><th>Name</th><th>Credits</th><th>Maximum students</th><th>Enrolled students</th><th>Incompatible courses</th><th>Preparatory courses</th><th>More</th></tr>}
        </thead>
        <tbody>
          {props.courses.map((course) => { return <CourseRow key={course.code} profile={props.profile} code={course.code} course={course} loggedIn={props.loggedIn} addCourse={props.addCourse} temporaryStudyPlan={props.temporaryStudyPlan} temporaryCredits={props.temporaryCredits} supportMessage={props.supportMessage} setSupportMessage={props.setSupportMessage} addOrRemove={1} check={1} validate={props.validate} temporaryPlanType={props.temporaryPlanType} finalPlan={0}/> })}
        </tbody>
      </Table>


    </Container>
  )
}

export default CoursesTable;
