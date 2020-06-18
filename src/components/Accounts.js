import React, {useState, useEffect} from 'react'
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
        setAccounts(accountList.data.map(a => Object.entries(a)))
        setStatistics({
          medianEmployeeCount: medianEC.data,
          meanEmployeeCount: meanEC.data,
          maxEmployeeCount: maxEC.data,
          minEmployeeCount: minEC.data,
          medianOppsPerAccount: medianOPA.data,
          meanOppsperAccount: meanOPA.data,
          maxOppsPerAccount: maxOPA.data,
          minOppsPerAccount: minOPA.data
        })
      })
  }, [getAllAccounts, getMaxEmployeeCount, getMinEmployeeCount, getMeanEmployeeCount, getMedianEmployeeCount, getMaxOppsPerAccount, getMinOppsPerAccount, getMeanOppsPerAccount, getMedianOppsPerAccount])

  return (
    <div className="Accounts pt-5">
      <Navbar />
      <h1>Accounts</h1>
      <p>{accounts}</p>
      <table>
        <th>ID</th>
        <th>INDUSTRY</th>
        <th>EMPLOYEES</th>
        <th>COUNTRY</th>
        <th>CITY</th>
                {Object.entries(statistics)}
      </table>
    </div>
  )
}

export default Accounts