import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import TransformernsService from '../services/TransformernsService'

const Accounts = () => {
  const {
    getAllAccounts,
    getMedianEmployeeCount,
    getMeanEmployeeCount,
    getMaxEmployeeCount,
    getMinEmployeeCount,
    getMedianOppsPerAccount,
    getMeanOppsPerAccount,
    getMaxOppsPerAccount,
    getMinOppsPerAccount
  } = TransformernsService

  const [accounts, setAccounts] = useState([])
  const [statistics, setStatistics] = useState({
    medianEmployeeCount: 0,
    meanEmployeeCount: 0,
    maxEmployeeCount: 0,
    minEmployeeCount: 0,
    medianOppsPerAccount: 0,
    meanOppsPerAccount: 0,
    maxOppsPerAccount: 0,
    minOppsPerAccount: 0
  })

  useEffect(() => {
    const getAllAccountsPromise = getAllAccounts()
    const getMedianEmployeeCountPromise = getMedianEmployeeCount()
    const getMeanEmployeeCountPromise = getMeanEmployeeCount()
    const getMaxEmployeeCountPromise = getMaxEmployeeCount()
    const getMinEmployeeCountPromise = getMinEmployeeCount()
    const getMedianOppsPerAccountPromise = getMedianOppsPerAccount()
    const getMeanOppsPerAccountPromise = getMeanOppsPerAccount()
    const getMaxOppsPerAccountPromise = getMaxOppsPerAccount()
    const getMinOppsPerAccountPromise = getMinOppsPerAccount()

    Promise.all([getAllAccountsPromise, getMedianEmployeeCountPromise, getMeanEmployeeCountPromise, getMaxEmployeeCountPromise, getMinEmployeeCountPromise, getMedianOppsPerAccountPromise, getMeanOppsPerAccountPromise, getMaxOppsPerAccountPromise, getMinOppsPerAccountPromise])
      .then(([accountList, medianEC, meanEC, maxEC, minEC, medianOPA, meanOPA, maxOPA, minOPA]) => {
        setAccounts(accountList.data)
        setStatistics({
          medianEmployeeCount: medianEC.data,
          meanEmployeeCount: meanEC.data,
          maxEmployeeCount: maxEC.data,
          minEmployeeCount: minEC.data,
          medianOppsPerAccount: medianOPA.data,
          meanOppsPerAccount: meanOPA.data,
          maxOppsPerAccount: maxOPA.data,
          minOppsPerAccount: minOPA.data
        })
      })
  }, [getAllAccounts, getMaxEmployeeCount, getMinEmployeeCount, getMeanEmployeeCount, getMedianEmployeeCount, getMaxOppsPerAccount, getMinOppsPerAccount, getMeanOppsPerAccount, getMedianOppsPerAccount])

  return (
    <div className="Accounts pt-5">
      <Navbar />
      <h1>Accounts</h1>

      <div className = "cardCont">
        <div className="card">
          <h4><b>Max Employee Count</b></h4>
          <p>{statistics.maxEmployeeCount}</p>
        </div>
        <div className="card">
          <h4><b>Min Employee Count</b></h4>
          <p>{statistics.minEmployeeCount}</p>
        </div>
        <div className="card">
          <h4><b>Mean Employee Count</b></h4>
          <p>{Math.round(statistics.meanEmployeeCount * 100) / 100}</p>
        </div>
        <div className="card">
          <h4><b>Median Employee Count</b></h4>
          <p>{statistics.medianEmployeeCount}</p>
        </div>
        <div className="card">
          <h4><b>Max Opps Per Account</b></h4>
          <p>{statistics.maxOppsPerAccount}</p>
        </div>
        <div className="card">
          <h4><b>Min Opps Per Account</b></h4>
          <p>{statistics.minOppsPerAccount}</p>
        </div>
        <div className="card">
          <h4><b>Mean Opps Per Account</b></h4>
          <p>{Math.round(statistics.meanOppsPerAccount * 100) / 100}</p>
        </div>
        <div className="card">
          <h4><b>Median Opps Per Account</b></h4>
          <p>{statistics.medianOppsPerAccount}</p>
        </div>
      </div>
      <table className="table">
        <th>ID</th>
        <th>INDUSTRY</th>
        <th>EMPLOYEES</th>
        <th>COUNTRY</th>
        <th>CITY</th>
        {accounts.map(a =>
          <tr>
            <td>{a.id}</td>
            <td>{a.industry}</td>
            <td>{a.employeeCount}</td>
            <td>{a.country}</td>
            <td>{a.city}</td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default Accounts