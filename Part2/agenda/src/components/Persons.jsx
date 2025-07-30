const Persons = ({persons, filter, handleDelete}) => {
    return(
        <div>
            {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => (
                <p key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>Delete</button></p>
            ))
            }
        </div>
    )
}

export default Persons