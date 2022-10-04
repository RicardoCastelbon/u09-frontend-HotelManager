import logo from "../assets/images/logo.svg";

type Props = {};
const Logo = (props: Props) => {
  return <img src={logo} alt="Hotel Manager" className="logo" />;
};

export default Logo;
