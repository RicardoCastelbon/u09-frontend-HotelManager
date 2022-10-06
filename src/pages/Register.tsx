import { useEffect, useState } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

type Props = {};
const Register = (props: Props) => {
  const [values, setValues] = useState(initialState);

  //global state and useNavigate

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.target);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>
        {/* name input */}
        <FormRow
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
        />
        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
      </form>
    </Wrapper>
  );
};
export default Register;
