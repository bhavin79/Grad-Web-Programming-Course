import { useState } from "react";


export const AddTodo =({addTodo})=>{
    const [error, setError]= useState(false);
    const [errorText, setErrorText] = useState("");
    const [newTodo, setNewTodo] = useState({
        title:'',
        description: '',
        date: '',
    });

    const handleStringValidation = (string, parameter= "input", minLength)=>{
        string = string.trim();
        if (string.length == 0)
          throw `${parameter} cannot be empty or just spaces`;

        if (string.length < minLength) {
            throw `${parameter} should be atleast ${minLength} character long`;
          }

        return string;
    }

    const handleDateValidation = (date)=>{
        date = handleStringValidation(date, 'date');
        let inputDate = new Date(date+"T00:00:00");
        let currDate = new Date();
     
        if(inputDate.getFullYear()<currDate.getFullYear()){
            throw `Due date can't be in past`;
        }
        else if(inputDate.getFullYear()==currDate.getFullYear()){
            if(inputDate.getMonth()< currDate.getMonth()){
                throw `Due date can't be in past`;
            }
            else if(inputDate.getMonth()==currDate.getMonth()){
                console.log(inputDate.getDate(), currDate.getDate(), inputDate, currDate)
                if(inputDate.getDate()< currDate.getDate()){
                    throw `Due date can't be in past`;
                }
            }
        }

        return `${inputDate.getMonth()}/${inputDate.getDate()}/${inputDate.getFullYear()}`;
    }

    const hanleSubmit = (e)=>{
        e.preventDefault();
        setError(false);
        let todoData = {}
        console.log(newTodo)
        try{
            todoData.title = handleStringValidation(newTodo.title, "Title", 5);
            todoData.description = handleStringValidation(newTodo.description, "Description", 25);
            todoData.date = handleDateValidation(newTodo.date);
        }
        catch(e){
            setError(true);
            setErrorText(e);
        }
        addTodo(todoData);
        setNewTodo({
            title:'',
            description: '',
            date: '',
        });
    }

    return (
        
        <form onSubmit={hanleSubmit}>
            <label htmlFor="titleInput" id= "titleLabel">Title: </label>
            <input type="text" id= "titleInput" value={newTodo.title} onChange={(e)=> setNewTodo({...newTodo, title: e.target.value})}></input><br/>
           
            <label htmlFor="descriptionInput" id= "descriptionLabel">Description: </label>
            <input type="textarea" id = "descriptionInput" value={newTodo.description} onChange={(e)=>setNewTodo({...newTodo, description: e.target.value})}></input><br/>
            
            <label htmlFor="dateInput" id= "dateLabel">Due Date: </label>
            <input type="date" id="dateInput" value={newTodo.date} onChange={(e)=> setNewTodo({...newTodo, date: e.target.value})}></input><br/><br/>
           
            <button type="submit">Add!</button><br/>

        {error&& 
        <p className="passDue">{errorText}</p>}

        </form>
    )





}