import { useAppContext } from "../context/appContext";
type Props = {};
const Alert = (props: Props) => {
  const { alertType, alertText } = useAppContext();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};
export default Alert;
