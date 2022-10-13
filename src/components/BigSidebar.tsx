import Navlinks from "./Navlinks";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";
import Wrapper from "../assets/wrappers/BigSidebar";
type Props = {};
const BigSidebar = (props: Props) => {
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
           <Logo />
          </header>
          <Navlinks />
        </div>
      </div>
      ;
    </Wrapper>
  );
};
export default BigSidebar;
