

export const CompletedTodos =({todoList, toggleCompleted})=>{
    return <>
        {
            todoList.map((todo)=>{ 
                if(todo.completed) {
                return (<div>
                    <h1>{todo.title}</h1>
                    <p>{todo.description}</p>
                    <p>Due Date: {todo.due}</p>
                    <p>Completed: Yes</p>
                    <button onClick={()=>{toggleCompleted(todo)}}>Mark Incomplete</button>
                    </div>);
                }
            })
        }
    
    </>
}