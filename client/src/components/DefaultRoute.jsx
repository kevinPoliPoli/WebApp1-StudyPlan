import { Button, Col, Row } from "react-bootstrap";

function DefaultRoute() {
  return (
    <>
      <br></br>
      <br></br>
      <Row>
        <h1>Nothing here...</h1>
        <p>This is not the route you are looking for!</p>
      </Row>
      <Row>
        <Col>
          <Button size="sm" href="/login">
            Return to the home page
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default DefaultRoute;
