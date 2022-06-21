import { Col, Container, Row } from "react-bootstrap";
import CoursesTable from "./CoursesTable";

function MainPage(props) {

  return (
    <Row>
      <Col>
        <Container fluid>
          <CoursesTable courses={props.courses} loggedIn={props.loggedIn}/>
        </Container>
      </Col>
    </Row>
  );
}

export default MainPage;
