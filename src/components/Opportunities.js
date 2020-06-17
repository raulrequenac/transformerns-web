import React, { useState, useEffect, useContext } from 'react'
import TransformernsService from '../services/TransformernsService'
import Navbar from './Navbar'
import StatusForm from './StatusForm'
import '../styles/Opportunity.css'

const Opportunity = () => {
  
  const [success, setSuccess] = useState(false)
  const [status, setStatus] = useState({ error: false, loading: false })
  const [state, setState] = useState("all")
  const { opportunities, allOpp } = TransformernsService
  const { error, loading } = status
  const [opportunitiesList, setOpportunitiesList] = useState([]) 

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus({ error: false, loading: true })
  }

  useEffect(()=>{
    if(state == "all"){
      allOpp().then(oppList => setOpportunitiesList(oppList.data))
    } else {
      opportunities({status1:state,status2:"OPEN"}).then(oppList => setOpportunitiesList(oppList.data))
    }
  }, [])
 
  const handleOnChange =(e) =>{
    setStatus(e.target.value)
  }

  const [disabled, setDisabled] = useState(state=="all" ? "disabled" : "")
    useEffect(()=> {
        setDisabled(state=="all" ? "disabled" : "")
    }, [state]) 


  return (
    <div className="Opportunity">
      <Navbar/>
      <form onSubmit={handleSubmit} className="oppForm">
        <label for="option">Choose an option:</label>

        <select id="option" onChange={handleOnChange}>
          <option value="all" selected>All</option>
          <option value="salesRep">Sales Rep</option>
          <option value="product">Product</option>
          <option value="country">Country</option>
          <option value="city">City</option>
          <option value="industry">Industry</option>
        </select>
        <StatusForm disabled={disabled}/>      
      <input type="submit" value="Filter" className="button" />
      </form>
    </div>
  )
}

export default Opportunity