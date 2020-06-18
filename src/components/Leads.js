import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import TransformernsService from '../services/TransformernsService'

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
      {leads.map(lead => Object.entries(lead))}
    </div>
  )
}

export default Leads