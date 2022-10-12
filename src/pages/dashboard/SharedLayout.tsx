import { Outlet, Link } from "react-router-dom";
import { Navbar, SmallSidebar, BigSidebar } from "../../components";
import Wrapper from "../../assets/wrappers/SharedLayout";

type Props = {};
const SharedLayout = (props: Props) => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};
export default SharedLayout;
