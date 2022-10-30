import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Employee = ({ _id, name, lastName, email, salary }: any) => {
  const { deleteEmployee } = useAppContext();
  return (
    <tr>
      <td>{name}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{salary}€</td>
      <td>
        {/* <Link
          to="/add-booking"
          className="btn edit-btn"
          //onClick={() => setEditBooking(_id)}
        >
          Edit
        </Link> */}
      </td>
      <td>
        <button
          type="button"
          className="btn delete-btn"
          onClick={() => deleteEmployee(_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
export default Employee;
