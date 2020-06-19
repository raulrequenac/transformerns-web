import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import TransformernsService from '../services/TransformernsService'
import '../styles/Convert.css'

const productsENUM = ["HYBRID", "FLATBED", "BOX"]
const industryENUM = ["PRODUCE", "ECOMMERCE", "MANUFACTURING", "MEDICAL", "OTHER"]

const Convert = () => {
  const { id } = useParams()
  const { convertLeadWithAccount, convertLeadNoAccount } = TransformernsService
  const [opp, setOpp] = useState({ product: productsENUM[0], quantity: -1 })
  const [acc, setAcc] = useState({employeeCount: -1, city: '', country: '', industry: industryENUM[0]})
  const [newAccount, setNewAccount] = useState(false)
  const [accountId, setAccountId] = useState(0)
  const [success, setSuccess] = useState(false)
  const [status, setStatus] = useState({ error: false, loading: false })
  const {error, loading} = status

  const toggleNewAccount = () => setNewAccount(!newAccount)

  const handleOnChangeAccountId = (e) => setAccountId(e.target.value)
  const handleOnChangeAcc = (e) => {
    const { name, value } = e.target

    setAcc({
      ...acc,
      [name]: value
    })
  }
  const handleOnChangeOpp = (e) => {
    const { name, value } = e.target

    setOpp({
      ...opp,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus({error: false, loading: true})
  }

  useEffect(() => {
    if (loading && !error) {
      let promise = null
      if (newAccount) promise = convertLeadWithAccount(id, { ...opp, ...acc })
      else promise = convertLeadNoAccount(id, accountId, opp)

      promise
        .then(
          () => {
            setStatus({ error: false, loading: false })
            setSuccess(true)
          },
          () => setStatus({ error: true, loading: false })
        )
    }
  }, [acc, accountId, convertLeadNoAccount, convertLeadWithAccount, error, id, loading, newAccount, opp])

  if (success) return <Redirect to="/leads"/>

  return (
    <div className="Convert pt-5">
      <Navbar />
      <h1>Convert to Opportunity</h1>
      <form onSubmit={handleSubmit}>
        <select>
          {productsENUM.map((p, key) => (<option value={p} key={key}>{p}</option>))}
        </select>
        <input
          className=""
          type="number"
          name="quantity"
          onChange={handleOnChangeOpp}
          placeholder="Quantity"
        />
        <div>
        <label>Create Account?</label><input id="check" type="checkbox" onClick={toggleNewAccount}/>
        </div>
        {newAccount ? (
          <div>
            <input
              className="param"
              type="number"
              name="employeeCount"
              onChange={handleOnChangeAcc}
              placeholder="Employee count"
            />
            <input
              className="param"
              type="text"
              name="city"
              onChange={handleOnChangeAcc}
              placeholder="City"
            />
            <input
              className="param"
              type="text"
              name="country"
              onChange={handleOnChangeAcc}
              placeholder="Country"
            />
            <select onChange={handleOnChangeAcc}>
              {industryENUM.map((i, key) => <option value={i} key={key}>{i}</option>)}
            </select>
          </div>
        ): (
          <input
            className = ""
            type = "number"
            name = "accountId"
            onChange = {handleOnChangeAccountId}
            placeholder = "AccountId"
          />
          )}
        <button type="submit" className="btn">Convert</button>
      </form>
    </div>
  )
}

export default Convert