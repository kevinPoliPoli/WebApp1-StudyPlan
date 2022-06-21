import { Container, Table } from "react-bootstrap";


function MyInformations(props) {

  const profile = props.profile

  if (profile.fullTime === null) {
    return (
      <Container >
        <br></br>
        <h1>My Informations</h1>
        <br></br>

        <Table hover responsive>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Final Plan Credits</th>
              <th>Full Time</th>
              <th>Min Credits</th>
              <th>Max Credits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{profile.id}</td>
              <td>{profile.name}</td>
              <td>{profile.surname}</td>
              <td>{"N/A"}</td>
              <td>{"N/A"}</td>
              <td>{"N/A"}</td>
              <td>{"N/A"}</td>
            </tr>

          </tbody>
        </Table>



      </Container>
    )

  } else {
    return (


      <Container >
        <br></br>
        <h1>My Informations</h1>
        <br></br>

        <Table hover responsive>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Final Plan Credits</th>
              <th>Full Time</th>
              <th>Min Credits</th>
              <th>Max Credits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{profile.id}</td>
              <td>{profile.name}</td>
              <td>{profile.surname}</td>
              <td>{profile.finalPlanCredits}</td>
              <td>{profile.fullTime === 1 ? "yes" : "no"}</td>
              <td>{profile.fullTime === 1 ? "60" : "20"}</td>
              <td>{profile.fullTime === 1 ? "80" : "40"}</td>
            </tr>

          </tbody>
        </Table>



      </Container>

    );
  }



}

export default MyInformations;
