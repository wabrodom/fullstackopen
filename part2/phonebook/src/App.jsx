import { useState } from 'react'

import FormToAddPeopleNumber from "./components/FormToAddPeopleNumber"
import FilterByName from "./components/FilterByName"
import PhoneBooks from "./components/PhoneBooks"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchName, setSearchName] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value);
  const handlePhoneChange = (event) => setNewPhone(event.target.value);
  const handleSearchChange = (event => setSearchName(event.target.value))
  

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    }
    
    const currentName = personObject.name;
    const personNames = persons.map(obj => obj.name);

    if (personNames.includes(currentName) ) {
      alert(`${currentName} is already added to the phonebook`);
      setNewName('');
      setNewPhone('');
      return;
    }
    setPersons(persons.concat(personObject))
    setNewName('');
    setNewPhone('');
  }

  const searchedPerson = searchName === ''? persons : persons.filter(obj => {
    const personName = obj.name.toLowerCase();
    if (personName.indexOf(searchName.toLowerCase()) !== -1) {
      return true;
    }
  })

  return (
    <div>

      <h2>Phonebook</h2>

      <FilterByName 
        handleChange={handleSearchChange}
        searchName={searchName}
      />
    
     <FormToAddPeopleNumber 
        handleSubmit={addPerson}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        newName={newName}
        newPhone={newPhone}
      />  
      
      <h2>Numbers</h2>
      <PhoneBooks persons={searchedPerson}/>
    </div>
  )
}


export default App