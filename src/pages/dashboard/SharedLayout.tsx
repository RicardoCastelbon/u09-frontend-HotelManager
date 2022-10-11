import { Outlet, Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";

type Props = {};
const SharedLayout = (props: Props) => {
  return (
    <Wrapper>
      <nav>
        <Link to="bookings">Bookings</Link>
        <Link to="add-booking">Add booking</Link>
      </nav>
      <Outlet />
    </Wrapper>
  );
};
export default SharedLayout;
