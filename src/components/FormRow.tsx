type Props = {
  type: string;
  name: string;
  value: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  labelText?: string;
};
const FormRow = (props: Props) => {
  return (
    <div className="form-row">
      <label htmlFor={props.name} className="form-label">
        {props.labelText || props.name}
      </label>
      <input
        type={props.type}
        value={props.value}
        name={props.name}
        onChange={props.handleChange}
        className="form-input"
      />
    </div>
  );
};
export default FormRow;
