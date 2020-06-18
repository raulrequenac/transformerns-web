import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import TransformernsService from '../services/TransformernsService'
import '../styles/Salesrep.css'

const Salesreps = () => {
  const { newSalesRep, getAllSalesReps } = TransformernsService
  const [salesreps, setSalesReps] = useState([])
  const [findError, setFindError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [status, setStatus] = useState({ error: false, loading: false })
  const {error, loading} = status
  const [name, setName] = useState("")
  
  useEffect(() => {
    getAllSalesReps()
      .then(
        (salesrepList) => {
          setSalesReps(salesrepList.data)
          setSuccess(false)
        },
        () => setFindError(true)
      )
  }, [getAllSalesReps, success])

  const handleOnChange = (e) => setName(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus({error: false, loading: true})
  }

  useEffect(() => {
    if (loading && !error) {
      newSalesRep({ name })
        .then(
          (salesrep) => {
            setStatus({ error: false, loading: false })
            setSuccess(true)
          },
          () => setStatus({error: true, loading: false})
      )
    }
  }, [error, loading, newSalesRep, name])

  const errorClassName = error ? "invalid" : ""

  return (
    <div className="Salesreps pt-5">
      <Navbar />
      <h1>SalesRep</h1>
      <form onSubmit={handleSubmit}>
        <input 
          onChange={handleOnChange}
          type="text"
          name="name"
          placeholder="New SalesRep name"
          className={errorClassName}
        />
        <button type="submit"className="btn">Add</button>
      </form>
      <table className="table">
          <th>ID</th>
          <th>NAME</th>
      {findError ? <p>An error ocurred...</p> : salesreps.map(s => 
          <tr>
            <td>{s.id}</td>
            <td>{s.name}</td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default Salesreps