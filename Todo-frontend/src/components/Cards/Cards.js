import React from 'react'
import Todo from "../Todo/Todo"
import Doing from "../Doing/Doing"
import Done from "../Done/Done"
import "./cards.css"


export default function Cards() {
  return (
   <>
    <div className="cards flex xsm:flex-col xsm:ml-[1rem]">
        <Todo />
        <Doing />
        <Done />      
    </div>
   </>
  )
}
