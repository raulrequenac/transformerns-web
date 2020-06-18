import React, { useState, useEffect } from 'react'
import TransformernsService from '../services/TransformernsService'
import Navbar from './Navbar'
import '../styles/Opportunities.css'

const Opportunities = () => {
  const { getOppsBy, getOppsBy2, getAllOpps } = TransformernsService
  const [success, setSuccess] = useState(true)
  const [status, setStatus] = useState({ error: false, loading: false })
  const { error, loading } = status
  const [states, setStates] = useState({ state1: "all", state2: "all" })
  const {state1, state2  } = states
  const [opportunities, setOpportunities] = useState([])
  const [disabled, setDisabled] = useState(state1 === "all" ? "disabled" : "")

  const handleOnChange = (e) => {
    const { name, value } = e.target
    
    setStates({
      ...states,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus({ error: false, loading: true })
    setSuccess(true)
  }

  useEffect(() => {
    if (success) {
      let oppsPromise = null
      if (state1 === "all") oppsPromise = getAllOpps()
      else if (state2 === "all") oppsPromise = getOppsBy({ state1 })
      else oppsPromise = getOppsBy2(states)

      oppsPromise
        .then(
          (oppList) => {
            setOpportunities(oppList.data)
            setStatus({error: false, loading: false})
            setSuccess(false)
          },
          () => setStatus({error: true, loading: false})
        )
    }
  }, [getAllOpps, getOppsBy, getOppsBy2, state1, state2,  states, success])
  
  useEffect(()=> {
      setDisabled(state1==="all" ? "disabled" : "")
  }, [state1]) 

  console.log(opportunities.length ? Array.isArray(opportunities[0]) : opportunities)


  return (
    <div className="Opportunities pt-5">
      <Navbar/>
      <form onSubmit={handleSubmit} className="oppForm">
       <h1>Find</h1>
        <select id="option" onChange={handleOnChange} defaultValue="all" name="state1">
          <option value="all">All</option>
          <option value="salesRep">Sales Rep</option>
          <option value="product">Product</option>
          <option value="country">Country</option>
          <option value="city">City</option>
          <option value="industry">Industry</option>
        </select>
        <h1>by</h1>
        <select id="status" onChange={handleOnChange} defaultValue="all" name="state2">
          <option value="all">All</option>
          <option value="OPEN" disabled={disabled}>OPEN</option>
          <option value="CLOSED_WON" disabled={disabled}>CLOSE WON</option>
          <option value="CLOSED_LOST" disabled={disabled}>CLOSE LOST</option>
        </select>  
      <input type="submit" value="Filter" className="button" />
      </form>
      {error ? <p>An error ocurred...</p> : <table className="table">
        {opportunities.length && !Array.isArray(opportunities[0]) ?
          <thead>{Object.keys(opportunities[0]).map(k => <th>{k}</th>)}</thead> : (
            <thead>
              <th>Attribute</th>
              <th>Opps</th>
            </thead>
          )}
        <tbody>
          {opportunities.map(opp => <tr>{Object.values(opp).map(v => <td>{v}</td>)}</tr>)}
        </tbody>
      </table>}
    </div>
  )
}

export default Opportunities