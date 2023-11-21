import React from 'react'
import TodoCard from '../TodoCard/TodoCard'
import DoingCard from '../DoingCard/DoingCard'
import DoneCard from '../DoneCard/DoneCard'
import "./allcards.css"
import Todo from '../Todo/Todo'
import Doing from '../Doing/Doing'
import Done from '../Done/Done'


function AllCards() {
  
  return (
    <>
        <div className="w-full flex xsm:flex-col items-center justify-center">
            <Todo/>
            <TodoCard status="todo"/>
            <Doing/>
            <DoingCard status="doing" />
            <Done/>
            <DoneCard status="done"/>
        </div>
    </>
  )
}

export default AllCards
