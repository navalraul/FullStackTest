
import React from 'react'

const Navbar = () => {
    return (
        <div style={{ height: "70px", border: "1px solid yellow", display: "flex", justifyContent: "space-around", alignItems: "center"}}>
            <div style={{ width: "25%"}}><h3>Awdiz Quiz</h3></div>
            <div style={{ width: "50%", display: "flex", justifyContent: "space-around"}}>
                <h4>Profile</h4>
                <h4>Check Score</h4>
                <h4>Logout</h4>
            </div>
        </div>
    )
}

export default Navbar
