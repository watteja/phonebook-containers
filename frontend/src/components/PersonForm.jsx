import PropTypes from "prop-types";

const PersonForm = ({
  onAddPerson,
  name,
  onNameChange,
  number,
  onNumberChange,
}) => {
  return (
    <form onSubmit={onAddPerson}>
      <div>
        name: <input value={name} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

PersonForm.propTypes = {
  onAddPerson: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  number: PropTypes.string.isRequired,
  onNumberChange: PropTypes.func.isRequired,
};

export default PersonForm;
