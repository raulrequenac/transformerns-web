import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import TransformernsService from '../services/TransformernsService'

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
        <button type="submit">Add</button>
      </form>
      {findError ? <p>An error ocurred...</p> : salesreps.map(s => s.name)}
    </div>
  )
}

export default Salesreps