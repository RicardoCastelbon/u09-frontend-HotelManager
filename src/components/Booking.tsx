import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Booking = ({
  _id,
  roomType,
  checkin,
  checkout,
  price,
  firstName,
  lastName,
  email,
  phone,
  status,
}) => {
  const { setEditBooking, deleteBooking } = useAppContext();
  return (
    <tr>
      <td>{roomType}</td>
      <td>{checkin}</td>
      <td>{checkout}</td>
      <td>{price}€</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{status}</td>
      <td>
        <Link
          to="/add-booking"
          className="btn edit-btn"
          onClick={() => setEditBooking(_id)}
        >
          Edit
        </Link>
      </td>
      <td>
        <button
          type="button"
          className="btn delete-btn"
          onClick={() => deleteBooking(_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
export default Booking;
