import React, { useState, useEffect } from 'react'
import {Redirect} from 'react-router-dom'
import Navbar from './Navbar'
import TransformernsService from '../services/TransformernsService'
import '../styles/Table.css'

const Leads = () => {
  const { newLead, getAllLeads } = TransformernsService
  const [leads, setLeads] = useState([])
  const [findError, setFindError] = useState(false)
  const [data, setData] = useState({ salesRepId: '', id: '', phoneNumber: '', email: '', companyName: '' })
  const [convert, setConvert] = useState({ redirect: false, id: 0 })
  const [success, setSuccess] = useState(true)
  const [status, setStatus] = useState({ error: false, loading: false })
  const {error, loading} = status

  useEffect(() => {
    if (success)
      getAllLeads()
        .then(
          (leadList) => {
            setLeads(leadList.data)
            setSuccess(false)
          },
          () => setFindError(true)
        )
  }, [getAllLeads, success])

  useEffect(() => {
    if (loading && !error)
      newLead(data)
        .then(
          (leads) => {
            setStatus({ error: false, loading: false })
            setSuccess(true)
          },
          () => setStatus({error: true, loading: false})
        )
  }, [data, error, loading, newLead])

  const handleOnChange = (e) => {
    const {name, value} = e.target

    setData({
      ...data,
      [name]: value
    })
  }

  const onClickConvert = (id) => setConvert({redirect: true, id})

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus({error: false, loading: true})
  }

  const errorClassName = error ? "invalid" : ""
  const input = (value, name) => (
    <input
      className={errorClassName}
      type="text"
      name={value}
      value={data[value]}
      onChange={handleOnChange}
      placeholder={name}
    />
  )

  if (convert.redirect) return <Redirect to={`/convert/${convert.id}`} />

  return (
    <div className="Leads pt-5">
      <Navbar/>
      <h1>Leads</h1>
      <form onSubmit={handleSubmit}>
        {input("salesRepId", "SalesRep Id")}
        {input("id", "Id")}
        {input("name", "Name")}
        {input("phoneNumber", "Phone number")}
        {input("email", "Email")}
        {input("companyName", "Company name")}
        <button type="submit">Add</button>
      </form>
      {findError ? <p>An error ocurred...</p> : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PHONE NUMBER</th>
              <th>COMPANY NAME</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, key) => (
              <tr key={key}>
                <td>{lead.id}<button className="btn" onClick={() => onClickConvert(lead.id)}>Convert</button></td>
                <td>{lead.name}</td>
                <td>{lead.phoneNumber}</td>
                <td>{lead.companyName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Leads