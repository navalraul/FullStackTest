
import React, { useState } from 'react'

const Addproduct = () => {

    const [userData, setUserData] = useState({})


    const handleChange = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

  return (
    <div>
      <h2>Add Quiz</h2>
      <form onSubmit={handleSubmit}>
        <label>Question:</label><br />
        <input type='number' onChange={handleChange} name='question' value={userData.question}  /><br />
        <label>Options:</label><br />
            <input type='text' onChange={handleChange} name='options' value={userData.options}/><br />
            <input type='text' onChange={handleChange} name='options' value={userData.options} /><br/>
            <input type='text' onChange={handleChange} name='options' value={userData.options} /><br />
            <input type='text' onChange={handleChange} name='options' value={userData.options} /><br/>
        <label>Answer:</label><br />
        <input type='text' onChange={handleChange} name='answer' value={userData.answer} /><br />
        <input type='submit' value='Add Quiz' />
      </form>
    </div>
  )
}

export default Addproduct;
