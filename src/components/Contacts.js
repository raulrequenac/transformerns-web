import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import TransformernsService from '../services/TransformernsService'

const Contacts = () => {
  const { getContactsBy, getAllContacts } = TransformernsService
  const [contacts, setContacts] = useState([])
  const [error, setError] = useState(false)
  const [attribute, setAttribute] = useState("all")

  useEffect(() => {
    if (attribute === "all")
      getAllContacts()
        .then(
          (contactList) => setContacts(contactList.data.map(c => Object.entries(c)))
        )
    else
      getContactsBy(attribute)
        .then(
          (contactList) => setContacts(Object.entries(contactList.data)),
          () => setError(true)
        )
  }, [getContactsBy, getAllContacts, attribute])

  const handleOnChange = (e) => setAttribute(e.target.value)

  return (
    <div className="Contacts pt-5">
      <Navbar />
      <h1>Contacts</h1>
      <select onChange={handleOnChange}>
        <option value="all">All</option>
        <option value="country">Country</option>
        <option value="city">City</option>
        <option value="product">Product</option>
        <option value="industry">Industry</option>
      </select>
      {error ? <p>An error ocurred...</p> : contacts}
    </div>
  )
}

export default Contacts