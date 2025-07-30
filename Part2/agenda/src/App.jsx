import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({message: null, type: ''})

  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  const handleNameChange = (event) =>
    setNewName(event.target.value)

  const handlePhoneChange = (event) =>
    setNewPhone(event.target.value)

  const handleFilterChange = (event) =>
    setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      const message = `${newName} is already added to the phonebook, replace the old number with a new one?`
      if(window.confirm(message)){
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number: newPhone}
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNotificationMessage({
              message: `${person.name}'s phone number has been updated`,
              type: 'success'
            })
            setTimeout(() => {
              setNotificationMessage({ message: null, type: '' })
            }, 5000)
          })
          .catch(error => {
            setNotificationMessage({
              message: `Information of ${person.name} has already been removed from the server`,
              type: 'error'
            })
            setTimeout(() => {
              setNotificationMessage({ message: null, type: '' })
            }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
          })
        }
        
    } else {
      const personObject = {
        name: newName,
        number: newPhone
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationMessage({
          message: `Added ${personObject.name}`,
          type: 'success'
        })
        setTimeout(() => {
          setNotificationMessage({ message: null, type: '' })
        }, 5000)
      })
    }

    setNewName('')
    setNewPhone('')
  }

  const deletePerson = (id) => {
    const nombre = persons.find(p => p.id === id).name
    const message = `Delete ${nombre}?`
    if(window.confirm(message)){
      personService
      .personDelete(id)
      .then(returnedPerson => {
        setPersons(persons.filter(p => p.id !== id))
        setNotificationMessage({
          message: `Deleted ${nombre}`,
          type: 'error'
        })
        setTimeout(() => {
          setNotificationMessage({ message: null, type: '' })
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage.message} type={notificationMessage.type}/>
      <div>
        <Filter value={filter} onChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
      <PersonForm  addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={deletePerson}/>
    </div>
  )
}

export default App
// Para verificar si una cadena ya existe en un array de cadenas:
//const existsInArray = (arr, str) => arr.includes(str);

// Ejemplo de uso:
// const nombres = ['Ana', 'Luis', 'Pedro'];
// existsInArray(nombres, 'Luis'); // true
// existsInArray(nombres, 'Maria'); // false
