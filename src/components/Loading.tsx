type Props = {
  center: any;
};
const Loading = (props: Props) => {
  return (
    <div className={props.center ? "loading loading-center" : "loading"}></div>
  );
};
export default Loading;
