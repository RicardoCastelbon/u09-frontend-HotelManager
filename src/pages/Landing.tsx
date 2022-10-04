import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";
type Props = {};

const Landing = (props: Props) => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            <span>Manage</span> your <span>Hotel</span> has never been so easy
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
            doloremque enim labore exercitationem non at repellendus? Porro
            illum exercitationem voluptas sed velit doloremque, inventore
            ratione molestias aspernatur repudiandae maiores itaque nobis, vel
            aliquam accusamus expedita tenetur officiis nesciunt libero animi!
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="hotel picture" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
