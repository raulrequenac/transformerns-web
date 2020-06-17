import React, { useState, useEffect, useContext }  from 'react'


const StatusForm = ({disabled}) => {
    
    return (
        <select id="status">
            <option value="all" selected>All</option>
            <option value="open" disabled="">OPEN</option>
            <option value="closeWon">CLOSE WON</option>
            <option value="closeLost">CLOSE LOST</option>
        </select>
    )
}

export default StatusForm