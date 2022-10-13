import { NavLink } from "react-router-dom";
import links from "../utils/links";

type Props = {};
const Navlinks = (toggleSidebar: any) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            end
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default Navlinks;
