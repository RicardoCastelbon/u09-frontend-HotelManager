type Props = {
  labelText?: string;
  name: string;
  value: string | number;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
  list: string[];
};
const FormRowSelect = (props: Props) => {
  return (
    <div className="form-row">
      <label htmlFor={props.name} className="form-label">
        {props.labelText || props.name}
      </label>
      <select
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        className="form-select"
      >
        {props.list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
