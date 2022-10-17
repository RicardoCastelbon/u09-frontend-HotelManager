import { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";

type Props = {};
const Settings = (props: Props) => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      if (!email || !name || !lastName) {
      displayAlert();
      return;
    }  
    updateUser({ name, email, lastName });
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <h3>Personal info</h3>
        {showAlert && <Alert />}

        {/* name */}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            labelText="last name"
            type="text"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Settings;
