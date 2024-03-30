import React, { useState } from "react"
import "./style.css"

function AppRegistration({ handleRegFormSubmit }) {
  const [username, setUsername] = useState("")

  const getUsername = e => {
    setUsername(e.target.value)
  }

  const submitForm = e => {
    e.preventDefault()
    handleRegFormSubmit(username)
  }

  return (
    <div className='form-container'>
      <form className='reg-form' onSubmit={submitForm}>
        <input
          className='reg-form__txt-input'
          type='text'
          placeholder='Enter name...'
          required
          onChange={getUsername}
        />
        <button className='reg-form__btn' type='submit'>
          Start chat
        </button>
      </form>
    </div>
  )
}

export default AppRegistration
