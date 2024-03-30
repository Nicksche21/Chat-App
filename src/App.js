import React, { useState, useEffect } from "react"
import "./App.css"
import Registration from "./components/AppRegistration"
import Messages from "./components/AppMessages"
import Input from "./components/AppInput"

export default function App() {
  const initialChatState = {
    member: { username: "" },
    messages: [],
  }

  const [chat, setChat] = useState(initialChatState)
  const [drone, setDrone] = useState(null)

  useEffect(() => {
    if (chat.member.username !== "") {
      const drone = new window.Scaledrone("b88yUYuERPRia5QR", {
        data: chat.member,
      })
      setDrone(drone)
    }
  }, [chat.member])

  useEffect(() => {
    if (chat.messages.length) {
      const scrollElement = document.getElementsByClassName("msg-list")[0]
      scrollElement.scrollTop = scrollElement.scrollHeight
    }
  }, [chat.messages.length])

  if (drone) {
    drone.on("open", error => {
      if (error) {
        return console.error(error)
      }
      chat.member.id = drone.clientId
      setChat({ ...chat }, chat.member)

      const room = drone.subscribe("observable-room")

      room.on("message", message => {
        const { data, member, timestamp, id } = message
        chat.messages.push({ member, data, timestamp, id })
        setChat({ ...chat }, chat.messages)
        /* console.log(chat); */
      })
    })
  }

  const onSendMessage = message => {
    drone.publish({
      room: "observable-room",
      message,
    })
  }

  const handleRegFormSubmit = username => {
    chat.member = {
      username: username,
    }
    setChat({ ...chat }, chat.member)
  }

  return chat.member.username === "" ? (
    <Registration handleRegFormSubmit={handleRegFormSubmit} />
  ) : (
    <div className='chat'>
      <Messages messages={chat.messages} thisMember={chat.member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  )
}
