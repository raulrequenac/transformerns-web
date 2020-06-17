import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import Navbar from './Navbar'
import Card from './Card'
import '../styles/Home.css'

const categories = [{
    name: "SalesReps",
    color: "#781e1d"
  }, {
    name: "Leads",
    color: "#ffc107"
  }, {
    name: "Opportunities",
    color: "#8ac755"
  }, {
    name: "Contacts",
    color: "#9c5fde"
  }, {
    name: "Accounts",
    color: "#2a5d86"
}]

const Home = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className="Home">
      <Navbar />
      <div className="categories">
        {categories.map((category, key) =>
          category.name === 'SalesReps' && currentUser.data && currentUser.data.username !== 'admin' ?
            <></> :
            <Card key={key} category={category} />
            )}
      </div>
    </div>
  )
}

export default Home