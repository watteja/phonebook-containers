import PropTypes from "prop-types";

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.name} person={person} onDelete={onDelete} />
      ))}
    </div>
  );
};

const Person = ({ person, onDelete }) => {
  return (
    <div>
      {person.name} {person.number}{" "}
      <button onClick={() => onDelete(person.id)}>delete</button>
    </div>
  );
};

Persons.propTypes = {
  persons: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

Person.propTypes = {
  person: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Persons;
