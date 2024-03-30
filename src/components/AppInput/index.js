import React, { useState } from "react"
import "./style.css"

export default function AppInput({ onSendMessage }) {
  const initialState = {
    text: "",
  }

  const [state, setState] = useState(initialState)

  function onChange(e) {
    setState({ text: e.target.value })
  }

  function onSubmit(e) {
    e.preventDefault()
    const input = document.getElementsByClassName("msg-form__input")[0]
    if (state.text === "") {
      input.placeholder = "You need to enter something..."
    } else {
      onSendMessage(state.text)
      setState({ text: "" })
      input.placeholder = "Enter your message..."
      input.focus()
    }
  }

  return (
    <div className='chat__input'>
      <form className='msg-form' onSubmit={e => onSubmit(e)}>
        <input
          className='msg-form__input'
          onChange={e => onChange(e)}
          value={state.text}
          type='text'
          placeholder='Enter your message...'
          autoFocus={true}
        />
        <button className='msg-form__btn'>Send Message</button>
      </form>
    </div>
  )
}
