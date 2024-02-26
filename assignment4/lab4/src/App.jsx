import { useState } from 'react';
import './App.css';
import {data} from "./data";

function App() {
  const [todoList, setTodoList] = useState(data);
  
  const deletTodo= (id)=>{
    let newTodos = todoList.filter((todo)=> todo.id != id);
    setTodoList(newTodos);
  };

  toggleCompleted = (todo)=>{
    let {id} = todo;
    let newTodos = todoList.map(todo => {
    if (todo.id === id) {
      return { ...todo, completed: !completed }; 
    }
      return todo;
    });
    setTodoList(newTodos);
  }


  return (
    <>
      
    </>
  )
}

export default App
