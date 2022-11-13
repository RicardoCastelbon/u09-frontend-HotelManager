import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, Alert, FormRowDate } from "../../components";
import { useAppContext } from "../../context/appContext";
type Props = {};
const AddBooking = (props: Props) => {
  const {
    isLoading,
    showAlert,
    displayAlert,
    isEditing,
    roomTypeOptions,
    roomType,
    checkin,
    checkout,
    price,
    firstName,
    lastName,
    email,
    phone,
    statusOptions,
    status,
    handleChange,
    clearValues,
    createBooking,
    editBooking,
  } = useAppContext();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!price || !firstName || !lastName || !email || !phone) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editBooking();
      return;
    }
    createBooking();
  };

  const handleBookingInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit booking" : "add booking"}</h3>
        {showAlert && <Alert />}

        <div className="form-center">
          {/* roomType */}
          <FormRowSelect
            name="roomType"
            labelText="room type"
            value={roomType}
            handleChange={handleBookingInput}
            list={roomTypeOptions}
          />

          {/* checkin */}
          <FormRowDate
            name="checkin"
            labelText="check-in"
            type="date"
            value={checkin}
            handleChange={handleBookingInput}
          />

          {/* checkout */}
          <FormRowDate
            name="checkout"
            labelText="check-out"
            type="date"
            value={checkout}
            handleChange={handleBookingInput}
          />

          {/* price */}
          <FormRow
            type="number"
            name="price"
            value={price}
            handleChange={handleBookingInput}
          />
          {/* firstName */}
          <FormRow
            type="text"
            labelText="first name"
            name="firstName"
            value={firstName}
            handleChange={handleBookingInput}
          />
          {/* lastName */}
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={lastName}
            handleChange={handleBookingInput}
          />
          {/* email */}
          <FormRow
            type="text"
            name="email"
            value={email}
            handleChange={handleBookingInput}
          />
          {/* phone */}
          <FormRow
            type="text"
            name="phone"
            value={phone}
            handleChange={handleBookingInput}
          />

          {/* statusType */}
          <FormRowSelect
            name="status"
            labelText="status"
            value={status}
            handleChange={handleBookingInput}
            list={statusOptions}
          />

          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={onSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddBooking;
