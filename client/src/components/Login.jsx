import { useState } from 'react';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';

function LoginForm(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = { username, password };
    props.handleLogin(credentials);
  };

  return (
    <>

      {props.message && <Row><Alert variant={props.message.type} onClose={() => props.setMessage('')} dismissible>{props.message.msg}</Alert></Row> } 

      <br></br>
      <h1>Login page</h1>
      <br></br>
      <br></br>
      <Row>
        <Col></Col>
        <Col xs={4} md={4} lg={4}>
        <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId='username'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} required={true} />
              </Form.Group>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
            <Col>
              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={6} />
              </Form.Group>
            </Col>
          </Row>
          <br></br>
          <Button variant="primary" type="submit">Login</Button>

        </Form>
      </Container>
        </Col>
        <Col></Col>
      </Row>

    </>

  )
};


export default LoginForm 