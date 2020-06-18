import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import Navbar from './Navbar'
import Card from './Card'
import '../styles/Home.css'

const categories = [{
    name: "SalesReps",
  color: "#003333"
  }, {
    name: "Leads",
    color: "#4a6b6b"
  }, {
    name: "Opportunities",
    color: "#255454"
  }, {
    name: "Contacts",
    color: "#255454"
  }, {
    name: "Accounts",
    color: "#4a6b6b"
}]

const Home = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className="Home pt-5">
      <Navbar />
      <div className="categories">
        {categories.map((category, key) =>
          category.name === 'SalesReps' && currentUser.data.username !== 'admin' ?
            <></> :
            <Card key={key} category={category} />
            )}
      </div>
    </div>
  )
}

export default Home