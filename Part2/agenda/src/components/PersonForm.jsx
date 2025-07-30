const PersonForm = ({addPerson, newName, handleNameChange, newPhone, handlePhoneChange}) => {
    return(
        <form onSubmit={addPerson}>
            <div>
                Name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>Number: <input value={newPhone} onChange={handlePhoneChange}/></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm