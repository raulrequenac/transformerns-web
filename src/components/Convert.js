import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import TransformernsService from '../services/TransformernsService'

const productsENUM = ["HYBRID", "FLATBED", "BOX"]
const statusENUM = ["OPEN", "CLOSED_WON", "CLOSED_LOST"]
const industryENUM = ["PRODUCE", "ECOMMERCE", "MANUFACTURING", "MEDICAL", "OTHER"]

const Convert = () => {
  const { id } = useParams()
  const { convertLeadWithAccount, convertLeadNoAccount } = TransformernsService
  const [opp, setOpp] = useState({ product: productsENUM[0], status: statusENUM[0], quantity: -1 })
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
      <form onSubmit={handleSubmit}>
        <select>
          {productsENUM.map((p, key) => (<option value={p} key={key}>{p}</option>))}
        </select>
        <select>
          {statusENUM.map((s, key) => (<option value={s} key={key}>{s}</option>))}
        </select>
        <input
          className=""
          type="number"
          name="quantity"
          onChange={handleOnChangeOpp}
          placeholder="Quantity"
        />
        <p>Create Account?</p><input type="checkbox" onClick={toggleNewAccount}/>
        {newAccount ? (
          <div>
            <input
              className=""
              type="number"
              name="employeeCount"
              onChange={handleOnChangeAcc}
              placeholder="Employee count"
            />
            <input
              className=""
              type="text"
              name="city"
              onChange={handleOnChangeAcc}
              placeholder="City"
            />
            <input
              className=""
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