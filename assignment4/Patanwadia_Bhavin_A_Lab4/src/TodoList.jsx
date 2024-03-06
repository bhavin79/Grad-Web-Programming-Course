export const TodoList =({todoList, deletTodo, toggleCompleted})=>{
   const passDue =(date)=>{
        const inputDate = new Date(date);
        const currentDate = new Date();
        if(inputDate.getFullYear()<currentDate.getFullYear()){
            return true;
        }
        else if(inputDate.getFullYear()==currentDate.getFullYear()){
            if(inputDate.getMonth()< currentDate.getMonth()){
                return true;
            }
            else if(inputDate.getMonth()==currentDate.getMonth()){
                if(inputDate.getDate()< currentDate.getDate()){
                   return true
                }
            }
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