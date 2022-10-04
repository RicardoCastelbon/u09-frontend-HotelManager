import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import styled from "styled-components";

type Props = {};

const Landing = (props: Props) => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt="Hotel Manager" className="logo" />
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
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img src={main} alt="hotel picture" className="img main-img" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Landing;
