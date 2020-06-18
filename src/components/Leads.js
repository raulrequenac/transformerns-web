import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import TransformernsService from '../services/TransformernsService'

const Leads = () => {
  const { newLead, getAllLeads, convertLeadWithAccount, convertLeadNoAccount } = TransformernsService
  const [leads, setLeads] = useState([])
  const [error, setError] = useState(false)
  const [data, setData] = useState({ salesRepId: '', id: '', phoneNumber: '', email: '', companyName: ''})

  useEffect(() => {
    getAllLeads()
      .then(
        (leadList) => setLeads(leadList.data),
        () => setError(true)
      )
  }, [getAllLeads])

  const handleOnChange = (e) => {
    const {name, value} = e.target

    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="Leads pt-5">
      <Navbar/>
      <h1>Leads</h1>
      <form onSubmit={handleSubmit}>
        <input 
          className=""
          type="text"
          name="salesRepId"
          value={data.salesRepId}
          onChange={handleOnChange}
          placeholder="SalesRep Id"
        />
        <input
          className=""
          type="text"
          name="id"
          value={data.id}
          onChange={handleOnChange}
          placeholder="Id"
        />
        <input
          className=""
          type="text"
          name="name"
          value={data.name}
          onChange={handleOnChange}
          placeholder="Name"
        />
        <input 
          className=""
          type="text"
          name="phoneNumber"
          value={data.phoneNumber}
          onChange={handleOnChange}
          placeholder="Phone number"
        />
        <input 
          className=""
          type="text"
          name="email"
          value={data.email}
          onChange={handleOnChange}
          placeholder="Email"
        />
        <input
          className=""
          type="text"
          name="companyName"
          value={data.companyName}
          onChange={handleOnChange}
          placeholder="Company name"
        />
        <button type="submit">Add</button>
      </form>

      {leads.map(lead => (
        <div>
          <p>{Object.entries(lead)}</p>
          <div>Convert</div>
        </div>
      ))}
    </div>
  )
}

export default Leads