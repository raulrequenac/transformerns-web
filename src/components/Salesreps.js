import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import TransformernsService from '../services/TransformernsService'

const Salesrep = () => {
  const { getAllSalesRep } = TransformernsService
  const [salesreps, setSalesReps] = useState([])
  const [error, setError] = useState(false)
  
  useEffect(() => {
    getAllSalesRep()
      .then(
        (salesrepList) => setSalesReps(salesrepList.data),
        () => setError(true)
      )
  }, [getAllSalesRep])

  return (
    <div className="Salesrep pt-5">
      <Navbar />
      <h1>SalesRep</h1>
      {error ? <p>An error ocurred...</p> : salesreps.map(s => s.name)}
    </div>
  )
}

export default Salesrep