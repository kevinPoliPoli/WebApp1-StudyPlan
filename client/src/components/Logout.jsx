import { Button } from "react-bootstrap";
function LogoutButton(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleLogout();
  };

  return (

    <Button variant="outline-primary" onClick={handleSubmit}>
      Logout
    </Button>

  );
}

export { LogoutButton };
