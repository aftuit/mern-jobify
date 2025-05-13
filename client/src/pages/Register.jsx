import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" labelText="Name" defaultValue="John" />
        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
          defaultValue="Smith"
        />
        <FormRow
          type="email"
          name="email"
          labelText="Email"
          defaultValue="john@smith.com"
        />
        <FormRow
          type="text"
          name="location"
          labelText="Location"
          defaultValue="john@smith.com"
        />
        <FormRow
          type="password"
          name="password"
          labelText="Password"
          defaultValue="secret123"
        />

        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
