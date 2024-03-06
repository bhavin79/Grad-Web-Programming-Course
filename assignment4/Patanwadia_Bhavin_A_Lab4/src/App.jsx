import { useState } from 'react';
import './App.css';
import {data} from "./data";
import { TodoList } from './TodoList';
import {CompletedTodos} from "./CompletedTodos"
import { AddTodo } from './AddTodo';
function App() {
  const [todoList, setTodoList] = useState(data);
  
  const deletTodo= (id)=>{
    let newTodos = todoList.filter((todo)=> todo.id != id);
    setTodoList(newTodos);
  };

  const toggleCompleted = (todo)=>{
    let {id} = todo;
    let newTodos = todoList.map((todo) => {
    if (todo.id == id) {
      const status = !todo.completed;
      return { ...todo, completed: status }; 
    }
      return todo;
    });
    setTodoList(newTodos);
  }

  const addTodo = (newTodo)=>{
      newTodo.completed = false;
      let uniqueID = Math.random() * Math.pow(10,19);
      newTodo.id = uniqueID;
      setTodoList((oldState)=>[newTodo,...oldState]);
     
  }
  return (
    <>
      <h2>Add new todo</h2>
      <AddTodo addTodo= {addTodo}/> 
      <hr></hr>
      <h2>Todo list</h2>
      <TodoList todoList={todoList} deletTodo={deletTodo} toggleCompleted={toggleCompleted}/>
      <hr></hr>
      <h2>Completed Todo list</h2>

      <CompletedTodos todoList={todoList} toggleCompleted={toggleCompleted}/>
    </>
  )
}

export default App
