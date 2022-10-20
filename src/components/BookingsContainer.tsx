import { useEffect } from "react";
import Wrapper from "../assets/wrappers/BookingsContainer";
import { useAppContext } from "../context/appContext";
import Booking from "./Booking";
import Loading from "./Loading";

const BookingsContainer = () => {
  const { getBookings, bookings, isLoading, page, totalBookings } =
    useAppContext();

  useEffect(() => {
    getBookings();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (bookings.length === 0) {
    return (
      <Wrapper>
        <h2>No bookings to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalBookings} booking{bookings.length > 1 && "s"}
      </h5>
      <div className="bookings">
        <table cellSpacing={0}>
          <tbody>
            <tr>
              <th className="border-radius-left">room type</th>
              <th>check-in</th>
              <th>check-out</th>
              <th>price</th>
              <th>first name</th>
              <th>last name</th>
              <th>email</th>
              <th>phone</th>
              <th className="border-radius-right">status</th>
            </tr>

            {bookings.map((booking) => {
              return <Booking key={booking._id} {...booking} />;
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};
export default BookingsContainer;
