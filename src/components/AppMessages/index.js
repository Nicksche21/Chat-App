import React from "react"
import "./style.css"

export default function AppMessages({ messages, thisMember }) {
  function renderMessage(message, index) {
    const { member, data, id } = message
    const thisMemberMsg = member.id === thisMember.id
    const classNameLi = thisMemberMsg ? "msg-list__msg msg-list__msg--thisMember" : "msg-list__msg"

    const classNameMemberData = thisMemberMsg
      ? "msg-list__member-data msg-list__member-data--thisMember"
      : "msg-list__member-data"

    return document.getElementsByClassName("msg-list")[0].children[index - 1] &&
      document.getElementsByClassName("msg-list")[0].children[index - 1].dataset.id === member.id ? (
      <li className={classNameLi} key={id} data-id={member.id}>
        <div className='msg-list__text'>{data}</div>
      </li>
    ) : (
      <li className={classNameLi} key={id} data-id={member.id}>
        <div className='msg-list__msg-container'>
          <div className={classNameMemberData}>
            <span className='msg-list__username'>{member.clientData.username}</span>
          </div>
          <div className='msg-list__text'>{data}</div>
        </div>
      </li>
    )
  }

  return <ul className='msg-list'>{messages.map((m, index) => renderMessage(m, index))}</ul>
}
