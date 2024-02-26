export const TodoList =({todoList, deletTodo, toggleCompleted})=>{
   //TODO: color for past due. 
   const passDue =(date)=>{
        const neDate = new Date(date);
        const currentDate = new Date();
        if(neDate<currentDate){
            return true;
        }
        return false;
   }
   
   return <>
        {
            todoList.map((todo)=>{ 
                if(!todo.completed) {
                    const passDueProperty = passDue(todo.due)?"passDue":""
                return (<div>
                    <h1 className={passDueProperty}>{todo.title}</h1>
                    <p>{todo.description}</p>
                    <p className= {passDueProperty}>Due Date: {todo.due}</p>
                    <p>Completed: No</p>
                    <button onClick={()=>{deletTodo(todo.id)}}>Delete</button>
                    <button onClick={()=>{toggleCompleted(todo)}}>Complete</button>

                    </div>);
                }

            })
        }
    
    </>
}