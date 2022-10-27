import { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";

type Props = {};
const Settings = (props: Props) => {
  const {
    user,
    showAlert,
    displayAlert,
    updateUser,
    isLoading,
    handleChange,
    employeeName,
    employeeLastName,
    employeeEmail,
    employeePassword,
    employeeSalary,
    createEmployee,
    clearValues,
  } = useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!email || !name || !lastName) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName });
  };
  const onSubmitCreateEmployee = (e: any) => {
    e.preventDefault();
    console.log({
      employeeName,
      employeeLastName,
      employeeEmail,
      employeePassword,
      employeeSalary,
    });

    if (
      !employeeName ||
      !employeeLastName ||
      !employeeEmail ||
      !employeePassword
    ) {
      displayAlert();
      return;
    }
    createEmployee();
  };

  const handleEmployeeInput = (e: any) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        {showAlert && <Alert />}
        <h3>Personal info</h3>

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

      {/* CREATE AN EMPLOYEE */}
      {user.role == "admin" && (
        <form className="form">
          <h3>create a new employeee</h3>

          {/* name */}
          <div className="form-center">
            <FormRow
              labelText="name"
              type="text"
              name="employeeName"
              value={employeeName}
              handleChange={handleEmployeeInput}
            />
            <FormRow
              labelText="last name"
              type="text"
              name="employeeLastName"
              value={employeeLastName}
              handleChange={handleEmployeeInput}
            />
            <FormRow
              labelText="email"
              type="email"
              name="employeeEmail"
              value={employeeEmail}
              handleChange={handleEmployeeInput}
            />
            <FormRow
              labelText="password"
              type="password"
              name="employeePassword"
              value={employeePassword}
              handleChange={handleEmployeeInput}
            />
            <FormRow
              labelText="salary"
              type="number"
              name="employeeSalary"
              value={employeeSalary}
              handleChange={handleEmployeeInput}
            />
            <button
              className="btn btn-block"
              type="submit"
              disabled={isLoading}
              onClick={(e) => {
                onSubmitCreateEmployee(e);
                clearValues();
              }}
            >
              {isLoading ? "Please Wait..." : "create employee"}
            </button>
          </div>
        </form>
      )}

      {/* GET ALL EMPLOYEES */}
      

    </Wrapper>
  );
};
export default Settings;
