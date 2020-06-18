import React, { useState } from 'react'
import '../styles/Card.css'
import { Redirect } from 'react-router-dom'

const Card = ({ category }) => {
  const [redirect, setRedirect] = useState(false)

  const onClickRedirect = () => setRedirect(true)

  if (redirect) return <Redirect to={`/${category.name.toLowerCase()}`}/>

  return (
    <div
      className="Card"
      onClick={onClickRedirect}
      style={{ backgroundColor: category.color, width: category.name === "SalesReps" ? "100%" : "49%" }}
    >
      <h1>{category.name}</h1>
    </div>
  )
}

export default Card