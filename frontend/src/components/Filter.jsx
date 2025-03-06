import PropTypes from "prop-types";

const Filter = ({ onFilterChange }) => {
  return (
    <div>
      filter shown with <input onChange={onFilterChange} />
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
