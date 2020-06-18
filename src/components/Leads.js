import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import TransformernsService from '../services/TransformernsService'
import '../styles/Table.css'

const Leads = () => {
  const { newLead, getAllLeads, convertLeadWithAccount, convertLeadNoAccount } = TransformernsService
  const [leads, setLeads] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    getAllLeads()
      .then(
        (leadList) => setLeads(leadList.data),
        () => setError(true)
      )
  }, [getAllLeads])

  return (
    <div className="Leads pt-5">
      <Navbar/>
      <h1>Leads</h1>
      <table className="table">
          <th>ID</th>
          <th>NAME</th>
          <th>PHONE NUMBER</th>
          <th>COMPANY NAME</th>
      {leads.map(lead => (
        <tr>
          <td>{lead.id}</td>
          <td>{lead.name}</td>
          <td>{lead.phoneNumber}</td>
          <td>{lead.companyName}</td>
        </tr>
      ))}
      </table>
    </div>
  )
}

export default Leads