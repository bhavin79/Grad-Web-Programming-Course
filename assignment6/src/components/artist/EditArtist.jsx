import { useMutation } from "@apollo/client"
import { useForm } from "react-hook-form";
import React, { useState } from 'react'; 
import { updateArtist, getArtits } from "./queries";

export const EditArtist =(props)=>{
    const [members, setMembers] = useState(props.data.members);
    const [inputValue, setInputValue] = useState('');
    const [editArtistMutation, { data, loading, error }] = useMutation(updateArtist, {refetchQueries:[getArtits]});
    const [errorText, setErrorText] = useState('');

    const handleAddMember = (e) => {
        if (e.key === 'Enter' && inputValue) {
          e.preventDefault();
          const regex = /^[a-zA-Z\s]+$/;
          if(!regex.test(inputValue.trim())){
              setErrorText("Members can only have Letters");
              return;
          }
          else{
              setErrorText("");
          }
          setMembers([...members, inputValue.trim()]);
          setInputValue('');
        }
      };
  
      const handleDeleteMember = (memberDelete) => {
          setMembers(members.filter(member => member !== memberDelete));
      };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm();

    const handleArtistEdit=(formData)=>{
        let formateDate = formData.date;
        formateDate = formateDate.split("-");
        formateDate = `${formateDate[1]}/${formateDate[2]}/${formateDate[0]}`;
        console.log(formateDate);

        if(members.length == 0){
            setErrorText("Member(s) name required");
            return;
        }else{
            setErrorText("");
        }   

        editArtistMutation({variables:{name:formData.name, dateFormed:formateDate, members: members, id:props.data.id}})

        
    }

    const resetForm =(e)=>{
        if(e){
            e.preventDefault();
        }
        reset();
        setMembers(props.data.members);
        setInputValue("");
    }
      return (
        <div>
          <form onSubmit={handleSubmit(handleArtistEdit)}>
                <label htmlFor="name">Name: </label> 
                <input 
                    type="text" 
                    id="name"
                    className= "border border-gray-300 p-1 rounded" 
                    defaultValue={props.data.name}
                    placeholder="Add Name"
                    {...register("name", {
                        required: "Name is Required"
                    })}/>
                      {errors && errors.name && <p className="text-orange-600" >{errors.name.message}</p>}
                <br></br>
                <label htmlFor="memberInput">Members:</label>
                <div className="border border-gray-300 p-2 rounded">
                    <div className="flex flex-wrap gap-2">
                    {members.map((member, index) => (
                        <div key={index} className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
                        <span className="text-blue-800">{member}</span>
                        <button className="cursor-pointer" onClick={() => handleDeleteMember(member)} >x </button>
                        </div>
                    ))}
                    <input
                        type="text"
                        id="memberInput"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleAddMember}
                        className="flex-1 outline-none"
                        placeholder="Add a member and press enter"
                    />
                    </div>
                </div>
                <p className="text-orange-600">{errorText}</p>

             <label htmlFor="date">Date Formed: </label>
                    <input 
                    type="date"
                    defaultValue={new Date(props.data.dateFormed).toISOString().split('T')[0]}
                    {...register("date",{ 
                        required: "Please Select a date",
                        validate:{
                            noFuture: (date)=>{
                                let inputDate = new Date(date);
                                let currDate = new Date();
                                if(inputDate>currDate){
                                    return "Date cant be in future";
                                }
                            }
                        }
                    }
                    )}></input>
                    {errors && errors.date && <p className="text-orange-600" >{errors.date.message}</p>}
                <br/>
                <div className="flex flex-row justify-evenly mt-3">

                <button className="btn bg-gray-800 text-gray-50 py-1 px-5 ml-3 hover:bg-gray-900" type="submit">Edit!</button>
                <button className="btn bg-gray-800 text-gray-50 py-1 px-5 ml-3 hover:bg-gray-900" type="submit" onClick={resetForm}>Clear Changes!</button>
                </div>
                {error && <p>{error.message}</p>}
                {data &&<p>Successfully Edited. Refresh the page to see edits</p>}
          </form>
        </div>
      );

}